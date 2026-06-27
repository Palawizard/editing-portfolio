import type { ProcessStep } from '$lib/types/site';

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

export const servicesBundle = {
	processSteps,
	skills,
	tools
};
