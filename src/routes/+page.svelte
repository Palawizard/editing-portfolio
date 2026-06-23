<script lang="ts">
	import { resolve } from '$app/paths';
	import { editingFormats } from '$lib/content/formats';
	import { featuredProjects } from '$lib/content/projects';
	import { heroActions, heroBadges, siteMetadata } from '$lib/content/site';
</script>

<main>
	<section class="mx-auto max-w-6xl px-6 py-20 md:py-28">
		<p class="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
			Portfolio montage vidéo
		</p>
		<h1 class="max-w-3xl text-4xl font-bold text-balance md:text-6xl">
			{siteMetadata.title}
		</h1>
		<p class="mt-6 max-w-2xl text-lg text-slate-300">
			{siteMetadata.description}
		</p>
		<div class="mt-8 flex flex-wrap gap-3">
			{#each heroActions as action (action.href)}
				<a
					class={[
						'rounded-full px-5 py-3 text-sm font-semibold transition',
						action.variant === 'primary'
							? 'bg-violet-400 text-slate-950 hover:bg-violet-300'
							: 'border border-white/15 text-white hover:border-white/35'
					]}
					href={resolve(action.href)}
				>
					{action.label}
				</a>
			{/each}
		</div>
		<div class="mt-8 flex flex-wrap gap-2">
			{#each heroBadges as badge (badge)}
				<span class="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300">
					{badge}
				</span>
			{/each}
		</div>
	</section>

	<section id="formats" class="mx-auto max-w-6xl px-6 py-16">
		<p class="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Formats</p>
		<h2 class="mt-3 text-3xl font-bold text-white">Des montages pensés pour publier vite</h2>
		<div class="mt-8 grid gap-4 md:grid-cols-2">
			{#each editingFormats as format (format.id)}
				<article class="rounded-lg border border-white/10 bg-white/[0.04] p-6">
					<h3 class="text-xl font-semibold text-white">{format.title}</h3>
					<p class="mt-2 text-violet-200">{format.promise}</p>
					<p class="mt-3 text-sm leading-6 text-slate-300">{format.description}</p>
				</article>
			{/each}
		</div>
	</section>

	<section class="mx-auto max-w-6xl px-6 py-16">
		<p class="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Projets</p>
		<h2 class="mt-3 text-3xl font-bold text-white">Projets sélectionnés</h2>
		<div class="mt-8 grid gap-4 md:grid-cols-2">
			{#each featuredProjects as project (project.slug)}
				<article class="rounded-lg border border-white/10 bg-white/[0.04] p-6">
					<h3 class="text-xl font-semibold text-white">{project.title}</h3>
					<p class="mt-2 text-sm leading-6 text-slate-300">{project.summary}</p>
					<p class="mt-4 text-sm text-slate-400">
						{project.platform.join(' / ')} · {project.format}
					</p>
				</article>
			{/each}
		</div>
	</section>
</main>
