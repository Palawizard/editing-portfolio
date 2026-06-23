<script lang="ts">
	type Props = {
		title: string;
		src: string;
		aspect?: 'video' | 'vertical';
		class?: string;
	};

	let { title, src, aspect = 'video', class: className = '' }: Props = $props();

	const aspectClasses = {
		video: 'aspect-video',
		vertical: 'aspect-[9/16]'
	};
</script>

<div
	class={[
		'overflow-hidden rounded-lg border border-white/10 bg-black shadow-[var(--shadow-premium)]',
		aspectClasses[aspect],
		className
	]}
>
	<iframe
		class="size-full"
		{src}
		{title}
		loading="lazy"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		allowfullscreen
	></iframe>
</div>
