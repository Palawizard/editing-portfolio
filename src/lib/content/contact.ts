import { getContent } from '$lib/i18n/content';
import type { Locale } from '$lib/i18n/types';
import type { ContactFormValues } from '$lib/types/contact';
import type { ProjectChoice } from '$lib/types/project';
import type { ContactHref } from '$lib/types/site';

export { contactBundle } from '$lib/i18n/locales/fr/contact';

export const contactStyleOptions = getContent('fr').contactStyleOptions;

export const emptyContactFormValues: ContactFormValues = {
	name: '',
	email: '',
	style: '',
	projectDescription: '',
	footageDetails: '',
	desiredDate: '',
	budget: '',
	usefulLinks: '',
	projectSlug: ''
};

export const contactFormCopy = getContent('fr').contactFormCopy;

export const getContactStyleLabel = (style: ProjectChoice | '', locale: Locale = 'fr') =>
	getContent(locale).contactStyleOptions.find((option) => option.value === style)?.label ?? '';

export const getContactStyleHref = (style: ProjectChoice): ContactHref => `/contact?style=${style}`;

export const getContactProjectHref = (projectSlug: string): ContactHref =>
	`/contact?project=${encodeURIComponent(projectSlug)}`;
