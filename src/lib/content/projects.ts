import type { Project } from '$lib/types/project';

export const projects: Project[] = [
	{
		slug: 'gaming-long-format-session',
		title: 'Session gaming rythmée',
		category: 'gaming-long-form',
		summary: 'Une session longue structurée en vidéo plus fluide à regarder.',
		objective:
			'Garder les moments forts et retirer les temps morts sans casser le ton du gameplay.',
		work: [
			'Tri des séquences utiles',
			'Cuts et rythme',
			'Sous-titres ponctuels',
			'Sound design léger'
		],
		platform: ['YouTube'],
		format: '16:9',
		poster: '/images/posters/gaming-long-format-poster.webp',
		featured: true
	},
	{
		slug: 'gaming-short-highlight',
		title: 'Highlight gaming vertical',
		category: 'gaming-short-form',
		summary: 'Un moment fort transformé en clip court pour les réseaux.',
		objective: 'Créer un extrait rapide, lisible et accrocheur dès les premières secondes.',
		work: ['Hook rapide', 'Format vertical', 'Zooms ciblés', 'Sous-titres dynamiques'],
		platform: ['TikTok', 'Reels', 'Shorts'],
		format: '9:16',
		poster: '/images/posters/gaming-short-form-poster.webp',
		featured: true
	},
	{
		slug: 'explainer-short-edit',
		title: 'Vidéo explicative illustrée',
		category: 'explainer-short-form',
		summary: 'Un propos parlé renforcé par des visuels et un rythme plus clair.',
		objective: 'Rendre une idée plus facile à suivre avec des appuis visuels utiles.',
		work: ['Rythme de parole', "Images d'appui", "Textes à l'écran", 'Transitions discrètes'],
		platform: ['TikTok', 'Reels'],
		format: '9:16',
		poster: '/images/posters/explainer-rant-thumbnail.webp',
		featured: true
	},
	{
		slug: 'business-promo-short',
		title: 'Présentation business courte',
		category: 'business-promo',
		summary: 'Une vidéo courte pour présenter clairement une activité ou un service.',
		objective: "Mettre en valeur une offre avec un message simple et un appel à l'action clair.",
		work: ['Sélection des plans', 'Texte à l’écran', 'Rythme court', 'Export réseaux sociaux'],
		platform: ['Instagram', 'TikTok'],
		format: '9:16',
		poster: '/images/posters/business-promo-restaurant-preview.webp',
		featured: true
	}
];

export const featuredProjects = projects.filter((project) => project.featured);
