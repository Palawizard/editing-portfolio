import { editingFormats } from '$lib/i18n/locales/en/formats';
import type { ContactOption } from '$lib/types/contact';
import type { ProjectChoice } from '$lib/types/project';
import type { LocaleBundle } from '$lib/i18n/locales/types';

export const contactStyleOptions: ContactOption<ProjectChoice>[] = [
	...editingFormats.map((format) => ({
		value: format.id,
		label: format.title
	})),
	{
		value: 'custom',
		label: 'Custom request'
	}
];

export const contactFormCopy = {
	eyebrow: 'Your request',
	title: 'Tell me about your project in a few minutes',
	description:
		'The essentials are enough to understand the format, scope and direction you are looking for.',
	submitLabel: 'Send request',
	submittingLabel: 'Sending…',
	successTitle: 'Request sent.',
	successDescription: 'I will review your project and reply by email.',
	errorTitle: 'Your request could not be sent.',
	errorDescription: 'Check your connection and try again. Your entries have been kept.',
	privacy: 'The information you send is only used to reply to your editing request.',
	linksHelp:
		'Add Drive, Dropbox, WeTransfer links or public references. Do not attach private files directly.',
	unavailable: 'The form cannot send your request right now. Use the fallback email address.',
	subjectTemplate: 'New editing request from {{ name }}',
	validation: {
		name: 'Enter a name or username.',
		email: 'Enter a valid email address.',
		style: 'Choose an editing type.',
		projectDescription: 'Describe your project in at least 20 characters.'
	},
	turnstilePending: 'Spam verification is still loading. Wait a moment and try again.',
	turnstileDomainError:
		'Spam verification is not allowed on this domain. Use the fallback email address.',
	turnstileGenericError:
		'Spam verification is not responding. Reload the page or use the fallback email address.',
	contextPrefix: 'You are requesting an edit in the',
	contextReference: 'Reference project:',
	contextHint: 'You can change this choice in the form.',
	successFields: {
		contact: 'Contact',
		email: 'Email',
		style: 'Editing type',
		referenceProject: 'Reference project',
		budget: 'Budget'
	},
	viewProjects: 'View projects',
	sendAnother: 'Send another request',
	honeypotLabel: 'Do not fill in this field',
	emailFallbackLead: 'Having trouble with the form?',
	emailFallbackAction: 'Email instead',
	fields: {
		name: 'Name or username',
		email: 'Email',
		style: 'Editing type',
		stylePlaceholder: 'Choose an editing type',
		projectDescription: 'Describe your project',
		projectDescriptionHelp: 'Include the content, target platform and result you want.',
		footageDetails: 'Footage length and volume',
		footageDetailsHelp: 'For example: 2 hours of footage for a 10-minute final video.',
		desiredDate: 'Desired date',
		budget: 'Budget',
		budgetHelp: 'Share the amount or range you have in mind.',
		budgetPlaceholder: 'E.g. $150, $300 to $500, to be defined',
		usefulLinks: 'Useful links'
	}
};

export const contactBundle = {
	contactStyleOptions,
	contactFormCopy
} satisfies Pick<LocaleBundle, 'contactStyleOptions' | 'contactFormCopy'>;
