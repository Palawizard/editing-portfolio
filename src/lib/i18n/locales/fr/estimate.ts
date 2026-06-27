import type { EstimateCopy, EstimateQuestion } from '$lib/types/estimate';

const questions: EstimateQuestion[] = [
	{
		id: 'name',
		section: 'Informations générales',
		title: 'Quel est ton nom ou ton pseudo ?',
		type: 'text',
		required: true,
		minLength: 2,
		autocomplete: 'name'
	},
	{
		id: 'contact',
		section: 'Informations générales',
		title: 'Quelle est ton adresse e-mail ou ton moyen de contact ?',
		help: 'Cette information reste dans ton navigateur tant que tu n’envoies pas le formulaire final.',
		placeholder: 'E-mail, Discord, Instagram…',
		type: 'text',
		required: true,
		minLength: 3,
		autocomplete: 'email'
	},
	{
		id: 'projectType',
		section: 'Informations générales',
		title: 'Quel est le type de projet ?',
		type: 'single',
		required: true,
		options: [
			{ value: 'gaming-long', label: 'Vidéo gaming format long' },
			{
				value: 'gaming-long-shorts',
				label: 'Vidéo gaming format long + shorts issus de la vidéo longue'
			},
			{ value: 'other-long', label: 'Vidéo autre format long' },
			{
				value: 'other-long-shorts',
				label: 'Vidéo autre format long + shorts issus de la vidéo longue'
			},
			{ value: 'gaming-clip', label: 'Shorts gaming type clip' },
			{ value: 'shorts-from-long', label: 'Shorts issus de vidéo longue' },
			{ value: 'explainer-shorts', label: 'Shorts rant / explicatifs' },
			{ value: 'ugc-shorts', label: 'Shorts UGC / promotionnels' },
			{
				value: 'scripted-rush-shorts',
				label: 'Shorts issus de plusieurs rushs découpés avec script'
			},
			{ value: 'other', label: 'Autre' }
		]
	},
	{
		id: 'objective',
		section: 'Informations générales',
		title: 'Quel est l’objectif principal du projet ?',
		type: 'single',
		required: true,
		options: [
			{ value: 'entertain', label: 'Divertir' },
			{ value: 'retention', label: 'Garder l’attention / maximiser la rétention' },
			{ value: 'promote', label: 'Promouvoir un produit / service' },
			{ value: 'explain', label: 'Expliquer un sujet' },
			{ value: 'highlight', label: 'Faire un best-of / highlight' },
			{ value: 'professional', label: 'Donner un rendu propre et professionnel' },
			{ value: 'other', label: 'Autre' }
		]
	},
	{
		id: 'providedFiles',
		section: 'État des fichiers fournis',
		title: 'Quels fichiers vas-tu fournir ?',
		help: 'Plusieurs réponses sont possibles.',
		type: 'multi',
		required: true,
		options: [
			{ value: 'raw', label: 'Rushs bruts non dérushés' },
			{ value: 'derushed', label: 'Rushs déjà dérushés' },
			{ value: 'edited-project', label: 'Vidéo déjà montée + fichiers de projet' },
			{ value: 'editing-project', label: 'Projet de montage fourni' },
			{ value: 'script', label: 'Script' },
			{ value: 'voice-over', label: 'Voix off' },
			{ value: 'assets', label: 'Images / B-roll / assets' },
			{ value: 'none', label: 'Aucun de ces fichiers' },
			{ value: 'unknown', label: 'Je ne sais pas encore' }
		]
	},
	{
		id: 'ugcAssets',
		section: 'État des fichiers fournis',
		title: 'Quels éléments sont déjà fournis pour les shorts UGC ou promotionnels ?',
		help: 'Plusieurs réponses sont possibles.',
		type: 'multi',
		required: true,
		options: [
			{ value: 'script', label: 'Script' },
			{ value: 'voice-over', label: 'Voix off' },
			{ value: 'facecam', label: 'Vidéo facecam' },
			{ value: 'product-images', label: 'Images produit' },
			{ value: 'b-roll', label: 'B-roll' },
			{ value: 'brand', label: 'Logo / charte graphique' },
			{ value: 'music', label: 'Musique souhaitée' },
			{ value: 'none', label: 'Aucun de ces éléments' },
			{ value: 'unknown', label: 'Je ne sais pas encore' }
		]
	},
	{
		id: 'structure',
		section: 'État des fichiers fournis',
		title: 'Y a-t-il un script ou une structure déjà prévue ?',
		type: 'single',
		required: true,
		options: [
			{ value: 'complete', label: 'Oui, script complet fourni' },
			{ value: 'idea', label: 'Oui, idée générale fournie' },
			{ value: 'none', label: 'Non, il faut construire la structure' },
			{ value: 'unnecessary', label: 'Pas nécessaire pour ce projet' }
		]
	},
	{
		id: 'footageDuration',
		section: 'Quantité de matière à traiter',
		title: 'Quelle est la durée totale des rushs ou fichiers à regarder ?',
		type: 'single',
		required: true,
		options: [
			{ value: 'lt-15', label: 'Moins de 15 minutes' },
			{ value: '15-30', label: '15 à 30 minutes' },
			{ value: '30-60', label: '30 minutes à 1 heure' },
			{ value: '1-2', label: '1 à 2 heures' },
			{ value: '2-4', label: '2 à 4 heures' },
			{ value: 'gt-4', label: 'Plus de 4 heures' },
			{ value: 'unknown', label: 'Je ne sais pas encore' }
		]
	},
	{
		id: 'finalDuration',
		section: 'Quantité de matière à traiter',
		title: 'Quelle est la durée souhaitée de la vidéo finale ?',
		type: 'single',
		required: true,
		options: [
			{ value: 'lt-30s', label: 'Moins de 30 secondes' },
			{ value: '30-60s', label: '30 à 60 secondes' },
			{ value: '1-3m', label: '1 à 3 minutes' },
			{ value: '3-8m', label: '3 à 8 minutes' },
			{ value: '8-15m', label: '8 à 15 minutes' },
			{ value: '15-30m', label: '15 à 30 minutes' },
			{ value: 'gt-30m', label: 'Plus de 30 minutes' }
		]
	},
	{
		id: 'shortsCount',
		section: 'Quantité de matière à traiter',
		title: 'Combien de shorts veux-tu ?',
		type: 'single',
		required: true,
		options: [
			{ value: '1', label: '1 short' },
			{ value: '2-3', label: '2 à 3 shorts' },
			{ value: '4-5', label: '4 à 5 shorts' },
			{ value: '6-10', label: '6 à 10 shorts' },
			{ value: 'gt-10', label: 'Plus de 10 shorts' },
			{ value: 'unknown', label: 'Je ne sais pas encore' }
		]
	},
	{
		id: 'shortDuration',
		section: 'Quantité de matière à traiter',
		title: 'Quelle durée moyenne souhaites-tu pour chaque short ?',
		type: 'single',
		required: true,
		options: [
			{ value: 'lt-30s', label: 'Moins de 30 secondes' },
			{ value: '30-60s', label: '30 à 60 secondes' },
			{ value: '1-3m', label: '1 à 3 minutes' },
			{ value: 'unknown', label: 'Je ne sais pas encore' }
		]
	},
	{
		id: 'sources',
		section: 'Quantité de matière à traiter',
		title: 'Combien de caméras, POV ou sources différentes ?',
		type: 'single',
		required: true,
		options: [
			{ value: '1', label: '1 seule source' },
			{ value: '2', label: '2 sources' },
			{ value: '3', label: '3 sources' },
			{ value: '4-plus', label: '4 sources ou plus' },
			{ value: 'unknown', label: 'Je ne sais pas' }
		]
	},
	{
		id: 'editingLevel',
		section: 'Style de montage souhaité',
		title: 'Quel niveau de montage veux-tu ?',
		type: 'single',
		required: true,
		options: [
			{ value: 'simple', label: 'Simple : dérush, cuts, zooms, musique' },
			{
				value: 'advanced',
				label: 'Avancé : cuts, zooms progressifs, musique, sous-titres et quelques SFX'
			},
			{
				value: 'premium',
				label: 'Premium : montage avancé, motion design, transitions, effets et finition poussée'
			}
		]
	},
	{
		id: 'styleReference',
		section: 'Style de montage souhaité',
		title: 'As-tu une référence de style ?',
		type: 'single',
		required: true,
		options: [
			{ value: 'example', label: 'Oui, je peux fournir une vidéo exemple' },
			{ value: 'proposal', label: 'Non, je veux que tu proposes un style' },
			{ value: 'idea', label: 'J’ai une idée mais pas de référence précise' }
		]
	},
	{
		id: 'referenceLink',
		section: 'Style de montage souhaité',
		title: 'Quel est le lien vers ta référence de style ?',
		placeholder: 'YouTube, TikTok, Drive…',
		type: 'text',
		required: true,
		minLength: 5
	},
	{
		id: 'specificRequests',
		section: 'Style de montage souhaité',
		title: 'As-tu des options ou demandes spécifiques pour le montage ?',
		help: 'Cette réponse est facultative.',
		placeholder: 'Effets, rythme, musique, éléments à éviter…',
		type: 'textarea',
		required: false
	},
	{
		id: 'subtitles',
		section: 'Sous-titres',
		title: 'Les sous-titres sont-ils nécessaires ?',
		type: 'single',
		required: true,
		options: [
			{ value: 'none', label: 'Non' },
			{ value: 'automatic', label: 'Oui, automatiques suffisent' },
			{ value: 'phrase', label: 'Oui, environ chaque moitié de phrase' },
			{ value: 'word', label: 'Oui, mot par mot' }
		]
	},
	{
		id: 'shortsSource',
		section: 'Questions spécifiques aux shorts',
		title: 'Les shorts viennent de quoi ?',
		type: 'single',
		required: true,
		options: [
			{ value: 'long-video', label: 'Une vidéo longue' },
			{ value: 'short-rushes', label: 'Plusieurs rushs courts' },
			{ value: 'long-rushes', label: 'Plusieurs rushs longs' },
			{ value: 'script-voice', label: 'Un script + voix off' },
			{ value: 'from-scratch', label: 'Une idée à construire de zéro' },
			{ value: 'editing-project', label: 'Un projet de montage fourni' }
		]
	},
	{
		id: 'moments',
		section: 'Questions spécifiques aux shorts',
		title: 'Les meilleurs moments sont-ils déjà indiqués ?',
		type: 'single',
		required: true,
		options: [
			{ value: 'precise', label: 'Oui, avec des timecodes précis' },
			{ value: 'approximate', label: 'Oui, mais approximativement' },
			{ value: 'find', label: 'Non, il faut les trouver' },
			{ value: 'unknown', label: 'Je ne sais pas encore' }
		]
	},
	{
		id: 'deadline',
		section: 'Délais',
		title: 'Quel est le délai souhaité ?',
		type: 'single',
		required: true,
		options: [
			{ value: 'not-urgent', label: 'Pas urgent' },
			{ value: '1-2-weeks', label: 'Une à deux semaines' },
			{ value: '3-5-days', label: '3 à 5 jours' },
			{ value: '24-48h', label: '24 à 48 h' },
			{ value: 'very-urgent', label: 'Très urgent' }
		]
	},
	{
		id: 'resolution',
		section: 'Livraison',
		title: 'Quelle est la résolution souhaitée ?',
		type: 'single',
		required: true,
		options: [
			{ value: '1080p', label: '1080p' },
			{ value: '1440p', label: '1440p' },
			{ value: '4k', label: '4K' },
			{ value: 'unknown', label: 'Je ne sais pas' }
		]
	},
	{
		id: 'projectFiles',
		section: 'Livraison',
		title: 'Souhaites-tu récupérer les fichiers de projet ?',
		type: 'single',
		required: true,
		options: [
			{ value: 'no', label: 'Non' },
			{ value: 'yes', label: 'Oui' }
		]
	},
	{
		id: 'projectDescription',
		section: 'Informations complémentaires',
		title: 'Décris rapidement ton projet',
		placeholder: 'Le contenu, la plateforme visée et le résultat attendu…',
		type: 'textarea',
		required: true,
		minLength: 20
	},
	{
		id: 'constraints',
		section: 'Informations complémentaires',
		title: 'Y a-t-il des contraintes importantes ?',
		help: 'Cette réponse est facultative.',
		placeholder: 'Éléments obligatoires, limites, droits, format précis…',
		type: 'textarea',
		required: false
	},
	{
		id: 'budgetPreference',
		section: 'Informations complémentaires',
		title: 'As-tu un budget ou une fourchette en tête ?',
		type: 'single',
		required: true,
		options: [
			{ value: 'yes', label: 'Oui' },
			{ value: 'no', label: 'Non' },
			{ value: 'estimate', label: 'Je préfère recevoir une estimation' }
		]
	},
	{
		id: 'budgetAmount',
		section: 'Informations complémentaires',
		title: 'Quel budget ou quelle fourchette as-tu en tête ?',
		placeholder: 'Ex. 80 €, 100 à 150 €…',
		type: 'text',
		required: true,
		minLength: 1
	}
];

export const estimateCopy: EstimateCopy = {
	metaTitle: 'Estimer le prix de ton montage | Palawi',
	metaDescription:
		'Réponds à quelques questions pour obtenir une fourchette indicative pour ton projet de montage vidéo.',
	eyebrow: 'Estimation de prix',
	title: 'Combien coûterait ton montage ?',
	description:
		'Une question à la fois pour évaluer le volume de travail et obtenir une fourchette réaliste.',
	privacy: 'Aucune réponse n’est envoyée pendant l’estimation. Tout reste dans ton navigateur.',
	progress: 'Question',
	previous: 'Retour',
	next: 'Continuer',
	showEstimate: 'Voir mon estimation',
	requiredError: 'Choisis ou saisis une réponse pour continuer.',
	minimumError: 'Ajoute un peu plus de détails pour continuer.',
	multiHint: 'Tu peux sélectionner plusieurs réponses.',
	contextualQuestions: {
		longFinalDuration: 'Quelle est la durée souhaitée de la vidéo longue finale ?',
		shortFinalDuration: 'Quelle durée moyenne souhaites-tu pour chaque short ?',
		longShortsCount: 'Combien de shorts veux-tu extraire de la vidéo longue ?',
		projectFootageDuration: 'Quelle est la durée du montage ou du projet à reprendre ?',
		voiceOverDuration: 'Quelle est la durée totale de la voix off à traiter ?',
		ugcFootageDuration: 'Quelle est la durée totale des éléments vidéo ou audio à traiter ?',
		gamingShortsSource: 'Sous quelle forme vas-tu fournir les extraits gaming ?',
		providedScriptStatus: 'Quel est l’état du script fourni ?',
		ugcProvidedFiles: 'Vas-tu fournir des rushs ou un projet de montage pour ce projet UGC ?',
		ugcProvidedFilesHelp:
			'Le script, la voix off et les éléments de marque sont demandés à l’étape suivante.'
	},
	result: {
		eyebrow: 'Estimation terminée',
		title: 'Fourchette estimée pour ce projet',
		priceLabel: 'Budget indicatif',
		disclaimer:
			'Cette fourchette n’est pas un devis. Le prix final sera confirmé après vérification des fichiers, des demandes précises et du nombre de retours.',
		hoursLabel: 'Charge estimée',
		confidenceLabel: 'Précision',
		confidence: {
			low: 'bonne',
			medium: 'moyenne',
			high: 'à préciser'
		},
		driversTitle: 'Ce qui influence le plus cette estimation',
		drivers: {
			footage: 'Le volume de rushs à regarder',
			output: 'La durée et le volume à livrer',
			'editing-level': 'Le niveau de finition demandé',
			'shorts-volume': 'Le nombre de shorts',
			subtitles: 'Le niveau de sous-titrage',
			sources: 'Le nombre de sources à synchroniser',
			structure: 'La structure à construire',
			deadline: 'Le délai de livraison',
			resolution: 'La résolution de livraison',
			'project-files': 'La remise des fichiers de projet'
		},
		prefill: 'Pré-remplir ma demande',
		restart: 'Recommencer',
		answersKept:
			'Tes réponses seront copiées dans le formulaire. Tu pourras les vérifier avant de l’envoyer.'
	},
	questions
};
