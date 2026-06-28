import type { ContactOption } from '$lib/types/contact';
import type { EstimateCopy } from '$lib/types/estimate';
import type { EditingFormat, ProjectCategory, ProjectChoice } from '$lib/types/project';
import type { CallToAction, NavigationLink, ProcessStep, SiteMetadata } from '$lib/types/site';

export type ContactFormCopy = {
	eyebrow: string;
	title: string;
	description: string;
	submitLabel: string;
	submittingLabel: string;
	successTitle: string;
	successDescription: string;
	errorTitle: string;
	errorDescription: string;
	privacy: string;
	linksHelp: string;
	unavailable: string;
	subjectTemplate: string;
	validation: {
		name: string;
		email: string;
		style: string;
		objective: string;
		providedFiles: string;
		finalDuration: string;
		editingLevel: string;
		deadline: string;
		projectDescription: string;
	};
	estimateCta: {
		title: string;
		description: string;
		action: string;
	};
	turnstilePending: string;
	turnstileDomainError: string;
	turnstileGenericError: string;
	contextPrefix: string;
	contextReference: string;
	contextHint: string;
	estimateContextTitle: string;
	estimateContextHint: string;
	successFields: {
		contact: string;
		email: string;
		style: string;
		referenceProject: string;
		budget: string;
	};
	viewProjects: string;
	sendAnother: string;
	honeypotLabel: string;
	emailFallbackLead: string;
	emailFallbackAction: string;
	fields: {
		name: string;
		email: string;
		style: string;
		stylePlaceholder: string;
		objective: string;
		objectivePlaceholder: string;
		providedFiles: string;
		providedFilesPlaceholder: string;
		footageDuration: string;
		footageDurationPlaceholder: string;
		finalDuration: string;
		finalDurationPlaceholder: string;
		editingLevel: string;
		editingLevelPlaceholder: string;
		deadline: string;
		deadlinePlaceholder: string;
		subtitles: string;
		subtitlesPlaceholder: string;
		projectDescription: string;
		projectDescriptionHelp: string;
		footageDetails: string;
		footageDetailsHelp: string;
		desiredDate: string;
		budget: string;
		budgetHelp: string;
		budgetPlaceholder: string;
		referenceLink: string;
		referenceLinkHelp: string;
		specificRequests: string;
		constraints: string;
		usefulLinks: string;
	};
	options: {
		objective: ContactOption<string>[];
		providedFiles: ContactOption<string>[];
		footageDuration: ContactOption<string>[];
		finalDuration: ContactOption<string>[];
		editingLevel: ContactOption<string>[];
		deadline: ContactOption<string>[];
		subtitles: ContactOption<string>[];
	};
};

export type UiCopy = {
	skipToContent: string;
	header: {
		homeAriaLabel: string;
		contactCta: string;
		openMenu: string;
		closeMenu: string;
		languageLabel: string;
		languageNames: Record<'fr' | 'en', string>;
	};
	navigation: {
		mainAriaLabel: string;
		secondaryAriaLabel: string;
	};
	footer: {
		eyebrow: string;
		description: string;
	};
	hero: {
		titleLines: string[];
		description: string;
		playingLabel: string;
	};
	media: {
		playLabel: string;
		priceLabel: string;
		startingPriceLabel: string;
	};
	formatsSection: {
		eyebrow: string;
		title: string;
		description: string;
		requestFormat: string;
		viewExamples: string;
		customEyebrow: string;
		customTitle: string;
		customDescription: string;
		presentIdea: string;
	};
	formatCarousel: {
		regionAriaLabel: string;
		chooseAriaLabel: string;
		previousAriaLabel: string;
		nextAriaLabel: string;
	};
	processSection: {
		eyebrow: string;
		title: string;
		description: string;
	};
	skillsSection: {
		eyebrow: string;
		title: string;
		description: string;
		workTitle: string;
		workDescription: string;
		toolsTitle: string;
		toolsDescription: string;
	};
	contactSection: {
		eyebrow: string;
	};
	projectsPage: {
		title: string;
		metaTitle: string;
		metaDescription: string;
		customTitle: string;
		customDescription: string;
		customCta: string;
		orderStyle: string;
		emptyState: string;
		priceDisclaimer: string;
	};
	contactPage: {
		eyebrow: string;
		metaTitle: string;
		metaDescription: string;
		briefEyebrow: string;
		briefTitle: string;
		briefItems: Array<{ title: string; description: string }>;
		formatsEyebrow: string;
		formatsTitle: string;
		customBadge: string;
		reviewStyles: string;
		estimateCta: string;
	};
	startPage: {
		metaTitle: string;
		metaDescription: string;
		eyebrow: string;
		title: string;
		description: string;
		estimateTitle: string;
		estimateDescription: string;
		estimateCta: string;
		contactTitle: string;
		contactDescription: string;
		contactCta: string;
	};
	errorPage: {
		notFoundMetaTitle: string;
		notFoundTitle: string;
		notFoundDescription: string;
		genericMetaTitle: string;
		genericTitle: string;
		genericDescription: string;
		backHome: string;
	};
	turnstileAriaLabel: string;
};

export type CustomFormatChoice = {
	title: string;
	promise: string;
	description: string;
	highlights: string[];
};

export type LocaleBundle = {
	siteMetadata: SiteMetadata;
	navigationLinks: NavigationLink[];
	heroActions: CallToAction[];
	contactCopy: {
		title: string;
		description: string;
		actionLabel: string;
		estimateActionLabel: string;
	};
	editingFormats: EditingFormat[];
	projectCategoryLabels: Record<ProjectCategory, string>;
	customFormatChoice: CustomFormatChoice;
	contactStyleOptions: ContactOption<ProjectChoice>[];
	contactFormCopy: ContactFormCopy;
	estimateCopy: EstimateCopy;
	processSteps: ProcessStep[];
	skills: string[];
	tools: Array<{ name: string; note: string }>;
	ui: UiCopy;
};
