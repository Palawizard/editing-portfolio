<script lang="ts">
	import ProjectCard from '$lib/components/cards/ProjectCard.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { projectCategoryLabels } from '$lib/content/formats';
	import { projects } from '$lib/content/projects';
	import type { ProjectCategory } from '$lib/types/project';

	type CategoryFilter = ProjectCategory | 'all';

	let selectedCategory = $state<CategoryFilter>('all');

	const categoryFilters: { id: CategoryFilter; label: string }[] = [
		{ id: 'all', label: 'Tous' },
		{ id: 'gaming-long-form', label: projectCategoryLabels['gaming-long-form'] },
		{ id: 'gaming-short-form', label: projectCategoryLabels['gaming-short-form'] },
		{ id: 'explainer-short-form', label: projectCategoryLabels['explainer-short-form'] },
		{ id: 'business-promo', label: projectCategoryLabels['business-promo'] }
	];

	const filteredProjects = $derived(
		selectedCategory === 'all'
			? projects
			: projects.filter((project) => project.category === selectedCategory)
	);
</script>

<svelte:head>
	<title>Projets | Montage vidéo</title>
	<meta
		name="description"
		content="Une sélection de montages vidéo avec leur objectif, leur format et le travail réalisé."
	/>
</svelte:head>

<main id="main-content" class="py-16 md:py-24">
	<Container>
		<div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
			<SectionHeader
				eyebrow="Portfolio"
				title="Projets de montage"
				description="Des montages présentés avec leur objectif, leur format et le travail réalisé pour rendre la vidéo plus claire, plus rythmée et prête à publier."
			/>
			<Button href="/contact" variant="secondary">Discuter d'un montage</Button>
		</div>

		<div
			class="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 md:flex-wrap md:overflow-visible"
			aria-label="Filtrer les projets"
		>
			{#each categoryFilters as filter (filter.id)}
				<button
					class={[
						'min-h-11 shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition',
						selectedCategory === filter.id
							? 'border-cyan-200 bg-cyan-200 text-slate-950'
							: 'border-white/10 bg-white/[0.04] text-slate-200 hover:border-white/30 hover:bg-white/[0.08]'
					]}
					type="button"
					aria-pressed={selectedCategory === filter.id}
					onclick={() => (selectedCategory = filter.id)}
				>
					{filter.label}
				</button>
			{/each}
		</div>

		<div class="mt-8 grid min-w-0 gap-5 md:grid-cols-2 xl:grid-cols-3">
			{#each filteredProjects as project (project.slug)}
				<ProjectCard {project} />
			{/each}
		</div>
	</Container>
</main>
