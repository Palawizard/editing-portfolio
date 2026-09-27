<script lang="ts">
	import { env } from '$env/dynamic/public';
	import ContactForm from '$lib/components/forms/ContactForm.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import { getLocaleContext } from '$lib/i18n/context';

	const formId = env.PUBLIC_FORMSPREE_FORM_ID?.trim() ?? '';
	const turnstileSiteKey = env.PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? '';
	const contactEmail = env.PUBLIC_CONTACT_EMAIL?.trim() ?? '';
	const i18n = getLocaleContext();
</script>

<svelte:head>
	<title>{i18n.content.ui.contactPage.metaTitle}</title>
	<meta name="description" content={i18n.content.ui.contactPage.metaDescription} />
</svelte:head>

<main id="main-content">
	<section class="pt-4 pb-8 md:pt-8 md:pb-12">
		<Container size="wide">
			<h1 class="display-title print-in max-w-5xl text-[clamp(2.5rem,7vw,5rem)]">
				{i18n.content.contactCopy.title}
			</h1>
			<div
				class="rise mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
				style="--i: 1"
			>
				<p class="max-w-[58ch] text-base leading-7 font-medium text-mute md:text-lg">
					{i18n.content.contactCopy.description}
				</p>
				<Button href="/estimation" variant="secondary" class="shrink-0">
					{i18n.content.ui.contactPage.estimateCta}
				</Button>
			</div>
		</Container>
	</section>

	<section class="pb-16 md:pb-24">
		<Container size="wide">
			<div class="grid gap-10 xl:grid-cols-[0.7fr_1.3fr] xl:items-start">
				<aside class="panel rise p-5 md:p-7 xl:sticky xl:top-28" style="--i: 2">
					<h2 class="label text-mute">{i18n.content.ui.contactPage.briefTitle}</h2>
					<ol class="mt-4 grid gap-3">
						{#each i18n.content.ui.contactPage.briefItems as item, index (item.title)}
							<li class="grid grid-cols-[2.5rem_1fr] items-start rounded-2xl bg-white/80 p-3">
								<span
									class="grid size-8 place-items-center rounded-full bg-paper text-sm font-extrabold text-white"
									>{index + 1}</span
								>
								<div>
									<p class="text-base font-extrabold">{item.title}</p>
									<p class="mt-1 text-sm leading-6 text-mute">{item.description}</p>
								</div>
							</li>
						{/each}
					</ol>
				</aside>

				<div class="rise" style="--i: 3">
					<ContactForm {formId} {turnstileSiteKey} {contactEmail} />
				</div>
			</div>
		</Container>
	</section>
</main>
