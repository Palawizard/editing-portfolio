<script lang="ts">
	import { onMount } from 'svelte';
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
	let middleGroup: HTMLDivElement | undefined;
	let animationFrame = 0;
	let lastFrame = 0;
	let paused = $state(false);
	let locked = $state(false);

	const choices = [
		...editingFormats,
		{
			id: 'custom' as const,
			title: 'Commande personnalisée',
			promise: 'Un format construit autour de ton idée.',
			description:
				'Tu as une référence précise ou un projet qui ne rentre pas dans une case ? On définit ensemble le rythme et la direction.',
			highlights: ['Direction sur mesure', 'Format libre', 'Échange avant montage']
		}
	];

	const getSegmentWidth = () => middleGroup?.offsetWidth ?? 0;

	const captureMiddleGroup = (node: HTMLDivElement, groupIndex: number) => {
		if (groupIndex === 1) middleGroup = node;

		return {
			destroy() {
				if (middleGroup === node) middleGroup = undefined;
			}
		};
	};

	const keepInLoop = () => {
		const segmentWidth = getSegmentWidth();
		if (!segmentWidth) return;

		if (carousel.scrollLeft >= segmentWidth * 2) {
			carousel.scrollLeft -= segmentWidth;
		} else if (carousel.scrollLeft < segmentWidth * 0.15) {
			carousel.scrollLeft += segmentWidth;
		}
	};

	const animate = (time: number) => {
		if (!lastFrame) lastFrame = time;
		const delta = Math.min(time - lastFrame, 32);
		lastFrame = time;

		if (!paused && !locked) {
			carousel.scrollLeft += delta * 0.025;
			keepInLoop();
		}

		animationFrame = requestAnimationFrame(animate);
	};

	const scrollCarousel = (direction: -1 | 1) => {
		carousel.scrollBy({
			left: carousel.clientWidth * 0.7 * direction,
			behavior: 'smooth'
		});
	};

	const centerSelected = (choice: ProjectChoice) => {
		if (!middleGroup) return;
		const target = middleGroup.querySelector<HTMLElement>(`[data-choice="${choice}"]`);
		if (!target) return;

		const left =
			middleGroup.offsetLeft + target.offsetLeft - (carousel.clientWidth - target.offsetWidth) / 2;
		carousel.scrollTo({ left, behavior: 'smooth' });
	};

	const selectChoice = (choice: ProjectChoice) => {
		locked = true;
		onSelect(choice);

		requestAnimationFrame(() => {
			requestAnimationFrame(() => centerSelected(choice));
		});
	};

	onMount(() => {
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		carousel.scrollLeft = getSegmentWidth();

		if (!reduceMotion) {
			animationFrame = requestAnimationFrame(animate);
		}

		const handleResize = () => {
			if (locked) {
				centerSelected(selected);
			} else {
				carousel.scrollLeft = getSegmentWidth();
			}
		};

		window.addEventListener('resize', handleResize);

		return () => {
			cancelAnimationFrame(animationFrame);
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div
	class="relative"
	role="region"
	aria-label="Carrousel des styles de montage"
	onpointerenter={() => (paused = true)}
	onpointerleave={() => (paused = false)}
	onfocusin={() => (paused = true)}
	onfocusout={() => (paused = false)}
>
	<div class={['mb-2 flex justify-end gap-2', prominent ? 'md:mb-3' : '']}>
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
			'scrollbar-hidden -mx-5 flex overflow-x-auto px-5 py-12 sm:mx-0 sm:px-0',
			locked ? 'snap-x snap-mandatory' : ''
		]}
		aria-label="Choisir un style de montage"
		onscroll={keepInLoop}
	>
		{#each [0, 1, 2] as groupIndex (groupIndex)}
			<div
				use:captureMiddleGroup={groupIndex}
				class={['flex shrink-0 pr-6', prominent ? 'gap-6' : 'gap-4']}
			>
				{#each choices as choice (choice.id)}
					<button
						data-choice={choice.id}
						class={[
							'group relative shrink-0 snap-center overflow-hidden border text-left transition duration-500',
							prominent
								? 'min-h-[29rem] w-[82vw] max-w-[27rem] rounded-[1.75rem] p-8 sm:w-[26rem]'
								: 'min-h-[22rem] w-[82vw] max-w-[22rem] rounded-[1.4rem] p-6 sm:w-[21rem]',
							locked && selected === choice.id
								? 'z-10 scale-[1.08] border-violet-200 bg-violet-300/[0.14] shadow-[0_28px_100px_rgb(81_49_150/0.42)]'
								: selected === choice.id
									? 'border-violet-300/60 bg-violet-300/[0.1]'
									: 'border-white/10 bg-white/[0.035] hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.065]'
						]}
						type="button"
						aria-pressed={locked && selected === choice.id}
						tabindex={groupIndex === 1 ? 0 : -1}
						onclick={() => selectChoice(choice.id)}
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
								class={[
									'block font-bold text-balance text-white',
									prominent ? 'text-4xl leading-[1.08]' : 'text-2xl leading-tight'
								]}>{choice.title}</span
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
							<ArrowRight
								class="transition group-hover:translate-x-1"
								size={18}
								aria-hidden="true"
							/>
						</span>
					</button>
				{/each}
			</div>
		{/each}
	</div>
</div>
