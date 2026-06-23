<script lang="ts">
	type BadgeTone = 'neutral' | 'accent' | 'cyan';

	type Props = {
		tone?: BadgeTone;
		class?: string;
		children?: import('svelte').Snippet;
	};

	let { tone = 'neutral', class: className = '', children }: Props = $props();

	const toneClasses: Record<BadgeTone, string> = {
		neutral: 'border-white/10 bg-white/[0.04] text-slate-300',
		accent: 'border-violet-300/25 bg-violet-300/10 text-violet-100',
		cyan: 'border-cyan-300/25 bg-cyan-300/10 text-cyan-100'
	};
</script>

<span
	class={[
		'inline-flex min-h-8 items-center rounded-full border px-3 py-1 text-sm font-medium',
		toneClasses[tone],
		className
	]}
>
	{@render children?.()}
</span>
