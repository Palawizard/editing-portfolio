<script lang="ts">
	import { Clapperboard, FileText, Link2, WandSparkles } from '@lucide/svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import { editingFormats } from '$lib/content/formats';
	import { contactCopy } from '$lib/content/site';

	const briefItems = [
		{
			icon: FileText,
			title: 'Le format',
			description: 'Long, court, vertical, horizontal ou une idée sur mesure.'
		},
		{
			icon: Link2,
			title: 'Les références',
			description: 'Une ou deux vidéos qui montrent le rythme et le rendu recherchés.'
		},
		{
			icon: Clapperboard,
			title: 'Les rushs',
			description: 'Le volume disponible, la durée visée et la plateforme de publication.'
		}
	];
</script>

<svelte:head>
	<title>Contact | Montage vidéo</title>
	<meta
		name="description"
		content="Présente ton projet de montage vidéo, son format, ses références et les rushs disponibles."
	/>
</svelte:head>

<main id="main-content">
	<section class="relative overflow-hidden pb-16 pt-16 md:pb-24 md:pt-24">
		<div
			class="pointer-events-none absolute left-1/2 top-0 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-violet-500/12 blur-[110px]"
		></div>
		<Container size="wide">
			<div class="mx-auto max-w-4xl text-center">
				<div
					class="mx-auto grid size-14 place-items-center rounded-2xl border border-violet-300/25 bg-violet-300/10 text-violet-100"
				>
					<WandSparkles size={25} aria-hidden="true" />
				</div>
				<p class="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">Contact</p>
				<h1 class="display-title mt-5 text-5xl text-gradient sm:text-6xl md:text-8xl">
					{contactCopy.title}
				</h1>
				<p class="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
					{contactCopy.description}
				</p>
			</div>
		</Container>
	</section>

	<section class="border-t border-white/10 pb-24 pt-16 md:pb-28 md:pt-20">
		<Container size="wide">
			<div class="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
				<div
					class="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 shadow-[var(--shadow-premium)] md:p-9"
				>
					<p class="text-xs font-semibold uppercase tracking-[0.24em] text-violet-200">
						Préparer la demande
					</p>
					<h2 class="mt-4 text-3xl font-bold text-white">Un brief simple suffit</h2>
					<div class="mt-8 grid gap-4">
						{#each briefItems as item, index (item.title)}
							{@const Icon = item.icon}
							<article
								class="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-white/8 bg-black/20 p-4"
							>
								<div
									class="grid size-11 place-items-center rounded-xl bg-white/[0.05] text-cyan-100"
								>
									<Icon size={19} aria-hidden="true" />
								</div>
								<div>
									<p class="font-semibold text-white">
										{String(index + 1).padStart(2, '0')} · {item.title}
									</p>
									<p class="mt-1 text-sm leading-6 text-slate-400">{item.description}</p>
								</div>
							</article>
						{/each}
					</div>
				</div>

				<div class="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6 md:p-9">
					<p class="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
						Formats acceptés
					</p>
					<h2 class="mt-4 text-3xl font-bold text-white">Choisis une base ou pars sur mesure</h2>
					<div class="mt-7 flex flex-wrap gap-2">
						{#each editingFormats as format (format.id)}
							<Badge>{format.title}</Badge>
						{/each}
						<Badge tone="cyan">Commande personnalisée</Badge>
					</div>
					<p class="mt-7 text-sm leading-7 text-slate-400">
						Tu peux aussi partir d’un montage du portfolio et demander une direction proche, adaptée
						à ton contenu.
					</p>
					<Button href="/projets" variant="secondary" class="mt-8">Revoir les styles</Button>
				</div>
			</div>
		</Container>
	</section>
</main>
