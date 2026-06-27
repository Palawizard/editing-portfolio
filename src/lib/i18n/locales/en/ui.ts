import type { LocaleBundle } from '$lib/i18n/locales/types';

export const uiBundle = {
	skipToContent: 'Skip to content',
	header: {
		homeAriaLabel: 'Back to home',
		contactCta: 'Get in touch',
		openMenu: 'Open menu',
		closeMenu: 'Close menu',
		languageLabel: 'Site language',
		languageNames: {
			fr: 'Français',
			en: 'English'
		}
	},
	navigation: {
		mainAriaLabel: 'Main navigation',
		secondaryAriaLabel: 'Secondary navigation'
	},
	footer: {
		eyebrow: 'Cut / pace / export',
		description: 'Videos designed to be watched, understood and published.'
	},
	hero: {
		titleLines: ['Your footage.', 'The right pace.', 'Ready to publish.'],
		description:
			"Palawi's video editing portfolio for creators, streamers and businesses. From raw content to a clear, well-paced video built for its platform.",
		playingLabel: 'Playing'
	},
	showreel: {
		title: 'Recent edit highlights',
		description: 'A short preview of pacing, formats and finishing level across recent edits.'
	},
	formatsSection: {
		eyebrow: 'Find your format',
		title: 'A different style for every goal',
		description:
			'Browse the formats, pick a direction and explore edits already delivered in that style.',
		requestFormat: 'Request this format',
		viewExamples: 'View examples',
		customEyebrow: 'Custom request',
		customTitle: 'A direction built around your project.',
		customDescription: 'Share your references and goal, then we define the format together.',
		presentIdea: 'Share my idea'
	},
	formatCarousel: {
		regionAriaLabel: 'Editing style carousel',
		chooseAriaLabel: 'Choose an editing style',
		previousAriaLabel: 'View previous formats',
		nextAriaLabel: 'View next formats'
	},
	projectsSection: {
		eyebrow: 'Projects',
		title: 'Editing is judged on screen',
		description: 'Concrete examples with the format, goal and work behind each video.',
		viewAll: 'View all projects'
	},
	processSection: {
		eyebrow: 'Process',
		title: 'A simple workflow from brief to delivery',
		description:
			'A clear framework to move fast, keep the right direction and deliver a publish-ready file.'
	},
	skillsSection: {
		eyebrow: 'Skills',
		title: 'Videos ready to publish',
		description: 'Editing serves pacing, clarity and the format expected on each platform.',
		workTitle: 'Work delivered',
		workDescription: 'Result-focused skills, from footage sorting to final export.',
		toolsTitle: 'Tools',
		toolsDescription: 'A workflow centered on one main tool, without a pointless software list.'
	},
	contactSection: {
		eyebrow: 'Contact'
	},
	projectsPage: {
		title: 'Choose your editing style.',
		metaTitle: 'Choose an editing style | Portfolio',
		metaDescription: 'Choose an editing style and explore projects delivered in that format.',
		customTitle: 'Does your project not fit a preset box?',
		customDescription:
			'Send a reference, your idea and the target platform. I will suggest an editing direction that fits your content without forcing a preset format.',
		customCta: 'Talk about my project',
		orderStyle: 'Order this style',
		emptyState:
			'No published example for this style yet. You can still send a reference to define a suitable result.'
	},
	contactPage: {
		eyebrow: 'Contact',
		metaTitle: 'Contact | Video editing',
		metaDescription:
			'Share your video editing project, its format, references and available footage.',
		briefEyebrow: 'Prepare your request',
		briefTitle: 'A simple brief is enough',
		briefItems: [
			{
				title: 'The format',
				description: 'Long, short, vertical, horizontal or a custom idea.'
			},
			{
				title: 'References',
				description: 'One or two videos that show the pacing and look you want.'
			},
			{
				title: 'Footage',
				description: 'Available volume, target length and publishing platform.'
			}
		],
		formatsEyebrow: 'Accepted formats',
		formatsTitle: 'A preset base or custom work',
		customBadge: 'Custom request',
		reviewStyles: 'Review styles',
		estimateCta: 'Estimate my project'
	},
	turnstileAriaLabel: 'Spam verification'
} satisfies LocaleBundle['ui'];
