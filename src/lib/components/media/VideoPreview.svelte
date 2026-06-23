<script lang="ts">
	import { Play } from '@lucide/svelte';

	type Props = {
		title: string;
		poster?: string;
		src?: string;
		aspect?: 'video' | 'vertical';
		class?: string;
	};

	let { title, poster, src, aspect = 'video', class: className = '' }: Props = $props();

	const aspectClasses = {
		video: 'aspect-video',
		vertical: 'aspect-[9/16]'
	};
</script>

<figure
	class={[
		'group relative overflow-hidden rounded-lg border border-white/10 bg-slate-900 shadow-[var(--shadow-premium)]',
		aspectClasses[aspect],
		className
	]}
>
	{#if src}
		<video
			class="size-full object-cover"
			{poster}
			{src}
			preload="metadata"
			muted
			playsinline
			controls
			aria-label={title}
		></video>
	{:else if poster}
		<img class="size-full object-cover" src={poster} alt={title} loading="lazy" />
	{:else}
		<div
			class="grid size-full place-items-center bg-[radial-gradient(circle_at_30%_20%,rgb(155_124_255/0.24),transparent_32%),linear-gradient(135deg,#121827,#060913_62%,#101727)]"
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
