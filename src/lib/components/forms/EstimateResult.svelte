<script lang="ts">
	import { ArrowRight, Clock3, RotateCcw, Sparkles } from '@lucide/svelte';
	import type { EstimateCopy, PriceEstimate } from '$lib/types/estimate';

	type Props = {
		estimate: PriceEstimate;
		copy: EstimateCopy['result'];
		onPrefill: () => void;
		onRestart: () => void;
	};

	let { estimate, copy, onPrefill, onRestart }: Props = $props();
</script>

<div
	class="rounded-[1.75rem] border border-violet-300/25 bg-white/[0.045] p-6 shadow-[var(--shadow-premium)] md:p-10"
>
	<div class="grid size-13 place-items-center rounded-2xl bg-violet-300/12 text-violet-100">
		<Sparkles size={24} aria-hidden="true" />
	</div>
	<p class="mt-6 text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200">{copy.eyebrow}</p>
	<h2 class="mt-3 text-3xl font-bold text-white md:text-4xl">{copy.title}</h2>

	<div class="mt-8 rounded-2xl border border-violet-300/20 bg-violet-300/[0.09] p-6 md:p-8">
		<p class="text-sm font-semibold text-violet-100">{copy.priceLabel}</p>
		<p class="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">
			{estimate.minimum}–{estimate.maximum} €
		</p>
	</div>

	<div class="mt-5 grid gap-3 sm:grid-cols-2">
		<div class="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
			<Clock3 class="text-cyan-200" size={20} aria-hidden="true" />
			<div>
				<p class="text-xs text-slate-400">{copy.hoursLabel}</p>
				<p class="mt-0.5 font-semibold text-white">≈ {estimate.estimatedHours} h</p>
			</div>
		</div>
		<div class="rounded-2xl border border-white/10 bg-black/20 p-4">
			<p class="text-xs text-slate-400">{copy.confidenceLabel}</p>
			<p class="mt-0.5 font-semibold text-white">{copy.confidence[estimate.uncertainty]}</p>
		</div>
	</div>

	<div class="mt-7">
		<h3 class="font-semibold text-white">{copy.driversTitle}</h3>
		<ul class="mt-4 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
			{#each estimate.drivers as driver (driver)}
				<li class="rounded-xl border border-white/8 bg-black/15 px-4 py-3">
					{copy.drivers[driver]}
				</li>
			{/each}
		</ul>
	</div>

	<p class="mt-7 text-sm leading-6 text-slate-400">{copy.disclaimer}</p>
	<p class="mt-3 text-sm leading-6 text-slate-300">{copy.answersKept}</p>

	<div class="mt-7 flex flex-col gap-3 sm:flex-row">
		<button
			type="button"
			class="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-violet-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-200"
			onclick={onPrefill}
		>
			{copy.prefill}
			<ArrowRight size={17} aria-hidden="true" />
		</button>
		<button
			type="button"
			class="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/[0.08]"
			onclick={onRestart}
		>
			<RotateCcw size={17} aria-hidden="true" />
			{copy.restart}
		</button>
	</div>
</div>
