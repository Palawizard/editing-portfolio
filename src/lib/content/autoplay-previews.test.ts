import { describe, expect, it } from 'vitest';
import {
	categoryAutoplayPreviews,
	heroAutoplayPreviews,
	selectRandomCategoryAutoplayPreviews,
	selectRandomHeroAutoplayPreview
} from './autoplay-previews';

describe('autoplay previews', () => {
	it('defines one unique preview for every project video', () => {
		const previews = Object.values(categoryAutoplayPreviews).flat();

		expect(previews).toHaveLength(22);
		expect(new Set(previews.map((preview) => preview.src)).size).toBe(22);
	});

	it('selects one preview from each category', () => {
		const selected = selectRandomCategoryAutoplayPreviews(() => 0.999);

		for (const [category, previews] of Object.entries(categoryAutoplayPreviews)) {
			expect(selected[category as keyof typeof selected]).toBe(previews.at(-1));
		}
	});

	it('selects a random horizontal preview for the hero', () => {
		expect(selectRandomHeroAutoplayPreview(() => 0.999)).toBe(heroAutoplayPreviews.at(-1));
	});

	it('does not repeat the current hero preview', () => {
		const currentPreview = heroAutoplayPreviews[0];
		const nextPreview = selectRandomHeroAutoplayPreview(() => 0, currentPreview.src);

		expect(nextPreview).not.toBe(currentPreview);
		expect(heroAutoplayPreviews).toContain(nextPreview);
	});
});
