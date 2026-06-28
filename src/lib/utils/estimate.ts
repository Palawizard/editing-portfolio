import type {
	EstimateAnswers,
	EstimateContactPrefill,
	EstimateCopy,
	EstimateDriver,
	EstimateProjectType,
	EstimateQuestion,
	PriceEstimate
} from '$lib/types/estimate';
import { emptyEstimateAnswers } from '$lib/types/estimate';
import type { ProjectChoice } from '$lib/types/project';

export const ESTIMATE_PREFILL_STORAGE_KEY = 'portfolio-estimate-prefill';

const hourlyRate = 4;

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

const hybridLongShortProjects = new Set<EstimateProjectType>([
	'gaming-long-shorts',
	'other-long-shorts'
]);

const reviewableVideoFiles = new Set(['raw', 'derushed']);
const timedProjectFiles = new Set([
	'raw',
	'derushed',
	'edited-project',
	'editing-project',
	'voice-over',
	'unknown'
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

export const projectHasLongAndShortOutputs = (projectType: EstimateProjectType | '') =>
	Boolean(projectType && hybridLongShortProjects.has(projectType));

const projectDefinesShortsSource = (projectType: EstimateProjectType | '') =>
	projectType === 'gaming-long-shorts' ||
	projectType === 'other-long-shorts' ||
	projectType === 'shorts-from-long' ||
	projectType === 'ugc-shorts' ||
	projectType === 'scripted-rush-shorts';

const projectDoesNotNeedStructure = (projectType: EstimateProjectType | '') =>
	projectType === 'gaming-clip' || projectType === 'shorts-from-long';

const hasReviewableVideoFiles = (answers: EstimateAnswers) =>
	answers.providedFiles.some((file) => reviewableVideoFiles.has(file) || file === 'unknown');

export const shouldAskFootageDuration = (answers: EstimateAnswers) =>
	answers.providedFiles.some((file) => timedProjectFiles.has(file)) ||
	(isUgcProject(answers.projectType) &&
		answers.ugcAssets.some((asset) =>
			['voice-over', 'facecam', 'b-roll', 'unknown'].includes(asset)
		));

export const shouldAskSources = (answers: EstimateAnswers) => hasReviewableVideoFiles(answers);

const filesDefineShortsSource = (answers: EstimateAnswers) => {
	if (
		answers.providedFiles.includes('edited-project') ||
		answers.providedFiles.includes('editing-project')
	) {
		return true;
	}

	const includesFootage =
		answers.providedFiles.includes('raw') || answers.providedFiles.includes('derushed');
	const includesScriptOrVoice =
		answers.providedFiles.includes('script') || answers.providedFiles.includes('voice-over');
	return !includesFootage && includesScriptOrVoice;
};

const sourceNeedsMomentSelection = (source: string) =>
	source === 'long-video' || source === 'short-rushes' || source === 'long-rushes';

export const shouldAskShortsSource = (answers: EstimateAnswers) =>
	projectIncludesShorts(answers.projectType) &&
	!projectDefinesShortsSource(answers.projectType) &&
	!filesDefineShortsSource(answers);

export const shouldAskStructure = (answers: EstimateAnswers) =>
	!projectDoesNotNeedStructure(answers.projectType);

export const shouldAskMoments = (answers: EstimateAnswers) => {
	if (
		answers.projectType === 'gaming-long-shorts' ||
		answers.projectType === 'other-long-shorts' ||
		answers.projectType === 'shorts-from-long' ||
		answers.projectType === 'ugc-shorts' ||
		answers.projectType === 'scripted-rush-shorts'
	) {
		return hasReviewableVideoFiles(answers);
	}

	return (
		shouldAskShortsSource(answers) &&
		hasReviewableVideoFiles(answers) &&
		sourceNeedsMomentSelection(answers.shortsSource)
	);
};

export const getContextualEstimateQuestion = (
	question: EstimateQuestion,
	answers: EstimateAnswers,
	copy: EstimateCopy['contextualQuestions']
): EstimateQuestion => {
	if (question.id === 'finalDuration') {
		if (longProjects.has(answers.projectType || 'other')) {
			return { ...question, title: copy.longFinalDuration };
		}
		if (shortProjects.has(answers.projectType || 'other')) {
			return { ...question, title: copy.shortFinalDuration };
		}
	}

	if (question.id === 'shortsCount' && longProjects.has(answers.projectType || 'other')) {
		return { ...question, title: copy.longShortsCount };
	}

	if (question.id === 'footageDuration') {
		if (
			answers.providedFiles.includes('edited-project') ||
			answers.providedFiles.includes('editing-project')
		) {
			return { ...question, title: copy.projectFootageDuration };
		}
		if (
			isUgcProject(answers.projectType) &&
			answers.ugcAssets.some((asset) => ['voice-over', 'facecam', 'b-roll'].includes(asset))
		) {
			return { ...question, title: copy.ugcFootageDuration };
		}
		if (
			answers.providedFiles.includes('voice-over') &&
			!answers.providedFiles.some((file) => reviewableVideoFiles.has(file))
		) {
			return { ...question, title: copy.voiceOverDuration };
		}
	}

	if (question.id === 'providedFiles' && isUgcProject(answers.projectType)) {
		return {
			...question,
			title: copy.ugcProvidedFiles,
			help: copy.ugcProvidedFilesHelp,
			options: question.options?.filter((option) =>
				['raw', 'derushed', 'edited-project', 'editing-project', 'none', 'unknown'].includes(
					option.value
				)
			)
		};
	}

	if (question.id === 'shortsSource' && answers.projectType === 'gaming-clip') {
		return {
			...question,
			title: copy.gamingShortsSource,
			options: question.options?.filter(
				(option) => option.value !== 'script-voice' && option.value !== 'from-scratch'
			)
		};
	}

	if (
		question.id === 'structure' &&
		(answers.providedFiles.includes('script') || answers.ugcAssets.includes('script'))
	) {
		return {
			...question,
			title: copy.providedScriptStatus,
			options: question.options?.filter(
				(option) => option.value === 'complete' || option.value === 'idea'
			)
		};
	}

	return question;
};

export const isEstimateQuestionVisible = (question: EstimateQuestion, answers: EstimateAnswers) => {
	switch (question.id) {
		case 'footageDuration':
			return shouldAskFootageDuration(answers);
		case 'shortsCount':
			return projectIncludesShorts(answers.projectType);
		case 'shortDuration':
			return projectHasLongAndShortOutputs(answers.projectType);
		case 'sources':
			return shouldAskSources(answers);
		case 'structure':
			return shouldAskStructure(answers);
		case 'shortsSource':
			return shouldAskShortsSource(answers);
		case 'moments':
			return shouldAskMoments(answers);
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

const emptyAnswerFor = (id: keyof EstimateAnswers): string | string[] =>
	Array.isArray(emptyEstimateAnswers[id]) ? [] : '';

export const sanitizeEstimateAnswers = (
	answers: EstimateAnswers,
	questions: EstimateQuestion[],
	copy: EstimateCopy['contextualQuestions']
): EstimateAnswers => {
	const sanitized: EstimateAnswers = {
		...answers,
		providedFiles: [...answers.providedFiles],
		ugcAssets: [...answers.ugcAssets]
	};

	for (const question of questions) {
		if (!isEstimateQuestionVisible(question, sanitized)) {
			(sanitized as unknown as Record<string, string | string[]>)[question.id] = emptyAnswerFor(
				question.id
			);
			continue;
		}

		const contextualQuestion = getContextualEstimateQuestion(question, sanitized, copy);
		const validValues = new Set(contextualQuestion.options?.map((option) => option.value) ?? []);
		if (contextualQuestion.type === 'multi') {
			const currentValues = sanitized[question.id];
			if (Array.isArray(currentValues)) {
				(sanitized as unknown as Record<string, string | string[]>)[question.id] =
					currentValues.filter((value) => validValues.has(value));
			}
		} else if (contextualQuestion.type === 'single') {
			const currentValue = sanitized[question.id];
			if (typeof currentValue === 'string' && currentValue && !validValues.has(currentValue)) {
				(sanitized as unknown as Record<string, string | string[]>)[question.id] = '';
			}
		}
	}

	return sanitized;
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

	let reviewHours = shouldAskFootageDuration(answers)
		? optionValue(answers.footageDuration, 3, {
				'lt-15': 0.5,
				'15-30': 1,
				'30-60': 2,
				'1-2': 3.5,
				'2-4': 6,
				'gt-4': 9,
				unknown: 3
			})
		: 0;

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
	const shortDuration = projectHasLongAndShortOutputs(answers.projectType)
		? answers.shortDuration
		: answers.finalDuration;
	const perShortHours = optionValue(shortDuration, 1.2, {
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
		? longEditHours + (hasShorts ? shortEditHours : 0)
		: isShort
			? shortEditHours
			: longEditHours;

	const levelMultiplier = optionValue(answers.editingLevel, 0.8, {
		simple: 0.6,
		advanced: 0.8,
		premium: 1.1
	});

	const sourceMultiplier = shouldAskSources(answers)
		? optionValue(answers.sources, 1.08, {
				'1': 1,
				'2': 1.05,
				'3': 1.1,
				'4-plus': 1.2,
				unknown: 1.08
			})
		: 1;

	let hours = (setupHours + reviewHours + outputHours) * levelMultiplier * sourceMultiplier;

	const structureHours = shouldAskStructure(answers)
		? optionValue(answers.structure, 0.5, {
				complete: 0,
				idea: 0.5,
				none: 1.25,
				unnecessary: 0
			})
		: 0;
	hours += structureHours;
	hours += optionValue(answers.styleReference, 0.25, {
		example: 0,
		proposal: 0.5,
		idea: 0.25
	});

	if (hasShorts) {
		if (shouldAskMoments(answers)) {
			hours += optionValue(answers.moments, 0.75, {
				precise: 0,
				approximate: 0.35,
				find: 0.75,
				unknown: 0.5
			});
		}

		if (shouldAskShortsSource(answers) && answers.shortsSource === 'from-scratch') hours += 0.75;
		if (shouldAskShortsSource(answers) && answers.shortsSource === 'script-voice') hours += 0.25;
	}

	const subtitleHoursPerOutput = optionValue(answers.subtitles, 0.15, {
		none: 0,
		automatic: 0.15,
		phrase: 0.3,
		word: 0.5
	});
	const subtitleUnits = hasShorts ? Math.max(1, quantity) : Math.max(1, longEditHours / 2);
	hours += Math.min(4, subtitleHoursPerOutput * subtitleUnits);

	if (projectType === 'ugc-shorts') {
		if (answers.ugcAssets.includes('none')) hours += 1;
		else if (!answers.providedFiles.includes('script') && !answers.ugcAssets.includes('script'))
			hours += 0.5;
	}

	const resolutionMultiplier = optionValue(answers.resolution, 1, {
		'1080p': 1,
		'1440p': 1,
		'4k': 1.02,
		unknown: 1
	});
	const projectFilesMultiplier = answers.projectFiles === 'yes' ? 1.03 : 1;
	const deadlineMultiplier = optionValue(answers.deadline, 1, {
		'not-urgent': 0.9,
		'1-2-weeks': 1,
		'3-5-days': 1.05,
		'24-48h': 1.1,
		'very-urgent': 1.15
	});
	hours *= resolutionMultiplier * projectFilesMultiplier * deadlineMultiplier;

	const minimumPrice = isLong ? 15 : isShort ? 5 : 10;
	const centralPrice = Math.max(minimumPrice, hours * hourlyRate);

	const valuesThatCanBeUnknown = [
		...(shouldAskFootageDuration(answers) ? [answers.footageDuration] : []),
		...(shouldAskSources(answers) ? [answers.sources] : []),
		answers.resolution,
		...(hasShorts ? [answers.shortsCount] : []),
		...(projectHasLongAndShortOutputs(answers.projectType) ? [answers.shortDuration] : []),
		...(shouldAskMoments(answers) ? [answers.moments] : [])
	];
	const unknownValues = valuesThatCanBeUnknown.filter((value) => value === 'unknown').length;
	let uncertaintyRate = 0.12 + Math.min(0.12, unknownValues * 0.03);
	if (projectType === 'other') uncertaintyRate += 0.05;
	if (answers.specificRequests.trim()) uncertaintyRate += 0.02;
	if (
		projectType === 'ugc-shorts' &&
		(answers.ugcAssets.includes('none') || answers.ugcAssets.includes('unknown'))
	) {
		uncertaintyRate += 0.04;
	}
	uncertaintyRate = Math.min(0.3, uncertaintyRate);

	const minimum = Math.max(minimumPrice, roundToFive(centralPrice * (1 - uncertaintyRate)));
	const maximum = Math.max(minimum + 5, roundToFive(centralPrice * (1 + uncertaintyRate)));

	const weightedDrivers: Array<[EstimateDriver, number]> = [
		['footage', reviewHours],
		['output', outputHours],
		['editing-level', Math.abs(levelMultiplier - 1) * (setupHours + outputHours)],
		['shorts-volume', hasShorts ? quantity : 0],
		['subtitles', subtitleHoursPerOutput * subtitleUnits],
		['sources', (sourceMultiplier - 1) * (reviewHours + outputHours)],
		['structure', structureHours],
		['deadline', Math.abs(deadlineMultiplier - 1) * hours],
		['resolution', (resolutionMultiplier - 1) * hours],
		['project-files', answers.projectFiles === 'yes' ? hours * 0.03 : 0]
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
	const primaryProvidedFile =
		answers.providedFiles.length === 1
			? answers.providedFiles[0]
			: answers.providedFiles.length
				? 'multiple'
				: '';
	const localized =
		locale === 'fr'
			? {
					projectType: 'Type de projet',
					objective: 'Objectif',
					level: 'Niveau de montage',
					subtitles: 'Sous-titres',
					structure: 'Script ou structure',
					shortsSource: 'Source des shorts',
					moments: 'Sélection des meilleurs moments',
					ugcAssets: 'Éléments UGC fournis',
					deadline: 'Délai',
					resolution: 'Résolution',
					projectFiles: 'Fichiers de projet à livrer',
					contact: 'Moyen de contact indiqué',
					constraints: 'Contraintes',
					estimate: 'Estimation indicative',
					providedBudget: 'Budget indiqué',
					footage: 'Rushs à traiter',
					final: 'Durée finale',
					shorts: 'Nombre de shorts',
					shortDuration: 'Durée moyenne de chaque short',
					sources: 'Sources',
					files: 'Fichiers fournis'
				}
			: {
					projectType: 'Project type',
					objective: 'Goal',
					level: 'Editing level',
					subtitles: 'Subtitles',
					structure: 'Script or structure',
					shortsSource: 'Shorts source',
					moments: 'Best moment selection',
					ugcAssets: 'UGC assets provided',
					deadline: 'Deadline',
					resolution: 'Resolution',
					projectFiles: 'Project files to deliver',
					contact: 'Provided contact method',
					constraints: 'Constraints',
					estimate: 'Indicative estimate',
					providedBudget: 'Provided budget',
					footage: 'Footage to review',
					final: 'Final length',
					shorts: 'Number of shorts',
					shortDuration: 'Average length of each short',
					sources: 'Sources',
					files: 'Files provided'
				};

	const descriptionLines = [
		answers.projectDescription.trim(),
		line(localized.projectType, answerLabel('projectType', answers.projectType)),
		line(localized.objective, answerLabel('objective', answers.objective)),
		line(localized.level, answerLabel('editingLevel', answers.editingLevel)),
		line(localized.subtitles, answerLabel('subtitles', answers.subtitles)),
		line(localized.deadline, answerLabel('deadline', answers.deadline)),
		line(localized.resolution, answerLabel('resolution', answers.resolution)),
		line(localized.projectFiles, answerLabel('projectFiles', answers.projectFiles))
	];
	if (shouldAskStructure(answers)) {
		descriptionLines.push(line(localized.structure, answerLabel('structure', answers.structure)));
	}
	if (shouldAskShortsSource(answers)) {
		descriptionLines.push(
			line(localized.shortsSource, answerLabel('shortsSource', answers.shortsSource))
		);
	}
	if (shouldAskMoments(answers)) {
		descriptionLines.push(line(localized.moments, answerLabel('moments', answers.moments)));
	}
	if (isUgcProject(answers.projectType) && answers.ugcAssets.length > 0) {
		descriptionLines.push(
			line(
				localized.ugcAssets,
				answers.ugcAssets.map((value) => answerLabel('ugcAssets', value)).join(', ')
			)
		);
	}
	if (!validEmail(answers.contact)) descriptionLines.push(line(localized.contact, answers.contact));
	if (answers.specificRequests.trim()) descriptionLines.push(answers.specificRequests.trim());
	if (answers.constraints.trim()) {
		descriptionLines.push(line(localized.constraints, answers.constraints.trim()));
	}

	const footageLines = [
		...(shouldAskFootageDuration(answers)
			? [line(localized.footage, answerLabel('footageDuration', answers.footageDuration))]
			: []),
		line(localized.final, answerLabel('finalDuration', answers.finalDuration)),
		...(shouldAskSources(answers)
			? [line(localized.sources, answerLabel('sources', answers.sources))]
			: []),
		line(
			localized.files,
			answers.providedFiles.map((value) => answerLabel('providedFiles', value)).join(', ')
		)
	];
	if (projectIncludesShorts(answers.projectType)) {
		footageLines.push(line(localized.shorts, answerLabel('shortsCount', answers.shortsCount)));
	}
	if (projectHasLongAndShortOutputs(answers.projectType)) {
		footageLines.push(
			line(localized.shortDuration, answerLabel('shortDuration', answers.shortDuration))
		);
	}

	return {
		name: answers.name.trim(),
		email: validEmail(answers.contact) ? answers.contact.trim() : '',
		style: answers.projectType ? projectStyleMap[answers.projectType] : '',
		objective: answers.objective,
		providedFiles: primaryProvidedFile,
		finalDuration: answers.finalDuration,
		footageDuration: answers.footageDuration,
		editingLevel: answers.editingLevel,
		deadline: answers.deadline,
		subtitles: answers.subtitles,
		projectDescription: descriptionLines.filter(Boolean).join('\n'),
		footageDetails: footageLines.join('\n'),
		budget: [
			`${localized.estimate}: ${estimate.minimum}–${estimate.maximum} €`,
			answers.budgetPreference === 'yes' && answers.budgetAmount.trim()
				? `${localized.providedBudget}: ${answers.budgetAmount.trim()}`
				: ''
		]
			.filter(Boolean)
			.join(' · '),
		referenceLink: answers.styleReference === 'example' ? answers.referenceLink.trim() : '',
		specificRequests: answers.specificRequests.trim(),
		constraints: answers.constraints.trim(),
		usefulLinks: ''
	};
};
