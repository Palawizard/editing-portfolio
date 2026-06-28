<script lang="ts">
	import { Menu, X } from '@lucide/svelte';
	import { resolve } from '$app/paths';
	import Button from '$lib/components/ui/Button.svelte';
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import Navigation from './Navigation.svelte';
	import { getLocaleContext } from '$lib/i18n/context';
	import { resolveAssetPath } from '$lib/utils/paths';

	let menuOpen = $state(false);
	const i18n = getLocaleContext();
</script>

<header
	class="sticky top-0 z-40 border-b border-white/8 bg-[#05060a]/80 shadow-[0_1px_0_rgb(255_255_255/0.03)] backdrop-blur-xl"
>
	<div class="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-6 lg:px-8">
		<a
			href={resolve('/')}
			class="group flex items-center gap-3"
			aria-label={i18n.content.ui.header.homeAriaLabel}
		>
			<span
				class="grid size-10 overflow-hidden rounded-xl border border-violet-300/25 bg-violet-300/10 shadow-[0_0_24px_rgb(167_139_250/0.18)]"
			>
				<img
					class="size-full object-cover"
					src={resolveAssetPath('/favicon.png')}
					alt=""
					width="40"
					height="40"
					aria-hidden="true"
				/>
			</span>
			<span class="hidden text-xs font-semibold tracking-[0.18em] text-white uppercase sm:block">
				{i18n.content.siteMetadata.name}
			</span>
		</a>

		<div class="hidden items-center gap-4 lg:flex">
			<div class="rounded-full border border-white/8 bg-white/[0.025] px-3">
				<Navigation links={i18n.content.navigationLinks} />
			</div>
			<LanguageSwitcher />
			<Button href="/demarrer" size="sm">{i18n.content.ui.header.contactCta}</Button>
		</div>

		<div class="flex items-center gap-2 lg:hidden">
			<LanguageSwitcher />
			<button
				class="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white"
				type="button"
				aria-label={menuOpen ? i18n.content.ui.header.closeMenu : i18n.content.ui.header.openMenu}
				aria-expanded={menuOpen}
				aria-controls="mobile-navigation"
				onclick={() => (menuOpen = !menuOpen)}
			>
				{#if menuOpen}
					<X size={20} aria-hidden="true" />
				{:else}
					<Menu size={20} aria-hidden="true" />
				{/if}
			</button>
		</div>
	</div>

	{#if menuOpen}
		<div id="mobile-navigation" class="border-t border-white/10 bg-slate-950 px-5 py-4 lg:hidden">
			<Navigation
				links={i18n.content.navigationLinks}
				direction="column"
				onNavigate={() => (menuOpen = false)}
			/>
			<Button href="/demarrer" class="mt-4 w-full" label={i18n.content.ui.header.contactCta}>
				{i18n.content.ui.header.contactCta}
			</Button>
		</div>
	{/if}
</header>
