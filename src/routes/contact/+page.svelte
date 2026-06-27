<script lang="ts">
	import { Clapperboard, FileText, Link2, WandSparkles } from '@lucide/svelte';
	import { env } from '$env/dynamic/public';
	import ContactForm from '$lib/components/forms/ContactForm.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import { getLocaleContext } from '$lib/i18n/context';

	const formId = env.PUBLIC_FORMSPREE_FORM_ID?.trim() ?? '';
	const turnstileSiteKey = env.PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? '';
	const contactEmail = env.PUBLIC_CONTACT_EMAIL?.trim() ?? '';
	const i18n = getLocaleContext();

	const briefIcons = [FileText, Link2, Clapperboard];
	const briefItems = $derived(
		i18n.content.ui.contactPage.briefItems.map((item, index) => ({
			...item,
			icon: briefIcons[index]
		}))
	);
</script>

<svelte:head>
	<title>{i18n.content.ui.contactPage.metaTitle}</title>
	<meta name="description" content={i18n.content.ui.contactPage.metaDescription} />
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
				<p class="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
					{i18n.content.ui.contactPage.eyebrow}
				</p>
				<h1 class="display-title mt-5 text-5xl text-gradient sm:text-6xl md:text-8xl">
					{i18n.content.contactCopy.title}
				</h1>
				<p class="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
					{i18n.content.contactCopy.description}
				</p>
				<Button href="/estimation" variant="secondary" class="mt-7">
					{i18n.content.ui.contactPage.estimateCta}
				</Button>
			</div>
		</Container>
	</section>

	<section class="border-t border-white/10 pb-24 pt-16 md:pb-28 md:pt-20">
		<Container size="wide">
			<div class="grid gap-8 xl:grid-cols-[0.78fr_1.22fr] xl:items-start">
				<div class="grid gap-6 xl:sticky xl:top-28">
					<div
						class="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 shadow-[var(--shadow-premium)] md:p-9"
					>
						<p class="text-xs font-semibold uppercase tracking-[0.24em] text-violet-200">
							{i18n.content.ui.contactPage.briefEyebrow}
						</p>
						<h2 class="mt-4 text-3xl font-bold text-white">
							{i18n.content.ui.contactPage.briefTitle}
						</h2>
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
							{i18n.content.ui.contactPage.formatsEyebrow}
						</p>
						<h2 class="mt-4 text-2xl font-bold text-white">
							{i18n.content.ui.contactPage.formatsTitle}
						</h2>
						<div class="mt-6 flex flex-wrap gap-2">
							{#each i18n.content.editingFormats as format (format.id)}
								<Badge>{format.title}</Badge>
							{/each}
							<Badge tone="cyan">{i18n.content.ui.contactPage.customBadge}</Badge>
						</div>
						<Button href="/projets" variant="secondary" class="mt-7">
							{i18n.content.ui.contactPage.reviewStyles}
						</Button>
					</div>
				</div>

				<ContactForm {formId} {turnstileSiteKey} {contactEmail} />
			</div>
		</Container>
	</section>
</main>
