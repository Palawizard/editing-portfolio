import type { EditingFormat, ProjectCategory } from '$lib/types/project';

export const projectCategoryLabels: Record<ProjectCategory, string> = {
	'gaming-long-form': 'Gaming long format',
	'gaming-short-form': 'Shorts gaming',
	'explainer-short-form': 'Rant et explicatif',
	'business-promo': 'Promo business'
};

export const editingFormats: EditingFormat[] = [
	{
		id: 'gaming-long-form',
		title: 'Vidéos gaming longues',
		promise: 'Des sessions longues transformées en vidéos rythmées.',
		description:
			"Je garde les meilleurs moments, retire les temps morts et construis un montage fluide sans perdre l'ambiance du gameplay.",
		highlights: [
			'Tri des rushs',
			'Rythme et cuts',
			'Moments forts',
			'Sound design léger',
			'Structure de vidéo'
		]
	},
	{
		id: 'gaming-short-form',
		title: 'Shorts gaming',
		promise: 'Les meilleurs moments adaptés aux formats courts.',
		description:
			"Je transforme des extraits de vidéos longues ou de sessions en clips courts, lisibles et pensés pour retenir l'attention.",
		highlights: [
			'Hook rapide',
			'Sous-titres dynamiques',
			'Zooms et impacts',
			'Format vertical',
			'Rythme serré'
		]
	},
	{
		id: 'explainer-short-form',
		title: 'Rant et explicatif',
		promise: 'Des idées rendues plus claires avec du rythme et des visuels.',
		description:
			"J'accompagne la parole avec des images, textes, extraits et effets utiles pour rendre le propos plus vivant.",
		highlights: [
			'Illustrations visuelles',
			'Sous-titres',
			'Rythme de parole',
			"Images d'appui",
			'Clarté du message'
		]
	},
	{
		id: 'business-promo',
		title: 'Promo business',
		promise: 'Des vidéos courtes pour présenter une activité ou un service.',
		description:
			'Je crée des contenus courts et propres pour aider un commerce, une marque ou un indépendant à présenter son offre.',
		highlights: [
			'Présentation claire',
			'Mise en valeur',
			"Texte à l'écran",
			"Appel à l'action",
			'Format réseaux sociaux'
		]
	}
];
