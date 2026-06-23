<script lang="ts">
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';

	type Props = {
		children?: import('svelte').Snippet;
	};

	let { children }: Props = $props();
</script>

<div class="min-h-screen overflow-x-clip bg-[var(--color-bg)] text-slate-100">
	<Header />
	{@render children?.()}
	<Footer />
</div>
