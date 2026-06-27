import type { ProcessStep } from '$lib/types/site';

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
	'Adaptation TikTok, Reels et Shorts',
	'Exports optimisés'
];

export const tools = [
	{
		name: 'DaVinci Resolve Studio',
		note: 'Montage principal, étalonnage et exports finaux'
	}
];

export const servicesBundle = {
	processSteps,
	skills,
	tools
};
