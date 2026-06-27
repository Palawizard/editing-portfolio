<script lang="ts">
	import { ArrowRight, Calculator, Send, Sparkles } from '@lucide/svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import { getLocaleContext } from '$lib/i18n/context';

	const i18n = getLocaleContext();
	const copy = $derived(i18n.content.ui.startPage);

	const options = $derived([
		{
			href: '/estimation' as const,
			icon: Calculator,
			title: copy.estimateTitle,
			description: copy.estimateDescription,
			cta: copy.estimateCta,
			accent: 'violet' as const
		},
		{
			href: '/contact' as const,
			icon: Send,
			title: copy.contactTitle,
			description: copy.contactDescription,
			cta: copy.contactCta,
			accent: 'cyan' as const
		}
	]);
</script>

<svelte:head>
	<title>{copy.metaTitle}</title>
	<meta name="description" content={copy.metaDescription} />
</svelte:head>

<main id="main-content">
	<section class="relative overflow-hidden pb-20 pt-16 md:pb-28 md:pt-24">
		<div
			class="pointer-events-none absolute left-1/2 top-0 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-violet-500/12 blur-[110px]"
		></div>
		<Container size="wide">
			<div class="mx-auto max-w-4xl text-center">
				<div
					class="mx-auto grid size-14 place-items-center rounded-2xl border border-violet-300/25 bg-violet-300/10 text-violet-100"
				>
					<Sparkles size={25} aria-hidden="true" />
				</div>
				<p class="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
					{copy.eyebrow}
				</p>
				<h1 class="display-title mt-5 text-5xl text-gradient sm:text-6xl md:text-7xl">
					{copy.title}
				</h1>
				<p class="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
					{copy.description}
				</p>
			</div>

			<div class="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2 md:gap-6">
				{#each options as option (option.href)}
					{@const Icon = option.icon}
					<a
						href={option.href}
						class="group relative flex min-h-[18rem] flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-7 shadow-[var(--shadow-premium)] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.055] md:p-9"
					>
						<span
							class={[
								'pointer-events-none absolute -right-16 -top-16 size-48 rounded-full blur-3xl transition duration-300 group-hover:opacity-100',
								option.accent === 'violet' ? 'bg-violet-400/16 opacity-70' : 'bg-cyan-300/12 opacity-60'
							]}
						></span>
						<span
							class={[
								'relative grid size-14 place-items-center rounded-2xl border',
								option.accent === 'violet'
									? 'border-violet-300/30 bg-violet-300/10 text-violet-100'
									: 'border-cyan-300/25 bg-cyan-300/10 text-cyan-100'
							]}
						>
							<Icon size={26} aria-hidden="true" />
						</span>
						<span class="relative mt-8 block text-3xl font-bold text-white">{option.title}</span>
						<span class="relative mt-4 block flex-1 text-sm leading-7 text-slate-300 md:text-base">
							{option.description}
						</span>
						<span
							class="relative mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition group-hover:gap-3"
						>
							{option.cta}
							<ArrowRight
								class="transition group-hover:translate-x-0.5"
								size={18}
								aria-hidden="true"
							/>
						</span>
					</a>
				{/each}
			</div>
		</Container>
	</section>
</main>
