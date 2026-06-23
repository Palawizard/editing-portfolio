<script lang="ts">
	import ProjectCard from '$lib/components/cards/ProjectCard.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { projects } from '$lib/content/projects';
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

		<div class="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
			{#each projects as project (project.slug)}
				<ProjectCard {project} />
			{/each}
		</div>
	</Container>
</main>
