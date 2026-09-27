<script lang="ts">
	import { page } from '$app/state';
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

	const isCurrent = (href: NavigationLink['href']) => {
		const target = resolve(href);
		const path = page.url.pathname.replace(/\/$/, '') || '/';
		return (target.replace(/\/$/, '') || '/') === path;
	};
</script>

<!-- Like a scene list: the current page is the live one. -->
<nav
	class={[
		'flex text-sm font-bold',
		direction === 'row'
			? 'items-center gap-1 rounded-full bg-white/65 p-1 shadow-[var(--shadow)] backdrop-blur-lg'
			: 'flex-col gap-2'
	]}
	aria-label={i18n.content.ui.navigation.mainAriaLabel}
>
	{#each links as link (link.href)}
		{@const current = isCurrent(link.href)}
		<a
			class={[
				'flex items-center gap-2 rounded-full',
				direction === 'row' ? 'min-h-9 px-3.5' : 'min-h-12 px-4 text-base shadow-[var(--shadow)]',
				current ? 'bg-paper text-white' : direction === 'row' ? 'hover:bg-white' : 'bg-white/70'
			]}
			href={resolve(link.href)}
			aria-current={current ? 'page' : undefined}
			onclick={onNavigate}
		>
			{#if current}<span class="size-1.5 rounded-full bg-live" aria-hidden="true"></span>{/if}
			{link.label}
		</a>
	{/each}
</nav>
