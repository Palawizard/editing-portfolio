<script lang="ts">
	import { resolve } from '$app/paths';
	import { navigationLinks, siteMetadata } from '$lib/content/site';
</script>

<footer class="border-t border-white/10 bg-[#040509]/80">
	<div
		class="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-[1fr_auto] md:items-end lg:px-8"
	>
		<div>
			<p class="font-mono text-xs tracking-[0.2em] text-cyan-200 uppercase">
				Cut / rythme / export
			</p>
			<p class="display-title mt-4 max-w-xl text-3xl text-white md:text-4xl">{siteMetadata.name}</p>
			<p class="mt-4 max-w-md text-sm leading-6 text-slate-400">
				Des vidéos pensées pour être regardées, comprises et publiées.
			</p>
		</div>

		<nav class="flex flex-wrap gap-5 text-sm text-slate-300" aria-label="Navigation secondaire">
			{#each navigationLinks as link (link.href)}
				<a class="transition hover:text-white" href={resolve(link.href)}>{link.label}</a>
			{/each}
		</nav>
	</div>
</footer>
