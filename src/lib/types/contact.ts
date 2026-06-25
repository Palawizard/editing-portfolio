import type { ProjectChoice } from './project';

export type ContactBudget = 'under-100' | '100-250' | '250-500' | 'over-500' | 'unknown';

export type ContactFormValues = {
	name: string;
	email: string;
	style: ProjectChoice | '';
	projectDescription: string;
	footageDetails: string;
	desiredDate: string;
	budget: ContactBudget | '';
	usefulLinks: string;
	projectSlug: string;
};

export type ContactFormField = keyof Pick<
	ContactFormValues,
	'name' | 'email' | 'style' | 'projectDescription'
>;

export type ContactFormErrors = Partial<Record<ContactFormField, string>>;

export type ContactOption<T extends string> = {
	value: T;
	label: string;
};

export type ContactRequestContext = {
	style?: ProjectChoice;
	projectSlug?: string;
	projectTitle?: string;
};
