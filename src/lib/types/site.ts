import type { ProjectCategory } from './project';

export type NavigationLink = {
	label: string;
	href: string;
};

export type CallToAction = {
	label: string;
	href: string;
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
