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
		'btn inline-flex min-h-11 items-center justify-center rounded-full font-extrabold transition-[transform,box-shadow,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50';

	const variantClasses: Record<ButtonVariant, string> = {
		primary: 'bg-paper text-white shadow-[0_12px_24px_-12px_rgb(42_20_9/0.8)]',
		secondary: 'bg-white text-paper shadow-[var(--shadow)]',
		ghost: 'text-paper'
	};

	const sizeClasses: Record<ButtonSize, string> = {
		sm: 'gap-2 px-4 py-2 text-sm',
		md: 'gap-2.5 px-5 py-3 text-[0.9375rem]'
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

<style>
	@media (hover: hover) and (pointer: fine) {
		.btn:hover {
			transform: translateY(-1px);
		}
	}
</style>
