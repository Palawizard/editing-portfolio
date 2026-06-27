<script lang="ts">
	import { browser } from '$app/environment';
	import { setContext } from 'svelte';
	import '../app.css';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import { getContent } from '$lib/i18n/content';
	import { LOCALE_CONTEXT_KEY, type LocaleContext } from '$lib/i18n/context';
	import { persistLocale, resolveInitialLocale } from '$lib/i18n/locale';
	import { defaultLocale, ogLocales, type Locale } from '$lib/i18n/types';

	let { children } = $props();

	let locale = $state<Locale>(browser ? resolveInitialLocale() : defaultLocale);
	const content = $derived(getContent(locale));

	const i18n: LocaleContext = {
		get locale() {
			return locale;
		},
		get content() {
			return content;
		},
		setLocale(nextLocale) {
			locale = nextLocale;
			persistLocale(nextLocale);
		}
	};

	setContext(LOCALE_CONTEXT_KEY, i18n);
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/favicon.png" />
	<link rel="apple-touch-icon" href="/favicon.png" />
	<title>{content.siteMetadata.title}</title>
	<meta name="description" content={content.siteMetadata.description} />
	<meta property="og:site_name" content={content.siteMetadata.name} />
	<meta property="og:title" content={content.siteMetadata.title} />
	<meta property="og:description" content={content.siteMetadata.description} />
	<meta property="og:image" content={content.siteMetadata.image} />
	<meta property="og:locale" content={ogLocales[locale]} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={content.siteMetadata.title} />
	<meta name="twitter:description" content={content.siteMetadata.description} />
	<meta name="twitter:image" content={content.siteMetadata.image} />
</svelte:head>

<PageShell>
	{@render children()}
</PageShell>
