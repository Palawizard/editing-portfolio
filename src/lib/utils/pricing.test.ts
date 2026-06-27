import { describe, expect, it } from 'vitest';
import {
	categoryStartingPrices,
	getProjectPricing,
	restaurantPromotionProjectSlugs
} from '$lib/content/project-pricing';
import { formatProjectPrice, sortProjectsByPrice } from './pricing';

describe('project pricing', () => {
	it('sets restaurant promotion shorts to an approximate 20 euros', () => {
		expect(restaurantPromotionProjectSlugs).toHaveLength(7);

		for (const slug of restaurantPromotionProjectSlugs) {
			expect(getProjectPricing(slug)).toEqual({
				amount: 20,
				currency: 'EUR',
				approximate: true,
				temporary: false
			});
		}
	});

	it('uses a temporary zero price for every other project', () => {
		expect(getProjectPricing('gaming-example')).toEqual({
			amount: 0,
			currency: 'EUR',
			approximate: false,
			temporary: true
		});
	});

	it('defines coherent starting prices from simple shorts to standard long-form edits', () => {
		expect(
			Object.fromEntries(
				Object.entries(categoryStartingPrices).map(([category, pricing]) => [
					category,
					pricing.amount
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
			{ id: 'twenty', pricing: getProjectPricing('business-boursin-short') },
			{ id: 'zero-a', pricing: getProjectPricing('gaming-example') },
			{ id: 'zero-b', pricing: getProjectPricing('other-example') }
		];

		expect(sortProjectsByPrice(projects).map(({ id }) => id)).toEqual([
			'zero-a',
			'zero-b',
			'twenty'
		]);
		expect(projects.map(({ id }) => id)).toEqual(['twenty', 'zero-a', 'zero-b']);
	});

	it('formats approximate and exact euro prices', () => {
		expect(formatProjectPrice(getProjectPricing('business-boursin-short'), 'fr')).toMatch(
			/^≈\s20\s?€$/
		);
		expect(formatProjectPrice(getProjectPricing('gaming-example'), 'fr')).toMatch(/^0\s?€$/);
	});
});
