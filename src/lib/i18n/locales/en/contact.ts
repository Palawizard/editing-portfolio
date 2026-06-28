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
		objective: 'Choose the main goal of the project.',
		providedFiles: 'Tell me which files you can provide.',
		finalDuration: 'Choose the target final length.',
		editingLevel: 'Choose an editing level.',
		deadline: 'Choose the desired deadline.',
		projectDescription: 'Describe your project in at least 20 characters.'
	},
	estimateCta: {
		title: 'Want to pre-fill these details?',
		description:
			'Use the estimator to answer one question at a time and automatically fill part of this form.',
		action: 'Pre-fill with the estimator'
	},
	turnstilePending: 'Spam verification is still loading. Wait a moment and try again.',
	turnstileDomainError:
		'Spam verification is not allowed on this domain. Use the fallback email address.',
	turnstileGenericError:
		'Spam verification is not responding. Reload the page or use the fallback email address.',
	contextPrefix: 'You are requesting an edit in the',
	contextReference: 'Reference project:',
	contextHint: 'You can change this choice in the form.',
	estimateContextTitle: 'The details from your estimate have been added.',
	estimateContextHint: 'Review them and complete your email address before sending the request.',
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
		objective: 'Main goal',
		objectivePlaceholder: 'Choose a goal',
		providedFiles: 'Files provided',
		providedFilesPlaceholder: 'Choose the file status',
		footageDuration: 'Length of footage or files to review',
		footageDurationPlaceholder: 'Choose a length if you know it',
		finalDuration: 'Target final length',
		finalDurationPlaceholder: 'Choose a final length',
		editingLevel: 'Editing level',
		editingLevelPlaceholder: 'Choose a level',
		deadline: 'Desired deadline',
		deadlinePlaceholder: 'Choose a deadline',
		subtitles: 'Subtitles',
		subtitlesPlaceholder: 'Choose an option',
		projectDescription: 'Describe your project',
		projectDescriptionHelp: 'Include the content, target platform and result you want.',
		footageDetails: 'Footage length and volume',
		footageDetailsHelp:
			'Add anything the choices above do not cover: file count, sources, timecodes or exact volume.',
		desiredDate: 'Desired date',
		budget: 'Budget',
		budgetHelp: 'Share the amount or range you have in mind.',
		budgetPlaceholder: 'E.g. $150, $300 to $500, to be defined',
		referenceLink: 'Reference link',
		referenceLinkHelp: 'Add a video, post or folder that shows the style you want.',
		specificRequests: 'Specific requests',
		constraints: 'Important constraints',
		usefulLinks: 'Useful links'
	},
	options: {
		objective: [
			{ value: 'entertain', label: 'Entertain' },
			{ value: 'retention', label: 'Hold attention / maximize retention' },
			{ value: 'promote', label: 'Promote a product / service' },
			{ value: 'explain', label: 'Explain a topic' },
			{ value: 'highlight', label: 'Create a best-of / highlight' },
			{ value: 'professional', label: 'Create a clean, professional result' },
			{ value: 'other', label: 'Other' }
		],
		providedFiles: [
			{ value: 'raw', label: 'Unsorted raw footage' },
			{ value: 'derushed', label: 'Pre-selected footage' },
			{ value: 'edited-project', label: 'Edited video + project files' },
			{ value: 'editing-project', label: 'Editing project provided' },
			{ value: 'script', label: 'Script' },
			{ value: 'voice-over', label: 'Voice-over' },
			{ value: 'assets', label: 'Images / B-roll / assets' },
			{ value: 'multiple', label: 'Several file types' },
			{ value: 'none', label: 'None of these files' },
			{ value: 'unknown', label: 'I do not know yet' }
		],
		footageDuration: [
			{ value: 'lt-15', label: 'Less than 15 minutes' },
			{ value: '15-30', label: '15 to 30 minutes' },
			{ value: '30-60', label: '30 minutes to 1 hour' },
			{ value: '1-2', label: '1 to 2 hours' },
			{ value: '2-4', label: '2 to 4 hours' },
			{ value: 'gt-4', label: 'More than 4 hours' },
			{ value: 'unknown', label: 'I do not know yet' }
		],
		finalDuration: [
			{ value: 'lt-30s', label: 'Less than 30 seconds' },
			{ value: '30-60s', label: '30 to 60 seconds' },
			{ value: '1-3m', label: '1 to 3 minutes' },
			{ value: '3-8m', label: '3 to 8 minutes' },
			{ value: '8-15m', label: '8 to 15 minutes' },
			{ value: '15-30m', label: '15 to 30 minutes' },
			{ value: 'gt-30m', label: 'More than 30 minutes' }
		],
		editingLevel: [
			{ value: 'simple', label: 'Simple: footage selection, cuts, zooms and music' },
			{
				value: 'advanced',
				label: 'Advanced: progressive zooms, music, subtitles and some SFX'
			},
			{
				value: 'premium',
				label: 'Premium: advanced edit, motion design, transitions, effects and detailed finish'
			}
		],
		deadline: [
			{ value: 'not-urgent', label: 'Not urgent' },
			{ value: '1-2-weeks', label: 'One to two weeks' },
			{ value: '3-5-days', label: '3 to 5 days' },
			{ value: '24-48h', label: '24 to 48 hours' },
			{ value: 'very-urgent', label: 'Very urgent' }
		],
		subtitles: [
			{ value: 'none', label: 'No' },
			{ value: 'automatic', label: 'Yes, automatic subtitles are enough' },
			{ value: 'phrase', label: 'Yes, roughly every half-sentence' },
			{ value: 'word', label: 'Yes, word by word' },
			{ value: 'unknown', label: 'To be defined' }
		]
	}
};

export const contactBundle = {
	contactStyleOptions,
	contactFormCopy
} satisfies Pick<LocaleBundle, 'contactStyleOptions' | 'contactFormCopy'>;
