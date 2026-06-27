import type { Locale } from '$lib/i18n/types';
import type { Project, ProjectPricing } from '$lib/types/project';

export const formatCurrencyAmount = (
	amount: number,
	currency: ProjectPricing['currency'],
	locale: Locale
): string => {
	const formattedAmount = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-GB', {
		maximumFractionDigits: 0
	}).format(amount);

	return locale === 'fr'
		? `${formattedAmount} ${currency === 'EUR' ? '€' : currency}`
		: `€${formattedAmount}`;
};

export const formatProjectPrice = (pricing: ProjectPricing, locale: Locale): string => {
	const minimum = formatCurrencyAmount(pricing.minimum, pricing.currency, locale);
	const formattedPrice =
		pricing.minimum === pricing.maximum
			? minimum
			: locale === 'fr'
				? `${new Intl.NumberFormat('fr-FR').format(pricing.minimum)}–${new Intl.NumberFormat('fr-FR').format(pricing.maximum)} €`
				: `€${new Intl.NumberFormat('en-GB').format(pricing.minimum)}–${new Intl.NumberFormat('en-GB').format(pricing.maximum)}`;

	return pricing.approximate ? `≈ ${formattedPrice}` : formattedPrice;
};

export const sortProjectsByPrice = <T extends Pick<Project, 'pricing'>>(
	projects: readonly T[]
): T[] =>
	projects
		.map((project, index) => ({ project, index }))
		.sort(
			(left, right) =>
				left.project.pricing.minimum - right.project.pricing.minimum || left.index - right.index
		)
		.map(({ project }) => project);
