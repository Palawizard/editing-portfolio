<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { setContext } from 'svelte';
	// Self-hosted fonts (SIL OFL, bundled by Vite): no request leaves palawi.fr.
	import '@fontsource-variable/figtree';
	import '@fontsource-variable/unbounded';
	import '../app.css';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import { getContent } from '$lib/i18n/content';
	import { LOCALE_CONTEXT_KEY, type LocaleContext } from '$lib/i18n/context';
	import { persistLocale, resolveInitialLocale } from '$lib/i18n/locale';
	import { defaultLocale, ogLocales, type Locale } from '$lib/i18n/types';
	import { resolveAssetPath } from '$lib/utils/paths';

	let { children } = $props();

	let locale = $state<Locale>(browser ? resolveInitialLocale() : defaultLocale);
	const content = $derived(getContent(locale));
	const favicon = resolveAssetPath('/favicon.png');
	const metadataImage = $derived(resolveAssetPath(content.siteMetadata.image));
	// Absolute URLs for search engines and link previews. The home page is served
	// with a trailing slash behind the gateway, so its canonical keeps one.
	const canonicalUrl = $derived.by(() => {
		const path = page.url.pathname;
		const needsSlash = page.route.id === '/' && !path.endsWith('/');
		return new URL(needsSlash ? `${path}/` : path, page.url.origin).href;
	});
	const indexable = $derived(page.status === 200 && page.route.id !== '/404');
	const absoluteImage = $derived(
		metadataImage ? new URL(metadataImage, canonicalUrl).href : undefined
	);

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
	<link rel="icon" type="image/png" href={favicon} />
	<link rel="apple-touch-icon" href={favicon} />
	<title>{content.siteMetadata.title}</title>
	<meta name="description" content={content.siteMetadata.description} />
	{#if indexable}
		<link rel="canonical" href={canonicalUrl} />
	{/if}
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:site_name" content={content.siteMetadata.name} />
	<meta property="og:title" content={content.siteMetadata.title} />
	<meta property="og:description" content={content.siteMetadata.description} />
	<meta property="og:image" content={absoluteImage} />
	<meta property="og:image:width" content="1024" />
	<meta property="og:image:height" content="1024" />
	<meta property="og:locale" content={ogLocales[locale]} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={content.siteMetadata.title} />
	<meta name="twitter:description" content={content.siteMetadata.description} />
	<meta name="twitter:image" content={absoluteImage} />
</svelte:head>

<PageShell>
	{@render children()}
</PageShell>
