import type { ProjectChoice } from './project';

export type EstimateProjectType =
	| 'gaming-long'
	| 'gaming-long-shorts'
	| 'other-long'
	| 'other-long-shorts'
	| 'gaming-clip'
	| 'shorts-from-long'
	| 'explainer-shorts'
	| 'ugc-shorts'
	| 'scripted-rush-shorts'
	| 'other';

export type EstimateQuestionId = keyof EstimateAnswers;

export type EstimateAnswers = {
	name: string;
	contact: string;
	projectType: EstimateProjectType | '';
	objective: string;
	providedFiles: string[];
	structure: string;
	footageDuration: string;
	finalDuration: string;
	shortsCount: string;
	sources: string;
	editingLevel: string;
	styleReference: string;
	referenceLink: string;
	specificRequests: string;
	subtitles: string;
	shortsSource: string;
	moments: string;
	ugcAssets: string[];
	deadline: string;
	resolution: string;
	projectFiles: string;
	projectDescription: string;
	constraints: string;
	budgetPreference: string;
	budgetAmount: string;
};

export type EstimateQuestionOption = {
	value: string;
	label: string;
};

export type EstimateQuestion = {
	id: EstimateQuestionId;
	section: string;
	title: string;
	help?: string;
	placeholder?: string;
	type: 'text' | 'email' | 'textarea' | 'single' | 'multi';
	options?: EstimateQuestionOption[];
	required: boolean;
	minLength?: number;
	autocomplete?: 'name' | 'email' | 'off';
};

export type EstimateDriver =
	| 'footage'
	| 'output'
	| 'editing-level'
	| 'shorts-volume'
	| 'subtitles'
	| 'sources'
	| 'structure'
	| 'deadline'
	| 'resolution'
	| 'project-files';

export type PriceEstimate = {
	minimum: number;
	maximum: number;
	estimatedHours: number;
	uncertainty: 'low' | 'medium' | 'high';
	drivers: EstimateDriver[];
};

export type EstimateContactPrefill = {
	name: string;
	email: string;
	style: ProjectChoice | '';
	projectDescription: string;
	footageDetails: string;
	budget: string;
	usefulLinks: string;
};

export type EstimateCopy = {
	metaTitle: string;
	metaDescription: string;
	eyebrow: string;
	title: string;
	description: string;
	privacy: string;
	progress: string;
	previous: string;
	next: string;
	showEstimate: string;
	requiredError: string;
	minimumError: string;
	multiHint: string;
	contextualQuestions: {
		longFinalDuration: string;
		shortFinalDuration: string;
		longShortsCount: string;
		gamingShortsSource: string;
		providedScriptStatus: string;
		remainingUgcAssets: string;
	};
	result: {
		eyebrow: string;
		title: string;
		priceLabel: string;
		disclaimer: string;
		hoursLabel: string;
		confidenceLabel: string;
		confidence: Record<PriceEstimate['uncertainty'], string>;
		driversTitle: string;
		drivers: Record<EstimateDriver, string>;
		prefill: string;
		restart: string;
		answersKept: string;
	};
	questions: EstimateQuestion[];
};

export const emptyEstimateAnswers: EstimateAnswers = {
	name: '',
	contact: '',
	projectType: '',
	objective: '',
	providedFiles: [],
	structure: '',
	footageDuration: '',
	finalDuration: '',
	shortsCount: '',
	sources: '',
	editingLevel: '',
	styleReference: '',
	referenceLink: '',
	specificRequests: '',
	subtitles: '',
	shortsSource: '',
	moments: '',
	ugcAssets: [],
	deadline: '',
	resolution: '',
	projectFiles: '',
	projectDescription: '',
	constraints: '',
	budgetPreference: '',
	budgetAmount: ''
};
