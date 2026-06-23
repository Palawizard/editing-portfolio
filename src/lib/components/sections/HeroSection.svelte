<script lang="ts">
	import { Clapperboard, Scissors, Sparkles } from '@lucide/svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import { heroActions, heroBadges, siteMetadata } from '$lib/content/site';
</script>

<section class="relative overflow-hidden pb-16 pt-18 md:pb-20 md:pt-24">
	<Container class="grid gap-12 lg:grid-cols-[1fr_0.82fr] lg:items-center">
		<div>
			<p class="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-violet-200">
				Portfolio montage vidéo
			</p>
			<h1 class="max-w-4xl text-4xl font-bold text-balance text-white md:text-6xl">
				{siteMetadata.title}
			</h1>
			<p class="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
				{siteMetadata.description}
			</p>

			<div class="mt-8 flex flex-wrap gap-3">
				{#each heroActions as action (action.href)}
					<Button href={action.href} variant={action.variant}>{action.label}</Button>
				{/each}
			</div>

			<div class="mt-8 flex flex-wrap gap-2">
				{#each heroBadges as badge (badge)}
					<Badge tone={badge === 'Gaming' || badge === 'Explicatif' ? 'cyan' : 'neutral'}>
						{badge}
					</Badge>
				{/each}
			</div>
		</div>

		<div
			class="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-4 shadow-[var(--shadow-premium)]"
			aria-label="Aperçu visuel d'un montage vidéo"
		>
			<div class="aspect-video overflow-hidden rounded-md bg-slate-950">
				<div
					class="grid size-full grid-rows-[1fr_auto] bg-[radial-gradient(circle_at_25%_25%,rgb(155_124_255/0.26),transparent_30%),linear-gradient(135deg,#111827,#05070d_62%,#0f172a)]"
				>
					<div class="flex items-center justify-center">
						<div class="grid size-20 place-items-center rounded-full bg-white/10 text-white">
							<Clapperboard size={34} aria-hidden="true" />
						</div>
					</div>
					<div class="border-t border-white/10 bg-black/30 p-4">
						<div class="flex items-center gap-3">
							<div class="h-2 flex-1 rounded-full bg-violet-300"></div>
							<div class="h-2 w-16 rounded-full bg-cyan-200"></div>
							<div class="h-2 w-10 rounded-full bg-white/40"></div>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-4 grid gap-3 sm:grid-cols-3">
				<div class="rounded-md border border-white/10 bg-slate-950/50 p-4">
					<Scissors class="text-violet-200" size={20} aria-hidden="true" />
					<p class="mt-3 text-sm font-semibold text-white">Cuts propres</p>
				</div>
				<div class="rounded-md border border-white/10 bg-slate-950/50 p-4">
					<Sparkles class="text-cyan-200" size={20} aria-hidden="true" />
					<p class="mt-3 text-sm font-semibold text-white">Rythme clair</p>
				</div>
				<div class="rounded-md border border-white/10 bg-slate-950/50 p-4">
					<Clapperboard class="text-violet-200" size={20} aria-hidden="true" />
					<p class="mt-3 text-sm font-semibold text-white">Export prêt</p>
				</div>
			</div>
		</div>
	</Container>
</section>
