<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import FormatCarousel from '$lib/components/sections/FormatCarousel.svelte';
	import ControlRoom from '$lib/components/sections/ControlRoom.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import { getContactStyleHref } from '$lib/content/contact';
	import { getLocaleContext } from '$lib/i18n/context';
	import { sortProjectsByPrice } from '$lib/utils/pricing';
	import type { ProjectChoice } from '$lib/types/project';

	// The cheapest format is live on arrival, so the page never opens empty.
	let selectedChoice = $state<ProjectChoice>('gaming-short-form');
	const i18n = getLocaleContext();

	const filteredProjects = $derived(
		selectedChoice === 'custom'
			? []
			: sortProjectsByPrice(
					i18n.content.projects.filter((project) => project.category === selectedChoice)
				)
	);

	const selectedLabel = $derived(
		selectedChoice === 'custom'
			? i18n.content.customFormatChoice.title
			: i18n.content.projectCategoryLabels[selectedChoice]
	);

	let controlRoom = $state<ReturnType<typeof ControlRoom>>();

	// Same scene change as the studio: the P sweeps the program monitor, the format swaps behind it.
	const selectChoice = (scene: ProjectChoice | 'showreel') => {
		if (scene === 'showreel' || scene === selectedChoice) return;
		if (controlRoom && scene !== 'custom') controlRoom.cut(() => (selectedChoice = scene));
		else selectedChoice = scene;
		// On phones the program sits below the scenes: bring it into view.
		if (window.matchMedia('(max-width: 63.99rem)').matches) {
			requestAnimationFrame(() =>
				document.getElementById('program')?.scrollIntoView({ behavior: 'smooth' })
			);
		}
	};
</script>

<svelte:head>
	<title>{i18n.content.ui.projectsPage.metaTitle}</title>
	<meta name="description" content={i18n.content.ui.projectsPage.metaDescription} />
</svelte:head>

<main id="main-content">
	<section class="pt-4 pb-16 md:pt-8 md:pb-24">
		<Container size="wide">
			<h1 class="display-title print-in max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)]">
				{i18n.content.ui.projectsPage.title}
			</h1>

			<!-- The live format is named first, flush left; below it the dock and the program share one top line. -->
			<div class="rise mt-8 mb-4 flex flex-wrap items-end justify-between gap-3" style="--i: 1">
				<h2 class="display-title text-[clamp(1.75rem,3.5vw,2.75rem)]">{selectedLabel}</h2>
				{#if filteredProjects.length}
					<p class="max-w-[52ch] text-xs leading-5 font-medium text-mute" role="note">
						{i18n.content.ui.projectsPage.priceDisclaimer}
					</p>
				{/if}
			</div>

			<!-- OBS layout: the scene list docked left, program and sources on the right. -->
			<div class="grid gap-4 lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-start">
				<aside
					class="panel rise p-2.5 lg:sticky lg:top-24"
					style="--i: 2"
					aria-label={i18n.content.ui.studio.scenesLabel}
				>
					<p class="label px-1.5 pt-1 pb-2.5 text-mute">{i18n.content.ui.studio.scene}s</p>
					<FormatCarousel selected={selectedChoice} onSelect={selectChoice} variant="dock" />
				</aside>

				<div id="program" class="rise min-w-0 scroll-mt-24" style="--i: 3">
					<p class="sr-only" role="status">{selectedLabel}</p>
					{#if selectedChoice === 'custom'}
						<div
							class="grid gap-8 rounded-[32px] bg-paper p-7 text-white shadow-[var(--shadow-lift)] md:p-10"
						>
							<div>
								<h3 class="display-title max-w-2xl text-[clamp(2rem,4vw,3rem)]">
									{i18n.content.ui.projectsPage.customTitle}
								</h3>
								<p class="mt-4 max-w-[56ch] text-base leading-7 text-white/80">
									{i18n.content.ui.projectsPage.customDescription}
								</p>
							</div>
							<Button
								href={getContactStyleHref('custom')}
								variant="secondary"
								class="w-full justify-self-start sm:w-auto"
							>
								{i18n.content.ui.projectsPage.customCta}
								<ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
							</Button>
						</div>
					{:else if filteredProjects.length}
						<ControlRoom
							bind:this={controlRoom}
							format={i18n.content.editingFormats.find((f) => f.id === selectedChoice)}
							projects={filteredProjects}
							orderHref={getContactStyleHref(selectedChoice)}
						/>
					{:else}
						<p class="panel p-6 text-sm leading-6 font-medium text-mute">
							{i18n.content.ui.projectsPage.emptyState}
						</p>
					{/if}
				</div>
			</div>
		</Container>
	</section>
</main>
