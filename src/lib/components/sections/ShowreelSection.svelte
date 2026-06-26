<script lang="ts">
	import VideoShowcase from '$lib/components/media/VideoShowcase.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import { getLocaleContext } from '$lib/i18n/context';

	const i18n = getLocaleContext();
</script>

<section class="pb-20 md:pb-28" aria-labelledby="showreel-title">
	<Container size="wide">
		<VideoShowcase
			title={i18n.content.ui.showreel.title}
			description={i18n.content.ui.showreel.description}
			class="scroll-mt-28"
		/>
	</Container>
</section>
