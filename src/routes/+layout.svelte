<script lang="ts">
	import '../app.css';
	import { resolve } from '$app/paths';
	import favicon from '$lib/assets/favicon.svg';
	import { navigationLinks, siteMetadata } from '$lib/content/site';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{siteMetadata.title}</title>
	<meta name="description" content={siteMetadata.description} />
</svelte:head>

<div class="min-h-screen bg-slate-950 text-slate-100">
	<header class="border-b border-white/10">
		<div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
			<a href={resolve('/')} class="text-sm font-semibold uppercase tracking-[0.2em] text-white">
				{siteMetadata.name}
			</a>
			<nav class="hidden items-center gap-6 text-sm text-slate-300 sm:flex">
				{#each navigationLinks as link (link.href)}
					<a class="transition hover:text-white" href={resolve(link.href)}>{link.label}</a>
				{/each}
			</nav>
		</div>
	</header>

	{@render children()}
</div>
