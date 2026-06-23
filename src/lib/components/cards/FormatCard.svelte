<script lang="ts">
	import Badge from '$lib/components/ui/Badge.svelte';
	import type { EditingFormat } from '$lib/types/project';

	type Props = {
		format: EditingFormat;
		index?: number;
	};

	let { format, index = 0 }: Props = $props();
</script>

<article
	class="group h-full rounded-lg border border-white/10 bg-white/[0.035] p-6 transition duration-200 hover:-translate-y-0.5 hover:border-violet-300/35 hover:bg-white/[0.055]"
>
	<div class="flex items-start justify-between gap-4">
		<Badge tone={index % 2 === 0 ? 'accent' : 'cyan'}>{format.title}</Badge>
		<span class="text-sm font-semibold text-slate-500">{String(index + 1).padStart(2, '0')}</span>
	</div>

	<h3 class="mt-6 text-xl font-semibold text-white">{format.promise}</h3>
	<p class="mt-3 text-sm leading-6 text-slate-300">{format.description}</p>

	<ul class="mt-6 grid gap-2 text-sm text-slate-300">
		{#each format.highlights as highlight (highlight)}
			<li class="flex items-center gap-2">
				<span class="size-1.5 rounded-full bg-cyan-200"></span>
				<span>{highlight}</span>
			</li>
		{/each}
	</ul>
</article>
