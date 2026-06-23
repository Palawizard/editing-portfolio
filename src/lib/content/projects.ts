import type { Project } from '$lib/types/project';

export const projects: Project[] = [
	{
		slug: 'gaming-long-format-session',
		title: 'Session gaming long format',
		category: 'gaming-long-form',
		summary: 'Une session longue transformée en vidéo structurée et plus fluide à suivre.',
		objective:
			'Garder les moments forts et retirer les temps morts sans casser le ton du gameplay.',
		result:
			'Une vidéo pensée pour YouTube, avec une progression plus claire et une ambiance de partie conservée.',
		work: [
			'Tri des séquences utiles',
			'Suppression des temps morts',
			'Cuts de rythme',
			'Sous-titres ponctuels',
			'Sound design léger'
		],
		platform: ['YouTube'],
		format: '16:9',
		duration: 'Long format',
		poster: '/images/posters/gaming-long-format-poster.webp',
		featured: true
	},
	{
		slug: 'gaming-short-highlight',
		title: 'Highlight gaming vertical',
		category: 'gaming-short-form',
		summary: 'Un moment fort transformé en clip court pour les réseaux.',
		objective: 'Créer un extrait rapide, lisible et accrocheur dès les premières secondes.',
		result:
			'Un clip vertical court, facile à comprendre sans contexte et adapté à une publication rapide.',
		work: [
			'Hook rapide',
			'Recadrage vertical',
			'Zooms ciblés',
			'Sous-titres dynamiques',
			'Impacts sonores légers'
		],
		platform: ['TikTok', 'Reels', 'Shorts'],
		format: '9:16',
		duration: 'Court vertical',
		poster: '/images/posters/gaming-short-form-poster.webp',
		featured: true
	},
	{
		slug: 'explainer-short-edit',
		title: 'Vidéo explicative illustrée',
		category: 'explainer-short-form',
		summary: 'Un propos parlé renforcé par des visuels et un rythme plus clair.',
		objective: 'Rendre une idée plus facile à suivre avec des appuis visuels utiles.',
		result:
			'Une vidéo courte qui accompagne la parole avec des visuels utiles sans surcharger le message.',
		work: [
			'Rythme de parole',
			"Images d'appui",
			"Textes à l'écran",
			'Transitions discrètes',
			'Clarification du message'
		],
		platform: ['TikTok', 'Reels'],
		format: '9:16',
		duration: 'Court vertical',
		poster: '/images/posters/explainer-rant-thumbnail.webp',
		featured: true
	},
	{
		slug: 'business-promo-short',
		title: 'Présentation business courte',
		category: 'business-promo',
		summary: 'Une vidéo courte pour présenter clairement une activité ou un service.',
		objective: "Mettre en valeur une offre avec un message simple et un appel à l'action clair.",
		result: 'Un format court et propre, pensé pour présenter une activité sur les réseaux sociaux.',
		work: [
			'Sélection des plans',
			"Texte à l'écran",
			'Rythme court',
			"Appel à l'action",
			'Export réseaux sociaux'
		],
		platform: ['Instagram', 'TikTok'],
		format: '9:16',
		duration: 'Court vertical',
		poster: '/images/posters/business-promo-restaurant-preview.webp',
		featured: true
	}
];

export const featuredProjects = projects.filter((project) => project.featured);
