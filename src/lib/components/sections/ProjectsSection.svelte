<script lang="ts">
	import ProjectCard from '$lib/components/cards/ProjectCard.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { getLocaleContext } from '$lib/i18n/context';

	const i18n = getLocaleContext();
	const featuredProjects = $derived(i18n.content.projects.filter((project) => project.featured));
</script>

<section class="py-20 md:py-28">
	<Container size="wide">
		<div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
			<SectionHeader
				eyebrow={i18n.content.ui.projectsSection.eyebrow}
				title={i18n.content.ui.projectsSection.title}
				description={i18n.content.ui.projectsSection.description}
			/>
			<Button href="/projets" variant="secondary">{i18n.content.ui.projectsSection.viewAll}</Button>
		</div>

		<div class="mt-10 grid gap-6 md:grid-cols-2">
			{#each featuredProjects.slice(0, 4) as project, index (project.slug)}
				<ProjectCard {project} {index} />
			{/each}
		</div>
	</Container>
</section>
