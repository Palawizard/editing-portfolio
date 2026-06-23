<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import { siteMetadata } from '$lib/content/site';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{siteMetadata.title}</title>
	<meta name="description" content={siteMetadata.description} />
</svelte:head>

<PageShell>
	{@render children()}
</PageShell>
