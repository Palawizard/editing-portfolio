import { editingFormats } from '$lib/content/formats';
import type { ContactFormValues, ContactOption } from '$lib/types/contact';
import type { ProjectChoice } from '$lib/types/project';
import type { ContactHref } from '$lib/types/site';

export const contactStyleOptions: ContactOption<ProjectChoice>[] = [
	...editingFormats.map((format) => ({
		value: format.id,
		label: format.title
	})),
	{
		value: 'custom',
		label: 'Commande personnalisée'
	}
];

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

export const contactFormCopy = {
	eyebrow: 'Ta demande',
	title: 'Présente ton projet en quelques minutes',
	description:
		'Les informations essentielles suffisent pour comprendre le format, le volume et la direction recherchée.',
	submitLabel: 'Envoyer la demande',
	submittingLabel: 'Envoi en cours…',
	successTitle: 'Demande envoyée.',
	successDescription: 'Je vais examiner ton projet et te répondre par email.',
	errorTitle: "La demande n'a pas pu être envoyée.",
	errorDescription: 'Vérifie ta connexion puis réessaie. Les informations saisies sont conservées.',
	privacy: 'Les informations envoyées servent uniquement à répondre à ta demande de montage.',
	linksHelp:
		'Ajoute des liens Drive, Dropbox, WeTransfer ou des références publiques. Ne joins pas de fichiers privés directement.',
	unavailable:
		'Le formulaire ne peut pas envoyer la demande pour le moment. Utilise l’adresse email de secours.'
} as const;

export const getContactStyleLabel = (style: ProjectChoice | '') =>
	contactStyleOptions.find((option) => option.value === style)?.label ?? '';

export const getContactStyleHref = (style: ProjectChoice): ContactHref => `/contact?style=${style}`;

export const getContactProjectHref = (projectSlug: string): ContactHref =>
	`/contact?project=${encodeURIComponent(projectSlug)}`;
