<script lang="ts">
	import VideoShowcase from '$lib/components/media/VideoShowcase.svelte';
	import Container from '$lib/components/ui/Container.svelte';
</script>

<section class="pb-20 md:pb-28" aria-labelledby="showreel-title">
	<Container size="wide">
		<VideoShowcase
			title="Sélection de montages récents"
			description="Un aperçu court pour montrer le rythme, les formats et le niveau de finition des montages."
			class="scroll-mt-28"
		/>
	</Container>
</section>
