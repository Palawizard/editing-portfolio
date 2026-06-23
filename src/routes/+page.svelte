<script lang="ts">
	import FormatCard from '$lib/components/cards/FormatCard.svelte';
	import ProjectCard from '$lib/components/cards/ProjectCard.svelte';
	import VideoShowcase from '$lib/components/media/VideoShowcase.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { editingFormats } from '$lib/content/formats';
	import { featuredProjects } from '$lib/content/projects';
	import { heroActions, heroBadges, siteMetadata } from '$lib/content/site';
</script>

<main>
	<section class="relative overflow-hidden py-20 md:py-28">
		<Container class="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
			<div>
				<p class="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-violet-200">
					Portfolio montage vidéo
				</p>
				<h1 class="max-w-4xl text-4xl font-bold text-balance text-white md:text-6xl">
					{siteMetadata.title}
				</h1>
				<p class="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
					{siteMetadata.description}
				</p>
				<div class="mt-8 flex flex-wrap gap-3">
					{#each heroActions as action (action.href)}
						<Button href={action.href} variant={action.variant}>{action.label}</Button>
					{/each}
				</div>
				<div class="mt-8 flex flex-wrap gap-2">
					{#each heroBadges as badge (badge)}
						<Badge tone={badge === 'Gaming' ? 'cyan' : 'neutral'}>{badge}</Badge>
					{/each}
				</div>
			</div>

			<VideoShowcase
				title="Sélection de montages récents"
				description="Un aperçu court pour présenter les formats, le rythme et le niveau de finition des montages."
			/>
		</Container>
	</section>

	<section id="formats" class="py-16 md:py-20">
		<Container>
			<SectionHeader
				eyebrow="Formats"
				title="Des montages pensés pour publier vite"
				description="Quatre formats de base pour montrer une polyvalence claire, sans promettre tout et n'importe quoi."
			/>
			<div class="mt-10 grid gap-5 md:grid-cols-2">
				{#each editingFormats as format, index (format.id)}
					<FormatCard {format} {index} />
				{/each}
			</div>
		</Container>
	</section>

	<section class="py-16 md:py-20">
		<Container>
			<SectionHeader
				eyebrow="Projets"
				title="Projets sélectionnés"
				description="Chaque projet donne un minimum de contexte : objectif, format et plateforme visée."
			/>
			<div class="mt-10 grid gap-5 md:grid-cols-2">
				{#each featuredProjects as project (project.slug)}
					<ProjectCard {project} />
				{/each}
			</div>
		</Container>
	</section>
</main>
