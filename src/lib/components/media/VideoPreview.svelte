<script lang="ts">
	import { Play } from '@lucide/svelte';

	type Props = {
		title: string;
		poster?: string;
		src?: string;
		aspect?: 'video' | 'vertical';
		autoplay?: boolean;
		class?: string;
	};

	let {
		title,
		poster,
		src,
		aspect = 'video',
		autoplay = false,
		class: className = ''
	}: Props = $props();

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
</script>

<figure
	class={[
		'group relative w-full overflow-hidden rounded-lg border border-white/10 bg-slate-950 shadow-[var(--shadow-premium)]',
		aspectClasses[aspect],
		className
	]}
>
	{#if src}
		<video
			class="absolute inset-0 size-full object-cover object-center"
			poster={poster || undefined}
			{src}
			preload="metadata"
			{autoplay}
			loop={autoplay}
			muted
			playsinline
			controls={!autoplay}
			aria-label={title}
			onloadeddata={showFirstFrame}
		></video>
	{:else if poster}
		<img
			class="absolute inset-0 size-full object-cover object-center"
			src={poster}
			alt={title}
			loading="lazy"
		/>
	{:else}
		<div
			class="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_20%,rgb(155_124_255/0.24),transparent_32%),linear-gradient(135deg,#121827,#060913_62%,#101727)]"
		>
			<div
				class="mx-5 flex max-w-sm items-center gap-3 rounded-full border border-white/15 bg-black/25 px-4 py-2 text-center text-sm text-slate-200"
			>
				<Play size={16} aria-hidden="true" />
				<span>{title}</span>
			</div>
		</div>
	{/if}
</figure>
