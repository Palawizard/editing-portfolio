<script lang="ts">
	import { ArrowRight, Clock3, RotateCcw } from '@lucide/svelte';
	import type { EstimateCopy, PriceEstimate } from '$lib/types/estimate';

	type Props = {
		estimate: PriceEstimate;
		copy: EstimateCopy['result'];
		onPrefill: () => void;
		onRestart: () => void;
	};

	let { estimate, copy, onPrefill, onRestart }: Props = $props();
</script>

<div class="panel p-6 md:p-10">
	<h2 class="display-title text-4xl text-paper md:text-5xl">{copy.title}</h2>

	<div class="mt-8 rounded-[24px] bg-paper p-6 text-white md:p-8">
		<p class="label">{copy.priceLabel}</p>
		<p class="display-title mt-2 text-4xl tabular-nums sm:text-5xl">
			{estimate.minimum}–{estimate.maximum} €
		</p>
	</div>

	<div class="mt-3 grid gap-3 sm:grid-cols-2">
		<div class="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-[var(--shadow)]">
			<Clock3 class="text-live" size={20} strokeWidth={1.5} aria-hidden="true" />
			<div>
				<p class="text-xs font-bold text-mute">{copy.hoursLabel}</p>
				<p class="mt-1 font-semibold text-paper">≈ {estimate.estimatedHours} h</p>
			</div>
		</div>
		<div class="rounded-2xl bg-white p-4 shadow-[var(--shadow)]">
			<p class="text-xs font-bold text-mute">{copy.confidenceLabel}</p>
			<p class="mt-1 font-semibold text-paper">{copy.confidence[estimate.uncertainty]}</p>
		</div>
	</div>

	<div class="mt-7">
		<h3 class="label text-paper">{copy.driversTitle}</h3>
		<ul class="mt-4 flex flex-wrap gap-2 text-sm text-paper">
			{#each estimate.drivers as driver (driver)}
				<li class="rounded-full bg-white px-3.5 py-2 font-bold shadow-[var(--shadow)]">
					{copy.drivers[driver]}
				</li>
			{/each}
		</ul>
	</div>

	<p class="mt-7 text-sm leading-6 text-mute">{copy.disclaimer}</p>
	<p class="mt-3 text-sm leading-6 text-paper">{copy.answersKept}</p>

	<div class="mt-7 flex flex-col gap-2 sm:flex-row">
		<button
			type="button"
			class="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-paper px-6 py-3 text-[0.9375rem] font-extrabold text-white shadow-[0_12px_24px_-12px_rgb(42_20_9/0.8)] transition-transform duration-150 active:scale-[0.97]"
			onclick={onPrefill}
		>
			{copy.prefill}
			<ArrowRight size={17} aria-hidden="true" />
		</button>
		<button
			type="button"
			class="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-[0.9375rem] font-extrabold text-paper shadow-[var(--shadow)] transition-transform duration-150 active:scale-[0.97]"
			onclick={onRestart}
		>
			<RotateCcw size={17} aria-hidden="true" />
			{copy.restart}
		</button>
	</div>
</div>
