<script lang="ts">
	import { Check } from '@lucide/svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { getLocaleContext } from '$lib/i18n/context';

	const i18n = getLocaleContext();
</script>

<section class="py-12 md:py-20">
	<Container size="wide" class="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
		<SectionHeader
			title={i18n.content.ui.skillsSection.title}
			description={i18n.content.ui.skillsSection.description}
			class="lg:sticky lg:top-28"
		/>

		<div class="grid gap-3">
			<div class="panel p-5 md:p-7">
				<h3 class="label text-mute">{i18n.content.ui.skillsSection.workTitle}</h3>
				<ul class="mt-4 flex flex-wrap gap-2">
					{#each i18n.content.skills as skill (skill)}
						<li
							class="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm font-bold shadow-[var(--shadow)]"
						>
							<Check class="text-live" size={14} strokeWidth={3} aria-hidden="true" />
							{skill}
						</li>
					{/each}
				</ul>
			</div>

			<div class="rounded-[28px] bg-paper p-5 text-white shadow-[var(--shadow-lift)] md:p-7">
				<h3 class="label text-peach">{i18n.content.ui.skillsSection.toolsTitle}</h3>
				{#each i18n.content.tools as tool (tool.name)}
					<p class="display-title mt-3 text-3xl md:text-4xl">{tool.name}</p>
					<p class="mt-2 max-w-[52ch] text-sm leading-6 text-white/75">{tool.note}</p>
				{/each}
			</div>
		</div>
	</Container>
</section>
