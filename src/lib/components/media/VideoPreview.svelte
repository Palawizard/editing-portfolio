<script lang="ts">
	import { tick } from 'svelte';
	import { Play } from '@lucide/svelte';
	import { getLocaleContext } from '$lib/i18n/context';
	import { resolveAssetPath } from '$lib/utils/paths';

	type Props = {
		title: string;
		poster?: string;
		src?: string;
		aspect?: 'video' | 'vertical';
		class?: string;
	};

	let { title, poster, src, aspect = 'video', class: className = '' }: Props = $props();
	const i18n = getLocaleContext();
	let videoElement = $state<HTMLVideoElement>();
	let loaded = $state(false);
	const resolvedPoster = $derived(resolveAssetPath(poster));
	const resolvedSrc = $derived(resolveAssetPath(src));

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

	{#if resolvedSrc && !loaded}
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
