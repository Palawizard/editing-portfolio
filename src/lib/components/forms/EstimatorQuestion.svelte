<script lang="ts">
	import { Check } from '@lucide/svelte';
	import { tick } from 'svelte';
	import type { EstimateQuestion } from '$lib/types/estimate';

	type Props = {
		question: EstimateQuestion;
		answer: string | string[];
		error?: string;
		onAnswer: (value: string | string[]) => void;
	};

	let { question, answer, error = '', onAnswer }: Props = $props();
	let questionRoot = $state<HTMLDivElement>();

	const textValue = $derived(typeof answer === 'string' ? answer : '');
	const selectedValues = $derived(Array.isArray(answer) ? answer : []);
	const fieldClasses =
		'min-h-12 w-full rounded-2xl border-2 border-transparent bg-white px-5 py-4 text-base text-paper caret-live shadow-[inset_0_1px_2px_rgb(42_20_9/0.08)] outline-none transition-colors placeholder:text-mute/80 hover:border-peach focus:border-paper aria-invalid:border-bad';

	$effect(() => {
		const questionId = question.id;
		tick().then(() => {
			if (question.id === questionId) {
				questionRoot?.querySelector<HTMLElement>('input, textarea, button')?.focus();
			}
		});
	});

	const toggleOption = (value: string) => {
		const exclusiveValues = ['none', 'unknown'];
		if (exclusiveValues.includes(value)) {
			onAnswer(selectedValues.includes(value) ? [] : [value]);
			return;
		}

		const incompatibleValue =
			question.id === 'providedFiles' && value === 'raw'
				? 'derushed'
				: question.id === 'providedFiles' && value === 'derushed'
					? 'raw'
					: '';

		const withoutExclusive = selectedValues.filter(
			(item) => !exclusiveValues.includes(item) && item !== value && item !== incompatibleValue
		);
		onAnswer(selectedValues.includes(value) ? withoutExclusive : [...withoutExclusive, value]);
	};
</script>

<div bind:this={questionRoot}>
	{#if question.type === 'single'}
		<div class="grid gap-3" role="radiogroup" aria-label={question.title}>
			{#each question.options ?? [] as option (option.value)}
				<label
					class={[
						'group flex min-h-14 cursor-pointer items-center gap-4 rounded-2xl border-2 px-4 py-3.5 transition-colors sm:px-5',
						textValue === option.value
							? 'border-paper bg-paper text-white'
							: 'border-transparent bg-white text-paper shadow-[var(--shadow)] hover:border-peach'
					]}
				>
					<input
						class="size-4 accent-[#ff5a1f]"
						type="radio"
						name={question.id}
						value={option.value}
						checked={textValue === option.value}
						onchange={() => onAnswer(option.value)}
					/>
					<span class="leading-6">{option.label}</span>
				</label>
			{/each}
		</div>
	{:else if question.type === 'multi'}
		<div class="grid gap-3 sm:grid-cols-2" role="group" aria-label={question.title}>
			{#each question.options ?? [] as option (option.value)}
				{@const selected = selectedValues.includes(option.value)}
				<button
					type="button"
					class={[
						'flex min-h-14 items-center gap-4 rounded-2xl border-2 px-4 py-3.5 text-left transition-[background-color,border-color,transform] duration-150 active:scale-[0.98] sm:px-5',
						selected
							? 'border-paper bg-paper text-white'
							: 'border-transparent bg-white text-paper shadow-[var(--shadow)] hover:border-peach'
					]}
					aria-pressed={selected}
					onclick={() => toggleOption(option.value)}
				>
					<span
						class={[
							'grid size-5 shrink-0 place-items-center rounded-md border-2',
							selected ? 'border-live bg-live text-white' : 'border-peach-deep'
						]}
					>
						{#if selected}<Check size={14} strokeWidth={3} aria-hidden="true" />{/if}
					</span>
					<span class="leading-6">{option.label}</span>
				</button>
			{/each}
		</div>
	{:else if question.type === 'textarea'}
		<textarea
			class={[fieldClasses, 'min-h-40 resize-y']}
			aria-label={question.title}
			value={textValue}
			placeholder={question.placeholder}
			maxlength="2000"
			aria-invalid={error ? 'true' : undefined}
			oninput={(event) => onAnswer(event.currentTarget.value)}></textarea>
	{:else}
		<input
			class={fieldClasses}
			aria-label={question.title}
			type={question.type}
			value={textValue}
			placeholder={question.placeholder}
			autocomplete={question.autocomplete}
			maxlength="300"
			aria-invalid={error ? 'true' : undefined}
			oninput={(event) => onAnswer(event.currentTarget.value)}
		/>
	{/if}

	{#if error}
		<p class="mt-4 text-sm font-semibold text-bad" role="alert">{error}</p>
	{/if}
</div>
