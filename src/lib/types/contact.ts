import type { ProjectChoice } from './project';

export type ContactFormValues = {
	name: string;
	email: string;
	style: ProjectChoice | '';
	objective: string;
	providedFiles: string;
	finalDuration: string;
	footageDuration: string;
	editingLevel: string;
	deadline: string;
	subtitles: string;
	projectDescription: string;
	footageDetails: string;
	desiredDate: string;
	budget: string;
	referenceLink: string;
	specificRequests: string;
	constraints: string;
	usefulLinks: string;
	projectSlug: string;
};

export type ContactFormField = keyof Pick<
	ContactFormValues,
	| 'name'
	| 'email'
	| 'style'
	| 'objective'
	| 'providedFiles'
	| 'finalDuration'
	| 'editingLevel'
	| 'deadline'
	| 'projectDescription'
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
