<script lang="ts">
	import { ArrowRight, SlidersHorizontal } from '@lucide/svelte';
	import FormatCarousel from '$lib/components/sections/FormatCarousel.svelte';
	import ProjectCard from '$lib/components/cards/ProjectCard.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import { projectCategoryLabels } from '$lib/content/formats';
	import { projects } from '$lib/content/projects';
	import type { ProjectChoice } from '$lib/types/project';

	let selectedChoice = $state<ProjectChoice>('gaming-long-form');

	const filteredProjects = $derived(
		selectedChoice === 'custom'
			? []
			: projects.filter((project) => project.category === selectedChoice)
	);

	const selectedLabel = $derived(
		selectedChoice === 'custom' ? 'Commande personnalisée' : projectCategoryLabels[selectedChoice]
	);
</script>

<svelte:head>
	<title>Choisir un style de montage | Portfolio</title>
	<meta
		name="description"
		content="Choisis un style de montage et découvre les projets réalisés dans ce format."
	/>
</svelte:head>

<main id="main-content">
	<section class="relative overflow-hidden pb-14 pt-16 md:pb-20 md:pt-24">
		<div
			class="pointer-events-none absolute left-1/2 top-0 h-72 w-[50rem] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[100px]"
		></div>
		<Container size="wide">
			<div class="mx-auto max-w-4xl text-center">
				<p class="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
					Portfolio interactif
				</p>
				<h1 class="display-title mt-6 text-5xl text-gradient sm:text-6xl md:text-8xl">
					Choisis ton style.
					<span class="block text-white">Regarde le résultat.</span>
				</h1>
				<p class="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
					Sélectionne un type de montage pour afficher les exemples correspondants, comprendre le
					travail réalisé et trouver la direction adaptée à ton projet.
				</p>
			</div>

			<div class="mt-14 md:mt-18">
				<FormatCarousel
					selected={selectedChoice}
					onSelect={(choice) => (selectedChoice = choice)}
				/>
			</div>
		</Container>
	</section>

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
							<div
								class="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/10 px-4 py-2 text-sm font-semibold text-cyan-100"
							>
								<SlidersHorizontal size={17} aria-hidden="true" />
								Format libre
							</div>
							<h2 class="display-title mt-7 max-w-3xl text-4xl text-white md:text-6xl">
								Ton projet ne rentre pas dans une case ?
							</h2>
							<p class="mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
								Envoie une référence, ton idée et la plateforme visée. Je te propose une direction
								de montage cohérente avec ton contenu, sans forcer un format prédéfini.
							</p>
						</div>
						<div class="lg:justify-self-end">
							<Button href="/contact" class="w-full sm:w-auto">
								Parler de mon projet
								<ArrowRight size={18} aria-hidden="true" />
							</Button>
							<p class="mt-4 max-w-xs text-sm leading-6 text-slate-400">
								Brief, références, durée et destination suffisent pour commencer.
							</p>
						</div>
					</div>
				</div>
			{:else}
				<div class="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
					<div>
						<p class="text-xs font-semibold uppercase tracking-[0.24em] text-violet-200">
							Sélection active
						</p>
						<h2 class="mt-3 text-3xl font-bold text-white md:text-5xl">{selectedLabel}</h2>
						<p class="mt-4 max-w-2xl text-base leading-7 text-slate-400">
							{filteredProjects.length} exemple{filteredProjects.length > 1 ? 's' : ''} disponible{filteredProjects.length >
							1
								? 's'
								: ''}
							dans ce style.
						</p>
					</div>
					<Button href="/contact" variant="secondary">Commander ce style</Button>
				</div>

				<div class="mt-10 grid min-w-0 gap-6 md:grid-cols-2 xl:grid-cols-3">
					{#each filteredProjects as project, index (project.slug)}
						<ProjectCard {project} {index} />
					{/each}
				</div>
			{/if}
		</Container>
	</section>
</main>
