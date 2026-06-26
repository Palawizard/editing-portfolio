<script lang="ts">
	import { ArrowRight, Check } from '@lucide/svelte';
	import FormatCarousel from '$lib/components/sections/FormatCarousel.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { getContactStyleHref } from '$lib/content/contact';
	import { editingFormats } from '$lib/content/formats';
	import type { ProjectChoice } from '$lib/types/project';

	let selectedChoice = $state<ProjectChoice | undefined>(undefined);
	const selectedFormat = $derived(
		selectedChoice === 'custom'
			? undefined
			: editingFormats.find((format) => format.id === selectedChoice)
	);
</script>

<section id="formats" class="scroll-mt-28 border-y border-white/10 bg-white/[0.018] py-14 md:py-18">
	<Container size="wide">
		<SectionHeader
			eyebrow="Trouve ton format"
			title="Un style différent pour chaque objectif"
			description="Parcours les formats, choisis une direction et découvre les montages déjà réalisés dans ce style."
			align="center"
			class="max-w-4xl"
		/>

		<div class="mt-12">
			<FormatCarousel selected={selectedChoice} onSelect={(choice) => (selectedChoice = choice)} />
		</div>

		{#if selectedChoice}
		<div
			class="mt-8 grid gap-8 rounded-[1.5rem] border border-white/10 bg-black/20 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8"
		>
			{#if selectedFormat}
				<div>
					<p class="text-sm font-semibold text-cyan-200">{selectedFormat.title}</p>
					<h3 class="mt-2 text-2xl font-bold text-white">{selectedFormat.promise}</h3>
					<div class="mt-5 flex flex-wrap gap-x-5 gap-y-3">
						{#each selectedFormat.highlights as highlight (highlight)}
							<span class="flex items-center gap-2 text-sm text-slate-300">
								<Check class="text-violet-200" size={16} aria-hidden="true" />
								{highlight}
							</span>
						{/each}
					</div>
				</div>
				<div class="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
					<Button href={getContactStyleHref(selectedFormat.id)}>
						Demander ce format
						<ArrowRight size={18} aria-hidden="true" />
					</Button>
					<Button href="/projets" variant="secondary">Voir les exemples</Button>
				</div>
			{:else}
				<div>
					<p class="text-sm font-semibold text-cyan-200">Commande personnalisée</p>
					<h3 class="mt-2 text-2xl font-bold text-white">
						Une direction construite autour de ton projet.
					</h3>
					<p class="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
						Partage tes références et ton objectif, puis définissons le format ensemble.
					</p>
				</div>
				<Button href={getContactStyleHref('custom')}>
					Présenter mon idée
					<ArrowRight size={18} aria-hidden="true" />
				</Button>
			{/if}
		</div>
		{/if}
	</Container>
</section>
