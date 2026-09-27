<script lang="ts">
	import { ArrowRight, Check } from '@lucide/svelte';
	import LazyAutoplayVideo from '$lib/components/media/LazyAutoplayVideo.svelte';
	import Stinger from '$lib/components/media/Stinger.svelte';
	import VideoPreview from '$lib/components/media/VideoPreview.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import PriceBadge from '$lib/components/ui/PriceBadge.svelte';
	import { getLocaleContext } from '$lib/i18n/context';
	import { getPublishedVideo } from '$lib/utils/media';
	import { resolveAssetPath } from '$lib/utils/paths';
	import { formatProjectPrice } from '$lib/utils/pricing';
	import type { EditingFormat, Project } from '$lib/types/project';
	import type { ContactHref } from '$lib/types/site';

	type Props = {
		format?: EditingFormat;
		projects: Project[];
		orderHref: ContactHref;
	};

	let { format, projects, orderHref }: Props = $props();
	const i18n = getLocaleContext();
	const copy = $derived(i18n.content.ui);

	let onAirSlug = $state<string>();
	let hovered = $state<string>();
	let stinger = $state<ReturnType<typeof Stinger>>();

	// Every cut on the program monitor goes through the stinger: the P sweeps, the source swaps behind it.
	export function cut(swap: () => void) {
		// Each cut starts clean: a new format opens on its first source, no stale hover preview.
		const run = () => {
			hovered = undefined;
			onAirSlug = undefined;
			swap();
		};
		if (stinger) stinger.play(run);
		else run();
	}

	// A new format brings a new rundown: its first source goes on air.
	const onAir = $derived(projects.find((p) => p.slug === onAirSlug) ?? projects[0]);

	const posterOf = (project: Project) =>
		getPublishedVideo(project.externalUrl)?.poster ?? project.poster;
	const fullVideoOf = (project: Project) =>
		project.previewVideo ?? getPublishedVideo(project.externalUrl)?.directUrl;
	// Each full edit has an 8-second preview beside it, used for hover monitoring.
	const monitorOf = (project: Project) =>
		project.previewVideo?.replace(
			/^\/videos\/[^/]+\/(.+)\.mp4$/,
			'/videos/previews/$1-preview.mp4'
		);
	const isVertical = (project: Project) => project.format === '9:16';
	const priceOf = (project: Project) => formatProjectPrice(project.pricing, i18n.locale);
</script>

{#if onAir}
	<div class="panel p-2.5 md:p-3.5">
		<div class="grid gap-2.5 lg:grid-cols-[minmax(0,1fr)_19rem]">
			<!-- Program monitor: what is on air, played in its native aspect. -->
			<div
				class="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-screen sm:aspect-video lg:aspect-auto lg:h-full lg:min-h-[24rem]"
			>
				<p class="sr-only" role="status">{copy.studio.onAir} : {onAir.title}</p>
				{#key onAir.slug}
					<img
						src={resolveAssetPath(posterOf(onAir))}
						alt=""
						class="absolute inset-0 size-full scale-110 object-cover opacity-50 blur-2xl saturate-150"
					/>
					<div
						class="absolute inset-0 grid grid-cols-[minmax(0,1fr)] grid-rows-[minmax(0,1fr)] place-items-center p-3 md:p-5"
					>
						<VideoPreview
							title={onAir.title}
							poster={posterOf(onAir) || undefined}
							src={fullVideoOf(onAir)}
							aspect={isVertical(onAir) ? 'vertical' : 'video'}
							class={isVertical(onAir)
								? '!w-auto h-full max-h-full rounded-2xl shadow-2xl'
								: 'max-h-full rounded-2xl shadow-2xl'}
						/>
					</div>
				{/key}
				<span
					class="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-live px-2.5 py-1 text-xs font-extrabold tracking-[0.04em] text-white uppercase"
				>
					<span class="size-1.5 rounded-full bg-white" aria-hidden="true"></span>
					{copy.studio.onAir}
				</span>
				<Stinger bind:this={stinger} />
			</div>

			<!-- The rundown card: the format on air, with the price of the source playing. -->
			<aside class="flex flex-col gap-3 rounded-[22px] bg-white/75 p-4">
				<div class="flex items-start justify-between gap-3">
					<p class="text-xs font-bold text-mute">{onAir.platform.join(' / ')}</p>
					<PriceBadge
						price={priceOf(onAir)}
						ariaLabel={`${copy.media.priceLabel} : ${priceOf(onAir)}`}
						class="shrink-0"
					/>
				</div>
				<h3 class="display-title text-2xl">{format?.title ?? onAir.title}</h3>
				{#if format}
					<p class="text-sm leading-6 font-semibold">{format.promise}</p>
					<p class="text-sm leading-6 text-mute">{format.description}</p>
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
					<p class="text-sm leading-6 text-mute">{onAir.summary}</p>
				{/if}
				{#if onAir.disclaimer}
					<p class="text-xs leading-5 text-mute" role="note">{onAir.disclaimer}</p>
				{/if}
				<div class="mt-auto pt-1">
					<Button href={orderHref} class="w-full">
						{copy.projectsPage.orderStyle}
						<ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
					</Button>
				</div>
			</aside>
		</div>

		<!-- Multiview: every source of the format on its own small monitor. -->
		<div class="mt-3 flex flex-wrap items-baseline justify-between gap-2 px-1.5">
			<p class="label text-mute">{copy.studio.sources} · {projects.length}</p>
			<p class="text-xs font-semibold text-mute">{copy.studio.sourcesHint}</p>
		</div>
		<ol
			class={[
				'mt-2 grid gap-2',
				projects.every(isVertical)
					? 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-6'
					: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
			]}
			onmouseleave={() => (hovered = undefined)}
		>
			{#each projects as project, index (project.slug)}
				{@const live = project.slug === onAir.slug}
				{@const monitor = monitorOf(project)}
				<li class="flex">
					<button
						type="button"
						class={[
							'source',
							live ? 'is-live' : '',
							hovered === project.slug && !live ? 'is-preview' : ''
						]}
						aria-pressed={live}
						onmouseenter={() => (hovered = project.slug)}
						onfocus={() => (hovered = project.slug)}
						onblur={() => (hovered = undefined)}
						onclick={() => {
							if (!live) cut(() => (onAirSlug = project.slug));
						}}
					>
						<span
							class={['source__screen', isVertical(project) ? 'aspect-[9/16]' : 'aspect-video']}
						>
							<img src={resolveAssetPath(posterOf(project))} alt="" class="source__img" />
							{#if monitor}
								<LazyAutoplayVideo
									class="source__img"
									src={monitor}
									poster={posterOf(project)}
									active={hovered === project.slug && !live}
								/>
							{/if}
							<span class="source__tally">
								<span class="source__lamp" aria-hidden="true"></span>
								{live
									? copy.studio.onAir
									: hovered === project.slug
										? copy.studio.preview
										: String(index + 1).padStart(2, '0')}
							</span>
						</span>
						<span class="source__title">{project.title}</span>
					</button>
				</li>
			{/each}
		</ol>
	</div>
{/if}

<style>
	.source {
		display: flex;
		width: 100%;
		flex-direction: column;
		gap: 0.4rem;
		border-radius: 18px;
		background: rgb(255 255 255 / 0.7);
		padding: 0.35rem 0.35rem 0.55rem;
		color: var(--color-paper);
		text-align: left;
		box-shadow: var(--shadow);
		transition:
			transform 200ms var(--ease-out-expo),
			background-color 200ms ease,
			box-shadow 200ms ease;
	}

	.source:active {
		transform: scale(0.97);
	}

	@media (hover: hover) and (pointer: fine) {
		.source:hover {
			transform: translateY(-2px);
			background: #ffffff;
		}
	}

	.source.is-preview {
		box-shadow:
			0 0 0 3px #22b573,
			var(--shadow);
	}

	.source.is-live {
		background: var(--color-paper);
		color: #ffffff;
		box-shadow:
			0 0 0 3px var(--color-live),
			var(--shadow-lift);
	}

	.source__screen {
		position: relative;
		display: block;
		overflow: hidden;
		border-radius: 13px;
		background: var(--color-screen);
	}

	:global(.source__img) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.source__tally {
		position: absolute;
		left: 0.4rem;
		bottom: 0.4rem;
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		border-radius: 999px;
		background: rgb(0 0 0 / 0.55);
		padding: 0.2rem 0.5rem;
		color: #ffffff;
		font-size: 0.6875rem;
		font-weight: 800;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		backdrop-filter: blur(6px);
	}

	.source__lamp {
		width: 0.45rem;
		height: 0.45rem;
		border-radius: 50%;
		background: rgb(255 255 255 / 0.5);
		transition: background-color 150ms ease;
	}

	.source.is-preview .source__lamp {
		background: #22b573;
	}

	.source.is-live .source__lamp {
		background: var(--color-live);
	}

	.source__title {
		display: -webkit-box;
		overflow: hidden;
		padding-inline: 0.25rem;
		font-size: 0.8125rem;
		font-weight: 800;
		line-height: 1.25;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
	}
</style>
