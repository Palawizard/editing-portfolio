<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import { resolve } from '$app/paths';
	import VideoPreview from '$lib/components/media/VideoPreview.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import { projectCategoryLabels } from '$lib/content/formats';
	import type { Project } from '$lib/types/project';

	type Props = {
		project: Project;
		compact?: boolean;
		index?: number;
	};

	let { project, compact = false, index = 0 }: Props = $props();
</script>

<article
	class="group relative h-full overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.035] transition duration-300 hover:-translate-y-1 hover:border-violet-300/35 hover:bg-white/[0.055]"
>
	<div class="relative overflow-hidden">
		<VideoPreview
			title={project.title}
			poster={project.poster || undefined}
			src={project.previewVideo}
			aspect="video"
			class={compact
				? 'max-h-72 rounded-none border-0 shadow-none'
				: 'rounded-none border-0 shadow-none'}
		/>
		<div
			class="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"
		></div>
		<span
			class="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 font-mono text-xs text-white backdrop-blur"
		>
			{String(index + 1).padStart(2, '0')}
		</span>
	</div>

	<div class="p-6">
		<div class="flex flex-wrap items-center gap-2">
			<Badge tone="accent">{projectCategoryLabels[project.category]}</Badge>
			<span class="text-sm text-slate-400">{project.format}</span>
		</div>

		<h3 class="mt-5 text-2xl font-bold text-balance text-white">{project.title}</h3>
		<p class="mt-3 text-sm leading-6 text-slate-300">{project.summary}</p>

		<div class="mt-6 flex min-w-0 items-center justify-between gap-4">
			<p class="text-sm text-slate-400">{project.platform.join(' / ')}</p>
			<a
				class="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition group-hover:border-cyan-200/50 group-hover:bg-cyan-200/10"
				href={resolve('/projets/[slug]', { slug: project.slug })}
				aria-label={`Voir le projet ${project.title}`}
			>
				<ArrowUpRight size={18} aria-hidden="true" />
			</a>
		</div>
	</div>
</article>
