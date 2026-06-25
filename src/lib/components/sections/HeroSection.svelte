<script lang="ts">
	import { ArrowDownRight, Play, Scissors, Sparkles } from '@lucide/svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import { heroActions, heroBadges } from '$lib/content/site';
</script>

<section class="relative overflow-hidden pb-20 pt-16 md:pb-28 md:pt-24">
	<div
		class="pointer-events-none absolute -left-36 top-16 size-[32rem] rounded-full bg-violet-600/12 blur-[110px]"
	></div>
	<div
		class="pointer-events-none absolute -right-40 top-40 size-[28rem] rounded-full bg-cyan-400/8 blur-[120px]"
	></div>

	<Container size="wide">
		<div class="grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
			<div class="relative z-10">
				<div
					class="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300"
				>
					<span class="size-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgb(101_216_255)]"></span>
					Disponible pour de nouveaux projets
				</div>

				<h1 class="display-title mt-8 max-w-5xl text-6xl text-white sm:text-7xl md:text-[6.5rem]">
					Tes rushs.
					<span class="block text-gradient">Le bon rythme.</span>
					<span class="block">Prêt à publier.</span>
				</h1>

				<p class="mt-7 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
					Montage vidéo pour créateurs, streamers et businesses. Du contenu brut à une vidéo claire,
					rythmée et pensée pour sa plateforme.
				</p>

				<div class="mt-9 flex flex-wrap gap-3">
					{#each heroActions as action (action.href)}
						<Button href={action.href} variant={action.variant}>
							{action.label}
							{#if action.href === '/projets'}
								<ArrowDownRight size={18} aria-hidden="true" />
							{/if}
						</Button>
					{/each}
				</div>

				<div class="mt-9 flex flex-wrap gap-2">
					{#each heroBadges.slice(0, 6) as badge (badge)}
						<Badge tone={badge === 'Gaming' || badge === 'Explicatif' ? 'cyan' : 'neutral'}>
							{badge}
						</Badge>
					{/each}
				</div>
			</div>

			<div class="relative mx-auto w-full max-w-[39rem] lg:mx-0">
				<div
					class="absolute -inset-4 rotate-3 rounded-[2rem] border border-violet-300/10 bg-violet-400/[0.035]"
					aria-hidden="true"
				></div>
				<div
					class="relative overflow-hidden rounded-[1.6rem] border border-white/12 bg-[#090b12] p-3 shadow-[0_40px_120px_rgb(0_0_0/0.6)]"
				>
					<div class="flex items-center justify-between px-2 pb-3 pt-1">
						<div class="flex gap-1.5" aria-hidden="true">
							<span class="size-2.5 rounded-full bg-white/15"></span>
							<span class="size-2.5 rounded-full bg-white/10"></span>
							<span class="size-2.5 rounded-full bg-white/5"></span>
						</div>
						<span class="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-slate-500">
							Edit preview / 00:24
						</span>
					</div>

					<div
						class="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[1.1rem] border border-white/8 bg-[radial-gradient(circle_at_30%_20%,rgb(155_124_255/0.34),transparent_28%),linear-gradient(145deg,#15172a,#07080d_65%)]"
					>
						<div class="absolute inset-0 opacity-40">
							<div class="absolute left-[12%] top-[18%] h-px w-[76%] bg-white/10"></div>
							<div class="absolute left-[12%] top-[34%] h-px w-[52%] bg-white/10"></div>
						</div>
						<div
							class="relative grid size-20 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:scale-105 hover:bg-white/15"
						>
							<Play class="ml-1" size={29} fill="currentColor" aria-hidden="true" />
						</div>
						<div
							class="absolute bottom-5 left-5 rounded-full border border-white/10 bg-black/45 px-4 py-2 text-xs font-semibold text-white backdrop-blur"
						>
							00:18 / Version finale
						</div>
					</div>

					<div class="mt-3 rounded-[1.1rem] border border-white/8 bg-black/30 p-4">
						<div class="flex items-center justify-between">
							<span class="text-xs font-semibold text-slate-300">TIMELINE</span>
							<span class="font-mono text-[0.65rem] text-slate-500">1080 × 1920</span>
						</div>
						<div class="relative mt-4 grid gap-2">
							<div class="flex h-7 gap-1">
								<span class="w-[24%] rounded bg-violet-400/75"></span>
								<span class="w-[15%] rounded bg-violet-300/45"></span>
								<span class="w-[33%] rounded bg-cyan-300/55"></span>
								<span class="flex-1 rounded bg-violet-400/65"></span>
							</div>
							<div class="flex h-5 gap-1">
								<span class="w-[34%] rounded bg-white/12"></span>
								<span class="w-[22%] rounded bg-cyan-200/25"></span>
								<span class="flex-1 rounded bg-white/8"></span>
							</div>
							<span class="absolute -top-1 left-[58%] h-14 w-px bg-white shadow-[0_0_8px_white]"
							></span>
						</div>
					</div>
				</div>

				<div
					class="absolute -left-5 top-24 hidden items-center gap-3 rounded-2xl border border-white/12 bg-slate-950/85 p-3 shadow-xl backdrop-blur sm:flex"
				>
					<span class="grid size-10 place-items-center rounded-xl bg-violet-300/15 text-violet-100">
						<Scissors size={19} aria-hidden="true" />
					</span>
					<span>
						<span class="block text-xs text-slate-500">Rythme</span>
						<span class="block text-sm font-semibold text-white">Cuts précis</span>
					</span>
				</div>

				<div
					class="absolute -bottom-5 right-5 hidden items-center gap-3 rounded-2xl border border-white/12 bg-slate-950/85 p-3 shadow-xl backdrop-blur sm:flex"
				>
					<span class="grid size-10 place-items-center rounded-xl bg-cyan-300/12 text-cyan-100">
						<Sparkles size={19} aria-hidden="true" />
					</span>
					<span>
						<span class="block text-xs text-slate-500">Livraison</span>
						<span class="block text-sm font-semibold text-white">Format optimisé</span>
					</span>
				</div>
			</div>
		</div>
	</Container>
</section>
