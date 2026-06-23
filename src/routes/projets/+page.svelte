<script lang="ts">
	import ProjectCard from '$lib/components/cards/ProjectCard.svelte';
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

<main class="py-16 md:py-20">
	<Container>
		<SectionHeader
			eyebrow="Portfolio"
			title="Projets de montage"
			description="Une sélection de formats avec leur objectif, leur plateforme et le travail réalisé."
		/>

		<div class="mt-10 grid gap-5 md:grid-cols-2">
			{#each projects as project (project.slug)}
				<ProjectCard {project} />
			{/each}
		</div>
	</Container>
</main>
