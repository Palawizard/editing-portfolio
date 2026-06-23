<script lang="ts">
	import Container from '$lib/components/ui/Container.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { processSteps } from '$lib/content/services';
</script>

<section class="border-y border-white/10 bg-slate-950/40 py-16 md:py-22">
	<Container>
		<SectionHeader
			eyebrow="Méthode"
			title="Une méthode simple, du brief à la livraison"
			description="Un cadre clair pour avancer vite, garder la bonne direction et livrer un fichier prêt à publier."
		/>

		<div class="mt-10 grid gap-4 md:grid-cols-4">
			{#each processSteps as step, index (step.title)}
				<article class="rounded-lg border border-white/10 bg-white/[0.035] p-5">
					<p class="text-sm font-semibold text-cyan-200">{String(index + 1).padStart(2, '0')}</p>
					<h3 class="mt-4 text-xl font-semibold text-white">{step.title}</h3>
					<p class="mt-3 text-sm leading-6 text-slate-300">{step.description}</p>
				</article>
			{/each}
		</div>
	</Container>
</section>
