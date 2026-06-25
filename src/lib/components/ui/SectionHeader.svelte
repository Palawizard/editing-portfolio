<script lang="ts">
	type Props = {
		eyebrow?: string;
		title: string;
		description?: string;
		align?: 'left' | 'center';
		class?: string;
	};

	let { eyebrow, title, description, align = 'left', class: className = '' }: Props = $props();
</script>

<div class={[align === 'center' ? 'mx-auto text-center' : '', 'max-w-3xl', className]}>
	{#if eyebrow}
		<p class="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">{eyebrow}</p>
	{/if}
	<h2 class="display-title mt-4 text-4xl text-balance text-white md:text-6xl">{title}</h2>
	{#if description}
		<p class="mt-4 text-base leading-7 text-slate-300 md:text-lg">{description}</p>
	{/if}
</div>
