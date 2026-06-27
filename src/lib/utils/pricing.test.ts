import { describe, expect, it } from 'vitest';
import {
	categoryStartingPrices,
	getProjectPricing,
	pricedProjectSlugs,
	restaurantPromotionProjectSlugs
} from '$lib/content/project-pricing';
import { projects as portfolioProjects } from '$lib/content/projects';
import { formatCurrencyAmount, formatProjectPrice, sortProjectsByPrice } from './pricing';

describe('project pricing', () => {
	it('sets restaurant promotion shorts to an approximate 20 euros', () => {
		expect(restaurantPromotionProjectSlugs).toHaveLength(7);

		for (const slug of restaurantPromotionProjectSlugs) {
			expect(getProjectPricing(slug)).toEqual({
				minimum: 20,
				maximum: 20,
				currency: 'EUR',
				approximate: true,
				temporary: false
			});
		}
	});

	it('uses a temporary zero price for every other project', () => {
		expect(getProjectPricing('gaming-example')).toEqual({
			minimum: 0,
			maximum: 0,
			currency: 'EUR',
			approximate: false,
			temporary: true
		});
	});

	it('keeps the validated price ranges for the remaining examples', () => {
		const expectedRanges: Record<string, [number, number]> = {
			'flare-mort-short': [10, 15],
			'cs2-random-short': [10, 15],
			'cs2-habitude-short': [10, 15],
			'cs2-totem-short': [10, 15],
			'cs2-peur-short': [10, 15],
			'cs2-type-bizarre-short': [10, 15],
			'business-ugc-short': [5, 10],
			'rant-explicatif-drive': [10, 15],
			'funky-live-cuisine-other': [40, 50],
			'miyuna-retour-gaming-long': [45, 55],
			'genshin-whale-accident-long': [45, 55],
			'miyuna-model-reveal-best-of': [35, 45],
			'funky-beau-fils-long': [20, 25],
			'palawi-fireball-long': [30, 30],
			'carry-the-glass-long': [45, 55]
		};

		for (const [slug, [minimum, maximum]] of Object.entries(expectedRanges)) {
			expect(getProjectPricing(slug)).toMatchObject({ minimum, maximum });
		}
	});

	it('assigns an explicit price to every current project', () => {
		expect(new Set(pricedProjectSlugs).size).toBe(portfolioProjects.length);
		expect(portfolioProjects.every((project) => !project.pricing.temporary)).toBe(true);
	});

	it('keeps the validated category starting prices unchanged', () => {
		expect(
			Object.fromEntries(
				Object.entries(categoryStartingPrices).map(([category, pricing]) => [
					category,
					pricing.minimum
				])
			)
		).toEqual({
			'gaming-short-form': 5,
			'explainer-short-form': 10,
			'business-promo': 15,
			'gaming-long-form': 25,
			'other-format': 25
		});
	});

	it('sorts by ascending price without mutating or reordering equal prices', () => {
		const projects = [
			{ id: 'forty-five', pricing: getProjectPricing('miyuna-retour-gaming-long') },
			{ id: 'ten-a', pricing: getProjectPricing('cs2-random-short') },
			{ id: 'ten-b', pricing: getProjectPricing('flare-mort-short') }
		];

		expect(sortProjectsByPrice(projects).map(({ id }) => id)).toEqual([
			'ten-a',
			'ten-b',
			'forty-five'
		]);
		expect(projects.map(({ id }) => id)).toEqual(['forty-five', 'ten-a', 'ten-b']);
	});

	it('formats approximate ranges, fixed estimates and starting amounts', () => {
		expect(formatProjectPrice(getProjectPricing('rant-explicatif-drive'), 'fr')).toBe('≈ 10–15 €');
		expect(formatProjectPrice(getProjectPricing('business-boursin-short'), 'fr')).toMatch(
			/^≈\s20\s?€$/
		);
		expect(formatCurrencyAmount(10, 'EUR', 'fr')).toBe('10 €');
	});

	it('moves the Miyuna best-of into other formats', () => {
		expect(
			portfolioProjects.find((project) => project.slug === 'miyuna-model-reveal-best-of')?.category
		).toBe('other-format');
	});
});
