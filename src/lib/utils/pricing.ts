import type { Locale } from '$lib/i18n/types';
import type { Project, ProjectPricing } from '$lib/types/project';

export const formatProjectPrice = (pricing: ProjectPricing, locale: Locale): string => {
	const formattedAmount = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-GB', {
		style: 'currency',
		currency: pricing.currency,
		maximumFractionDigits: 0
	}).format(pricing.amount);

	return pricing.approximate ? `≈ ${formattedAmount}` : formattedAmount;
};

export const sortProjectsByPrice = <T extends Pick<Project, 'pricing'>>(
	projects: readonly T[]
): T[] =>
	projects
		.map((project, index) => ({ project, index }))
		.sort(
			(left, right) =>
				left.project.pricing.amount - right.project.pricing.amount || left.index - right.index
		)
		.map(({ project }) => project);
