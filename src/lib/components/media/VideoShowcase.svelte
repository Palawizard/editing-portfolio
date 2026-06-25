<script lang="ts">
	import Badge from '$lib/components/ui/Badge.svelte';
	import VideoPreview from './VideoPreview.svelte';

	type Props = {
		title: string;
		description: string;
		label?: string;
		poster?: string;
		src?: string;
		aspect?: 'video' | 'vertical';
		class?: string;
	};

	let {
		title,
		description,
		label = 'Sélection de montages récents',
		poster,
		src,
		aspect = 'video',
		class: className = ''
	}: Props = $props();
</script>

<section
	class={[
		'grid gap-8 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4 shadow-[var(--shadow-premium)] md:grid-cols-[1.25fr_0.75fr] md:items-center md:p-6',
		className
	]}
>
	<VideoPreview {title} {poster} {src} {aspect} />

	<div class="px-1 pb-2 md:px-2 md:pb-0">
		<Badge tone="accent">{label}</Badge>
		<h2 class="display-title mt-5 text-4xl text-balance text-white md:text-5xl">{title}</h2>
		<p class="mt-4 text-base leading-7 text-slate-300">{description}</p>
	</div>
</section>
