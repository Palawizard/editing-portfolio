<script lang="ts">
	import {
		ArrowRight,
		ChevronLeft,
		ChevronRight,
		Gamepad2,
		MessageSquareText,
		MonitorPlay,
		Store,
		WandSparkles
	} from '@lucide/svelte';
	import { editingFormats } from '$lib/content/formats';
	import { projects } from '$lib/content/projects';
	import type { ProjectChoice } from '$lib/types/project';

	type Props = {
		selected: ProjectChoice;
		onSelect: (choice: ProjectChoice) => void;
	};

	let { selected, onSelect }: Props = $props();
	let carousel: HTMLDivElement;

	const choices = [
		...editingFormats.map((format, index) => ({
			...format,
			number: String(index + 1).padStart(2, '0'),
			count: projects.filter((project) => project.category === format.id).length
		})),
		{
			id: 'custom' as const,
			number: '05',
			title: 'Commande personnalisée',
			promise: 'Un format construit autour de ton idée.',
			description:
				'Tu as une référence précise ou un projet qui ne rentre pas dans une case ? On définit ensemble le rythme et la direction.',
			highlights: ['Direction sur mesure', 'Format libre', 'Échange avant montage'],
			count: 0
		}
	];

	const scrollCarousel = (direction: -1 | 1) => {
		carousel.scrollBy({
			left: carousel.clientWidth * 0.72 * direction,
			behavior: 'smooth'
		});
	};
</script>

<div class="relative">
	<div class="mb-5 flex items-center justify-between gap-4">
		<p class="text-sm text-slate-400">Fais glisser ou utilise les flèches</p>
		<div class="hidden gap-2 sm:flex">
			<button
				class="grid size-11 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-white transition hover:border-cyan-200/40 hover:bg-white/[0.08]"
				type="button"
				aria-label="Voir les formats précédents"
				onclick={() => scrollCarousel(-1)}
			>
				<ChevronLeft size={19} aria-hidden="true" />
			</button>
			<button
				class="grid size-11 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-white transition hover:border-cyan-200/40 hover:bg-white/[0.08]"
				type="button"
				aria-label="Voir les formats suivants"
				onclick={() => scrollCarousel(1)}
			>
				<ChevronRight size={19} aria-hidden="true" />
			</button>
		</div>
	</div>

	<div
		bind:this={carousel}
		class="scrollbar-hidden -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 sm:mx-0 sm:px-0"
		aria-label="Choisir un style de montage"
	>
		{#each choices as choice (choice.id)}
			<button
				class={[
					'group relative min-h-[22rem] w-[82vw] max-w-[22rem] shrink-0 snap-center overflow-hidden rounded-[1.4rem] border p-6 text-left transition duration-300 sm:w-[21rem]',
					selected === choice.id
						? 'border-violet-300/70 bg-violet-300/[0.11] shadow-[0_22px_80px_rgb(81_49_150/0.28)]'
						: 'border-white/10 bg-white/[0.035] hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.065]'
				]}
				type="button"
				aria-pressed={selected === choice.id}
				onclick={() => onSelect(choice.id)}
			>
				<span
					class={[
						'absolute -right-16 -top-16 size-48 rounded-full blur-3xl transition',
						choice.id === 'custom' ? 'bg-cyan-300/14' : 'bg-violet-400/16',
						selected === choice.id ? 'opacity-100' : 'opacity-40 group-hover:opacity-80'
					]}
				></span>

				<span class="relative flex items-start justify-between gap-5">
					<span
						class={[
							'grid size-12 place-items-center rounded-2xl border',
							selected === choice.id
								? 'border-violet-200/40 bg-violet-200/15 text-violet-100'
								: 'border-white/10 bg-black/20 text-slate-200'
						]}
					>
						{#if choice.id === 'gaming-long-form'}
							<MonitorPlay size={23} aria-hidden="true" />
						{:else if choice.id === 'gaming-short-form'}
							<Gamepad2 size={23} aria-hidden="true" />
						{:else if choice.id === 'explainer-short-form'}
							<MessageSquareText size={23} aria-hidden="true" />
						{:else if choice.id === 'business-promo'}
							<Store size={23} aria-hidden="true" />
						{:else}
							<WandSparkles size={23} aria-hidden="true" />
						{/if}
					</span>
					<span class="font-mono text-sm text-slate-500">{choice.number}</span>
				</span>

				<span class="relative mt-10 block">
					<span class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
						{choice.id === 'custom'
							? 'Ton idée'
							: `${choice.count} montage${choice.count > 1 ? 's' : ''}`}
					</span>
					<span class="mt-3 block text-2xl font-bold text-balance text-white">{choice.title}</span>
					<span class="mt-3 block text-sm leading-6 text-slate-300">{choice.promise}</span>
				</span>

				<span
					class="absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-white/10 pt-5 text-sm font-semibold text-white"
				>
					<span>{selected === choice.id ? 'Sélectionné' : 'Découvrir'}</span>
					<ArrowRight class="transition group-hover:translate-x-1" size={18} aria-hidden="true" />
				</span>
			</button>
		{/each}
	</div>
</div>
