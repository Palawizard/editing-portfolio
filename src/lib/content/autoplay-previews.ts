import type { ProjectCategory } from '$lib/types/project';

export type AutoplayPreview = {
	src: string;
	poster: string;
	aspect: 'video' | 'vertical';
};

export type SelectedCategoryAutoplayPreviews = Record<ProjectCategory, AutoplayPreview>;

const definePreview = (
	name: string,
	posterDirectory: 'business' | 'explainer' | 'gaming' | 'other',
	aspect: AutoplayPreview['aspect']
): AutoplayPreview => ({
	src: `/videos/previews/${name}-preview.mp4`,
	poster: `/images/posters/${posterDirectory}/${name}.webp`,
	aspect
});

export const categoryAutoplayPreviews: Record<ProjectCategory, AutoplayPreview[]> = {
	'gaming-long-form': [
		definePreview('miyuna-retour-gaming-long', 'gaming', 'video'),
		definePreview('genshin-whale-accident-long', 'gaming', 'video'),
		definePreview('palawi-fireball-long', 'gaming', 'video'),
		definePreview('carry-the-glass-long', 'gaming', 'video'),
		definePreview('funky-beau-fils-long', 'gaming', 'video')
	],
	'gaming-short-form': [
		definePreview('flare-mort-short', 'gaming', 'vertical'),
		definePreview('cs2-random-short', 'gaming', 'vertical'),
		definePreview('cs2-habitude-short', 'gaming', 'vertical'),
		definePreview('cs2-totem-short', 'gaming', 'vertical'),
		definePreview('cs2-peur-short', 'gaming', 'vertical'),
		definePreview('cs2-type-bizarre-short', 'gaming', 'vertical')
	],
	'explainer-short-form': [definePreview('rant-explicatif', 'explainer', 'vertical')],
	'business-promo': [
		definePreview('ugc', 'business', 'vertical'),
		definePreview('boursin', 'business', 'vertical'),
		definePreview('cheese-naan', 'business', 'vertical'),
		definePreview('humour-promo', 'business', 'vertical'),
		definePreview('naan', 'business', 'vertical'),
		definePreview('poulet', 'business', 'vertical'),
		definePreview('smash', 'business', 'vertical'),
		definePreview('tacos', 'business', 'vertical')
	],
	'other-format': [
		definePreview('miyuna-model-reveal-best-of', 'gaming', 'video'),
		definePreview('funky-live-cuisine-other', 'other', 'video')
	]
};

export const initialCategoryAutoplayPreviews = Object.fromEntries(
	Object.entries(categoryAutoplayPreviews).map(([category, previews]) => [category, previews[0]])
) as SelectedCategoryAutoplayPreviews;

export const selectRandomCategoryAutoplayPreviews = (
	random: () => number = Math.random
): SelectedCategoryAutoplayPreviews =>
	Object.fromEntries(
		Object.entries(categoryAutoplayPreviews).map(([category, previews]) => [
			category,
			previews[Math.floor(random() * previews.length)]
		])
	) as SelectedCategoryAutoplayPreviews;

export const heroAutoplayPreviews = [
	...categoryAutoplayPreviews['gaming-long-form'],
	...categoryAutoplayPreviews['other-format']
];

export const selectRandomHeroAutoplayPreview = (
	random: () => number = Math.random,
	excludedSrc?: string
): AutoplayPreview => {
	const candidates = excludedSrc
		? heroAutoplayPreviews.filter((preview) => preview.src !== excludedSrc)
		: heroAutoplayPreviews;

	return candidates[Math.floor(random() * candidates.length)];
};
