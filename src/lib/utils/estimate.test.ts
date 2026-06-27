import { describe, expect, it } from 'vitest';
import { estimateCopy } from '$lib/i18n/locales/fr/estimate';
import { emptyEstimateAnswers, type EstimateAnswers } from '$lib/types/estimate';
import {
	buildContactPrefill,
	calculatePriceEstimate,
	getContextualEstimateQuestion,
	isEstimateQuestionVisible,
	sanitizeEstimateAnswers
} from './estimate';

const completeAnswers = (overrides: Partial<EstimateAnswers> = {}): EstimateAnswers => ({
	...emptyEstimateAnswers,
	name: 'Alex',
	contact: 'alex@example.com',
	projectType: 'gaming-clip',
	objective: 'entertain',
	providedFiles: ['raw'],
	structure: 'unnecessary',
	footageDuration: 'lt-15',
	finalDuration: '30-60s',
	shortsCount: '1',
	shortDuration: '30-60s',
	sources: '1',
	editingLevel: 'simple',
	styleReference: 'example',
	referenceLink: 'https://example.com/reference',
	subtitles: 'none',
	shortsSource: 'short-rushes',
	moments: 'precise',
	deadline: '1-2-weeks',
	resolution: '1080p',
	projectFiles: 'no',
	projectDescription: 'Un clip gaming court pour YouTube Shorts.',
	budgetPreference: 'estimate',
	...overrides
});

describe('calculatePriceEstimate', () => {
	it('keeps a simple short in a low entry-level range', () => {
		const result = calculatePriceEstimate(completeAnswers());

		expect([result.minimum, result.maximum]).toEqual([5, 10]);
	});

	it('keeps a standard long-form edit below a professional price range', () => {
		const result = calculatePriceEstimate(
			completeAnswers({
				projectType: 'gaming-long',
				footageDuration: '30-60',
				finalDuration: '8-15m',
				editingLevel: 'advanced',
				deadline: 'not-urgent'
			})
		);

		expect([result.minimum, result.maximum]).toEqual([25, 30]);
	});

	it('raises the estimate for workload, finish and urgency', () => {
		const simple = calculatePriceEstimate(completeAnswers());
		const complexAnswers = completeAnswers({
			projectType: 'gaming-long-shorts',
			footageDuration: '2-4',
			finalDuration: '15-30m',
			shortsCount: '6-10',
			shortDuration: '30-60s',
			sources: '3',
			editingLevel: 'premium',
			subtitles: 'word',
			moments: 'find',
			deadline: '24-48h',
			resolution: '4k',
			projectFiles: 'yes'
		});
		const complex = calculatePriceEstimate(complexAnswers);
		const relaxedDeadline = calculatePriceEstimate({
			...complexAnswers,
			deadline: '1-2-weeks'
		});

		expect(complex.minimum).toBeGreaterThan(simple.maximum * 5);
		expect(complex.maximum).toBeGreaterThan(relaxedDeadline.maximum);
	});

	it('uses the dedicated short duration for hybrid long-form projects', () => {
		const shortClips = calculatePriceEstimate(
			completeAnswers({
				projectType: 'gaming-long-shorts',
				finalDuration: '8-15m',
				shortsCount: '4-5',
				shortDuration: 'lt-30s'
			})
		);
		const longerClips = calculatePriceEstimate(
			completeAnswers({
				projectType: 'gaming-long-shorts',
				finalDuration: '8-15m',
				shortsCount: '4-5',
				shortDuration: '1-3m'
			})
		);

		expect(longerClips.minimum).toBeGreaterThan(shortClips.minimum);
		expect(longerClips.estimatedHours).toBeGreaterThan(shortClips.estimatedHours);
	});

	it('widens uncertainty when key values are unknown', () => {
		const result = calculatePriceEstimate(
			completeAnswers({
				footageDuration: 'unknown',
				shortsCount: 'unknown',
				sources: 'unknown',
				resolution: 'unknown',
				moments: 'unknown'
			})
		);

		expect(result.uncertainty).toBe('high');
		expect(result.maximum - result.minimum).toBeGreaterThanOrEqual(10);
	});

	it('ignores stale answers from questions that became hidden', () => {
		const base = completeAnswers({
			projectType: 'gaming-long',
			finalDuration: '8-15m',
			shortsCount: '',
			moments: '',
			ugcAssets: []
		});
		const stale = {
			...base,
			shortsCount: 'unknown',
			moments: 'unknown',
			ugcAssets: ['unknown']
		};

		expect(calculatePriceEstimate(stale)).toEqual(calculatePriceEstimate(base));
	});
});

describe('questionnaire flow and prefill', () => {
	it('shows short and UGC questions only when relevant', () => {
		const shortsCount = estimateCopy.questions.find((question) => question.id === 'shortsCount')!;
		const shortDuration = estimateCopy.questions.find(
			(question) => question.id === 'shortDuration'
		)!;
		const ugcAssets = estimateCopy.questions.find((question) => question.id === 'ugcAssets')!;

		expect(
			isEstimateQuestionVisible(shortsCount, completeAnswers({ projectType: 'gaming-long' }))
		).toBe(false);
		expect(
			isEstimateQuestionVisible(shortsCount, completeAnswers({ projectType: 'gaming-long-shorts' }))
		).toBe(true);
		expect(
			isEstimateQuestionVisible(
				shortDuration,
				completeAnswers({ projectType: 'gaming-long-shorts' })
			)
		).toBe(true);
		expect(
			isEstimateQuestionVisible(shortDuration, completeAnswers({ projectType: 'gaming-clip' }))
		).toBe(false);
		expect(
			isEstimateQuestionVisible(ugcAssets, completeAnswers({ projectType: 'ugc-shorts' }))
		).toBe(true);
	});

	it('infers the shorts source but asks for useful scripted-rush details', () => {
		const shortsSource = estimateCopy.questions.find((question) => question.id === 'shortsSource')!;
		const moments = estimateCopy.questions.find((question) => question.id === 'moments')!;
		const longWithShorts = completeAnswers({ projectType: 'gaming-long-shorts' });
		const structure = estimateCopy.questions.find((question) => question.id === 'structure')!;
		const scriptedShorts = completeAnswers({
			projectType: 'scripted-rush-shorts',
			providedFiles: ['raw', 'script']
		});

		expect(isEstimateQuestionVisible(shortsSource, longWithShorts)).toBe(false);
		expect(isEstimateQuestionVisible(moments, longWithShorts)).toBe(true);
		expect(isEstimateQuestionVisible(shortsSource, scriptedShorts)).toBe(false);
		expect(isEstimateQuestionVisible(structure, scriptedShorts)).toBe(true);
		expect(isEstimateQuestionVisible(moments, scriptedShorts)).toBe(true);
	});

	it('keeps structure hidden only for routes where it is already irrelevant', () => {
		const structure = estimateCopy.questions.find((question) => question.id === 'structure')!;

		for (const projectType of ['gaming-clip', 'shorts-from-long'] as const) {
			expect(isEstimateQuestionVisible(structure, completeAnswers({ projectType }))).toBe(false);
		}
		expect(
			isEstimateQuestionVisible(structure, completeAnswers({ projectType: 'scripted-rush-shorts' }))
		).toBe(true);
		expect(
			isEstimateQuestionVisible(structure, completeAnswers({ projectType: 'gaming-long-shorts' }))
		).toBe(true);
	});

	it('uses the provided project or script instead of asking for the shorts source again', () => {
		const shortsSource = estimateCopy.questions.find((question) => question.id === 'shortsSource')!;

		expect(
			isEstimateQuestionVisible(
				shortsSource,
				completeAnswers({ projectType: 'gaming-clip', providedFiles: ['editing-project'] })
			)
		).toBe(false);
		expect(
			isEstimateQuestionVisible(
				shortsSource,
				completeAnswers({
					projectType: 'explainer-shorts',
					providedFiles: ['script', 'voice-over']
				})
			)
		).toBe(false);
	});

	it('asks for best moments only when a selectable video source needs reviewing', () => {
		const moments = estimateCopy.questions.find((question) => question.id === 'moments')!;

		expect(
			isEstimateQuestionVisible(
				moments,
				completeAnswers({
					projectType: 'gaming-long-shorts',
					providedFiles: ['script', 'voice-over']
				})
			)
		).toBe(false);
		expect(
			isEstimateQuestionVisible(
				moments,
				completeAnswers({ projectType: 'gaming-long-shorts', providedFiles: ['raw'] })
			)
		).toBe(true);
		for (const projectType of [
			'gaming-long-shorts',
			'other-long-shorts',
			'shorts-from-long'
		] as const) {
			expect(
				isEstimateQuestionVisible(
					moments,
					completeAnswers({ projectType, providedFiles: ['editing-project'] })
				)
			).toBe(false);
		}
	});

	it('asks source count only for footage that may need synchronization', () => {
		const sources = estimateCopy.questions.find((question) => question.id === 'sources')!;

		expect(isEstimateQuestionVisible(sources, completeAnswers({ providedFiles: ['raw'] }))).toBe(
			true
		);
		for (const providedFiles of [['script'], ['voice-over'], ['editing-project'], ['assets']]) {
			expect(isEstimateQuestionVisible(sources, completeAnswers({ providedFiles }))).toBe(false);
		}
	});

	it('hides non-temporal material duration and adapts wording for timed files', () => {
		const footageDuration = estimateCopy.questions.find(
			(question) => question.id === 'footageDuration'
		)!;

		expect(
			isEstimateQuestionVisible(footageDuration, completeAnswers({ providedFiles: ['script'] }))
		).toBe(false);
		expect(
			getContextualEstimateQuestion(
				footageDuration,
				completeAnswers({ providedFiles: ['editing-project'] }),
				estimateCopy.contextualQuestions
			).title
		).toContain('projet à reprendre');
		expect(
			getContextualEstimateQuestion(
				footageDuration,
				completeAnswers({ providedFiles: ['voice-over'] }),
				estimateCopy.contextualQuestions
			).title
		).toContain('voix off');
	});

	it('clarifies whether duration refers to the long video or each short', () => {
		const finalDuration = estimateCopy.questions.find(
			(question) => question.id === 'finalDuration'
		)!;
		const longQuestion = getContextualEstimateQuestion(
			finalDuration,
			completeAnswers({ projectType: 'gaming-long-shorts' }),
			estimateCopy.contextualQuestions
		);
		const shortQuestion = getContextualEstimateQuestion(
			finalDuration,
			completeAnswers({ projectType: 'gaming-clip' }),
			estimateCopy.contextualQuestions
		);

		expect(longQuestion.title).toContain('vidéo longue');
		expect(shortQuestion.title).toContain('chaque short');
	});

	it('removes source choices that contradict a gaming clip project', () => {
		const shortsSource = estimateCopy.questions.find((question) => question.id === 'shortsSource')!;
		const contextualQuestion = getContextualEstimateQuestion(
			shortsSource,
			completeAnswers({ projectType: 'gaming-clip' }),
			estimateCopy.contextualQuestions
		);
		const values = contextualQuestion.options?.map((option) => option.value);

		expect(contextualQuestion.title).toContain('extraits gaming');
		expect(values).not.toContain('script-voice');
		expect(values).not.toContain('from-scratch');
	});

	it('asks for the status rather than the existence of an already provided script', () => {
		const structure = estimateCopy.questions.find((question) => question.id === 'structure')!;
		const contextualQuestion = getContextualEstimateQuestion(
			structure,
			completeAnswers({ projectType: 'explainer-shorts', providedFiles: ['script'] }),
			estimateCopy.contextualQuestions
		);
		const values = contextualQuestion.options?.map((option) => option.value);

		expect(contextualQuestion.title).toContain('script fourni');
		expect(values).toEqual(['complete', 'idea']);
	});

	it('separates UGC footage from the UGC assets inventory', () => {
		const providedFiles = estimateCopy.questions.find(
			(question) => question.id === 'providedFiles'
		)!;
		const ugcAssets = estimateCopy.questions.find((question) => question.id === 'ugcAssets')!;
		const contextualFiles = getContextualEstimateQuestion(
			providedFiles,
			completeAnswers({ projectType: 'ugc-shorts' }),
			estimateCopy.contextualQuestions
		);
		const fileValues = contextualFiles.options?.map((option) => option.value);
		const assetValues = ugcAssets.options?.map((option) => option.value);

		expect(contextualFiles.title).toContain('rushs ou un projet de montage');
		expect(fileValues).not.toContain('script');
		expect(fileValues).not.toContain('voice-over');
		expect(fileValues).not.toContain('assets');
		expect(fileValues).toContain('none');
		expect(assetValues).toContain('script');
		expect(assetValues).toContain('voice-over');
	});

	it('clears hidden and no-longer-available answers after a route change', () => {
		const ugcAnswers = completeAnswers({
			projectType: 'ugc-shorts',
			providedFiles: ['raw', 'script', 'voice-over'],
			ugcAssets: ['script', 'facecam'],
			footageDuration: '30-60',
			sources: '3',
			moments: 'find'
		});
		const sanitizedUgc = sanitizeEstimateAnswers(
			ugcAnswers,
			estimateCopy.questions,
			estimateCopy.contextualQuestions
		);

		expect(sanitizedUgc.providedFiles).toEqual(['raw']);
		expect(sanitizedUgc.ugcAssets).toEqual(['script', 'facecam']);

		const changedRoute = sanitizeEstimateAnswers(
			{
				...sanitizedUgc,
				projectType: 'gaming-long',
				providedFiles: ['script']
			},
			estimateCopy.questions,
			estimateCopy.contextualQuestions
		);

		expect(changedRoute.ugcAssets).toEqual([]);
		expect(changedRoute.footageDuration).toBe('');
		expect(changedRoute.sources).toBe('');
		expect(changedRoute.moments).toBe('');
		expect(changedRoute.shortsCount).toBe('');
		expect(changedRoute.shortDuration).toBe('');
	});

	it('keeps a non-email contact method in the request description', () => {
		const answers = completeAnswers({ contact: 'Discord : alex-video' });
		const estimate = calculatePriceEstimate(answers);
		const prefill = buildContactPrefill(answers, estimate, estimateCopy.questions, 'fr');

		expect(prefill.email).toBe('');
		expect(prefill.projectDescription).toContain('Discord : alex-video');
		expect(prefill.budget).toContain(`${estimate.minimum}–${estimate.maximum} €`);
	});

	it('does not transfer hidden reference and budget answers', () => {
		const answers = completeAnswers({
			styleReference: 'proposal',
			referenceLink: 'https://stale.example.com',
			budgetPreference: 'estimate',
			budgetAmount: '500 €'
		});
		const estimate = calculatePriceEstimate(answers);
		const prefill = buildContactPrefill(answers, estimate, estimateCopy.questions, 'fr');

		expect(prefill.usefulLinks).toBe('');
		expect(prefill.budget).not.toContain('500 €');
	});

	it('transfers the relevant delivery and short details to the contact form', () => {
		const answers = completeAnswers({
			projectType: 'shorts-from-long',
			moments: 'find',
			deadline: '3-5-days',
			resolution: '4k',
			projectFiles: 'yes'
		});
		const estimate = calculatePriceEstimate(answers);
		const prefill = buildContactPrefill(answers, estimate, estimateCopy.questions, 'fr');

		expect(prefill.projectDescription).toContain('Sélection des meilleurs moments');
		expect(prefill.projectDescription).toContain('3 à 5 jours');
		expect(prefill.projectDescription).toContain('4K');
		expect(prefill.projectDescription).toContain('Fichiers de projet à livrer: Oui');
	});

	it('transfers both long-form and short durations for hybrid projects', () => {
		const answers = completeAnswers({
			projectType: 'gaming-long-shorts',
			finalDuration: '8-15m',
			shortsCount: '2-3',
			shortDuration: 'lt-30s'
		});
		const estimate = calculatePriceEstimate(answers);
		const prefill = buildContactPrefill(answers, estimate, estimateCopy.questions, 'fr');

		expect(prefill.footageDetails).toContain('Durée finale: 8 à 15 minutes');
		expect(prefill.footageDetails).toContain('Durée moyenne de chaque short: Moins de 30 secondes');
	});
});
