import type { ProjectCategory, ProjectChoice } from './project';

export type ContactHref =
	| '/contact'
	| `/contact?style=${ProjectChoice}`
	| `/contact?project=${string}`;

export type InternalHref = '/' | '/#formats' | '/projets' | ContactHref;

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
	locale: 'fr-FR';
};

export type ProcessStep = {
	title: string;
	description: string;
};

export type Service = {
	category: ProjectCategory;
	title: string;
	description: string;
};

export type BeforeAfterSection = {
	enabled: boolean;
	title: string;
	description: string;
};
