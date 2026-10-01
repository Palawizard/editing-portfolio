<script lang="ts">
	import { tick } from 'svelte';
	import { Play } from '@lucide/svelte';
	import { getLocaleContext } from '$lib/i18n/context';
	import { resolveAssetPath } from '$lib/utils/paths';

	type Props = {
		title: string;
		poster?: string;
		src?: string;
		/** Third-party player, used only when there is no self-hosted video. */
		embed?: { url: string; provider: string };
		aspect?: 'video' | 'vertical';
		class?: string;
	};

	let { title, poster, src, embed, aspect = 'video', class: className = '' }: Props = $props();
	const i18n = getLocaleContext();
	let videoElement = $state<HTMLVideoElement>();
	let gateElement = $state<HTMLDivElement>();
	let loaded = $state(false);
	// The third-party iframe only exists once consent (or an explicit click) allows it.
	let embedAllowed = $state(false);
	let embedFallback = $state(false);
	const resolvedPoster = $derived(resolveAssetPath(poster));
	const resolvedSrc = $derived(resolveAssetPath(src));
	const playable = $derived(Boolean(resolvedSrc || embed));

	const aspectClasses = {
		video: 'aspect-video',
		vertical: 'aspect-[9/16]'
	};

	const showFirstFrame = (event: Event) => {
		if (poster) return;

		const video = event.currentTarget as HTMLVideoElement;
		if (video.currentTime === 0) {
			video.currentTime = 0.01;
		}
	};

	const loadVideo = async () => {
		loaded = true;
		await tick();
		void videoElement?.play().catch(() => undefined);
	};

	// Third-party players go through the shared palawi.fr consent gate (purpose "video").
	// Without the consent script, nothing loads until an explicit click on our own fallback.
	$effect(() => {
		if (!loaded || resolvedSrc || !embed || embedAllowed || !gateElement) return;
		const consent = window.PalawiConsent;
		if (!consent) {
			embedFallback = true;
			return;
		}
		return consent.gate(gateElement, 'video', () => (embedAllowed = true), {
			provider: embed.provider
		});
	});
</script>

<figure
	class={['group relative w-full overflow-hidden bg-screen', aspectClasses[aspect], className]}
>
	{#if resolvedSrc && loaded}
		<video
			bind:this={videoElement}
			class="absolute inset-0 size-full object-cover object-center"
			poster={resolvedPoster || undefined}
			src={resolvedSrc}
			preload="metadata"
			muted
			playsinline
			controls
			aria-label={title}
			onloadeddata={showFirstFrame}
		></video>
	{:else if embed && loaded && embedAllowed}
		<iframe
			class="absolute inset-0 size-full border-0"
			src={embed.url}
			{title}
			allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
			allowfullscreen
			referrerpolicy="strict-origin-when-cross-origin"
		></iframe>
	{:else if embed && loaded}
		<div bind:this={gateElement} class="absolute inset-0 z-10 bg-screen">
			{#if embedFallback}
				<div
					class="flex size-full flex-col items-center justify-center gap-3 p-4 text-center text-sm leading-5 font-medium text-white"
				>
					<p class="max-w-[34ch]">
						{i18n.content.ui.media.externalNotice.replace('{provider}', embed.provider)}
					</p>
					<button
						type="button"
						class="inline-flex min-h-11 items-center rounded-full bg-white px-5 font-extrabold text-paper transition-transform duration-150 active:scale-[0.97]"
						onclick={() => (embedAllowed = true)}
					>
						{i18n.content.ui.media.externalLoad}
					</button>
					<!-- eslint-disable svelte/no-navigation-without-resolve -- Shared palawi.fr policy, outside the base path. -->
					<a
						class="text-xs font-bold underline underline-offset-4"
						href="/confidentialite/#cookies"
						data-sveltekit-reload
					>
						{i18n.content.ui.media.externalMore}
					</a>
					<!-- eslint-enable svelte/no-navigation-without-resolve -->
				</div>
			{/if}
		</div>
	{:else if resolvedPoster}
		<img
			class="absolute inset-0 size-full object-cover object-center"
			src={resolvedPoster}
			alt={title}
			loading="lazy"
		/>
	{:else}
		<div class="absolute inset-0 grid place-items-center bg-screen">
			<span
				class="mx-5 max-w-sm rounded-full bg-white/15 px-4 py-2 text-center text-sm font-bold text-white"
				>{title}</span
			>
		</div>
	{/if}

	{#if playable && !loaded}
		<button
			class="absolute inset-0 z-10 grid place-items-center"
			type="button"
			aria-label={`${i18n.content.ui.media.playLabel} : ${title}`}
			onclick={loadVideo}
		>
			<span
				class="grid size-14 place-items-center rounded-full bg-white/90 text-paper shadow-xl backdrop-blur transition-transform duration-200 group-active:scale-95"
			>
				<Play class="ml-0.5" size={22} fill="currentColor" aria-hidden="true" />
			</span>
		</button>
	{/if}
</figure>
