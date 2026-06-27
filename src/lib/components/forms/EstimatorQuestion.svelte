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
		'w-full rounded-2xl border border-white/12 bg-black/25 px-5 py-4 text-base text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-200/60 focus:ring-2 focus:ring-cyan-200/15 aria-invalid:border-rose-300/70';

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

		const withoutExclusive = selectedValues.filter(
			(item) => !exclusiveValues.includes(item) && item !== value
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
						'group flex min-h-14 cursor-pointer items-center gap-4 rounded-2xl border px-4 py-3.5 transition sm:px-5',
						textValue === option.value
							? 'border-violet-300/60 bg-violet-300/[0.12] text-white'
							: 'border-white/10 bg-black/20 text-slate-200 hover:border-white/25 hover:bg-white/[0.04]'
					]}
				>
					<input
						class="size-4 accent-violet-300"
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
						'flex min-h-14 items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition sm:px-5',
						selected
							? 'border-violet-300/60 bg-violet-300/[0.12] text-white'
							: 'border-white/10 bg-black/20 text-slate-200 hover:border-white/25 hover:bg-white/[0.04]'
					]}
					aria-pressed={selected}
					onclick={() => toggleOption(option.value)}
				>
					<span
						class={[
							'grid size-5 shrink-0 place-items-center rounded-md border',
							selected ? 'border-violet-200 bg-violet-200 text-slate-950' : 'border-white/25'
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
		<p class="mt-4 text-sm font-medium text-rose-200" role="alert">{error}</p>
	{/if}
</div>
