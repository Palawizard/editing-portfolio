<script lang="ts">
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';

	type Props = {
		children?: import('svelte').Snippet;
	};

	let { children }: Props = $props();
</script>

<div class="min-h-screen overflow-x-clip bg-[var(--color-bg)] text-slate-100">
	<a
		class="sr-only z-50 rounded-full bg-cyan-200 px-4 py-2 font-semibold text-slate-950 focus:not-sr-only focus:fixed focus:left-5 focus:top-5"
		href="#main-content"
	>
		Aller au contenu
	</a>
	<Header />
	{@render children?.()}
	<Footer />
</div>
