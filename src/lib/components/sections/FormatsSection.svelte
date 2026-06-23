<script lang="ts">
	import FormatCard from '$lib/components/cards/FormatCard.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { editingFormats } from '$lib/content/formats';
</script>

<section id="formats" class="scroll-mt-28 py-14 md:py-20">
	<Container>
		<SectionHeader
			eyebrow="Formats"
			title="Des montages pensés pour publier vite"
			description="Quatre formats clairs pour passer d'un contenu brut à une vidéo prête à sortir."
		/>

		<div class="mt-10 grid gap-5 md:grid-cols-2">
			{#each editingFormats as format, index (format.id)}
				<FormatCard {format} {index} />
			{/each}
		</div>
	</Container>
</section>
