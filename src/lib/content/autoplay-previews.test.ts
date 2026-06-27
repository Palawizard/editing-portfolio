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

	it('uses the Miyuna best-of preview in other formats', () => {
		const bestOfSource = '/videos/previews/miyuna-model-reveal-best-of-preview.mp4';

		expect(categoryAutoplayPreviews['other-format'].some(({ src }) => src === bestOfSource)).toBe(
			true
		);
		expect(
			categoryAutoplayPreviews['gaming-long-form'].some(({ src }) => src === bestOfSource)
		).toBe(false);
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
