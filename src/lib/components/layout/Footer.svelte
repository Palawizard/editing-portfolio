<script lang="ts">
	import { resolve } from '$app/paths';
	import { navigationLinks, siteMetadata } from '$lib/content/site';
</script>

<footer class="border-t border-white/10 bg-slate-950/70">
	<div class="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
		<div>
			<p class="text-sm font-semibold tracking-[0.16em] text-white uppercase">
				{siteMetadata.name}
			</p>
			<p class="mt-3 max-w-md text-sm leading-6 text-slate-400">
				Montage vidéo pour créateurs, streamers et businesses.
			</p>
		</div>

		<nav class="flex flex-wrap gap-4 text-sm text-slate-300" aria-label="Navigation secondaire">
			{#each navigationLinks as link (link.href)}
				<a class="transition hover:text-white" href={resolve(link.href)}>{link.label}</a>
			{/each}
		</nav>
	</div>
</footer>
