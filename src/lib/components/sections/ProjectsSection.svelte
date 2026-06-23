<script lang="ts">
	import ProjectCard from '$lib/components/cards/ProjectCard.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { featuredProjects } from '$lib/content/projects';
</script>

<section class="py-14 md:py-20">
	<Container>
		<div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
			<SectionHeader
				eyebrow="Projets"
				title="Des exemples avec contexte"
				description="Chaque montage est présenté avec son objectif, son format et la plateforme visée."
			/>
			<Button href="/projets" variant="secondary">Voir tous les projets</Button>
		</div>

		<div class="mt-10 grid gap-5 md:grid-cols-2">
			{#each featuredProjects.slice(0, 4) as project (project.slug)}
				<ProjectCard {project} />
			{/each}
		</div>
	</Container>
</section>
