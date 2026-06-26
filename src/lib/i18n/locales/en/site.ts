import type { CallToAction, NavigationLink, SiteMetadata } from '$lib/types/site';

export const siteMetadata: SiteMetadata = {
	name: 'Palawi - Video editing portfolio',
	title: 'Palawi - Video editing for creators, streamers and businesses',
	description:
		"Palawi's video editing portfolio. I turn raw footage, ideas or long videos into clear, well-paced content ready to publish.",
	image: '/images/brand/pfp.jpg',
	locale: 'en-US'
};

export const navigationLinks: NavigationLink[] = [
	{ label: 'Home', href: '/' },
	{ label: 'Projects', href: '/projets' },
	{ label: 'Contact', href: '/contact' }
];

export const heroActions: CallToAction[] = [
	{ label: 'View my edits', href: '/projets', variant: 'primary' },
	{ label: 'Get in touch', href: '/contact', variant: 'secondary' }
];

export const contactCopy = {
	title: "Let's talk about your next edit",
	description:
		'Send me the format you want, a few references and the footage you have. I will reply with a clear direction for the edit.',
	actionLabel: 'Get in touch'
};

export const siteBundle = {
	siteMetadata,
	navigationLinks,
	heroActions,
	contactCopy
};
