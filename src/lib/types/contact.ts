import type { ProjectChoice } from './project';

export type ContactFormValues = {
	name: string;
	email: string;
	style: ProjectChoice | '';
	projectDescription: string;
	footageDetails: string;
	desiredDate: string;
	budget: string;
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
