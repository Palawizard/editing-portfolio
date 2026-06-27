import type { ContactOption } from '$lib/types/contact';
import type { EstimateCopy } from '$lib/types/estimate';
import type { EditingFormat, ProjectCategory, ProjectChoice } from '$lib/types/project';
import type {
	BeforeAfterSection,
	CallToAction,
	NavigationLink,
	ProcessStep,
	Service,
	SiteMetadata
} from '$lib/types/site';

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
		projectDescription: string;
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
		projectDescription: string;
		projectDescriptionHelp: string;
		footageDetails: string;
		footageDetailsHelp: string;
		desiredDate: string;
		budget: string;
		budgetHelp: string;
		budgetPlaceholder: string;
		usefulLinks: string;
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
	showreel: {
		title: string;
		description: string;
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
	projectsSection: {
		eyebrow: string;
		title: string;
		description: string;
		viewAll: string;
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
	};
	editingFormats: EditingFormat[];
	projectCategoryLabels: Record<ProjectCategory, string>;
	customFormatChoice: CustomFormatChoice;
	contactStyleOptions: ContactOption<ProjectChoice>[];
	contactFormCopy: ContactFormCopy;
	estimateCopy: EstimateCopy;
	services: Service[];
	processSteps: ProcessStep[];
	skills: string[];
	tools: Array<{ name: string; note: string }>;
	beforeAfterSection: BeforeAfterSection;
	ui: UiCopy;
};
