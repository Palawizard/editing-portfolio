<script lang="ts">
	import Container from '$lib/components/ui/Container.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const project = $derived(data.project);
</script>

<svelte:head>
	<title>{project.title} | Montage vidéo</title>
	<meta name="description" content={project.summary} />
</svelte:head>

<main id="main-content" class="py-16 md:py-24">
	<Container>
		<p class="text-sm font-semibold uppercase tracking-[0.2em] text-violet-200">Projet</p>
		<h1 class="mt-3 max-w-4xl text-4xl font-bold text-white md:text-6xl">{project.title}</h1>
		<p class="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{project.summary}</p>
	</Container>
</main>
