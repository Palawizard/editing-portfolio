<script lang="ts">
	import { Calculator } from '@lucide/svelte';
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
	<section class="relative min-h-[calc(100vh-4.5rem)] overflow-hidden py-12 md:py-16">
		<div
			class="pointer-events-none absolute left-1/2 top-0 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-violet-500/12 blur-[110px]"
		></div>
		<Container size="wide">
			<div class="mx-auto max-w-4xl">
				<div class="mb-9 text-center md:mb-12">
					<div
						class="mx-auto grid size-13 place-items-center rounded-2xl border border-violet-300/25 bg-violet-300/10 text-violet-100"
					>
						<Calculator size={23} aria-hidden="true" />
					</div>
					<p class="mt-5 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
						{copy.eyebrow}
					</p>
					<h1 class="display-title mt-4 text-4xl text-gradient sm:text-5xl md:text-7xl">
						{copy.title}
					</h1>
					<p class="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
						{copy.description}
					</p>
				</div>
				<EstimatorWizard />
			</div>
		</Container>
	</section>
</main>
