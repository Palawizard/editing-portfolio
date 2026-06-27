<script lang="ts">
	import ErrorSection from '$lib/components/sections/ErrorSection.svelte';
	import { getLocaleContext } from '$lib/i18n/context';

	const i18n = getLocaleContext();
	const copy = $derived(i18n.content.ui.errorPage);
</script>

<svelte:head>
	<title>{copy.notFoundMetaTitle}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main id="main-content">
	<ErrorSection
		status={404}
		title={copy.notFoundTitle}
		description={copy.notFoundDescription}
		backHome={copy.backHome}
	/>
</main>
