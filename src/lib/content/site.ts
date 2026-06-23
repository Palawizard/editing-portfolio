import type { CallToAction, NavigationLink, SiteMetadata } from '$lib/types/site';

export const siteMetadata: SiteMetadata = {
	name: 'Portfolio montage vidéo',
	title: 'Montage vidéo pour créateurs, streamers et businesses',
	description:
		'Je transforme des rushs, idées ou vidéos longues en contenus clairs, rythmés et prêts à publier.',
	locale: 'fr-FR'
};

export const navigationLinks: NavigationLink[] = [
	{ label: 'Accueil', href: '/' },
	{ label: 'Formats', href: '/#formats' },
	{ label: 'Projets', href: '/projets' },
	{ label: 'Contact', href: '/contact' }
];

export const heroBadges = ['YouTube', 'TikTok', 'Reels', 'Shorts', 'Gaming', 'Promo', 'Explicatif'];

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
