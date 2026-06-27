import type { EstimateCopy, EstimateQuestion } from '$lib/types/estimate';

const questions: EstimateQuestion[] = [
	{
		id: 'name',
		section: 'General information',
		title: 'What is your name or username?',
		type: 'text',
		required: true,
		minLength: 2,
		autocomplete: 'name'
	},
	{
		id: 'contact',
		section: 'General information',
		title: 'What is your email address or preferred contact method?',
		help: 'This stays in your browser until you submit the final contact form.',
		placeholder: 'Email, Discord, Instagram…',
		type: 'text',
		required: true,
		minLength: 3,
		autocomplete: 'email'
	},
	{
		id: 'projectType',
		section: 'General information',
		title: 'What type of project is it?',
		type: 'single',
		required: true,
		options: [
			{ value: 'gaming-long', label: 'Long-form gaming video' },
			{ value: 'gaming-long-shorts', label: 'Long-form gaming video + derived shorts' },
			{ value: 'other-long', label: 'Other long-form video' },
			{ value: 'other-long-shorts', label: 'Other long-form video + derived shorts' },
			{ value: 'gaming-clip', label: 'Gaming clip shorts' },
			{ value: 'shorts-from-long', label: 'Shorts from a long video' },
			{ value: 'explainer-shorts', label: 'Rant / explainer shorts' },
			{ value: 'ugc-shorts', label: 'UGC / promotional shorts' },
			{ value: 'scripted-rush-shorts', label: 'Scripted shorts from multiple clips' },
			{ value: 'other', label: 'Other' }
		]
	},
	{
		id: 'objective',
		section: 'General information',
		title: 'What is the main goal of the project?',
		type: 'single',
		required: true,
		options: [
			{ value: 'entertain', label: 'Entertain' },
			{ value: 'retention', label: 'Hold attention / maximize retention' },
			{ value: 'promote', label: 'Promote a product / service' },
			{ value: 'explain', label: 'Explain a topic' },
			{ value: 'highlight', label: 'Create a best-of / highlight' },
			{ value: 'professional', label: 'Create a clean, professional result' },
			{ value: 'other', label: 'Other' }
		]
	},
	{
		id: 'providedFiles',
		section: 'Files provided',
		title: 'Which files will you provide?',
		help: 'You can select more than one.',
		type: 'multi',
		required: true,
		options: [
			{ value: 'raw', label: 'Unsorted raw footage' },
			{ value: 'derushed', label: 'Pre-selected footage' },
			{ value: 'edited-project', label: 'Edited video + project files' },
			{ value: 'editing-project', label: 'Editing project provided' },
			{ value: 'script', label: 'Script' },
			{ value: 'voice-over', label: 'Voice-over' },
			{ value: 'assets', label: 'Images / B-roll / assets' },
			{ value: 'none', label: 'None of these files' },
			{ value: 'unknown', label: 'I do not know yet' }
		]
	},
	{
		id: 'ugcAssets',
		section: 'Files provided',
		title: 'Which elements are already provided for UGC or promotional shorts?',
		help: 'You can select more than one.',
		type: 'multi',
		required: true,
		options: [
			{ value: 'script', label: 'Script' },
			{ value: 'voice-over', label: 'Voice-over' },
			{ value: 'facecam', label: 'Facecam video' },
			{ value: 'product-images', label: 'Product images' },
			{ value: 'b-roll', label: 'B-roll' },
			{ value: 'brand', label: 'Logo / brand guidelines' },
			{ value: 'music', label: 'Requested music' },
			{ value: 'none', label: 'None of these' },
			{ value: 'unknown', label: 'I do not know yet' }
		]
	},
	{
		id: 'structure',
		section: 'Files provided',
		title: 'Is a script or structure already planned?',
		type: 'single',
		required: true,
		options: [
			{ value: 'complete', label: 'Yes, a complete script is provided' },
			{ value: 'idea', label: 'Yes, a general idea is provided' },
			{ value: 'none', label: 'No, the structure needs to be created' },
			{ value: 'unnecessary', label: 'Not needed for this project' }
		]
	},
	{
		id: 'footageDuration',
		section: 'Amount of material',
		title: 'What is the total length of the footage or files to review?',
		type: 'single',
		required: true,
		options: [
			{ value: 'lt-15', label: 'Less than 15 minutes' },
			{ value: '15-30', label: '15 to 30 minutes' },
			{ value: '30-60', label: '30 minutes to 1 hour' },
			{ value: '1-2', label: '1 to 2 hours' },
			{ value: '2-4', label: '2 to 4 hours' },
			{ value: 'gt-4', label: 'More than 4 hours' },
			{ value: 'unknown', label: 'I do not know yet' }
		]
	},
	{
		id: 'finalDuration',
		section: 'Amount of material',
		title: 'What final video length do you want?',
		type: 'single',
		required: true,
		options: [
			{ value: 'lt-30s', label: 'Less than 30 seconds' },
			{ value: '30-60s', label: '30 to 60 seconds' },
			{ value: '1-3m', label: '1 to 3 minutes' },
			{ value: '3-8m', label: '3 to 8 minutes' },
			{ value: '8-15m', label: '8 to 15 minutes' },
			{ value: '15-30m', label: '15 to 30 minutes' },
			{ value: 'gt-30m', label: 'More than 30 minutes' }
		]
	},
	{
		id: 'shortsCount',
		section: 'Amount of material',
		title: 'How many shorts do you want?',
		type: 'single',
		required: true,
		options: [
			{ value: '1', label: '1 short' },
			{ value: '2-3', label: '2 to 3 shorts' },
			{ value: '4-5', label: '4 to 5 shorts' },
			{ value: '6-10', label: '6 to 10 shorts' },
			{ value: 'gt-10', label: 'More than 10 shorts' },
			{ value: 'unknown', label: 'I do not know yet' }
		]
	},
	{
		id: 'shortDuration',
		section: 'Amount of material',
		title: 'What average length do you want for each short?',
		type: 'single',
		required: true,
		options: [
			{ value: 'lt-30s', label: 'Less than 30 seconds' },
			{ value: '30-60s', label: '30 to 60 seconds' },
			{ value: '1-3m', label: '1 to 3 minutes' },
			{ value: 'unknown', label: 'I do not know yet' }
		]
	},
	{
		id: 'sources',
		section: 'Amount of material',
		title: 'How many cameras, POVs or different sources are there?',
		type: 'single',
		required: true,
		options: [
			{ value: '1', label: '1 source' },
			{ value: '2', label: '2 sources' },
			{ value: '3', label: '3 sources' },
			{ value: '4-plus', label: '4 sources or more' },
			{ value: 'unknown', label: 'I do not know' }
		]
	},
	{
		id: 'editingLevel',
		section: 'Editing style',
		title: 'What level of editing do you want?',
		type: 'single',
		required: true,
		options: [
			{ value: 'simple', label: 'Simple: footage selection, cuts, zooms and music' },
			{
				value: 'advanced',
				label: 'Advanced: progressive zooms, music, subtitles and some SFX'
			},
			{
				value: 'premium',
				label: 'Premium: advanced edit, motion design, transitions, effects and detailed finish'
			}
		]
	},
	{
		id: 'styleReference',
		section: 'Editing style',
		title: 'Do you have a style reference?',
		type: 'single',
		required: true,
		options: [
			{ value: 'example', label: 'Yes, I can provide an example video' },
			{ value: 'proposal', label: 'No, I want you to suggest a style' },
			{ value: 'idea', label: 'I have an idea but no precise reference' }
		]
	},
	{
		id: 'referenceLink',
		section: 'Editing style',
		title: 'What is the link to your style reference?',
		placeholder: 'YouTube, TikTok, Drive…',
		type: 'text',
		required: true,
		minLength: 5
	},
	{
		id: 'specificRequests',
		section: 'Editing style',
		title: 'Do you have specific editing options or requests?',
		help: 'This answer is optional.',
		placeholder: 'Effects, pace, music, things to avoid…',
		type: 'textarea',
		required: false
	},
	{
		id: 'subtitles',
		section: 'Subtitles',
		title: 'Are subtitles needed?',
		type: 'single',
		required: true,
		options: [
			{ value: 'none', label: 'No' },
			{ value: 'automatic', label: 'Yes, automatic subtitles are enough' },
			{ value: 'phrase', label: 'Yes, roughly every half-sentence' },
			{ value: 'word', label: 'Yes, word by word' }
		]
	},
	{
		id: 'shortsSource',
		section: 'Short-specific questions',
		title: 'What are the shorts made from?',
		type: 'single',
		required: true,
		options: [
			{ value: 'long-video', label: 'One long video' },
			{ value: 'short-rushes', label: 'Several short clips' },
			{ value: 'long-rushes', label: 'Several long clips' },
			{ value: 'script-voice', label: 'A script + voice-over' },
			{ value: 'from-scratch', label: 'An idea to build from scratch' },
			{ value: 'editing-project', label: 'An editing project is provided' }
		]
	},
	{
		id: 'moments',
		section: 'Short-specific questions',
		title: 'Are the best moments already identified?',
		type: 'single',
		required: true,
		options: [
			{ value: 'precise', label: 'Yes, with precise timecodes' },
			{ value: 'approximate', label: 'Yes, approximately' },
			{ value: 'find', label: 'No, they need to be found' },
			{ value: 'unknown', label: 'I do not know yet' }
		]
	},
	{
		id: 'deadline',
		section: 'Deadline',
		title: 'What deadline do you need?',
		type: 'single',
		required: true,
		options: [
			{ value: 'not-urgent', label: 'Not urgent' },
			{ value: '1-2-weeks', label: 'One to two weeks' },
			{ value: '3-5-days', label: '3 to 5 days' },
			{ value: '24-48h', label: '24 to 48 hours' },
			{ value: 'very-urgent', label: 'Very urgent' }
		]
	},
	{
		id: 'resolution',
		section: 'Delivery',
		title: 'What output resolution do you want?',
		type: 'single',
		required: true,
		options: [
			{ value: '1080p', label: '1080p' },
			{ value: '1440p', label: '1440p' },
			{ value: '4k', label: '4K' },
			{ value: 'unknown', label: 'I do not know' }
		]
	},
	{
		id: 'projectFiles',
		section: 'Delivery',
		title: 'Do you want the project files?',
		type: 'single',
		required: true,
		options: [
			{ value: 'no', label: 'No' },
			{ value: 'yes', label: 'Yes' }
		]
	},
	{
		id: 'projectDescription',
		section: 'Additional information',
		title: 'Briefly describe your project',
		placeholder: 'The content, target platform and expected result…',
		type: 'textarea',
		required: true,
		minLength: 20
	},
	{
		id: 'constraints',
		section: 'Additional information',
		title: 'Are there any important constraints?',
		help: 'This answer is optional.',
		placeholder: 'Required elements, limits, rights, exact format…',
		type: 'textarea',
		required: false
	},
	{
		id: 'budgetPreference',
		section: 'Additional information',
		title: 'Do you have a budget or range in mind?',
		type: 'single',
		required: true,
		options: [
			{ value: 'yes', label: 'Yes' },
			{ value: 'no', label: 'No' },
			{ value: 'estimate', label: 'I would rather receive an estimate' }
		]
	},
	{
		id: 'budgetAmount',
		section: 'Additional information',
		title: 'What budget or range do you have in mind?',
		placeholder: 'E.g. €80, €100 to €150…',
		type: 'text',
		required: true,
		minLength: 1
	}
];

export const estimateCopy: EstimateCopy = {
	metaTitle: 'Estimate your editing price | Palawi',
	metaDescription:
		'Answer a few questions to get an indicative price range for your video editing project.',
	eyebrow: 'Price estimate',
	title: 'How much could your edit cost?',
	description: 'One question at a time to assess the workload and provide a realistic price range.',
	privacy: 'No answer is sent during the estimate. Everything stays in your browser.',
	progress: 'Question',
	previous: 'Back',
	next: 'Continue',
	showEstimate: 'View my estimate',
	requiredError: 'Choose or enter an answer to continue.',
	minimumError: 'Add a little more detail to continue.',
	multiHint: 'You can select more than one answer.',
	contextualQuestions: {
		longFinalDuration: 'What final length do you want for the long-form video?',
		shortFinalDuration: 'What average length do you want for each short?',
		longShortsCount: 'How many shorts do you want extracted from the long-form video?',
		projectFootageDuration: 'What is the total length of the edit or project to revise?',
		voiceOverDuration: 'What is the total length of the voice-over to process?',
		ugcFootageDuration: 'What is the total length of the video or audio elements to process?',
		gamingShortsSource: 'How will you provide the gaming clips?',
		providedScriptStatus: 'What is the status of the provided script?',
		ugcProvidedFiles: 'Will you provide footage or an editing project for this UGC project?',
		ugcProvidedFilesHelp: 'The script, voice-over and brand elements are covered in the next step.'
	},
	result: {
		eyebrow: 'Estimate complete',
		title: 'Estimated range for this project',
		priceLabel: 'Indicative budget',
		disclaimer:
			'This range is not a quote. The final price will be confirmed after reviewing the files, exact requests and number of revisions.',
		hoursLabel: 'Estimated workload',
		confidenceLabel: 'Accuracy',
		confidence: {
			low: 'good',
			medium: 'medium',
			high: 'needs clarification'
		},
		driversTitle: 'What influences this estimate the most',
		drivers: {
			footage: 'The amount of footage to review',
			output: 'The length and volume to deliver',
			'editing-level': 'The requested finish level',
			'shorts-volume': 'The number of shorts',
			subtitles: 'The subtitle detail level',
			sources: 'The number of sources to synchronize',
			structure: 'The structure that needs to be created',
			deadline: 'The delivery deadline',
			resolution: 'The delivery resolution',
			'project-files': 'The project file handover'
		},
		prefill: 'Pre-fill my request',
		restart: 'Start again',
		answersKept: 'Your answers will be copied into the form. You can review them before sending it.'
	},
	questions
};
