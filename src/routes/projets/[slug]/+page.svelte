<script lang="ts">
	import VideoPreview from '$lib/components/media/VideoPreview.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import { projectCategoryLabels } from '$lib/content/formats';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const project = $derived(data.project);
	const hasMediaBlocks = $derived(
		Boolean(project.supplementalMedia?.length) || Boolean(project.beforeAfter)
	);
</script>

<svelte:head>
	<title>{project.title} | Montage vidéo</title>
	<meta name="description" content={project.summary} />
</svelte:head>

<main id="main-content">
	<section class="py-16 md:py-24">
		<Container>
			<div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
				<div>
					<div class="flex flex-wrap gap-2">
						<Badge tone="accent">{projectCategoryLabels[project.category]}</Badge>
						<Badge>{project.format}</Badge>
						{#each project.platform as platform (platform)}
							<Badge tone="cyan">{platform}</Badge>
						{/each}
					</div>

					<h1 class="mt-6 max-w-4xl text-4xl font-bold text-balance text-white md:text-6xl">
						{project.title}
					</h1>
					<p class="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{project.summary}</p>
				</div>

				<VideoPreview
					title={project.title}
					poster={project.previewVideo ? project.poster : undefined}
					src={project.previewVideo}
				/>
			</div>
		</Container>
	</section>

	<section class="border-y border-white/10 bg-white/[0.018] py-16 md:py-20">
		<Container>
			<div class="grid gap-6 lg:grid-cols-3">
				<article class="rounded-lg border border-white/10 bg-white/[0.035] p-6 lg:col-span-1">
					<p class="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Objectif</p>
					<p class="mt-4 text-base leading-7 text-slate-200">{project.objective}</p>
				</article>

				<article class="rounded-lg border border-white/10 bg-white/[0.035] p-6 lg:col-span-1">
					<p class="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
						Travail réalisé
					</p>
					<ul class="mt-4 grid gap-3 text-sm text-slate-200">
						{#each project.work as item (item)}
							<li class="flex gap-3">
								<span class="mt-2 size-1.5 shrink-0 rounded-full bg-violet-200"></span>
								<span>{item}</span>
							</li>
						{/each}
					</ul>
				</article>

				<article class="rounded-lg border border-white/10 bg-white/[0.035] p-6 lg:col-span-1">
					<p class="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Intention</p>
					<p class="mt-4 text-base leading-7 text-slate-200">
						Obtenir un rendu clair, rythmé et adapté au format {project.format}, prêt à être publié
						sur {project.platform.join(' / ')}.
					</p>
				</article>
			</div>
		</Container>
	</section>

	{#if hasMediaBlocks}
		<section class="py-16 md:py-20">
			<Container>
				<div class="grid gap-6">
					{#if project.supplementalMedia?.length}
						<div class="grid gap-5 md:grid-cols-2">
							{#each project.supplementalMedia as media (media.title)}
								<article class="rounded-lg border border-white/10 bg-white/[0.035] p-4">
									<VideoPreview
										title={media.title}
										poster={media.previewVideo ? media.poster : undefined}
										src={media.previewVideo}
										aspect={media.aspect ?? 'video'}
									/>
									<div class="p-2 pt-5">
										<h2 class="text-xl font-semibold text-white">{media.title}</h2>
										{#if media.description}
											<p class="mt-2 text-sm leading-6 text-slate-300">{media.description}</p>
										{/if}
									</div>
								</article>
							{/each}
						</div>
					{/if}

					{#if project.beforeAfter}
						<article class="rounded-lg border border-white/10 bg-white/[0.035] p-6">
							<h2 class="text-2xl font-bold text-white">{project.beforeAfter.title}</h2>
							<p class="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
								{project.beforeAfter.description}
							</p>
							<div class="mt-6 grid gap-4 md:grid-cols-2">
								<div class="rounded-lg border border-white/10 bg-slate-950/50 p-4">
									<p class="mb-3 text-sm font-semibold text-slate-300">
										{project.beforeAfter.beforeLabel}
									</p>
									{#if project.beforeAfter.beforeVideo}
										<VideoPreview
											title={project.beforeAfter.beforeLabel}
											src={project.beforeAfter.beforeVideo}
										/>
									{/if}
								</div>
								<div class="rounded-lg border border-white/10 bg-slate-950/50 p-4">
									<p class="mb-3 text-sm font-semibold text-slate-300">
										{project.beforeAfter.afterLabel}
									</p>
									{#if project.beforeAfter.afterVideo}
										<VideoPreview
											title={project.beforeAfter.afterLabel}
											src={project.beforeAfter.afterVideo}
										/>
									{/if}
								</div>
							</div>
						</article>
					{/if}
				</div>
			</Container>
		</section>
	{/if}

	<section class="py-16 md:py-20">
		<Container>
			<div
				class="rounded-lg border border-violet-300/20 bg-violet-300/[0.08] p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8"
			>
				<div>
					<h2 class="text-2xl font-bold text-white">Tu veux un montage dans ce style ?</h2>
					<p class="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
						Envoie le format souhaité, quelques références et les rushs disponibles pour définir une
						direction claire.
					</p>
				</div>
				<Button href="/contact" class="mt-6 w-full md:mt-0 md:w-auto">Me contacter</Button>
			</div>
		</Container>
	</section>
</main>
