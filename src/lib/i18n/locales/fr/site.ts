import type { CallToAction, NavigationLink, SiteMetadata } from '$lib/types/site';

export const siteMetadata: SiteMetadata = {
	name: 'Palawi - Portfolio montage vidéo',
	title: 'Palawi - Montage vidéo pour créateurs, streamers et businesses',
	description:
		'Portfolio de Palawi, monteur vidéo. Je transforme des rushs, idées ou vidéos longues en contenus clairs, rythmés et prêts à publier.',
	image: '/images/brand/pfp.jpg',
	locale: 'fr-FR'
};

export const navigationLinks: NavigationLink[] = [
	{ label: 'Accueil', href: '/' },
	{ label: 'Projets', href: '/projets' },
	{ label: 'Contact', href: '/contact' }
];

export const heroActions: CallToAction[] = [
	{ label: 'Voir mes montages', href: '/projets', variant: 'primary' },
	{ label: 'Me contacter', href: '/contact', variant: 'secondary' }
];

export const contactCopy = {
	title: 'Parlons de ton prochain montage',
	description:
		'Envoie-moi le format souhaité, quelques références et les rushs disponibles. Je te répondrai avec une direction claire pour le montage.',
	actionLabel: 'Me contacter'
};

export const siteBundle = {
	siteMetadata,
	navigationLinks,
	heroActions,
	contactCopy
};
