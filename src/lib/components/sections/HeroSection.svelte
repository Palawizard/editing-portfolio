<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowRight, Check } from '@lucide/svelte';
	import LazyAutoplayVideo from '$lib/components/media/LazyAutoplayVideo.svelte';
	import Stinger from '$lib/components/media/Stinger.svelte';
	import FormatCarousel from '$lib/components/sections/FormatCarousel.svelte';
	import PriceBadge from '$lib/components/ui/PriceBadge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import {
		heroAutoplayPreviews,
		initialCategoryAutoplayPreviews,
		selectRandomCategoryAutoplayPreviews,
		selectRandomHeroAutoplayPreview
	} from '$lib/content/autoplay-previews';
	import { categoryStartingPrices, getProjectPricing } from '$lib/content/project-pricing';
	import { getContactStyleHref } from '$lib/content/contact';
	import { getLocaleContext } from '$lib/i18n/context';
	import { formatProjectPrice } from '$lib/utils/pricing';
	import { resolveAssetPath } from '$lib/utils/paths';
	import type { ProjectChoice } from '$lib/types/project';

	type Scene = ProjectChoice | 'showreel';

	const i18n = getLocaleContext();
	const copy = $derived(i18n.content.ui);

	let scene = $state<Scene>('showreel');
	let heroPreview = $state(heroAutoplayPreviews[0]);
	let categoryPreviews = $state(initialCategoryAutoplayPreviews);
	let isPlaying = $state(false);
	let stinger = $state<ReturnType<typeof Stinger>>();

	const format = $derived(
		scene === 'showreel' || scene === 'custom'
			? undefined
			: i18n.content.editingFormats.find((f) => f.id === scene)
	);

	// What the screen plays: the showreel, or the selected scene's own edit.
	const screen = $derived(
		scene === 'showreel' ? heroPreview : scene === 'custom' ? undefined : categoryPreviews[scene]
	);

	const sceneName = $derived(
		scene === 'showreel'
			? copy.studio.showreel
			: scene === 'custom'
				? i18n.content.customFormatChoice.title
				: (format?.title ?? '')
	);

	const price = $derived(
		scene === 'showreel'
			? formatProjectPrice(getProjectPricing(heroPreview.slug), i18n.locale)
			: scene === 'custom'
				? undefined
				: `${copy.media.startingPriceLabel} ${formatProjectPrice(categoryStartingPrices[scene], i18n.locale)}`
	);

	const nextShowreel = () => {
		isPlaying = false;
		heroPreview = selectRandomHeroAutoplayPreview(Math.random, heroPreview.src);
	};

	// Signature: a stinger wipes the screen, the scene swaps behind it, the wipe leaves.
	const switchScene = (next: Scene) => {
		if (next === scene) return;
		stinger?.play(() => {
			isPlaying = false;
			scene = next;
		});
	};

	onMount(() => {
		heroPreview = selectRandomHeroAutoplayPreview(Math.random, heroPreview.src);
		categoryPreviews = selectRandomCategoryAutoplayPreviews();
	});
</script>

<section class="pt-4 pb-10 md:pt-8 md:pb-16">
	<Container size="wide">
		<div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-end">
			<h1 class="display-title text-[clamp(2.5rem,7vw,5rem)]">
				{#each copy.hero.titleLines as line, index (line)}
					<span class="print-in block" style={`--i: ${index}`}>{line}</span>
				{/each}
			</h1>
			<p
				class="rise max-w-[46ch] text-base leading-7 font-medium text-mute md:text-lg"
				style="--i: 3"
			>
				{copy.hero.description}
			</p>
		</div>

		<!-- The studio window: screen, chat, and the scene bar. -->
		<div class="panel rise mt-8 p-2.5 md:p-3.5" style="--i: 4">
			<div class="flex flex-wrap items-center gap-2 px-1.5 pt-0.5 pb-2.5">
				<span
					class="inline-flex items-center gap-1.5 rounded-full bg-live px-2.5 py-1 text-xs font-extrabold tracking-[0.04em] text-white uppercase"
				>
					<span class="size-1.5 rounded-full bg-white" aria-hidden="true"></span>
					{copy.studio.live}
				</span>
				<span class="text-sm font-bold">
					<span class="text-mute">{copy.studio.scene} :</span>
					{sceneName}
				</span>
			</div>

			<div class="studio-grid">
				<!-- Screen: the edit plays in its native aspect over a blurred fill of itself. -->
				<div
					class="screen relative aspect-[4/5] overflow-hidden rounded-[22px] bg-screen [grid-area:screen] sm:aspect-video"
				>
					{#key screen?.src ?? scene}
						{#if screen}
							<img
								src={resolveAssetPath(screen.poster)}
								alt=""
								class="absolute inset-0 size-full scale-110 object-cover opacity-55 blur-2xl saturate-150"
							/>
							<div
								class="absolute inset-0 grid grid-cols-[minmax(0,1fr)] grid-rows-[minmax(0,1fr)] place-items-center p-2.5 md:p-4"
							>
								<LazyAutoplayVideo
									src={screen.src}
									poster={screen.poster}
									loop={scene !== 'showreel'}
									onEnded={scene === 'showreel' ? nextShowreel : undefined}
									onPlaybackChange={(playing) => (isPlaying = playing)}
									class={screen.aspect === 'vertical'
										? 'aspect-[9/16] h-full max-h-full w-auto max-w-full rounded-2xl object-cover shadow-2xl'
										: 'aspect-video h-auto max-h-full w-full max-w-full rounded-2xl object-cover shadow-2xl'}
								/>
							</div>
						{:else}
							<div class="stinger-pattern absolute inset-0 grid place-items-center p-6 text-center">
								<p class="display-title max-w-md text-3xl text-white md:text-4xl">
									{copy.formatsSection.customTitle}
								</p>
							</div>
						{/if}
					{/key}

					{#if price}
						{#key price}
							<PriceBadge
								{price}
								ariaLabel={`${copy.media.priceLabel} : ${price}`}
								size="md"
								class="alert absolute top-3 right-3 z-10"
							/>
						{/key}
					{/if}
					{#if isPlaying}
						<span
							class="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-xs font-bold text-white backdrop-blur"
						>
							<span class="size-1.5 animate-pulse rounded-full bg-live"></span>
							{copy.hero.playingLabel}
						</span>
					{/if}

					<Stinger bind:this={stinger} />
				</div>

				<!-- Chat: the scene explained, then the way in. -->
				<aside
					class="flex flex-col gap-3 rounded-[22px] bg-white/75 p-4 [grid-area:chat]"
					aria-label={copy.studio.chat}
					aria-live="polite"
				>
					<p class="label text-mute">{copy.studio.chat}</p>
					<div class="msg">
						<img
							src={resolveAssetPath('/favicon.png')}
							alt=""
							class="msg__avatar"
							width="36"
							height="36"
						/>
						<div class="bubble">
							<p class="text-sm font-extrabold text-live">Palawi</p>
							{#if scene === 'showreel'}
								<p class="mt-1 text-[0.9375rem] leading-6">{copy.studio.showreelNote}</p>
							{:else if scene === 'custom'}
								<p class="mt-1 text-[0.9375rem] leading-6">
									{copy.formatsSection.customDescription}
								</p>
							{:else if format}
								<p class="mt-1 text-[0.9375rem] leading-6 font-semibold">{format.promise}</p>
								<p class="mt-1 text-sm leading-6 text-mute">{format.description}</p>
							{/if}
						</div>
					</div>

					{#if format}
						<ul class="flex flex-wrap gap-1.5">
							{#each format.highlights as highlight (highlight)}
								<li
									class="inline-flex items-center gap-1 rounded-full bg-peach/60 px-2.5 py-1 text-xs font-bold"
								>
									<Check size={12} strokeWidth={3} aria-hidden="true" />
									{highlight}
								</li>
							{/each}
						</ul>
					{:else}
						<div>
							<p class="label text-mute">{copy.studio.method}</p>
							<ol class="mt-2 grid gap-1.5">
								{#each i18n.content.processSteps as step, index (step.title)}
									<li class="flex gap-2 text-sm leading-5">
										<span
											class="grid size-5 shrink-0 place-items-center rounded-full bg-paper text-[0.6875rem] font-extrabold text-white"
											>{index + 1}</span
										>
										<span
											><strong>{step.title}</strong> ·
											<span class="text-mute">{step.description}</span></span
										>
									</li>
								{/each}
							</ol>
						</div>
					{/if}

					<div class="mt-auto grid gap-2 pt-1">
						{#if scene === 'showreel'}
							<Button href="/demarrer">
								{copy.studio.start}
								<ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
							</Button>
							<Button href="/projets" variant="secondary">{copy.formatsSection.viewExamples}</Button
							>
						{:else if scene === 'custom'}
							<Button href={getContactStyleHref('custom')}>
								{copy.formatsSection.presentIdea}
								<ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
							</Button>
						{:else}
							<Button href={getContactStyleHref(scene)}>
								{copy.formatsSection.requestFormat}
								<ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
							</Button>
							<Button href="/projets" variant="secondary">{copy.formatsSection.viewExamples}</Button
							>
						{/if}
					</div>
				</aside>

				<div class="[grid-area:scenes]">
					<FormatCarousel
						selected={scene}
						onSelect={switchScene}
						previews={categoryPreviews}
						showreel={{ label: copy.studio.showreel, poster: heroPreview.poster }}
					/>
				</div>
			</div>
		</div>
	</Container>
</section>

<style>
	/* Phones: screen, then scenes, then chat. Desktop: screen + chat, scenes below. */
	.studio-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 0.625rem;
		grid-template-areas:
			'screen'
			'scenes'
			'chat';
	}

	@media (min-width: 64rem) {
		.studio-grid {
			grid-template-columns: minmax(0, 1fr) 20rem;
			grid-template-areas:
				'screen chat'
				'scenes scenes';
		}
	}

	/* A chat message: avatar, then a speech bubble whose tail points at it. */
	.msg {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		align-items: start;
		gap: 0.7rem;
	}

	.msg__avatar {
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 50%;
		object-fit: cover;
		box-shadow:
			0 0 0 2px #ffffff,
			var(--shadow);
	}

	.bubble {
		position: relative;
		border-radius: 4px 18px 18px 18px;
		background: #ffffff;
		padding: 0.7rem 0.9rem;
		box-shadow: var(--shadow);
	}

	.bubble::before {
		position: absolute;
		top: 0;
		left: -9px;
		width: 10px;
		height: 14px;
		background: #ffffff;
		clip-path: polygon(100% 0, 0 0, 100% 100%);
		content: '';
	}

	.stinger-pattern {
		background:
			radial-gradient(circle at 30% 30%, rgb(255 255 255 / 0.25), transparent 50%),
			repeating-linear-gradient(115deg, #ff9a66 0 28px, #ff7f45 28px 56px);
	}

	@media (prefers-reduced-motion: no-preference) {
		:global(.alert) {
			animation: pop 450ms var(--ease-out-expo) both;
		}
	}

	@keyframes pop {
		from {
			opacity: 0;
			transform: translateY(-8px) scale(0.92);
		}
	}
</style>
