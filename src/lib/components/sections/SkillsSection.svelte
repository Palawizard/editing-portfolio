<script lang="ts">
	import Badge from '$lib/components/ui/Badge.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { skills, tools } from '$lib/content/services';
</script>

<section class="py-16 md:py-22">
	<Container class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
		<SectionHeader
			eyebrow="Compétences"
			title="Des vidéos prêtes à publier"
			description="Le montage sert le rythme, la clarté et le format attendu sur chaque plateforme."
		/>

		<div class="grid gap-5">
			<div class="rounded-lg border border-white/10 bg-white/[0.035] p-6">
				<h3 class="text-xl font-semibold text-white">Travail réalisé</h3>
				<div class="mt-5 flex flex-wrap gap-2">
					{#each skills as skill (skill)}
						<Badge>{skill}</Badge>
					{/each}
				</div>
			</div>

			<div class="rounded-lg border border-white/10 bg-white/[0.035] p-6">
				<h3 class="text-xl font-semibold text-white">Outils</h3>
				<div class="mt-5 flex flex-wrap gap-2">
					{#each tools as tool (tool)}
						<Badge tone="cyan">{tool}</Badge>
					{/each}
				</div>
			</div>
		</div>
	</Container>
</section>
