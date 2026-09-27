<script lang="ts">
	import { ArrowRight, Calculator, Send } from '@lucide/svelte';
	import { resolve } from '$app/paths';
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
			cta: copy.estimateCta
		},
		{
			href: '/contact' as const,
			icon: Send,
			title: copy.contactTitle,
			description: copy.contactDescription,
			cta: copy.contactCta
		}
	]);
</script>

<svelte:head>
	<title>{copy.metaTitle}</title>
	<meta name="description" content={copy.metaDescription} />
</svelte:head>

<main id="main-content">
	<section class="pt-4 pb-16 md:pt-8 md:pb-24">
		<Container size="wide">
			<h1 class="display-title print-in max-w-4xl text-[clamp(2.5rem,7vw,5rem)]">
				{copy.title}
			</h1>
			<p
				class="rise mt-5 max-w-[58ch] text-base leading-7 font-medium text-mute md:text-lg"
				style="--i: 1"
			>
				{copy.description}
			</p>

			<!-- Two scenes to go live with: pick one. -->
			<ol class="mt-10 grid gap-4 md:grid-cols-2">
				{#each options as option, index (option.href)}
					{@const Icon = option.icon}
					<li class="rise" style={`--i: ${index + 2}`}>
						<a
							href={resolve(option.href)}
							class="panel group flex h-full min-h-[18rem] flex-col p-7 transition-[transform,background-color,color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] md:p-10 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-paper [@media(hover:hover)_and_(pointer:fine)]:hover:text-white"
						>
							<span class="flex items-center justify-end">
								<Icon size={24} strokeWidth={1.5} aria-hidden="true" />
							</span>
							<span class="display-title mt-8 block text-4xl md:text-5xl">{option.title}</span>
							<span class="mt-4 block max-w-[46ch] flex-1 text-base leading-7 opacity-75">
								{option.description}
							</span>
							<span class="mt-8 inline-flex items-center gap-2 text-[0.9375rem] font-extrabold">
								<svg
									class="size-2.5 fill-live opacity-0 transition-opacity group-hover:opacity-100"
									viewBox="0 0 12 12"
									aria-hidden="true"><path d="M2 1.5v9l8-4.5z" /></svg
								>
								{option.cta}
								<ArrowRight
									class="transition-transform group-hover:translate-x-1"
									size={18}
									strokeWidth={1.5}
									aria-hidden="true"
								/>
							</span>
						</a>
					</li>
				{/each}
			</ol>
		</Container>
	</section>
</main>
