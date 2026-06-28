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
		objective: 'Choisis l’objectif principal du projet.',
		providedFiles: 'Indique les fichiers que tu peux fournir.',
		finalDuration: 'Choisis la durée finale souhaitée.',
		editingLevel: 'Choisis un niveau de montage.',
		deadline: 'Choisis un délai souhaité.',
		projectDescription: 'Décris ton projet en au moins 20 caractères.'
	},
	estimateCta: {
		title: 'Tu veux préremplir ces infos ?',
		description:
			'Passe par l’estimation pour répondre une question à la fois et remplir automatiquement une partie du formulaire.',
		action: 'Préremplir avec l’estimation'
	},
	turnstilePending: 'La vérification anti-spam est en cours. Attends un instant puis réessaie.',
	turnstileDomainError:
		"La vérification anti-spam n'est pas autorisée sur ce domaine. Utilise l’adresse email de secours.",
	turnstileGenericError:
		'La vérification anti-spam ne répond pas. Recharge la page ou utilise l’adresse email de secours.',
	contextPrefix: 'Tu demandes un montage de type',
	contextReference: 'Projet de référence :',
	contextHint: 'Tu peux modifier ce choix dans le formulaire.',
	estimateContextTitle: 'Les informations de ton estimation ont été ajoutées.',
	estimateContextHint: 'Relis-les et complète ton adresse email avant d’envoyer la demande.',
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
		objective: 'Objectif principal',
		objectivePlaceholder: 'Choisis un objectif',
		providedFiles: 'Fichiers fournis',
		providedFilesPlaceholder: 'Choisis l’état des fichiers',
		footageDuration: 'Durée des rushs ou fichiers à regarder',
		footageDurationPlaceholder: 'Choisis une durée si tu la connais',
		finalDuration: 'Durée finale souhaitée',
		finalDurationPlaceholder: 'Choisis une durée finale',
		editingLevel: 'Niveau de montage',
		editingLevelPlaceholder: 'Choisis un niveau',
		deadline: 'Délai souhaité',
		deadlinePlaceholder: 'Choisis un délai',
		subtitles: 'Sous-titres',
		subtitlesPlaceholder: 'Choisis une option',
		projectDescription: 'Décris ton projet',
		projectDescriptionHelp: 'Indique le contenu, la plateforme visée et le résultat recherché.',
		footageDetails: 'Durée et volume des rushs',
		footageDetailsHelp:
			'Ajoute les précisions que les choix ci-dessus ne couvrent pas : nombre de fichiers, sources, timecodes, volume exact.',
		desiredDate: 'Date souhaitée',
		budget: 'Budget',
		budgetHelp: 'Indique le montant ou la fourchette que tu as en tête.',
		budgetPlaceholder: 'Ex. 150 €, 300 à 500 €, à définir',
		referenceLink: 'Lien de référence',
		referenceLinkHelp: 'Ajoute une vidéo, un post ou un dossier qui montre le style recherché.',
		specificRequests: 'Demandes spécifiques',
		constraints: 'Contraintes importantes',
		usefulLinks: 'Liens utiles'
	},
	options: {
		objective: [
			{ value: 'entertain', label: 'Divertir' },
			{ value: 'retention', label: 'Garder l’attention / maximiser la rétention' },
			{ value: 'promote', label: 'Promouvoir un produit / service' },
			{ value: 'explain', label: 'Expliquer un sujet' },
			{ value: 'highlight', label: 'Faire un best-of / highlight' },
			{ value: 'professional', label: 'Donner un rendu propre et professionnel' },
			{ value: 'other', label: 'Autre' }
		],
		providedFiles: [
			{ value: 'raw', label: 'Rushs bruts non dérushés' },
			{ value: 'derushed', label: 'Rushs déjà dérushés' },
			{ value: 'edited-project', label: 'Vidéo déjà montée + fichiers de projet' },
			{ value: 'editing-project', label: 'Projet de montage fourni' },
			{ value: 'script', label: 'Script' },
			{ value: 'voice-over', label: 'Voix off' },
			{ value: 'assets', label: 'Images / B-roll / assets' },
			{ value: 'multiple', label: 'Plusieurs types de fichiers' },
			{ value: 'none', label: 'Aucun de ces fichiers' },
			{ value: 'unknown', label: 'Je ne sais pas encore' }
		],
		footageDuration: [
			{ value: 'lt-15', label: 'Moins de 15 minutes' },
			{ value: '15-30', label: '15 à 30 minutes' },
			{ value: '30-60', label: '30 minutes à 1 heure' },
			{ value: '1-2', label: '1 à 2 heures' },
			{ value: '2-4', label: '2 à 4 heures' },
			{ value: 'gt-4', label: 'Plus de 4 heures' },
			{ value: 'unknown', label: 'Je ne sais pas encore' }
		],
		finalDuration: [
			{ value: 'lt-30s', label: 'Moins de 30 secondes' },
			{ value: '30-60s', label: '30 à 60 secondes' },
			{ value: '1-3m', label: '1 à 3 minutes' },
			{ value: '3-8m', label: '3 à 8 minutes' },
			{ value: '8-15m', label: '8 à 15 minutes' },
			{ value: '15-30m', label: '15 à 30 minutes' },
			{ value: 'gt-30m', label: 'Plus de 30 minutes' }
		],
		editingLevel: [
			{ value: 'simple', label: 'Simple : dérush, cuts, zooms, musique' },
			{
				value: 'advanced',
				label: 'Avancé : cuts, zooms progressifs, musique, sous-titres et quelques SFX'
			},
			{
				value: 'premium',
				label: 'Premium : montage avancé, motion design, transitions, effets et finition poussée'
			}
		],
		deadline: [
			{ value: 'not-urgent', label: 'Pas urgent' },
			{ value: '1-2-weeks', label: 'Une à deux semaines' },
			{ value: '3-5-days', label: '3 à 5 jours' },
			{ value: '24-48h', label: '24 à 48 h' },
			{ value: 'very-urgent', label: 'Très urgent' }
		],
		subtitles: [
			{ value: 'none', label: 'Non' },
			{ value: 'automatic', label: 'Oui, automatiques suffisent' },
			{ value: 'phrase', label: 'Oui, environ chaque moitié de phrase' },
			{ value: 'word', label: 'Oui, mot par mot' },
			{ value: 'unknown', label: 'À définir' }
		]
	}
};

export const contactBundle = {
	contactStyleOptions,
	contactFormCopy
} satisfies Pick<LocaleBundle, 'contactStyleOptions' | 'contactFormCopy'>;
