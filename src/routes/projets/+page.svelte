<script lang="ts">
	import { projectCategoryLabels } from '$lib/content/formats';
	import { projects } from '$lib/content/projects';
</script>

<svelte:head>
	<title>Projets | Montage vidéo</title>
	<meta
		name="description"
		content="Une sélection de montages vidéo avec leur objectif, leur format et le travail réalisé."
	/>
</svelte:head>

<main class="mx-auto max-w-6xl px-6 py-16">
	<p class="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">Portfolio</p>
	<h1 class="mt-3 text-4xl font-bold text-white">Projets de montage</h1>
	<p class="mt-4 max-w-2xl text-slate-300">
		Chaque projet présente le format, l'objectif du montage et le travail réalisé pour rendre la
		vidéo plus claire, plus rythmée et prête à publier.
	</p>

	<div class="mt-10 grid gap-5 md:grid-cols-2">
		{#each projects as project (project.slug)}
			<article class="rounded-lg border border-white/10 bg-white/[0.04] p-6">
				<p class="text-sm font-medium text-cyan-300">{projectCategoryLabels[project.category]}</p>
				<h2 class="mt-3 text-2xl font-semibold text-white">{project.title}</h2>
				<p class="mt-3 text-sm leading-6 text-slate-300">{project.objective}</p>
				<ul class="mt-5 space-y-2 text-sm text-slate-300">
					{#each project.work as item (item)}
						<li>{item}</li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>
</main>
