<script lang="ts">
	import { ArrowRight, SlidersHorizontal } from '@lucide/svelte';
	import FormatCarousel from '$lib/components/sections/FormatCarousel.svelte';
	import ProjectCard from '$lib/components/cards/ProjectCard.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import { getContactStyleHref } from '$lib/content/contact';
	import { getLocaleContext } from '$lib/i18n/context';
	import { sortProjectsByPrice } from '$lib/utils/pricing';
	import type { ProjectChoice } from '$lib/types/project';

	let selectedChoice = $state<ProjectChoice>();
	const i18n = getLocaleContext();

	const filteredProjects = $derived(
		!selectedChoice || selectedChoice === 'custom'
			? []
			: sortProjectsByPrice(
					i18n.content.projects.filter((project) => project.category === selectedChoice)
				)
	);

	const selectedLabel = $derived(
		selectedChoice === 'custom'
			? i18n.content.customFormatChoice.title
			: selectedChoice
				? i18n.content.projectCategoryLabels[selectedChoice]
				: ''
	);

	const isVerticalExamplesGrid = $derived(
		Boolean(
			selectedChoice &&
			selectedChoice !== 'custom' &&
			filteredProjects.length > 0 &&
			filteredProjects.every((project) => project.format === '9:16')
		)
	);
</script>

<svelte:head>
	<title>{i18n.content.ui.projectsPage.metaTitle}</title>
	<meta name="description" content={i18n.content.ui.projectsPage.metaDescription} />
</svelte:head>

<main id="main-content">
	<section class="relative overflow-x-clip pb-10 pt-10 md:pb-14 md:pt-12">
		<div
			class="pointer-events-none absolute left-1/2 top-0 h-72 w-[50rem] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[100px]"
		></div>
		<Container size="wide">
			<div class="mx-auto max-w-4xl text-center">
				<h1 class="display-title text-5xl text-gradient sm:text-6xl md:text-7xl">
					{i18n.content.ui.projectsPage.title}
				</h1>
			</div>

			<div class="mt-1 md:mt-2">
				<FormatCarousel
					selected={selectedChoice}
					onSelect={(choice) => (selectedChoice = choice)}
					prominent
				/>
			</div>
		</Container>
	</section>

	{#if selectedChoice}
		<section
			id="project-results"
			class="scroll-mt-28 border-t border-white/10 py-16 md:py-24"
			aria-live="polite"
		>
			<Container size="wide">
				{#if selectedChoice === 'custom'}
					<div
						class="relative overflow-hidden rounded-[1.75rem] border border-cyan-200/20 bg-[linear-gradient(135deg,rgb(101_216_255/0.1),rgb(155_124_255/0.08)_50%,rgb(255_255_255/0.025))] p-7 shadow-[var(--shadow-premium)] md:p-12"
					>
						<div
							class="absolute -right-24 -top-24 size-72 rounded-full bg-cyan-300/10 blur-3xl"
						></div>
						<div class="relative grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
							<div>
								<SlidersHorizontal class="text-cyan-100" size={25} aria-hidden="true" />
								<h2 class="display-title mt-6 max-w-3xl text-4xl text-white md:text-6xl">
									{i18n.content.ui.projectsPage.customTitle}
								</h2>
								<p class="mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
									{i18n.content.ui.projectsPage.customDescription}
								</p>
							</div>
							<div class="lg:justify-self-end">
								<Button href={getContactStyleHref('custom')} class="w-full sm:w-auto">
									{i18n.content.ui.projectsPage.customCta}
									<ArrowRight size={18} aria-hidden="true" />
								</Button>
							</div>
						</div>
					</div>
				{:else}
					<div class="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
						<div>
							<h2 class="display-title text-4xl text-white md:text-6xl">{selectedLabel}</h2>
							{#if filteredProjects.length}
								<p class="mt-4 max-w-2xl text-sm leading-6 text-slate-400" role="note">
									{i18n.content.ui.projectsPage.priceDisclaimer}
								</p>
							{/if}
						</div>
						<Button href={getContactStyleHref(selectedChoice)} variant="secondary" class="shrink-0">
							{i18n.content.ui.projectsPage.orderStyle}
						</Button>
					</div>

					<div
						class={[
							'mt-10 grid min-w-0',
							isVerticalExamplesGrid
								? 'grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:gap-6 xl:grid-cols-4'
								: 'grid-cols-2 gap-4 sm:gap-5 md:gap-6 xl:grid-cols-3'
						]}
					>
						{#if filteredProjects.length}
							{#each filteredProjects as project, index (project.slug)}
								<ProjectCard {project} {index} minimal />
							{/each}
						{:else}
							<p
								class="rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-6 text-sm leading-6 text-slate-300 col-span-2 xl:col-span-3"
							>
								{i18n.content.ui.projectsPage.emptyState}
							</p>
						{/if}
					</div>
				{/if}
			</Container>
		</section>
	{/if}
</main>
