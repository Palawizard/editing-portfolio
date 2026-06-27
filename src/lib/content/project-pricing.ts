import type { ProjectCategory, ProjectPricing } from '$lib/types/project';

export const restaurantPromotionProjectSlugs = [
	'business-boursin-short',
	'business-cheese-naan-short',
	'business-humour-short',
	'business-naan-short',
	'business-poulet-short',
	'business-smash-short',
	'business-tacos-short'
] as const;

const restaurantPromotionProjects = new Set<string>(restaurantPromotionProjectSlugs);

const defineStartingPrice = (amount: number): ProjectPricing => ({
	amount,
	currency: 'EUR',
	approximate: false,
	temporary: false
});

export const categoryStartingPrices: Record<ProjectCategory, ProjectPricing> = {
	'gaming-short-form': defineStartingPrice(5),
	'explainer-short-form': defineStartingPrice(10),
	'business-promo': defineStartingPrice(15),
	'gaming-long-form': defineStartingPrice(25),
	'other-format': defineStartingPrice(25)
};

export const getProjectPricing = (slug: string): ProjectPricing =>
	restaurantPromotionProjects.has(slug)
		? {
				amount: 20,
				currency: 'EUR',
				approximate: true,
				temporary: false
			}
		: {
				amount: 0,
				currency: 'EUR',
				approximate: false,
				temporary: true
			};
