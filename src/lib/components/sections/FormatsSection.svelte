<script lang="ts">
	import { ArrowRight, Check } from '@lucide/svelte';
	import FormatCarousel from '$lib/components/sections/FormatCarousel.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { getContactStyleHref } from '$lib/content/contact';
	import { getLocaleContext } from '$lib/i18n/context';
	import type { ProjectChoice } from '$lib/types/project';

	let selectedChoice = $state<ProjectChoice | undefined>(undefined);
	const i18n = getLocaleContext();
	const selectedFormat = $derived(
		selectedChoice === 'custom'
			? undefined
			: i18n.content.editingFormats.find((format) => format.id === selectedChoice)
	);
</script>

<section
	id="formats"
	class="relative overflow-hidden scroll-mt-28 border-y border-white/10 bg-[var(--color-bg-soft)] py-16 md:py-24"
>
	<div
		class="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgb(155_124_255/0.07),transparent_68%)]"
	></div>
	<Container size="wide" class="relative">
		<SectionHeader
			eyebrow={i18n.content.ui.formatsSection.eyebrow}
			title={i18n.content.ui.formatsSection.title}
			description={i18n.content.ui.formatsSection.description}
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
							{i18n.content.ui.formatsSection.requestFormat}
							<ArrowRight size={18} aria-hidden="true" />
						</Button>
						<Button href="/projets" variant="secondary">
							{i18n.content.ui.formatsSection.viewExamples}
						</Button>
					</div>
				{:else}
					<div>
						<p class="text-sm font-semibold text-cyan-200">
							{i18n.content.ui.formatsSection.customEyebrow}
						</p>
						<h3 class="mt-2 text-2xl font-bold text-white">
							{i18n.content.ui.formatsSection.customTitle}
						</h3>
						<p class="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
							{i18n.content.ui.formatsSection.customDescription}
						</p>
					</div>
					<Button href={getContactStyleHref('custom')}>
						{i18n.content.ui.formatsSection.presentIdea}
						<ArrowRight size={18} aria-hidden="true" />
					</Button>
				{/if}
			</div>
		{/if}
	</Container>
</section>
