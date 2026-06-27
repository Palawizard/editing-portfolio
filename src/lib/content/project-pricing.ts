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

const pricingGroups: Array<{
	slugs: readonly string[];
	minimum: number;
	maximum: number;
}> = [
	{
		slugs: [
			'flare-mort-short',
			'cs2-random-short',
			'cs2-habitude-short',
			'cs2-totem-short',
			'cs2-peur-short',
			'cs2-type-bizarre-short'
		],
		minimum: 10,
		maximum: 15
	},
	{ slugs: restaurantPromotionProjectSlugs, minimum: 20, maximum: 20 },
	{ slugs: ['business-ugc-short'], minimum: 10, maximum: 10 },
	{ slugs: ['rant-explicatif-drive'], minimum: 10, maximum: 15 },
	{ slugs: ['funky-live-cuisine-other'], minimum: 40, maximum: 50 },
	{
		slugs: ['miyuna-retour-gaming-long', 'genshin-whale-accident-long'],
		minimum: 45,
		maximum: 55
	},
	{ slugs: ['miyuna-model-reveal-best-of'], minimum: 35, maximum: 45 },
	{ slugs: ['funky-beau-fils-long'], minimum: 20, maximum: 25 },
	{ slugs: ['palawi-fireball-long'], minimum: 30, maximum: 30 },
	{ slugs: ['carry-the-glass-long'], minimum: 45, maximum: 55 }
];

export const pricedProjectSlugs = pricingGroups.flatMap(({ slugs }) => slugs);

const defineStartingPrice = (amount: number): ProjectPricing => ({
	minimum: amount,
	maximum: amount,
	currency: 'EUR',
	approximate: false,
	temporary: false
});

export const categoryStartingPrices: Record<ProjectCategory, ProjectPricing> = {
	'gaming-short-form': defineStartingPrice(5),
	'explainer-short-form': defineStartingPrice(10),
	'business-promo': defineStartingPrice(10),
	'gaming-long-form': defineStartingPrice(20),
	'other-format': defineStartingPrice(20)
};

export const getProjectPricing = (slug: string): ProjectPricing => {
	const pricing = pricingGroups.find(({ slugs }) => slugs.includes(slug));

	return pricing
		? {
				minimum: pricing.minimum,
				maximum: pricing.maximum,
				currency: 'EUR',
				approximate: true,
				temporary: false
			}
		: {
				minimum: 0,
				maximum: 0,
				currency: 'EUR',
				approximate: false,
				temporary: true
			};
};
