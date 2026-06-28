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
	class={[
		'group relative w-full overflow-hidden rounded-lg border border-white/10 bg-slate-950 shadow-[var(--shadow-premium)]',
		aspectClasses[aspect],
		className
	]}
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
		<div
			class="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_20%,rgb(155_124_255/0.24),transparent_32%),linear-gradient(135deg,#121827,#060913_62%,#101727)]"
		>
			<span
				class="mx-5 max-w-sm rounded-full border border-white/15 bg-black/25 px-4 py-2 text-center text-sm text-slate-200"
				>{title}</span
			>
		</div>
	{/if}

	{#if resolvedSrc && !loaded}
		<button
			class="absolute inset-0 z-10 grid place-items-center bg-black/10 transition hover:bg-black/25 focus-visible:bg-black/25"
			type="button"
			aria-label={`${i18n.content.ui.media.playLabel} : ${title}`}
			onclick={loadVideo}
		>
			<span
				class="grid size-14 place-items-center rounded-full border border-white/20 bg-black/55 text-white shadow-xl backdrop-blur transition group-hover:scale-105"
			>
				<Play class="ml-0.5" size={22} fill="currentColor" aria-hidden="true" />
			</span>
		</button>
	{/if}
</figure>
