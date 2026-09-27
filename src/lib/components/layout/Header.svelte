<script lang="ts">
	import { onMount } from 'svelte';
	import { Menu, X } from '@lucide/svelte';
	import { resolve } from '$app/paths';
	import Button from '$lib/components/ui/Button.svelte';
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import Navigation from './Navigation.svelte';
	import { getLocaleContext } from '$lib/i18n/context';

	let menuOpen = $state(false);
	const i18n = getLocaleContext();

	// Palawi OS status bar: a real clock, like every app of palawi.fr.
	let now = $state(new Date());
	onMount(() => {
		const timer = setInterval(() => (now = new Date()), 15000);
		return () => clearInterval(timer);
	});
	// Once the status bar scrolls away the header is stuck: the brand gets its own glass pill to stay legible.
	let statusBar = $state<HTMLDivElement>();
	let stuck = $state(false);
	$effect(() => {
		if (!statusBar) return;
		const observer = new IntersectionObserver(([entry]) => (stuck = !entry.isIntersecting));
		observer.observe(statusBar);
		return () => observer.disconnect();
	});

	const time = $derived(
		now.toLocaleTimeString(i18n.locale === 'fr' ? 'fr-FR' : 'en-GB', {
			hour: '2-digit',
			minute: '2-digit'
		})
	);
</script>

<div
	bind:this={statusBar}
	class="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 py-3 text-sm font-bold sm:px-6 lg:px-8"
>
	<span class="tabular-nums">{time}</span>
	<span class="opacity-70">palawi.fr</span>
	<span class="justify-self-end"><LanguageSwitcher /></span>
</div>

<header class="sticky top-0 z-40 px-5 py-2 sm:px-6 lg:px-8">
	<div class="mx-auto flex max-w-7xl items-center gap-3">
		<a
			href={resolve('/')}
			class={[
				'brand font-display text-[1.375rem] font-extrabold tracking-[-0.03em] md:text-2xl',
				stuck && 'is-stuck'
			]}
			aria-label={i18n.content.ui.header.homeAriaLabel}
		>
			Palawi <span class="font-sans font-bold text-mute">Studio</span>
		</a>

		<div class="ml-auto hidden items-center gap-2 lg:flex">
			<Navigation links={i18n.content.navigationLinks} />
			<Button href="/demarrer" size="sm">{i18n.content.ui.header.contactCta}</Button>
		</div>

		<button
			class="ml-auto grid size-11 place-items-center rounded-full bg-white/65 shadow-[var(--shadow)] backdrop-blur-lg transition-transform duration-150 active:scale-[0.95] lg:hidden"
			type="button"
			aria-label={menuOpen ? i18n.content.ui.header.closeMenu : i18n.content.ui.header.openMenu}
			aria-expanded={menuOpen}
			aria-controls="mobile-navigation"
			onclick={() => (menuOpen = !menuOpen)}
		>
			{#if menuOpen}
				<X size={20} strokeWidth={2.2} aria-hidden="true" />
			{:else}
				<Menu size={20} strokeWidth={2.2} aria-hidden="true" />
			{/if}
		</button>
	</div>

	{#if menuOpen}
		<div id="mobile-navigation" class="mx-auto mt-2 grid max-w-7xl gap-3 lg:hidden">
			<Navigation
				links={i18n.content.navigationLinks}
				direction="column"
				onNavigate={() => (menuOpen = false)}
			/>
			<Button href="/demarrer" class="w-full" label={i18n.content.ui.header.contactCta}>
				{i18n.content.ui.header.contactCta}
			</Button>
		</div>
	{/if}
</header>

<style>
	/* The pill sits outside the text box (negative inset), so the name never moves when it appears. */
	.brand {
		position: relative;
		isolation: isolate;
	}

	.brand::before {
		position: absolute;
		inset: -0.35rem -0.85rem;
		z-index: -1;
		border-radius: 999px;
		background: rgb(255 255 255 / 0.65);
		box-shadow: var(--shadow);
		backdrop-filter: blur(16px);
		opacity: 0;
		transform: scale(0.94);
		transition:
			opacity 200ms var(--ease-out-expo),
			transform 250ms var(--ease-out-expo);
		content: '';
	}

	.brand.is-stuck::before {
		opacity: 1;
		transform: none;
	}
</style>
