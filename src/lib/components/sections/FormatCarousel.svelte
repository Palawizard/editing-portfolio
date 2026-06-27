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
	import LazyAutoplayVideo from '$lib/components/media/LazyAutoplayVideo.svelte';
	import {
		initialCategoryAutoplayPreviews,
		selectRandomCategoryAutoplayPreviews
	} from '$lib/content/autoplay-previews';
	import { getLocaleContext } from '$lib/i18n/context';
	import type { ProjectCategory, ProjectChoice } from '$lib/types/project';

	type Props = {
		selected?: ProjectChoice;
		onSelect: (choice: ProjectChoice) => void;
		prominent?: boolean;
	};

	let { selected, onSelect, prominent = false }: Props = $props();
	const i18n = getLocaleContext();
	let carousel: HTMLDivElement;
	let middleGroup: HTMLDivElement | undefined;
	let animationFrame = 0;
	let lastFrame = 0;
	let pendingDistance = 0;
	let locked = $state(false);
	let centering = false;
	let centeringTimeout: ReturnType<typeof setTimeout> | undefined;
	let activeGroupIndex = $state<number | undefined>();
	let activePreviewGroupIndex = $state(1);
	let activePreviewChoice = $state<ProjectCategory | undefined>('gaming-long-form');
	let selectedCategoryPreviews = $state(initialCategoryAutoplayPreviews);
	let previewUpdateFrame = 0;

	const choices = $derived([
		...i18n.content.editingFormats,
		{
			id: 'custom' as const,
			...i18n.content.customFormatChoice
		}
	]);

	const getSegmentWidth = () => middleGroup?.offsetWidth ?? 0;

	const getCardSizeClass = (id: string, isProminent: boolean) => {
		if (id === 'custom') {
			return isProminent
				? 'min-h-[29rem] w-[82vw] max-w-[27rem] sm:w-[26rem]'
				: 'min-h-[22rem] w-[82vw] max-w-[22rem] sm:w-[21rem]';
		}
		if (id === 'gaming-long-form' || id === 'other-format') {
			return isProminent
				? 'aspect-video w-[82vw] max-w-[32rem] sm:w-[30rem]'
				: 'aspect-video w-[82vw] max-w-[28rem] sm:w-[26rem]';
		}
		return isProminent
			? 'aspect-[9/16] w-[52vw] max-w-[18rem] sm:w-[17rem]'
			: 'aspect-[9/16] w-[46vw] max-w-[15rem] sm:w-[14rem]';
	};

	const captureMiddleGroup = (node: HTMLDivElement, groupIndex: number) => {
		if (groupIndex === 1) middleGroup = node;

		return {
			destroy() {
				if (middleGroup === node) middleGroup = undefined;
			}
		};
	};

	const keepInLoop = () => {
		if (centering) return;

		const segmentWidth = getSegmentWidth();
		if (!segmentWidth) return;

		if (carousel.scrollLeft >= segmentWidth * 2) {
			carousel.scrollLeft -= segmentWidth;
			pendingDistance = 0;
			if (activeGroupIndex !== undefined) activeGroupIndex -= 1;
		} else if (carousel.scrollLeft < segmentWidth * 0.15) {
			carousel.scrollLeft += segmentWidth;
			pendingDistance = 0;
			if (activeGroupIndex !== undefined) activeGroupIndex += 1;
		}
	};

	const normalizeToMiddleSegment = () => {
		const segmentWidth = getSegmentWidth();
		if (!segmentWidth) return;

		while (carousel.scrollLeft >= segmentWidth * 2) {
			carousel.scrollLeft -= segmentWidth;
			if (activeGroupIndex !== undefined) activeGroupIndex -= 1;
		}

		while (carousel.scrollLeft < segmentWidth * 0.5) {
			carousel.scrollLeft += segmentWidth;
			if (activeGroupIndex !== undefined) activeGroupIndex += 1;
		}
	};

	const getCards = () =>
		Array.from(carousel.querySelectorAll<HTMLElement>('[data-choice][data-group]'));

	const getNearestCardIndex = (cards: HTMLElement[]) => {
		const carouselCenter = carousel.getBoundingClientRect().left + carousel.clientWidth / 2;

		return cards.reduce(
			(nearest, card, index) => {
				const rect = card.getBoundingClientRect();
				const distance = Math.abs(rect.left + rect.width / 2 - carouselCenter);

				return distance < nearest.distance ? { index, distance } : nearest;
			},
			{ index: 0, distance: Number.POSITIVE_INFINITY }
		).index;
	};

	const updateActivePreview = () => {
		const cards = getCards();
		if (!cards.length) return;

		const activeCard = cards[getNearestCardIndex(cards)];
		const groupIndex = Number(activeCard.dataset.group);
		const choice = activeCard.dataset.choice as ProjectChoice | undefined;

		if (!Number.isFinite(groupIndex) || !choice) return;

		activePreviewGroupIndex = groupIndex;
		activePreviewChoice = choice === 'custom' ? undefined : choice;
	};

	const scheduleActivePreviewUpdate = () => {
		cancelAnimationFrame(previewUpdateFrame);
		previewUpdateFrame = requestAnimationFrame(updateActivePreview);
	};

	const handleCarouselScroll = () => {
		keepInLoop();
		scheduleActivePreviewUpdate();
	};

	const rebaseCardToMiddleGroup = (card: HTMLElement) => {
		const groupIndex = Number(card.dataset.group);
		if (groupIndex === 1 || !Number.isFinite(groupIndex)) return;

		const segmentWidth = getSegmentWidth();
		if (!segmentWidth) return;

		const groupShift = 1 - groupIndex;
		carousel.scrollLeft += segmentWidth * groupShift;

		if (activeGroupIndex !== undefined) {
			activeGroupIndex += groupShift;
		}
	};

	const animate = (time: number) => {
		if (!lastFrame) lastFrame = time;
		const delta = Math.min(time - lastFrame, 32);
		lastFrame = time;

		if (!locked && !centering) {
			pendingDistance += delta * 0.03;
			const wholePixels = Math.floor(pendingDistance);

			if (wholePixels > 0) {
				carousel.scrollLeft += wholePixels;
				pendingDistance -= wholePixels;
				keepInLoop();
			}
		}

		animationFrame = requestAnimationFrame(animate);
	};

	const scrollCarousel = (direction: -1 | 1) => {
		pendingDistance = 0;
		normalizeToMiddleSegment();
		const cards = getCards();
		const nearestIndex = getNearestCardIndex(cards);
		const target = cards[nearestIndex + direction];
		if (!target) return;

		centering = true;
		if (centeringTimeout) clearTimeout(centeringTimeout);
		centerCard(target);

		centeringTimeout = setTimeout(() => {
			rebaseCardToMiddleGroup(target);
			centering = false;
		}, 500);
	};

	const centerCard = (target: HTMLElement, behavior: ScrollBehavior = 'smooth') => {
		const carouselRect = carousel.getBoundingClientRect();
		const targetRect = target.getBoundingClientRect();
		const distance =
			targetRect.left + targetRect.width / 2 - (carouselRect.left + carouselRect.width / 2);

		carousel.scrollTo({
			left: carousel.scrollLeft + distance,
			behavior
		});
	};

	const selectChoice = (choice: ProjectChoice, target: HTMLElement, groupIndex: number) => {
		locked = true;
		activeGroupIndex = groupIndex;
		activePreviewGroupIndex = groupIndex;
		activePreviewChoice = choice === 'custom' ? undefined : choice;
		onSelect(choice);
		centering = true;
		if (centeringTimeout) clearTimeout(centeringTimeout);

		requestAnimationFrame(() => {
			requestAnimationFrame(() => centerCard(target));
		});

		centeringTimeout = setTimeout(() => {
			centering = false;
			keepInLoop();
		}, 650);
	};

	onMount(() => {
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		selectedCategoryPreviews = selectRandomCategoryAutoplayPreviews();
		carousel.scrollLeft = getSegmentWidth();
		scheduleActivePreviewUpdate();

		if (!reduceMotion) {
			animationFrame = requestAnimationFrame(animate);
		}

		const handleResize = () => {
			if (!locked) {
				carousel.scrollLeft = getSegmentWidth();
			}
		};

		window.addEventListener('resize', handleResize);

		return () => {
			cancelAnimationFrame(animationFrame);
			cancelAnimationFrame(previewUpdateFrame);
			if (centeringTimeout) clearTimeout(centeringTimeout);
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div
	class="relative overflow-x-clip"
	role="region"
	aria-label={i18n.content.ui.formatCarousel.regionAriaLabel}
>
	<div class="absolute right-4 top-12 z-30 hidden gap-2 sm:flex">
		<button
			class="grid size-11 place-items-center rounded-full border border-white/15 bg-slate-950/80 text-white shadow-xl backdrop-blur-md transition hover:border-cyan-200/50 hover:bg-slate-900"
			type="button"
			aria-label={i18n.content.ui.formatCarousel.previousAriaLabel}
			onclick={() => scrollCarousel(-1)}
		>
			<ChevronLeft size={19} aria-hidden="true" />
		</button>
		<button
			class="grid size-11 place-items-center rounded-full border border-white/15 bg-slate-950/80 text-white shadow-xl backdrop-blur-md transition hover:border-cyan-200/50 hover:bg-slate-900"
			type="button"
			aria-label={i18n.content.ui.formatCarousel.nextAriaLabel}
			onclick={() => scrollCarousel(1)}
		>
			<ChevronRight size={19} aria-hidden="true" />
		</button>
	</div>

	<div
		bind:this={carousel}
		class={[
			'carousel-fade scrollbar-hidden -mx-5 flex overflow-x-auto px-5 pb-36 pt-8 -mb-28 sm:mx-0 sm:px-0',
			locked ? 'snap-x snap-mandatory' : ''
		]}
		aria-label={i18n.content.ui.formatCarousel.chooseAriaLabel}
		onscroll={handleCarouselScroll}
	>
		{#each [0, 1, 2] as groupIndex (groupIndex)}
			<div
				use:captureMiddleGroup={groupIndex}
				class={['flex shrink-0 pr-6', prominent ? 'gap-6' : 'gap-4']}
			>
				{#each choices as choice (choice.id)}
					{@const preview =
						choice.id === 'custom' ? undefined : selectedCategoryPreviews[choice.id]}
					{@const previewIsActive = Boolean(
						preview && activePreviewGroupIndex === groupIndex && activePreviewChoice === choice.id
					)}
					<button
						data-choice={choice.id}
						data-group={groupIndex}
						class={[
							'group relative shrink-0 snap-center overflow-hidden border text-left transition duration-500',
							getCardSizeClass(choice.id, prominent),
							prominent ? 'rounded-[1.75rem] p-8' : 'rounded-[1.4rem] p-6',
							locked && activeGroupIndex === groupIndex && selected === choice.id
								? 'z-10 scale-[1.08] border-violet-200 bg-violet-300/[0.14] shadow-[0_28px_100px_rgb(81_49_150/0.42)]'
								: 'border-white/10 bg-white/[0.035] hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.065]'
						]}
						type="button"
						aria-pressed={locked && activeGroupIndex === groupIndex && selected === choice.id}
						tabindex={groupIndex === 1 ? 0 : -1}
						onclick={(event) => selectChoice(choice.id, event.currentTarget, groupIndex)}
					>
						{#if preview}
							<span
								class={[
									'preview-media pointer-events-none absolute inset-0 block overflow-hidden',
									previewIsActive ? 'preview-media-active' : ''
								]}
							>
								<LazyAutoplayVideo
									class={`size-full object-cover saturate-[0.85] transition duration-500 group-hover:opacity-65 ${previewIsActive ? 'opacity-70' : 'opacity-45'}`}
									src={preview.src}
									poster={preview.poster}
									active={previewIsActive}
								/>
							</span>
							<span
								class="pointer-events-none absolute inset-0 block bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20"
							></span>
							<span
								class="pointer-events-none absolute inset-0 block bg-[radial-gradient(circle_at_30%_20%,rgb(155_124_255/0.22),transparent_34%)]"
							></span>
							<span
								class={[
									'preview-focus-ring pointer-events-none absolute inset-0 block rounded-[inherit] border border-violet-200/45',
									previewIsActive ? 'preview-focus-ring-active' : ''
								]}
							></span>
						{/if}

						<span
							class={[
								'absolute -right-16 -top-16 size-48 rounded-full blur-3xl transition',
								choice.id === 'custom' ? 'bg-cyan-300/14' : 'bg-violet-400/16',
								locked && activeGroupIndex === groupIndex && selected === choice.id
									? 'opacity-100'
									: 'opacity-40 group-hover:opacity-80'
							]}
						></span>

						<span class="relative flex items-start">
							<span
								class={[
									'grid place-items-center rounded-2xl border',
									prominent ? 'size-16' : 'size-12',
									locked && activeGroupIndex === groupIndex && selected === choice.id
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

<style>
	@keyframes preview-media-focus {
		0% {
			filter: brightness(1);
			transform: scale(1);
		}
		45% {
			filter: brightness(1.18) saturate(1.08);
			transform: scale(1.035);
		}
		100% {
			filter: brightness(1.12) saturate(1.06);
			transform: scale(1.025);
		}
	}

	@keyframes preview-ring-focus {
		0% {
			opacity: 0;
			box-shadow: inset 0 0 0 rgb(196 181 253 / 0);
		}
		45% {
			opacity: 1;
			box-shadow:
				inset 0 0 28px rgb(196 181 253 / 0.16),
				0 0 24px rgb(139 92 246 / 0.22);
		}
		100% {
			opacity: 0.62;
			box-shadow:
				inset 0 0 24px rgb(196 181 253 / 0.12),
				0 0 20px rgb(139 92 246 / 0.16);
		}
	}

	.preview-media {
		transition:
			filter 240ms ease,
			transform 240ms ease;
	}

	.preview-media-active {
		filter: brightness(1.12) saturate(1.06);
		transform: scale(1.025);
		animation: preview-media-focus 620ms cubic-bezier(0.22, 1, 0.36, 1) both;
	}

	.preview-focus-ring {
		opacity: 0;
	}

	.preview-focus-ring-active {
		opacity: 0.62;
		box-shadow:
			inset 0 0 24px rgb(196 181 253 / 0.12),
			0 0 20px rgb(139 92 246 / 0.16);
		animation: preview-ring-focus 620ms ease-out both;
	}

	@media (prefers-reduced-motion: reduce) {
		.preview-media,
		.preview-media-active {
			animation: none;
			filter: none;
			transform: none;
			transition: none;
		}

		.preview-focus-ring-active {
			animation: none;
			opacity: 0.62;
		}
	}
</style>
