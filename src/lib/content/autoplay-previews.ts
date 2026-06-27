import type { ProjectCategory } from '$lib/types/project';

export type AutoplayPreview = {
	slug: string;
	src: string;
	poster: string;
	aspect: 'video' | 'vertical';
};

export type SelectedCategoryAutoplayPreviews = Record<ProjectCategory, AutoplayPreview>;

const definePreview = (
	name: string,
	slug: string,
	posterDirectory: 'business' | 'explainer' | 'gaming' | 'other',
	aspect: AutoplayPreview['aspect']
): AutoplayPreview => ({
	slug,
	src: `/videos/previews/${name}-preview.mp4`,
	poster: `/images/posters/${posterDirectory}/${name}.webp`,
	aspect
});

export const categoryAutoplayPreviews: Record<ProjectCategory, AutoplayPreview[]> = {
	'gaming-long-form': [
		definePreview('miyuna-retour-gaming-long', 'miyuna-retour-gaming-long', 'gaming', 'video'),
		definePreview('genshin-whale-accident-long', 'genshin-whale-accident-long', 'gaming', 'video'),
		definePreview('palawi-fireball-long', 'palawi-fireball-long', 'gaming', 'video'),
		definePreview('carry-the-glass-long', 'carry-the-glass-long', 'gaming', 'video'),
		definePreview('funky-beau-fils-long', 'funky-beau-fils-long', 'gaming', 'video')
	],
	'gaming-short-form': [
		definePreview('flare-mort-short', 'flare-mort-short', 'gaming', 'vertical'),
		definePreview('cs2-random-short', 'cs2-random-short', 'gaming', 'vertical'),
		definePreview('cs2-habitude-short', 'cs2-habitude-short', 'gaming', 'vertical'),
		definePreview('cs2-totem-short', 'cs2-totem-short', 'gaming', 'vertical'),
		definePreview('cs2-peur-short', 'cs2-peur-short', 'gaming', 'vertical'),
		definePreview('cs2-type-bizarre-short', 'cs2-type-bizarre-short', 'gaming', 'vertical')
	],
	'explainer-short-form': [
		definePreview('rant-explicatif', 'rant-explicatif-drive', 'explainer', 'vertical')
	],
	'business-promo': [
		definePreview('ugc', 'business-ugc-short', 'business', 'vertical'),
		definePreview('boursin', 'business-boursin-short', 'business', 'vertical'),
		definePreview('cheese-naan', 'business-cheese-naan-short', 'business', 'vertical'),
		definePreview('humour-promo', 'business-humour-short', 'business', 'vertical'),
		definePreview('naan', 'business-naan-short', 'business', 'vertical'),
		definePreview('poulet', 'business-poulet-short', 'business', 'vertical'),
		definePreview('smash', 'business-smash-short', 'business', 'vertical'),
		definePreview('tacos', 'business-tacos-short', 'business', 'vertical')
	],
	'other-format': [
		definePreview('funky-live-cuisine-other', 'funky-live-cuisine-other', 'other', 'video')
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
