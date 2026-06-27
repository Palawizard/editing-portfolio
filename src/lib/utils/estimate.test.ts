import { describe, expect, it } from 'vitest';
import { estimateCopy } from '$lib/i18n/locales/fr/estimate';
import { emptyEstimateAnswers, type EstimateAnswers } from '$lib/types/estimate';
import {
	buildContactPrefill,
	calculatePriceEstimate,
	getContextualEstimateQuestion,
	isEstimateQuestionVisible
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
		const ugcAssets = estimateCopy.questions.find((question) => question.id === 'ugcAssets')!;

		expect(
			isEstimateQuestionVisible(shortsCount, completeAnswers({ projectType: 'gaming-long' }))
		).toBe(false);
		expect(
			isEstimateQuestionVisible(shortsCount, completeAnswers({ projectType: 'gaming-long-shorts' }))
		).toBe(true);
		expect(
			isEstimateQuestionVisible(ugcAssets, completeAnswers({ projectType: 'ugc-shorts' }))
		).toBe(true);
	});

	it('does not ask where shorts come from when the project type already answers it', () => {
		const shortsSource = estimateCopy.questions.find((question) => question.id === 'shortsSource')!;
		const moments = estimateCopy.questions.find((question) => question.id === 'moments')!;
		const longWithShorts = completeAnswers({ projectType: 'gaming-long-shorts' });
		const scriptedShorts = completeAnswers({ projectType: 'scripted-rush-shorts' });

		expect(isEstimateQuestionVisible(shortsSource, longWithShorts)).toBe(false);
		expect(isEstimateQuestionVisible(moments, longWithShorts)).toBe(true);
		expect(isEstimateQuestionVisible(shortsSource, scriptedShorts)).toBe(false);
		expect(isEstimateQuestionVisible(moments, scriptedShorts)).toBe(false);
	});

	it('does not ask about a script for clip-based or already scripted projects', () => {
		const structure = estimateCopy.questions.find((question) => question.id === 'structure')!;

		for (const projectType of [
			'gaming-clip',
			'shorts-from-long',
			'scripted-rush-shorts'
		] as const) {
			expect(isEstimateQuestionVisible(structure, completeAnswers({ projectType }))).toBe(false);
		}
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
				completeAnswers({ projectType: 'ugc-shorts', shortsSource: 'from-scratch' })
			)
		).toBe(false);
		expect(
			isEstimateQuestionVisible(
				moments,
				completeAnswers({ projectType: 'ugc-shorts', shortsSource: 'long-rushes' })
			)
		).toBe(true);
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

	it('does not ask for UGC assets that were already declared', () => {
		const ugcAssets = estimateCopy.questions.find((question) => question.id === 'ugcAssets')!;
		const contextualQuestion = getContextualEstimateQuestion(
			ugcAssets,
			completeAnswers({
				projectType: 'ugc-shorts',
				providedFiles: ['script', 'voice-over']
			}),
			estimateCopy.contextualQuestions
		);
		const values = contextualQuestion.options?.map((option) => option.value);

		expect(contextualQuestion.title).toContain('autres éléments');
		expect(values).not.toContain('script');
		expect(values).not.toContain('voice-over');
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
});
