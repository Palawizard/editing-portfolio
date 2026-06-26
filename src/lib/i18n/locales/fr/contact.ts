import { editingFormats } from '$lib/i18n/locales/fr/formats';
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
		label: 'Commande personnalisée'
	}
];

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
		'Le formulaire ne peut pas envoyer la demande pour le moment. Utilise l’adresse email de secours.',
	subjectTemplate: 'Nouvelle demande de montage de {{ name }}',
	validation: {
		name: 'Indique un nom ou un pseudo.',
		email: 'Indique une adresse email valide.',
		style: 'Choisis un type de montage.',
		projectDescription: 'Décris ton projet en au moins 20 caractères.'
	},
	turnstilePending: 'La vérification anti-spam est en cours. Attends un instant puis réessaie.',
	turnstileDomainError:
		"La vérification anti-spam n'est pas autorisée sur ce domaine. Utilise l’adresse email de secours.",
	turnstileGenericError:
		'La vérification anti-spam ne répond pas. Recharge la page ou utilise l’adresse email de secours.',
	contextPrefix: 'Tu demandes un montage de type',
	contextReference: 'Projet de référence :',
	contextHint: 'Tu peux modifier ce choix dans le formulaire.',
	successFields: {
		contact: 'Contact',
		email: 'Email',
		style: 'Type de montage',
		referenceProject: 'Projet de référence',
		budget: 'Budget'
	},
	viewProjects: 'Voir les projets',
	sendAnother: 'Envoyer une autre demande',
	honeypotLabel: 'Ne pas remplir ce champ',
	emailFallbackLead: 'Une difficulté avec le formulaire ?',
	emailFallbackAction: 'Écrire par email',
	fields: {
		name: 'Nom ou pseudo',
		email: 'Email',
		style: 'Type de montage',
		stylePlaceholder: 'Choisis un type de montage',
		projectDescription: 'Décris ton projet',
		projectDescriptionHelp: 'Indique le contenu, la plateforme visée et le résultat recherché.',
		footageDetails: 'Durée et volume des rushs',
		footageDetailsHelp: 'Par exemple : 2 heures de rushs pour une vidéo finale de 10 minutes.',
		desiredDate: 'Date souhaitée',
		budget: 'Budget',
		budgetHelp: 'Indique le montant ou la fourchette que tu as en tête.',
		budgetPlaceholder: 'Ex. 150 €, 300 à 500 €, à définir',
		usefulLinks: 'Liens utiles'
	}
};

export const contactBundle = {
	contactStyleOptions,
	contactFormCopy
} satisfies Pick<LocaleBundle, 'contactStyleOptions' | 'contactFormCopy'>;
