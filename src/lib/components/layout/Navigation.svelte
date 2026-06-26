<script lang="ts">
	import { resolve } from '$app/paths';
	import { getLocaleContext } from '$lib/i18n/context';
	import type { NavigationLink } from '$lib/types/site';

	type Props = {
		links: NavigationLink[];
		direction?: 'row' | 'column';
		onNavigate?: () => void;
	};

	let { links, direction = 'row', onNavigate }: Props = $props();
	const i18n = getLocaleContext();
</script>

<nav
	class={[
		'flex text-sm font-medium text-slate-300',
		direction === 'row' ? 'items-center gap-6' : 'flex-col gap-2'
	]}
	aria-label={i18n.content.ui.navigation.mainAriaLabel}
>
	{#each links as link (link.href)}
		<a
			class={[
				'rounded-full transition hover:bg-white/[0.06] hover:text-white focus-visible:outline-cyan-300',
				direction === 'row' ? 'px-3 py-2' : 'px-4 py-3'
			]}
			href={resolve(link.href)}
			onclick={onNavigate}
		>
			{link.label}
		</a>
	{/each}
</nav>
