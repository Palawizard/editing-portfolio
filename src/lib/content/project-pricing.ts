import type { ProjectPricing } from '$lib/types/project';

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
