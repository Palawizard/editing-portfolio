<script lang="ts">
	import { Check, Clapperboard } from '@lucide/svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { skills, tools } from '$lib/content/services';
</script>

<section class="relative overflow-hidden border-y border-white/10 bg-slate-950/35 py-16 md:py-24">
	<div
		class="pointer-events-none absolute -right-24 top-0 size-80 rounded-full bg-violet-500/10 blur-[100px]"
	></div>
	<div
		class="pointer-events-none absolute -left-20 bottom-0 size-64 rounded-full bg-cyan-400/8 blur-[90px]"
	></div>

	<Container size="wide" class="relative grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
		<SectionHeader
			eyebrow="Compétences"
			title="Des vidéos prêtes à publier"
			description="Le montage sert le rythme, la clarté et le format attendu sur chaque plateforme."
		/>

		<div class="grid gap-5">
			<article
				class="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 shadow-[var(--shadow-premium)] md:p-8"
			>
				<div>
					<p class="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
						Travail réalisé
					</p>
					<p class="mt-2 max-w-md text-sm leading-6 text-slate-400">
						Des compétences orientées résultat, du tri des rushs à l’export final.
					</p>
				</div>

				<ul class="mt-7 grid gap-3 sm:grid-cols-2">
					{#each skills as skill (skill)}
						<li
							class="flex items-start gap-3 rounded-xl border border-white/8 bg-black/20 px-4 py-3.5 transition duration-300 hover:border-violet-300/25 hover:bg-white/[0.04]"
						>
							<span
								class="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-violet-300/25 bg-violet-300/10"
							>
								<Check class="text-violet-100" size={13} aria-hidden="true" />
							</span>
							<span class="text-sm leading-6 text-slate-200">{skill}</span>
						</li>
					{/each}
				</ul>
			</article>

			<article
				class="overflow-hidden rounded-[1.5rem] border border-cyan-200/20 bg-[linear-gradient(135deg,rgb(101_216_255/0.1),rgb(155_124_255/0.06)_55%,rgb(255_255_255/0.02))] p-6 md:p-8"
			>
				<p class="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Outils</p>
				<p class="mt-2 max-w-lg text-sm leading-6 text-slate-400">
					Un workflow centré sur un logiciel principal, sans liste d’outils superflue.
				</p>

				<div class="mt-6 grid gap-3">
					{#each tools as tool (tool.name)}
						<div
							class="flex items-center gap-4 rounded-xl border border-white/10 bg-black/25 px-4 py-4"
						>
							<span
								class="grid size-12 shrink-0 place-items-center rounded-xl border border-cyan-200/25 bg-cyan-200/10"
							>
								<Clapperboard class="text-cyan-100" size={22} aria-hidden="true" />
							</span>
							<div class="min-w-0">
								<p class="text-base font-semibold text-white">{tool.name}</p>
								<p class="mt-1 text-sm leading-6 text-slate-300">{tool.note}</p>
							</div>
						</div>
					{/each}
				</div>
			</article>
		</div>
	</Container>
</section>
