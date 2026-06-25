import type { Project, ProjectCategory, ProjectInput } from '$lib/types/project';
import { getPublishedVideo } from '$lib/utils/media';

const categoryDefaults: Record<ProjectCategory, Pick<Project, 'format' | 'platform'>> = {
	'gaming-long-form': {
		format: '16:9',
		platform: ['YouTube']
	},
	'gaming-short-form': {
		format: '9:16',
		platform: ['TikTok', 'Reels', 'Shorts']
	},
	'explainer-short-form': {
		format: '9:16',
		platform: ['TikTok', 'Reels', 'Shorts']
	},
	'business-promo': {
		format: '9:16',
		platform: ['Instagram', 'TikTok']
	}
};

const defineProject = (input: ProjectInput): Project => {
	const publishedVideo = getPublishedVideo(input.externalUrl);
	const defaults = categoryDefaults[input.category];

	return {
		...input,
		format: input.format ?? defaults.format,
		platform: input.platform ?? defaults.platform,
		poster: input.poster ?? publishedVideo?.poster ?? '',
		featured: input.featured ?? false
	};
};

export const projects: Project[] = [
	defineProject({
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
		duration: 'Long format',
		featured: true
	}),
	defineProject({
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
		duration: 'Court vertical',
		featured: true
	}),
	defineProject({
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
		duration: 'Court vertical',
		featured: true
	}),
	defineProject({
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
		duration: 'Court vertical',
		featured: true
	})
];

export const featuredProjects = projects.filter((project) => project.featured);
