import type { ProjectCategory } from '$lib/types/project';

export type AutoplayPreview = {
	src: string;
	poster: string;
	aspect: 'video' | 'vertical';
};

export const categoryAutoplayPreviews: Record<ProjectCategory, AutoplayPreview> = {
	'gaming-long-form': {
		src: '/videos/previews/gaming-long-form-preview.mp4',
		poster: '/images/posters/gaming/miyuna-retour-gaming-long.webp',
		aspect: 'video'
	},
	'gaming-short-form': {
		src: '/videos/previews/gaming-short-form-preview.mp4',
		poster: '/images/posters/gaming/flare-mort-short.webp',
		aspect: 'vertical'
	},
	'explainer-short-form': {
		src: '/videos/previews/explainer-short-form-preview.mp4',
		poster: '/images/posters/explainer/rant-explicatif.webp',
		aspect: 'vertical'
	},
	'business-promo': {
		src: '/videos/previews/business-promo-preview.mp4',
		poster: '/images/posters/business/ugc.webp',
		aspect: 'vertical'
	},
	'other-format': {
		src: '/videos/previews/other-format-preview.mp4',
		poster: '/images/posters/other/funky-live-cuisine-other.webp',
		aspect: 'video'
	}
};

export const heroAutoplayPreview = categoryAutoplayPreviews['gaming-long-form'];
