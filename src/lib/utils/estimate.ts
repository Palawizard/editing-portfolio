import type {
	EstimateAnswers,
	EstimateContactPrefill,
	EstimateDriver,
	EstimateProjectType,
	EstimateQuestion,
	PriceEstimate
} from '$lib/types/estimate';
import type { ProjectChoice } from '$lib/types/project';

export const ESTIMATE_PREFILL_STORAGE_KEY = 'portfolio-estimate-prefill';

const hourlyRate = 13;

const longProjects = new Set<EstimateProjectType>([
	'gaming-long',
	'gaming-long-shorts',
	'other-long',
	'other-long-shorts'
]);

const shortProjects = new Set<EstimateProjectType>([
	'gaming-clip',
	'shorts-from-long',
	'explainer-shorts',
	'ugc-shorts',
	'scripted-rush-shorts'
]);

const projectsWithShorts = new Set<EstimateProjectType>([
	'gaming-long-shorts',
	'other-long-shorts',
	...shortProjects
]);

const optionValue = (value: string, fallback: number, values: Record<string, number>) =>
	values[value] ?? fallback;

const roundToFive = (value: number) => Math.max(0, Math.round(value / 5) * 5);

const shortsQuantity = (value: string) =>
	optionValue(value, 3, {
		'1': 1,
		'2-3': 2.5,
		'4-5': 4.5,
		'6-10': 8,
		'gt-10': 12,
		unknown: 3
	});

const shortsDiscount = (quantity: number) => {
	if (quantity >= 10) return 0.7;
	if (quantity >= 6) return 0.75;
	if (quantity >= 4) return 0.82;
	if (quantity >= 2) return 0.9;
	return 1;
};

export const projectIncludesShorts = (projectType: EstimateProjectType | '') =>
	Boolean(projectType && projectsWithShorts.has(projectType));

export const isUgcProject = (projectType: EstimateProjectType | '') => projectType === 'ugc-shorts';

export const isEstimateQuestionVisible = (question: EstimateQuestion, answers: EstimateAnswers) => {
	switch (question.id) {
		case 'shortsCount':
		case 'shortsSource':
		case 'moments':
			return projectIncludesShorts(answers.projectType);
		case 'ugcAssets':
			return isUgcProject(answers.projectType);
		case 'referenceLink':
			return answers.styleReference === 'example';
		case 'budgetAmount':
			return answers.budgetPreference === 'yes';
		default:
			return true;
	}
};

export const calculatePriceEstimate = (answers: EstimateAnswers): PriceEstimate => {
	const projectType = answers.projectType || 'other';
	const isLong = longProjects.has(projectType);
	const isShort = shortProjects.has(projectType);
	const hasShorts = projectsWithShorts.has(projectType);

	const setupHours = optionValue(projectType, 2.5, {
		'gaming-long': 1.5,
		'gaming-long-shorts': 1.75,
		'other-long': 2,
		'other-long-shorts': 2.25,
		'gaming-clip': 0.75,
		'shorts-from-long': 0.75,
		'explainer-shorts': 1,
		'ugc-shorts': 1.25,
		'scripted-rush-shorts': 1.5
	});

	let reviewHours = optionValue(answers.footageDuration, 3, {
		'lt-15': 0.5,
		'15-30': 1,
		'30-60': 2,
		'1-2': 3.5,
		'2-4': 6,
		'gt-4': 9,
		unknown: 3
	});

	if (answers.providedFiles.includes('derushed')) reviewHours *= 0.45;
	else if (
		answers.providedFiles.includes('edited-project') ||
		answers.providedFiles.includes('editing-project')
	)
		reviewHours *= 0.65;
	else if (
		!answers.providedFiles.includes('raw') &&
		(answers.providedFiles.includes('script') || answers.providedFiles.includes('voice-over'))
	)
		reviewHours *= 0.3;

	const longEditHours = optionValue(answers.finalDuration, 4, {
		'lt-30s': 0.75,
		'30-60s': 1,
		'1-3m': 2,
		'3-8m': 4,
		'8-15m': 6.5,
		'15-30m': 10,
		'gt-30m': 15
	});

	const quantity = hasShorts ? shortsQuantity(answers.shortsCount) : 0;
	const perShortHours = optionValue(answers.finalDuration, 1.2, {
		'lt-30s': 0.8,
		'30-60s': 1.2,
		'1-3m': 2.2,
		'3-8m': 3.5,
		'8-15m': 5,
		'15-30m': 8,
		'gt-30m': 12
	});
	const shortEditHours = quantity * perShortHours * shortsDiscount(quantity);
	const outputHours = isLong
		? longEditHours + (hasShorts ? quantity * 0.9 * shortsDiscount(quantity) : 0)
		: isShort
			? shortEditHours
			: longEditHours;

	const levelMultiplier = optionValue(answers.editingLevel, 1.1, {
		simple: 0.8,
		advanced: 1.1,
		premium: 1.6
	});

	const sourceMultiplier = optionValue(answers.sources, 1.12, {
		'1': 1,
		'2': 1.08,
		'3': 1.16,
		'4-plus': 1.3,
		unknown: 1.12
	});

	let hours = (setupHours + reviewHours + outputHours) * levelMultiplier * sourceMultiplier;

	hours += optionValue(answers.structure, 0.75, {
		complete: 0,
		idea: 0.75,
		none: 2,
		unnecessary: 0
	});
	hours += optionValue(answers.styleReference, 0.35, {
		example: 0,
		proposal: 0.75,
		idea: 0.35
	});

	if (hasShorts) {
		hours += optionValue(answers.moments, 0.75, {
			precise: 0,
			approximate: 0.35,
			find: 1.25,
			unknown: 0.75
		});

		if (answers.shortsSource === 'from-scratch') hours += 2;
		if (answers.shortsSource === 'script-voice') hours += 0.75;
	}

	const subtitleHoursPerOutput = optionValue(answers.subtitles, 0.15, {
		none: 0,
		automatic: 0.15,
		phrase: 0.45,
		word: 0.75
	});
	const subtitleUnits = hasShorts ? Math.max(1, quantity) : Math.max(1, longEditHours / 2);
	hours += Math.min(7, subtitleHoursPerOutput * subtitleUnits);

	if (projectType === 'ugc-shorts') {
		if (answers.ugcAssets.includes('none')) hours += 2;
		else if (!answers.ugcAssets.includes('script')) hours += 0.75;
	}

	const resolutionMultiplier = optionValue(answers.resolution, 1.03, {
		'1080p': 1,
		'1440p': 1.05,
		'4k': 1.12,
		unknown: 1.03
	});
	const projectFilesMultiplier = answers.projectFiles === 'yes' ? 1.15 : 1;
	const deadlineMultiplier = optionValue(answers.deadline, 1, {
		'not-urgent': 0.95,
		'1-2-weeks': 1,
		'3-5-days': 1.12,
		'24-48h': 1.35,
		'very-urgent': 1.55
	});
	hours *= resolutionMultiplier * projectFilesMultiplier * deadlineMultiplier;

	const minimumPrice = isLong ? 45 : isShort ? 20 : 35;
	const centralPrice = Math.max(minimumPrice, hours * hourlyRate);

	const unknownValues = [
		answers.footageDuration,
		answers.shortsCount,
		answers.sources,
		answers.resolution,
		answers.moments
	].filter((value) => value === 'unknown').length;
	let uncertaintyRate = 0.12 + Math.min(0.12, unknownValues * 0.03);
	if (projectType === 'other') uncertaintyRate += 0.05;
	if (answers.specificRequests.trim()) uncertaintyRate += 0.02;
	if (answers.ugcAssets.includes('none') || answers.ugcAssets.includes('unknown')) {
		uncertaintyRate += 0.04;
	}
	uncertaintyRate = Math.min(0.3, uncertaintyRate);

	const minimum = Math.max(minimumPrice, roundToFive(centralPrice * (1 - uncertaintyRate)));
	const maximum = Math.max(minimum + 10, roundToFive(centralPrice * (1 + uncertaintyRate)));

	const weightedDrivers: Array<[EstimateDriver, number]> = [
		['footage', reviewHours],
		['output', outputHours],
		['editing-level', Math.abs(levelMultiplier - 1) * (setupHours + outputHours)],
		['shorts-volume', hasShorts ? quantity : 0],
		['subtitles', subtitleHoursPerOutput * subtitleUnits],
		['sources', (sourceMultiplier - 1) * (reviewHours + outputHours)],
		['structure', answers.structure === 'none' ? 2 : answers.structure === 'idea' ? 0.75 : 0],
		['deadline', Math.abs(deadlineMultiplier - 1) * hours],
		['resolution', (resolutionMultiplier - 1) * hours],
		['project-files', answers.projectFiles === 'yes' ? hours * 0.15 : 0]
	];

	return {
		minimum,
		maximum,
		estimatedHours: Math.round(hours * 2) / 2,
		uncertainty: uncertaintyRate <= 0.14 ? 'low' : uncertaintyRate <= 0.21 ? 'medium' : 'high',
		drivers: weightedDrivers
			.filter(([, weight]) => weight > 0.05)
			.sort((a, b) => b[1] - a[1])
			.slice(0, 4)
			.map(([driver]) => driver)
	};
};

const projectStyleMap: Record<EstimateProjectType, ProjectChoice> = {
	'gaming-long': 'gaming-long-form',
	'gaming-long-shorts': 'gaming-long-form',
	'other-long': 'other-format',
	'other-long-shorts': 'other-format',
	'gaming-clip': 'gaming-short-form',
	'shorts-from-long': 'custom',
	'explainer-shorts': 'explainer-short-form',
	'ugc-shorts': 'business-promo',
	'scripted-rush-shorts': 'business-promo',
	other: 'custom'
};

const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const buildContactPrefill = (
	answers: EstimateAnswers,
	estimate: PriceEstimate,
	questions: EstimateQuestion[],
	locale: 'fr' | 'en'
): EstimateContactPrefill => {
	const labels = new Map(questions.map((question) => [question.id, question]));
	const answerLabel = (id: keyof EstimateAnswers, value: string) =>
		labels.get(id)?.options?.find((option) => option.value === value)?.label ?? value;
	const line = (label: string, value: string) => `${label}: ${value}`;
	const localized =
		locale === 'fr'
			? {
					objective: 'Objectif',
					level: 'Niveau de montage',
					subtitles: 'Sous-titres',
					contact: 'Moyen de contact indiqué',
					constraints: 'Contraintes',
					estimate: 'Estimation indicative',
					footage: 'Rushs à traiter',
					final: 'Durée finale',
					shorts: 'Nombre de shorts',
					sources: 'Sources',
					files: 'Fichiers fournis'
				}
			: {
					objective: 'Goal',
					level: 'Editing level',
					subtitles: 'Subtitles',
					contact: 'Provided contact method',
					constraints: 'Constraints',
					estimate: 'Indicative estimate',
					footage: 'Footage to review',
					final: 'Final length',
					shorts: 'Number of shorts',
					sources: 'Sources',
					files: 'Files provided'
				};

	const descriptionLines = [
		answers.projectDescription.trim(),
		line(localized.objective, answerLabel('objective', answers.objective)),
		line(localized.level, answerLabel('editingLevel', answers.editingLevel)),
		line(localized.subtitles, answerLabel('subtitles', answers.subtitles))
	];
	if (!validEmail(answers.contact)) descriptionLines.push(line(localized.contact, answers.contact));
	if (answers.specificRequests.trim()) descriptionLines.push(answers.specificRequests.trim());
	if (answers.constraints.trim()) {
		descriptionLines.push(line(localized.constraints, answers.constraints.trim()));
	}

	const footageLines = [
		line(localized.footage, answerLabel('footageDuration', answers.footageDuration)),
		line(localized.final, answerLabel('finalDuration', answers.finalDuration)),
		line(localized.sources, answerLabel('sources', answers.sources)),
		line(
			localized.files,
			answers.providedFiles.map((value) => answerLabel('providedFiles', value)).join(', ')
		)
	];
	if (projectIncludesShorts(answers.projectType)) {
		footageLines.push(line(localized.shorts, answerLabel('shortsCount', answers.shortsCount)));
	}

	return {
		name: answers.name.trim(),
		email: validEmail(answers.contact) ? answers.contact.trim() : '',
		style: answers.projectType ? projectStyleMap[answers.projectType] : '',
		projectDescription: descriptionLines.filter(Boolean).join('\n'),
		footageDetails: footageLines.join('\n'),
		budget: `${localized.estimate}: ${estimate.minimum}–${estimate.maximum} €`,
		usefulLinks: answers.referenceLink.trim()
	};
};
