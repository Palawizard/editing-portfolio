<script lang="ts">
	import { resolve } from '$app/paths';
	import type { InternalHref } from '$lib/types/site';

	type ButtonVariant = 'primary' | 'secondary' | 'ghost';
	type ButtonSize = 'sm' | 'md';

	type Props = {
		href?: InternalHref;
		variant?: ButtonVariant;
		size?: ButtonSize;
		type?: 'button' | 'submit' | 'reset';
		label?: string;
		class?: string;
		children?: import('svelte').Snippet;
	};

	let {
		href,
		variant = 'primary',
		size = 'md',
		type = 'button',
		label,
		class: className = '',
		children
	}: Props = $props();

	const baseClasses =
		'inline-flex min-h-11 items-center justify-center rounded-full font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 disabled:pointer-events-none disabled:opacity-50';

	const variantClasses: Record<ButtonVariant, string> = {
		primary: 'bg-violet-300 text-slate-950 shadow-lg shadow-violet-950/35 hover:bg-violet-200',
		secondary:
			'border border-white/15 bg-white/[0.04] text-white hover:border-white/35 hover:bg-white/[0.08]',
		ghost: 'text-slate-200 hover:bg-white/[0.06] hover:text-white'
	};

	const sizeClasses: Record<ButtonSize, string> = {
		sm: 'gap-2 px-4 py-2 text-sm',
		md: 'gap-2.5 px-5 py-3 text-sm'
	};
</script>

{#if href}
	<a
		class={[baseClasses, variantClasses[variant], sizeClasses[size], className]}
		href={resolve(href)}
		aria-label={label}
	>
		{@render children?.()}
	</a>
{:else}
	<button class={[baseClasses, variantClasses[variant], sizeClasses[size], className]} {type}>
		{@render children?.()}
	</button>
{/if}
