<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowDownRight, Play } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import { heroActions } from '$lib/content/site';
	import { projects } from '$lib/content/projects';
	import { getPublishedVideo } from '$lib/utils/media';

	let previewSrc = $state<string | undefined>();
	let previewPoster = $state<string | undefined>();

	onMount(() => {
		const candidates = projects.filter((p) => {
			const src = p.previewVideo ?? getPublishedVideo(p.externalUrl)?.directUrl;
			return Boolean(src) && p.format === '16:9';
		});
		if (!candidates.length) return;
		const pick = candidates[Math.floor(Math.random() * candidates.length)];
		const published = getPublishedVideo(pick.externalUrl);
		previewSrc = pick.previewVideo ?? published?.directUrl;
		previewPoster = pick.poster || published?.poster || undefined;
	});
</script>

<style>
	@keyframes timeline-scrub {
		0% { left: 6%; }
		100% { left: 92%; }
	}
	.timeline-cursor {
		animation: timeline-scrub 9s linear infinite;
	}
	@media (prefers-reduced-motion: reduce) {
		.timeline-cursor { animation: none; left: 58%; }
	}
</style>

<section class="relative overflow-hidden pb-14 pt-14 md:pb-18 md:pt-20">
	<div
		class="pointer-events-none absolute -left-36 top-16 size-[32rem] rounded-full bg-violet-600/12 blur-[110px]"
	></div>
	<div
		class="pointer-events-none absolute -right-40 top-40 size-[28rem] rounded-full bg-cyan-400/8 blur-[120px]"
	></div>

	<Container size="wide">
		<div class="grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
			<div class="relative z-10">
				<h1 class="display-title max-w-5xl text-6xl text-white sm:text-7xl md:text-[6.5rem]">
					<span class="block pb-[0.08em]">Tes rushs.</span>
					<span class="block pb-[0.08em] text-gradient">Le bon rythme.</span>
					<span class="block pb-[0.08em]">Prêt à publier.</span>
				</h1>

				<p class="mt-7 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
					Portfolio de Palawi, monteur vidéo pour créateurs, streamers et businesses. Du contenu
					brut à une vidéo claire, rythmée et pensée pour sa plateforme.
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
			</div>

			<div class="relative mx-auto w-full max-w-[39rem] lg:mx-0">
				<div
					class="absolute -inset-4 rotate-3 rounded-[2rem] border border-violet-300/10 bg-violet-400/[0.035]"
					aria-hidden="true"
				></div>
				<div
					class="relative overflow-hidden rounded-[1.6rem] border border-white/12 bg-[#090b12] p-3 shadow-[0_40px_120px_rgb(0_0_0/0.6)]"
				>
					<div class="px-2 pb-3 pt-1">
						<div class="flex gap-1.5" aria-hidden="true">
							<span class="size-2.5 rounded-full bg-white/15"></span>
							<span class="size-2.5 rounded-full bg-white/10"></span>
							<span class="size-2.5 rounded-full bg-white/5"></span>
						</div>
					</div>

				<div
					class="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[1.1rem] border border-white/8 bg-[radial-gradient(circle_at_30%_20%,rgb(155_124_255/0.34),transparent_28%),linear-gradient(145deg,#15172a,#07080d_65%)]"
				>
					{#if previewSrc}
						<video
							class="absolute inset-0 size-full object-cover"
							src={previewSrc}
							poster={previewPoster}
							autoplay
							muted
							loop
							playsinline
							preload="metadata"
							aria-hidden="true"
						></video>
						<div
							class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(155_124_255/0.18),transparent_40%),linear-gradient(145deg,#15172a/30,#07080d/50_65%)]"
						></div>
					{:else}
						<div class="absolute inset-0 opacity-40">
							<div class="absolute left-[12%] top-[18%] h-px w-[76%] bg-white/10"></div>
							<div class="absolute left-[12%] top-[34%] h-px w-[52%] bg-white/10"></div>
						</div>
					{/if}
					<div
						class="relative grid size-20 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:scale-105 hover:bg-white/15"
					>
						<Play class="ml-1" size={29} fill="currentColor" aria-hidden="true" />
					</div>
				</div>

					<div class="mt-3 rounded-[1.1rem] border border-white/8 bg-black/30 p-4">
						<div class="relative grid gap-2">
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
						<span class="timeline-cursor absolute top-1 h-14 w-px bg-white shadow-[0_0_8px_white]"
						></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Container>
</section>
