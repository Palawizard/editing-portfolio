export type ProjectCategory =
	| 'gaming-long-form'
	| 'gaming-short-form'
	| 'explainer-short-form'
	| 'business-promo';

export type Project = {
	slug: string;
	title: string;
	category: ProjectCategory;
	summary: string;
	objective: string;
	work: string[];
	platform: string[];
	format: string;
	duration?: string;
	poster: string;
	previewVideo?: string;
	externalUrl?: string;
	featured: boolean;
};

export type EditingFormat = {
	id: ProjectCategory;
	title: string;
	promise: string;
	description: string;
	highlights: string[];
};
