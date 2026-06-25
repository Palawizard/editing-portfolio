<script lang="ts">
	import ProjectCard from '$lib/components/cards/ProjectCard.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { featuredProjects } from '$lib/content/projects';
</script>

<section class="py-20 md:py-28">
	<Container size="wide">
		<div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
			<SectionHeader
				eyebrow="Projets"
				title="Le montage se juge à l’écran"
				description="Des exemples concrets, avec le format, l’objectif et le travail réalisé derrière chaque vidéo."
			/>
			<Button href="/projets" variant="secondary">Voir tous les projets</Button>
		</div>

		<div class="mt-10 grid gap-6 md:grid-cols-2">
			{#each featuredProjects.slice(0, 4) as project, index (project.slug)}
				<ProjectCard {project} {index} />
			{/each}
		</div>
	</Container>
</section>
