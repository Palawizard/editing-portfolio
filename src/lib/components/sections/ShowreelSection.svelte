<script lang="ts">
	import VideoShowcase from '$lib/components/media/VideoShowcase.svelte';
	import Container from '$lib/components/ui/Container.svelte';
</script>

<section class="py-10 md:py-14" aria-labelledby="showreel-title">
	<Container>
		<VideoShowcase
			title="Sélection de montages récents"
			description="Un aperçu court pour montrer le rythme, les formats et le niveau de finition des montages."
			label="Showreel"
			class="scroll-mt-28"
		/>
	</Container>
</section>
