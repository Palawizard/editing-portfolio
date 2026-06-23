<script lang="ts">
	import { resolve } from '$app/paths';
	import type { NavigationLink } from '$lib/types/site';

	type Props = {
		links: NavigationLink[];
		direction?: 'row' | 'column';
		onNavigate?: () => void;
	};

	let { links, direction = 'row', onNavigate }: Props = $props();
</script>

<nav
	class={[
		'flex text-sm font-medium text-slate-300',
		direction === 'row' ? 'items-center gap-6' : 'flex-col gap-2'
	]}
	aria-label="Navigation principale"
>
	{#each links as link (link.href)}
		<a
			class={[
				'rounded-full transition hover:text-white focus-visible:outline-cyan-300',
				direction === 'row' ? 'px-1 py-2' : 'px-4 py-3 hover:bg-white/[0.06]'
			]}
			href={resolve(link.href)}
			onclick={onNavigate}
		>
			{link.label}
		</a>
	{/each}
</nav>
