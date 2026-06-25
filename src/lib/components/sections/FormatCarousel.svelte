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
	import type { ProjectChoice } from '$lib/types/project';

	type Props = {
		selected: ProjectChoice;
		onSelect: (choice: ProjectChoice) => void;
		prominent?: boolean;
	};

	let { selected, onSelect, prominent = false }: Props = $props();
	let carousel: HTMLDivElement;

	const choices = [
		...editingFormats,
		{
			id: 'custom' as const,
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
	<div class={['mb-5 flex justify-end gap-2', prominent ? 'md:mb-8' : '']}>
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
		class={[
			'scrollbar-hidden flex snap-x snap-mandatory overflow-x-auto pb-6',
			prominent
				? '-mx-5 gap-6 px-[9vw] sm:mx-0 sm:px-[calc(50%_-_13rem)]'
				: '-mx-5 gap-4 px-5 sm:mx-0 sm:px-0'
		]}
		aria-label="Choisir un style de montage"
	>
		{#each choices as choice (choice.id)}
			<button
				class={[
					'group relative shrink-0 snap-center overflow-hidden border text-left transition duration-300',
					prominent
						? 'min-h-[29rem] w-[82vw] max-w-[27rem] rounded-[1.75rem] p-8 sm:w-[26rem]'
						: 'min-h-[22rem] w-[82vw] max-w-[22rem] rounded-[1.4rem] p-6 sm:w-[21rem]',
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

				<span class="relative flex items-start">
					<span
						class={[
							'grid place-items-center rounded-2xl border',
							prominent ? 'size-16' : 'size-12',
							selected === choice.id
								? 'border-violet-200/40 bg-violet-200/15 text-violet-100'
								: 'border-white/10 bg-black/20 text-slate-200'
						]}
					>
						{#if choice.id === 'gaming-long-form'}
							<MonitorPlay size={prominent ? 29 : 23} aria-hidden="true" />
						{:else if choice.id === 'gaming-short-form'}
							<Gamepad2 size={prominent ? 29 : 23} aria-hidden="true" />
						{:else if choice.id === 'explainer-short-form'}
							<MessageSquareText size={prominent ? 29 : 23} aria-hidden="true" />
						{:else if choice.id === 'business-promo'}
							<Store size={prominent ? 29 : 23} aria-hidden="true" />
						{:else}
							<WandSparkles size={prominent ? 29 : 23} aria-hidden="true" />
						{/if}
					</span>
				</span>

				<span class={['relative block', prominent ? 'mt-16' : 'mt-10']}>
					<span
						class={['block font-bold text-balance text-white', prominent ? 'text-4xl' : 'text-2xl']}
						>{choice.title}</span
					>
					<span
						class={[
							'mt-4 block text-slate-300',
							prominent ? 'text-base leading-7' : 'text-sm leading-6'
						]}>{choice.promise}</span
					>
				</span>

				<span
					class={[
						'absolute flex items-center justify-end border-t border-white/10 text-white',
						prominent ? 'bottom-8 left-8 right-8 pt-7' : 'bottom-6 left-6 right-6 pt-5'
					]}
				>
					<ArrowRight class="transition group-hover:translate-x-1" size={18} aria-hidden="true" />
				</span>
			</button>
		{/each}
	</div>
</div>
