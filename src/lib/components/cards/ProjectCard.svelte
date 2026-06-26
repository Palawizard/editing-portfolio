<script lang="ts">
	import VideoPreview from '$lib/components/media/VideoPreview.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import { getLocaleContext } from '$lib/i18n/context';
	import { getPublishedVideo } from '$lib/utils/media';
	import type { Project } from '$lib/types/project';

	type Props = {
		project: Project;
		compact?: boolean;
		index?: number;
		minimal?: boolean;
		autoplay?: boolean;
	};

	let { project, compact = false, index = 0, minimal = false, autoplay = false }: Props = $props();
	const i18n = getLocaleContext();
	const mediaAspect = $derived(project.format === '9:16' ? 'vertical' : 'video');
	const publishedVideo = $derived(getPublishedVideo(project.externalUrl));
	const inlineVideoSrc = $derived(project.previewVideo ?? publishedVideo?.directUrl);
	const showInlineVideo = $derived(autoplay && Boolean(inlineVideoSrc));
</script>

<article
	class="group relative h-full overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.035] transition duration-300 hover:-translate-y-1 hover:border-violet-300/35 hover:bg-white/[0.055]"
>
	<div class="relative overflow-hidden">
		{#if showInlineVideo && inlineVideoSrc}
			<VideoPreview
				title={project.title}
				poster={(publishedVideo?.poster ?? project.poster) || undefined}
				src={inlineVideoSrc}
				aspect={mediaAspect}
				autoplay
				class={compact
					? 'max-h-72 rounded-none border-0 shadow-none'
					: 'rounded-none border-0 shadow-none'}
			/>
		{:else}
			<VideoPreview
				title={project.title}
				poster={project.poster || undefined}
				src={project.previewVideo}
				aspect={mediaAspect}
				class={compact
					? 'max-h-72 rounded-none border-0 shadow-none'
					: 'rounded-none border-0 shadow-none'}
			/>
		{/if}
		<div
			class={[
				'pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent',
				showInlineVideo ? 'hidden' : ''
			]}
		></div>
		{#if !minimal}
			<span
				class="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 font-mono text-xs text-white backdrop-blur"
			>
				{String(index + 1).padStart(2, '0')}
			</span>
		{/if}
	</div>

	<div class="p-6">
		{#if !minimal}
			<div class="flex flex-wrap items-center gap-2">
				<Badge tone="accent">{i18n.content.projectCategoryLabels[project.category]}</Badge>
				<span class="text-sm text-slate-400">{project.format}</span>
			</div>
		{/if}

		<h3 class={[minimal ? '' : 'mt-5', 'text-2xl font-bold text-balance text-white']}>
			{project.title}
		</h3>
		{#if !minimal}
			<p class="mt-3 text-sm leading-6 text-slate-300">{project.summary}</p>
		{/if}

		{#if !minimal}
			<p class="mt-6 text-sm text-slate-400">{project.platform.join(' / ')}</p>
		{/if}
	</div>
</article>
