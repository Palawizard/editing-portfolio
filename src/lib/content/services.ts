import type { BeforeAfterSection, ProcessStep, Service } from '$lib/types/site';

export const services: Service[] = [
	{
		category: 'gaming-long-form',
		title: 'Montage long format',
		description: 'Transformer des rushs longs en vidéo structurée, fluide et agréable à suivre.'
	},
	{
		category: 'gaming-short-form',
		title: 'Montage vertical court',
		description: 'Créer des extraits rapides, sous-titrés et adaptés aux plateformes courtes.'
	},
	{
		category: 'explainer-short-form',
		title: 'Montage explicatif',
		description: 'Rendre une idée plus claire avec des visuels, du rythme et une narration lisible.'
	},
	{
		category: 'business-promo',
		title: 'Contenu promo',
		description: 'Présenter une activité, une offre ou un service dans un format court et propre.'
	}
];

export const processSteps: ProcessStep[] = [
	{
		title: 'Brief',
		description: "On définit le style, le format, la plateforme et l'objectif de la vidéo."
	},
	{
		title: 'Montage',
		description:
			'Je trie les rushs, construis le rythme et ajoute les textes, sons ou visuels nécessaires.'
	},
	{
		title: 'Retours',
		description: 'Tu peux demander des ajustements pour coller au rendu voulu.'
	},
	{
		title: 'Livraison',
		description: 'La vidéo est exportée au bon format, prête à être publiée.'
	}
];

export const skills = [
	'Montage long format',
	'Montage vertical court',
	'Sous-titres dynamiques',
	'Sound design',
	'Transitions',
	'Illustrations visuelles',
	'Storytelling',
	'Adaptation TikTok, Reels et Shorts',
	'Exports optimisés'
];

export const tools = ['DaVinci Resolve Studio'];

export const beforeAfterSection: BeforeAfterSection = {
	enabled: false,
	title: 'Avant / après',
	description: 'Comparaison disponible quand des extraits bruts et montés propres sont prêts.'
};
