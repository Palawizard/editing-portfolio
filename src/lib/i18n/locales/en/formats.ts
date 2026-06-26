import type { EditingFormat, ProjectCategory } from '$lib/types/project';

export const projectCategoryLabels: Record<ProjectCategory, string> = {
	'gaming-long-form': 'Long-form gaming',
	'gaming-short-form': 'Gaming shorts',
	'explainer-short-form': 'Rant and explainer',
	'business-promo': 'Business promo and UGC',
	'other-format': 'Other formats'
};

export const editingFormats: EditingFormat[] = [
	{
		id: 'gaming-long-form',
		title: 'Long-form gaming videos',
		promise: 'Long sessions turned into well-paced videos.',
		description:
			'I keep the best moments, cut dead time and build a smooth edit without losing the gameplay vibe.',
		highlights: [
			'Footage selection',
			'Pacing and cuts',
			'Highlight moments',
			'Light sound design',
			'Video structure'
		]
	},
	{
		id: 'gaming-short-form',
		title: 'Gaming shorts',
		promise: 'The best moments adapted for short-form platforms.',
		description:
			'I turn clips from long videos or sessions into short, readable edits designed to hold attention.',
		highlights: [
			'Fast hook',
			'Dynamic subtitles',
			'Zooms and impacts',
			'Vertical format',
			'Tight pacing'
		]
	},
	{
		id: 'explainer-short-form',
		title: 'Rant and explainer',
		promise: 'Ideas made clearer with pace and visuals.',
		description:
			'I support the voiceover with images, text, clips and useful effects to make the message more engaging.',
		highlights: [
			'Visual illustrations',
			'Subtitles',
			'Speech pacing',
			'Supporting visuals',
			'Message clarity'
		]
	},
	{
		id: 'business-promo',
		title: 'Business promo and UGC',
		promise: 'Short videos to present a business or service.',
		description:
			'I create clean short-form content to help a shop, brand or freelancer present their offer.',
		highlights: [
			'Clear presentation',
			'Product focus',
			'On-screen text',
			'Call to action',
			'Social-ready format'
		]
	},
	{
		id: 'other-format',
		title: 'Other formats',
		promise: 'Edits tailored to less conventional content.',
		description:
			'Lives, one-off concepts or hybrid formats can be edited with a direction adapted to the content.',
		highlights: [
			'Custom format',
			'Clear structure',
			'Adapted pacing',
			'Dead time cleanup',
			'Publish-ready export'
		]
	}
];

export const customFormatChoice = {
	title: 'Custom request',
	promise: 'A format built around your idea.',
	description:
		'Have a specific reference or a project that does not fit a preset box? We define the pace and direction together.',
	highlights: ['Custom direction', 'Flexible format', 'Discussion before editing']
};

export const formatsBundle = {
	editingFormats,
	customFormatChoice
};
