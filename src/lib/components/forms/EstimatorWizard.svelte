<script lang="ts">
	import { ArrowLeft, ArrowRight, LockKeyhole } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import EstimateResult from '$lib/components/forms/EstimateResult.svelte';
	import EstimatorQuestion from '$lib/components/forms/EstimatorQuestion.svelte';
	import { getLocaleContext } from '$lib/i18n/context';
	import {
		emptyEstimateAnswers,
		type EstimateAnswers,
		type PriceEstimate
	} from '$lib/types/estimate';
	import {
		ESTIMATE_PREFILL_STORAGE_KEY,
		buildContactPrefill,
		calculatePriceEstimate,
		getContextualEstimateQuestion,
		isEstimateQuestionVisible,
		sanitizeEstimateAnswers
	} from '$lib/utils/estimate';

	const i18n = getLocaleContext();
	const copy = $derived(i18n.content.estimateCopy);
	let answers = $state<EstimateAnswers>({
		...emptyEstimateAnswers,
		providedFiles: [],
		ugcAssets: []
	});
	let currentIndex = $state(0);
	let error = $state('');
	let estimate = $state<PriceEstimate>();

	const visibleQuestions = $derived(
		copy.questions.filter((question) => isEstimateQuestionVisible(question, answers))
	);
	const rawCurrentQuestion = $derived(visibleQuestions[currentIndex]);
	const currentQuestion = $derived(
		rawCurrentQuestion
			? getContextualEstimateQuestion(rawCurrentQuestion, answers, copy.contextualQuestions)
			: undefined
	);
	const currentAnswer = $derived(currentQuestion ? answers[currentQuestion.id] : '');
	const progress = $derived(
		visibleQuestions.length > 0 ? ((currentIndex + 1) / visibleQuestions.length) * 100 : 0
	);

	const setAnswer = (value: string | string[]) => {
		if (!currentQuestion) return;
		const updatedAnswers = {
			...answers,
			providedFiles: [...answers.providedFiles],
			ugcAssets: [...answers.ugcAssets]
		};
		(updatedAnswers as unknown as Record<string, string | string[]>)[currentQuestion.id] = value;
		answers = sanitizeEstimateAnswers(updatedAnswers, copy.questions, copy.contextualQuestions);
		error = '';
	};

	const validateCurrent = () => {
		if (!currentQuestion || !currentQuestion.required) return true;
		const value = answers[currentQuestion.id];
		const isEmpty = Array.isArray(value) ? value.length === 0 : !value.trim();
		if (isEmpty) {
			error = copy.requiredError;
			return false;
		}
		if (
			currentQuestion.type === 'single' &&
			!Array.isArray(value) &&
			currentQuestion.options &&
			!currentQuestion.options.some((option) => option.value === value)
		) {
			error = copy.requiredError;
			return false;
		}
		if (
			!Array.isArray(value) &&
			currentQuestion.minLength &&
			value.trim().length < currentQuestion.minLength
		) {
			error = copy.minimumError;
			return false;
		}
		return true;
	};

	const next = () => {
		if (!validateCurrent()) return;
		if (currentIndex >= visibleQuestions.length - 1) {
			answers = sanitizeEstimateAnswers(answers, copy.questions, copy.contextualQuestions);
			estimate = calculatePriceEstimate(answers);
			window.scrollTo({ top: 0, behavior: 'smooth' });
			return;
		}
		currentIndex += 1;
		error = '';
	};

	const previous = () => {
		if (currentIndex === 0) return;
		currentIndex -= 1;
		error = '';
	};

	const restart = () => {
		answers = { ...emptyEstimateAnswers, providedFiles: [], ugcAssets: [] };
		currentIndex = 0;
		error = '';
		estimate = undefined;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const prefillContact = async () => {
		if (!estimate) return;
		const sanitizedAnswers = sanitizeEstimateAnswers(
			answers,
			copy.questions,
			copy.contextualQuestions
		);
		const prefill = buildContactPrefill(sanitizedAnswers, estimate, copy.questions, i18n.locale);
		sessionStorage.setItem(ESTIMATE_PREFILL_STORAGE_KEY, JSON.stringify(prefill));
		await goto(resolve('/contact'));
	};
</script>

{#if estimate}
	<EstimateResult {estimate} copy={copy.result} onPrefill={prefillContact} onRestart={restart} />
{:else if currentQuestion}
	<div
		class="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 shadow-[var(--shadow-premium)] sm:p-7 md:p-10"
	>
		<div
			class="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400"
		>
			<span>{copy.progress} {currentIndex + 1} / {visibleQuestions.length}</span>
			<span class="text-cyan-200">{currentQuestion.section}</span>
		</div>
		<div class="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.07]" aria-hidden="true">
			<div
				class="h-full rounded-full bg-gradient-to-r from-violet-300 to-cyan-300 transition-[width] duration-300"
				style={`width: ${progress}%`}
			></div>
		</div>

		<div class="mt-8 md:mt-10">
			<h2 class="max-w-3xl text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
				{currentQuestion.title}
			</h2>
			{#if currentQuestion.help}
				<p class="mt-3 max-w-2xl text-sm leading-6 text-slate-400">{currentQuestion.help}</p>
			{/if}
			<div class="mt-7">
				{#key currentQuestion.id}
					<EstimatorQuestion
						question={currentQuestion}
						answer={currentAnswer}
						{error}
						onAnswer={setAnswer}
					/>
				{/key}
			</div>
		</div>

		<div
			class="mt-9 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between"
		>
			<button
				type="button"
				class="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.06] hover:text-white disabled:invisible"
				disabled={currentIndex === 0}
				onclick={previous}
			>
				<ArrowLeft size={17} aria-hidden="true" />
				{copy.previous}
			</button>
			<button
				type="button"
				class="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-violet-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-200"
				onclick={next}
			>
				{currentIndex === visibleQuestions.length - 1 ? copy.showEstimate : copy.next}
				<ArrowRight size={17} aria-hidden="true" />
			</button>
		</div>

		<p class="mt-5 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
			<LockKeyhole size={14} aria-hidden="true" />
			{copy.privacy}
		</p>
	</div>
{/if}
