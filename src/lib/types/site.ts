import type { ProjectChoice } from './project';

export type ContactHref =
	| '/contact'
	| `/contact?style=${ProjectChoice}`
	| `/contact?project=${string}`;

export type InternalHref =
	| '/'
	| '/#formats'
	| '/projets'
	| '/demarrer'
	| '/estimation'
	| ContactHref;

export type NavigationLink = {
	label: string;
	href: InternalHref;
};

export type CallToAction = {
	label: string;
	href: InternalHref;
	variant: 'primary' | 'secondary';
};

export type SiteMetadata = {
	name: string;
	title: string;
	description: string;
	image: string;
	locale: 'fr-FR' | 'en-US';
};

export type ProcessStep = {
	title: string;
	description: string;
};
