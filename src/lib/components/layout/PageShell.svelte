<script lang="ts">
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import { getLocaleContext } from '$lib/i18n/context';

	type Props = {
		children?: import('svelte').Snippet;
	};

	let { children }: Props = $props();
	const i18n = getLocaleContext();
</script>

<div class="app-open min-h-screen overflow-x-clip text-paper">
	<a
		class="sr-only z-50 rounded-full bg-paper px-4 py-2 font-bold text-white focus:not-sr-only focus:fixed focus:left-5 focus:top-5"
		href="#main-content"
	>
		{i18n.content.ui.skipToContent}
	</a>
	<Header />
	{@render children?.()}
	<Footer />
</div>
