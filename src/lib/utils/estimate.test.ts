import { describe, expect, it } from 'vitest';
import { estimateCopy } from '$lib/i18n/locales/fr/estimate';
import { emptyEstimateAnswers, type EstimateAnswers } from '$lib/types/estimate';
import { buildContactPrefill, calculatePriceEstimate, isEstimateQuestionVisible } from './estimate';

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

		expect(result.minimum).toBeGreaterThanOrEqual(20);
		expect(result.maximum).toBeLessThanOrEqual(50);
	});

	it('raises the estimate for workload, finish and urgency', () => {
		const simple = calculatePriceEstimate(completeAnswers());
		const complex = calculatePriceEstimate(
			completeAnswers({
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
			})
		);

		expect(complex.minimum).toBeGreaterThan(simple.maximum * 5);
		expect(complex.drivers).toContain('deadline');
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
		expect(result.maximum - result.minimum).toBeGreaterThanOrEqual(20);
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

	it('keeps a non-email contact method in the request description', () => {
		const answers = completeAnswers({ contact: 'Discord : alex-video' });
		const estimate = calculatePriceEstimate(answers);
		const prefill = buildContactPrefill(answers, estimate, estimateCopy.questions, 'fr');

		expect(prefill.email).toBe('');
		expect(prefill.projectDescription).toContain('Discord : alex-video');
		expect(prefill.budget).toContain(`${estimate.minimum}–${estimate.maximum} €`);
	});
});
