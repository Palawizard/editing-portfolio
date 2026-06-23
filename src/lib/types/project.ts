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
	result: string;
	work: string[];
	platform: string[];
	format: string;
	duration?: string;
	poster: string;
	previewVideo?: string;
	externalUrl?: string;
	supplementalMedia?: ProjectMedia[];
	beforeAfter?: ProjectBeforeAfter;
	featured: boolean;
};

export type ProjectMedia = {
	title: string;
	description?: string;
	poster?: string;
	previewVideo?: string;
	aspect?: 'video' | 'vertical';
};

export type ProjectBeforeAfter = {
	title: string;
	description: string;
	beforeLabel: string;
	afterLabel: string;
	beforeVideo?: string;
	afterVideo?: string;
};

export type EditingFormat = {
	id: ProjectCategory;
	title: string;
	promise: string;
	description: string;
	highlights: string[];
};
