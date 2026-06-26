import type { Project } from '$lib/types/project';

type ProjectLocaleCopy = Pick<
	Project,
	'title' | 'summary' | 'objective' | 'result' | 'work' | 'duration'
>;

export const projectCopyEn: Record<string, ProjectLocaleCopy> = {
	'miyuna-retour-gaming-long': {
		title: 'MiyunaTV is back',
		summary: 'A long-form gaming video built around the creator’s return.',
		objective: 'Make the return feel smoother with a clear selection of useful moments.',
		result: 'A structured YouTube video focused on the session highlights.',
		work: [
			'Useful sequence selection',
			'Dead time removal',
			'Pacing cuts',
			'Stream tone preserved',
			'Light sound design'
		],
		duration: 'Long format'
	},
	'genshin-whale-accident-long': {
		title: 'I accidentally became a whale in Genshin Impact',
		summary: 'A long video with narration, pacing and progression around a standout moment.',
		objective: 'Keep the energy while making the progression easier to follow.',
		result: 'A long-form YouTube edit that highlights the gag build-up and key reactions.',
		work: [
			'Highlight selection',
			'Narrative pacing',
			'Reaction cuts',
			'Length cleanup',
			'Subtle transitions'
		],
		duration: 'Long format'
	},
	'miyuna-model-reveal-best-of': {
		title: 'MiyunaTV new 2D model reveal best-of (while waiting for 3D)',
		summary: 'A live best-of focused on reactions and important moments.',
		objective: 'Turn live content into a more direct and easier YouTube watch.',
		result: 'A video structured around the best moments with denser pacing than the live.',
		work: [
			'Live best-of',
			'Reaction selection',
			'Tighter pacing',
			'Breathing cuts',
			'Video structure'
		],
		duration: 'Long format'
	},
	'palawi-fireball-long': {
		title: 'Fireball',
		summary: 'A long-form gaming edit focused on pacing and match highlights.',
		objective: 'Build a more compact video around the strongest gameplay moments.',
		result: 'A long-form YouTube video with clearer progression and better-linked sequences.',
		work: [
			'Footage sorting',
			'Gameplay cuts',
			'Sequence pacing',
			'Subtle transitions',
			'YouTube export'
		],
		duration: 'Long format'
	},
	'carry-the-glass-long': {
		title: 'We have 2 hours to finish the game and get a refund (Carry the Glass)',
		summary: 'A gaming video with a time constraint and challenge progression.',
		objective: 'Highlight the challenge tension by removing dead time.',
		result: 'A more paced YouTube video focused on attempts, reactions and key moments.',
		work: [
			'Challenge structure',
			'Useful fail selection',
			'Pacing cuts',
			'Reaction moments',
			'Length cleanup'
		],
		duration: 'Long format'
	},
	'funky-beau-fils-long': {
		title: 'His mother does not accept her stepson',
		summary: 'Long content edited to keep the sequences that move the video forward.',
		objective: 'Structure a long video around the most useful passages and reactions.',
		result: 'An edit designed to keep momentum without losing the main context.',
		work: [
			'Key passage selection',
			'Reaction cuts',
			'Long-form pacing',
			'Silence cleanup',
			'YouTube export'
		],
		duration: 'Long format'
	},
	'flare-mort-short': {
		title: 'The flare of death',
		summary: 'A gaming moment turned into a short vertical clip.',
		objective: 'Create a fast, clear and effective clip from the first seconds.',
		result: 'A vertical short built for YouTube Shorts with direct pacing.',
		work: ['Fast hook', 'Vertical reframing', 'Short cuts', 'Moment emphasis', 'Shorts export'],
		duration: 'Short'
	},
	'cs2-random-short': {
		title: 'The most random CS2 match ever',
		summary: 'A fast CS2 clip built around an unpredictable situation.',
		objective: 'Make the gag understandable immediately with tight pacing.',
		result: 'A short clip readable without context, built for mobile viewing.',
		work: [
			'Funny moment spotting',
			'Timing tightening',
			'Vertical reframing',
			'Reaction cuts',
			'Shorts export'
		],
		duration: 'Short'
	},
	'cs2-habitude-short': {
		title: 'Do you do this too?',
		summary: 'A vertical clip based on a simple and immediately readable reaction.',
		objective: 'Turn a short sequence into content ready for Shorts.',
		result: 'A clear, direct short centered on the main reaction.',
		work: [
			'Unnecessary context removed',
			'Short pacing',
			'Mobile reframing',
			'Reaction timing',
			'Vertical export'
		],
		duration: 'Short'
	},
	'cs2-totem-short': {
		title: 'They form a totem',
		summary: 'A visual moment condensed into an easy-to-read gaming short.',
		objective: 'Keep only the funny situation and make it readable on mobile.',
		result: 'A short vertical clip with a fast payoff.',
		work: ['Gag selection', 'Fast cuts', 'Vertical reframing', 'Payoff pacing', 'Shorts export'],
		duration: 'Short'
	},
	'cs2-peur-short': {
		title: 'He was too scared of us',
		summary: 'A short gaming clip centered on a surprise reaction.',
		objective: 'Highlight the reaction without keeping the surrounding dead time.',
		result: 'A fast short built for vertical publishing.',
		work: [
			'Immediate hook',
			'Scene tightening',
			'Vertical reframing',
			'Comic timing',
			'Shorts export'
		],
		duration: 'Short'
	},
	'cs2-type-bizarre-short': {
		title: 'This guy is way too weird',
		summary: 'A match moment turned into a clear and paced short.',
		objective: 'Bring out the main situation in a few seconds.',
		result: 'A simple vertical clip centered on the gag, ready to publish.',
		work: [
			'Moment selection',
			'Tight pacing',
			'Mobile reframing',
			'Reaction cuts',
			'Shorts export'
		],
		duration: 'Short'
	},
	'rant-explicatif-drive': {
		title: 'Illustrated explainer rant',
		summary: 'A spoken piece supported by pacing and useful visuals.',
		objective: 'Make the message clearer with visual support and smoother editing.',
		result: 'A short video that supports the voiceover without overloading the message.',
		work: [
			'Speech pacing',
			'Supporting visuals',
			'On-screen text',
			'Subtle transitions',
			'Message clarification'
		],
		duration: 'Short'
	},
	'business-ugc-short': {
		title: 'Brand promo - UGC',
		summary: 'A vertical UGC edit designed to present a message naturally.',
		objective: 'Turn a talking-head take into a clear, publishable short video.',
		result: 'A vertical UGC video with pacing adapted to social platforms.',
		work: [
			'Vertical editing',
			'Speech pacing',
			'Short structure',
			'Message emphasis',
			'Social export'
		],
		duration: 'Short'
	},
	'business-boursin-short': {
		title: 'Restaurant promo - Boursin',
		summary: 'A vertical business edit around a food product.',
		objective: 'Highlight the product in a short, clear social-ready format.',
		result: 'A vertical promo video usable as a food and UGC reference.',
		work: ['Vertical editing', 'Pacing cuts', 'Ad-style pacing', 'Product focus', 'Social export'],
		duration: 'Short'
	},
	'business-cheese-naan-short': {
		title: 'Restaurant promo - Cheese naan',
		summary: 'A short vertical edit for a food offer.',
		objective: 'Create a video that is easy to understand and paced from the first seconds.',
		result: 'Vertical promo content adapted for Instagram, TikTok and Shorts.',
		work: [
			'Vertical editing',
			'Short structure',
			'Ad-style pacing',
			'Product focus',
			'Social export'
		],
		duration: 'Short'
	},
	'business-humour-short': {
		title: 'Restaurant promo - Humour',
		summary: 'A short format that uses humour to make the message more memorable.',
		objective: 'Keep dynamic pacing while preserving a clear commercial intent.',
		result: 'A vertical video focused on engagement with a lighter tone.',
		work: ['Vertical editing', 'Comic timing', 'Pacing cuts', 'Message emphasis', 'Social export'],
		duration: 'Short'
	},
	'business-naan-short': {
		title: 'Restaurant promo - Naan',
		summary: 'A vertical promotional video centered on a food product.',
		objective: 'Present the product with a short and direct edit.',
		result: 'A business short designed for fast mobile viewing.',
		work: ['Vertical editing', 'Short pacing', 'Product focus', 'Promo structure', 'Social export'],
		duration: 'Short'
	},
	'business-poulet-short': {
		title: 'Restaurant promo - Chicken',
		summary: 'A short vertical edit to showcase a food product.',
		objective: 'Make the video readable and effective for social publishing.',
		result: 'Vertical promo content focused on the product and pacing.',
		work: ['Vertical editing', 'Pacing cuts', 'Ad-style pacing', 'Product focus', 'Social export'],
		duration: 'Short'
	},
	'business-smash-short': {
		title: 'Restaurant promo - Smash',
		summary: 'A short business example with vertical editing focused on product impact.',
		objective: 'Create a fast promotional sequence with immediate readability.',
		result: 'A business short usable as a food offer reference.',
		work: ['Vertical editing', 'Short pacing', 'Product focus', 'Promo structure', 'Social export'],
		duration: 'Short'
	},
	'business-tacos-short': {
		title: 'Restaurant promo - Tacos',
		summary: 'A vertical promotional video around a food product.',
		objective: 'Put the product at the center with a direct edit usable on mobile.',
		result: 'Short content designed for Instagram, TikTok or Shorts.',
		work: ['Vertical editing', 'Pacing cuts', 'Ad-style pacing', 'Product focus', 'Social export'],
		duration: 'Short'
	},
	'funky-live-cuisine-other': {
		title: 'Cooking live with the crew (ft Lespale, Majora, Galactic)',
		summary: 'Non-gaming live content edited as a full YouTube video.',
		objective: 'Keep the best live moments and give the content a clearer structure.',
		result: 'A more accessible video with reduced dead time and better-linked sequences.',
		work: [
			'Live sorting',
			'Sequence structure',
			'Pacing cuts',
			'Interactions preserved',
			'YouTube export'
		],
		duration: 'Long format'
	}
};
