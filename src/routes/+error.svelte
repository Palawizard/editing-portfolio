<script lang="ts">
	import { page } from '$app/state';
	import ErrorSection from '$lib/components/sections/ErrorSection.svelte';
	import { getLocaleContext } from '$lib/i18n/context';

	const i18n = getLocaleContext();
	const copy = $derived(i18n.content.ui.errorPage);
	const isNotFound = $derived(page.status === 404);
	const metaTitle = $derived(isNotFound ? copy.notFoundMetaTitle : copy.genericMetaTitle);
	const title = $derived(isNotFound ? copy.notFoundTitle : copy.genericTitle);
	const description = $derived(isNotFound ? copy.notFoundDescription : copy.genericDescription);
</script>

<svelte:head>
	<title>{metaTitle}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main id="main-content">
	<ErrorSection status={page.status} {title} {description} backHome={copy.backHome} />
</main>
