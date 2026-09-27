<script lang="ts">
	import EstimatorWizard from '$lib/components/forms/EstimatorWizard.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import { getLocaleContext } from '$lib/i18n/context';

	const i18n = getLocaleContext();
	const copy = $derived(i18n.content.estimateCopy);
</script>

<svelte:head>
	<title>{copy.metaTitle}</title>
	<meta name="description" content={copy.metaDescription} />
</svelte:head>

<main id="main-content">
	<section class="min-h-[calc(100vh-4.5rem)] pt-4 pb-16 md:pt-8">
		<Container size="wide">
			<div class="mx-auto max-w-4xl">
				<div class="mb-10 md:mb-14">
					<h1 class="display-title print-in text-[clamp(2.5rem,7vw,5rem)]">
						{copy.title}
					</h1>
					<p
						class="rise mt-5 max-w-[58ch] text-base leading-7 font-medium text-mute md:text-lg"
						style="--i: 1"
					>
						{copy.description}
					</p>
				</div>
				<div class="rise" style="--i: 2"><EstimatorWizard /></div>
			</div>
		</Container>
	</section>
</main>
