<script lang="ts">
	import '../app.css';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import { siteMetadata } from '$lib/content/site';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/favicon.png" />
	<link rel="apple-touch-icon" href="/favicon.png" />
	<title>{siteMetadata.title}</title>
	<meta name="description" content={siteMetadata.description} />
	<meta property="og:site_name" content={siteMetadata.name} />
	<meta property="og:title" content={siteMetadata.title} />
	<meta property="og:description" content={siteMetadata.description} />
	<meta property="og:image" content={siteMetadata.image} />
	<meta property="og:locale" content={siteMetadata.locale} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={siteMetadata.title} />
	<meta name="twitter:description" content={siteMetadata.description} />
	<meta name="twitter:image" content={siteMetadata.image} />
</svelte:head>

<PageShell>
	{@render children()}
</PageShell>
