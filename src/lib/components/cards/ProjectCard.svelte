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
	};

	let { project, compact = false }: Props = $props();
</script>

<article
	class="group h-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] transition duration-200 hover:-translate-y-0.5 hover:border-violet-300/35 hover:bg-white/[0.055]"
>
	<VideoPreview
		title={project.title}
		poster={project.previewVideo ? project.poster : undefined}
		src={project.previewVideo}
		aspect={project.format === '9:16' ? 'vertical' : 'video'}
		class={compact ? 'max-h-72 border-0 shadow-none' : 'border-0 shadow-none'}
	/>

	<div class="p-6">
		<div class="flex flex-wrap items-center gap-2">
			<Badge tone="accent">{projectCategoryLabels[project.category]}</Badge>
			<span class="text-sm text-slate-400">{project.format}</span>
		</div>

		<h3 class="mt-5 text-2xl font-semibold text-white">{project.title}</h3>
		<p class="mt-3 text-sm leading-6 text-slate-300">{project.summary}</p>

		<div class="mt-6 flex items-center justify-between gap-4">
			<p class="text-sm text-slate-400">{project.platform.join(' / ')}</p>
			<a
				class="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-cyan-200/50 hover:bg-cyan-200/10"
				href={resolve('/projets')}
				aria-label="Voir les projets de montage"
			>
				<ArrowUpRight size={18} aria-hidden="true" />
			</a>
		</div>
	</div>
</article>
