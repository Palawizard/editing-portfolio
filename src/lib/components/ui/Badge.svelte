<script lang="ts">
	type BadgeTone = 'neutral' | 'accent' | 'cyan';

	type Props = {
		tone?: BadgeTone;
		class?: string;
		children?: import('svelte').Snippet;
	};

	let { tone = 'neutral', class: className = '', children }: Props = $props();

	const toneClasses: Record<BadgeTone, string> = {
		neutral: 'bg-white/70 text-mute',
		accent: 'bg-white text-paper',
		cyan: 'bg-peach text-paper'
	};
</script>

<span
	class={[
		'inline-flex min-h-7 items-center rounded-full px-3 py-1 text-xs font-extrabold',
		toneClasses[tone],
		className
	]}
>
	{@render children?.()}
</span>
