export type ProjectCategory =
	| 'gaming-long-form'
	| 'gaming-short-form'
	| 'explainer-short-form'
	| 'business-promo'
	| 'other-format';

export type ProjectChoice = ProjectCategory | 'custom';

export type Project = {
	slug: string;
	referenceId: string;
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
	pricing: ProjectPricing;
	featured: boolean;
	disclaimer?: string;
};

export type ProjectInput = Omit<
	Project,
	'featured' | 'format' | 'platform' | 'poster' | 'pricing' | 'referenceId'
> &
	Partial<Pick<Project, 'featured' | 'format' | 'platform' | 'poster' | 'pricing' | 'referenceId'>>;

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

export type ProjectPricing = {
	minimum: number;
	maximum: number;
	currency: 'EUR';
	approximate: boolean;
	temporary: boolean;
};

export type EditingFormat = {
	id: ProjectCategory;
	title: string;
	promise: string;
	description: string;
	highlights: string[];
};
