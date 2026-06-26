import type { BeforeAfterSection, ProcessStep, Service } from '$lib/types/site';

export const services: Service[] = [
	{
		category: 'gaming-long-form',
		title: 'Long-form editing',
		description: 'Turn long raw footage into a structured, smooth and easy-to-follow video.'
	},
	{
		category: 'gaming-short-form',
		title: 'Short vertical edits',
		description: 'Create fast clips with subtitles, built for short-form platforms.'
	},
	{
		category: 'explainer-short-form',
		title: 'Explainer editing',
		description: 'Make an idea clearer with visuals, pacing and readable storytelling.'
	},
	{
		category: 'business-promo',
		title: 'Promo content',
		description: 'Present a business, offer or service in a clean short-form video.'
	}
];

export const processSteps: ProcessStep[] = [
	{
		title: 'Brief',
		description: 'We define the style, format, platform and goal of the video.'
	},
	{
		title: 'Editing',
		description: 'I sort the footage, build the pacing and add the text, sound or visuals needed.'
	},
	{
		title: 'Revisions',
		description: 'You can request adjustments to match the result you want.'
	},
	{
		title: 'Delivery',
		description: 'The video is exported in the right format, ready to publish.'
	}
];

export const skills = [
	'Long-form editing',
	'Short vertical editing',
	'Dynamic subtitles',
	'Sound design',
	'Transitions',
	'Visual illustrations',
	'TikTok, Reels and Shorts adaptation',
	'Optimized exports'
];

export const tools = [
	{
		name: 'DaVinci Resolve Studio',
		note: 'Main editing, color grading and final exports'
	}
];

export const beforeAfterSection: BeforeAfterSection = {
	enabled: false,
	title: 'Before / after',
	description: 'Comparison available when clean raw and edited clips are ready.'
};

export const servicesBundle = {
	services,
	processSteps,
	skills,
	tools,
	beforeAfterSection
};
