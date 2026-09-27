<script lang="ts">
	import { onMount } from 'svelte';
	import { WandSparkles } from '@lucide/svelte';
	import LazyAutoplayVideo from '$lib/components/media/LazyAutoplayVideo.svelte';
	import { categoryStartingPrices } from '$lib/content/project-pricing';
	import {
		initialCategoryAutoplayPreviews,
		selectRandomCategoryAutoplayPreviews,
		type SelectedCategoryAutoplayPreviews
	} from '$lib/content/autoplay-previews';
	import { getLocaleContext } from '$lib/i18n/context';
	import { formatProjectPrice } from '$lib/utils/pricing';
	import { resolveAssetPath } from '$lib/utils/paths';
	import type { ProjectChoice } from '$lib/types/project';

	type Scene = ProjectChoice | 'showreel';

	type Props = {
		selected?: Scene;
		onSelect: (scene: Scene) => void;
		showreel?: { label: string; poster: string };
		previews?: SelectedCategoryAutoplayPreviews;
		/** bar: scene strip in the studio. large: big picker. dock: OBS-style scene list on /projets. */
		variant?: 'bar' | 'large' | 'dock';
	};

	let { selected, onSelect, showreel, previews, variant = 'bar' }: Props = $props();
	const i18n = getLocaleContext();
	let hovered = $state<Scene | undefined>();
	let ownPreviews = $state(initialCategoryAutoplayPreviews);
	const scenePreviews = $derived(previews ?? ownPreviews);
	const large = $derived(variant === 'large');

	const getChoicePrice = (choice: ProjectChoice) =>
		choice === 'custom' ? Number.POSITIVE_INFINITY : categoryStartingPrices[choice].minimum;

	const choices = $derived(
		[
			...i18n.content.editingFormats,
			{
				id: 'custom' as const,
				...i18n.content.customFormatChoice
			}
		]
			.map((choice, index) => ({ choice, index }))
			.sort(
				(left, right) =>
					getChoicePrice(left.choice.id) - getChoicePrice(right.choice.id) ||
					left.index - right.index
			)
			.map(({ choice }) => choice)
	);

	onMount(() => {
		if (!previews) ownPreviews = selectRandomCategoryAutoplayPreviews();
	});
</script>

<!-- Every format is a scene; the live one burns hot. All scenes fit, nothing hides off-screen. -->
<ol
	class={[
		'scenes',
		large ? 'scenes--large' : '',
		variant === 'dock' ? 'scenes--dock' : '',
		showreel ? 'scenes--with-reel' : ''
	]}
	aria-label={i18n.content.ui.studio.scenesLabel}
	onmouseleave={() => (hovered = undefined)}
>
	{#if showreel}
		<li>
			<button
				type="button"
				class={['scene', selected === 'showreel' ? 'is-live' : '']}
				aria-pressed={selected === 'showreel'}
				onclick={() => onSelect('showreel')}
			>
				<span class="scene__thumb">
					<img src={resolveAssetPath(showreel.poster)} alt="" class="scene__fill" />
					<img src={resolveAssetPath(showreel.poster)} alt="" class="scene__img" />
				</span>
				<span class="scene__name">
					{#if selected === 'showreel'}<span class="scene__dot" aria-hidden="true"></span>{/if}
					{showreel.label}
				</span>
			</button>
		</li>
	{/if}

	{#each choices as choice (choice.id)}
		{@const preview = choice.id === 'custom' ? undefined : scenePreviews[choice.id]}
		{@const isLive = selected === choice.id}
		{@const price =
			choice.id === 'custom'
				? undefined
				: `${i18n.content.ui.media.startingPriceLabel} ${formatProjectPrice(categoryStartingPrices[choice.id], i18n.locale)}`}
		<li>
			<button
				type="button"
				class={['scene', isLive ? 'is-live' : '']}
				aria-pressed={isLive}
				onmouseenter={() => (hovered = choice.id)}
				onfocus={() => (hovered = choice.id)}
				onblur={() => (hovered = undefined)}
				onclick={() => onSelect(choice.id)}
			>
				<span class="scene__thumb">
					{#if preview}
						<img src={resolveAssetPath(preview.poster)} alt="" class="scene__fill" />
						<!-- Hovering a scene previews what it holds, in its native aspect. -->
						<LazyAutoplayVideo
							class={[
								'scene__img',
								preview.aspect === 'vertical' ? 'scene__img--vertical' : ''
							].join(' ')}
							src={preview.src}
							poster={preview.poster}
							active={hovered === choice.id && !isLive}
						/>
					{:else}
						<WandSparkles
							class="scene__custom"
							size={large ? 48 : 34}
							strokeWidth={1.8}
							aria-hidden="true"
						/>
					{/if}
					{#if large && price}
						<span class="scene__price-tag">
							<span class="scene__dot" aria-hidden="true"></span>{price}
						</span>
					{/if}
				</span>
				<span class="scene__name">
					{#if isLive}<span class="scene__dot" aria-hidden="true"></span>{/if}
					{choice.title}
				</span>
				{#if price && !large}
					<span class="scene__price">{price}</span>
				{/if}
				{#if large || (variant === 'dock' && isLive)}
					<span class="scene__promise">{choice.promise}</span>
				{/if}
			</button>
		</li>
	{/each}
</ol>

<style>
	.scenes {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	@media (min-width: 40rem) {
		.scenes {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	@media (min-width: 64rem) {
		.scenes {
			grid-template-columns: repeat(6, minmax(0, 1fr));
		}

		.scenes--with-reel {
			grid-template-columns: repeat(7, minmax(0, 1fr));
		}
	}

	.scenes--large {
		grid-template-columns: minmax(0, 1fr);
		gap: 0.75rem;
	}

	@media (min-width: 40rem) {
		.scenes--large {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (min-width: 64rem) {
		.scenes--large {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	.scenes > li {
		display: flex;
	}

	/* Dock: on desktop the scenes stack like OBS's scene list, thumb beside the name. */
	@media (min-width: 64rem) {
		.scenes--dock {
			grid-template-columns: minmax(0, 1fr);
		}

		.scenes--dock .scene {
			display: grid;
			grid-template-columns: 5.5rem minmax(0, 1fr);
			grid-template-areas:
				'thumb name'
				'thumb price'
				'promise promise';
			align-items: center;
			column-gap: 0.7rem;
			row-gap: 0.15rem;
			padding: 0.4rem;
		}

		.scenes--dock .scene__thumb {
			grid-area: thumb;
			border-radius: 11px;
		}

		.scenes--dock .scene__name {
			grid-area: name;
			align-self: end;
			padding: 0;
		}

		.scenes--dock .scene__price {
			grid-area: price;
			align-self: start;
			margin: 0;
			padding: 0;
		}

		.scenes--dock .scene__promise {
			grid-area: promise;
			margin-top: 0.4rem;
			padding: 0 0.3rem 0.2rem;
			font-size: 0.8125rem;
		}
	}

	.scene {
		display: flex;
		width: 100%;
		flex-direction: column;
		gap: 0.45rem;
		border-radius: 20px;
		background: rgb(255 255 255 / 0.7);
		padding: 0.45rem 0.45rem 0.65rem;
		color: var(--color-paper);
		text-align: left;
		box-shadow: var(--shadow);
		transition:
			transform 200ms var(--ease-out-expo),
			background-color 200ms ease,
			color 200ms ease;
	}

	.scene:active {
		transform: scale(0.97);
	}

	@media (hover: hover) and (pointer: fine) {
		.scene:hover {
			transform: translateY(-2px);
			background: #ffffff;
		}
	}

	.scene.is-live {
		background: var(--color-paper);
		color: #ffffff;
		box-shadow:
			0 0 0 3px var(--color-live),
			var(--shadow-lift);
	}

	.scene__thumb {
		position: relative;
		display: grid;
		overflow: hidden;
		aspect-ratio: 16 / 10;
		place-items: center;
		border-radius: 14px;
		background: var(--color-screen);
	}

	/* A blurred copy fills the frame so the real image is never cropped. */
	:global(.scene__fill) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: blur(12px) saturate(1.2);
		opacity: 0.55;
		transform: scale(1.15);
	}

	:global(.scene__img) {
		position: relative;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	:global(.scene__img--vertical) {
		width: auto;
		aspect-ratio: 9 / 16;
	}

	:global(.scene__custom) {
		color: var(--color-peach);
	}

	.scene__name {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding-inline: 0.3rem;
		font-size: 0.875rem;
		font-weight: 800;
		line-height: 1.2;
	}

	.scene__dot {
		width: 0.5rem;
		height: 0.5rem;
		flex-shrink: 0;
		border-radius: 50%;
		background: var(--color-live);
	}

	.scene__price {
		margin-top: auto;
		padding-inline: 0.3rem;
		font-size: 0.75rem;
		font-weight: 700;
		opacity: 0.7;
	}

	/* Large picker: the format leads, with its promise and a price alert. */
	.scenes--large .scene {
		gap: 0.6rem;
		border-radius: 26px;
		padding: 0.6rem 0.6rem 1rem;
	}

	.scenes--large .scene__thumb {
		border-radius: 18px;
	}

	.scenes--large .scene__name {
		padding-inline: 0.5rem;
		font-family: var(--font-display);
		font-size: 1.25rem;
		letter-spacing: -0.02em;
	}

	.scene__promise {
		padding-inline: 0.5rem;
		font-size: 0.9375rem;
		font-weight: 500;
		line-height: 1.45;
		opacity: 0.75;
	}

	.scene__price-tag {
		position: absolute;
		top: 0.6rem;
		right: 0.6rem;
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		border-radius: 999px;
		background: #ffffff;
		padding: 0.3rem 0.7rem;
		color: var(--color-paper);
		font-size: 0.8125rem;
		font-weight: 800;
		box-shadow: 0 8px 20px -8px rgb(42 20 9 / 0.6);
	}
</style>
