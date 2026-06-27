<script lang="ts">
	type Props = {
		price: string;
		ariaLabel: string;
		size?: 'sm' | 'md';
		class?: string;
	};

	let { price, ariaLabel, size = 'sm', class: className = '' }: Props = $props();
</script>

<span
	class={[
		'inline-flex items-center rounded-full border border-violet-300/35 bg-[linear-gradient(135deg,rgb(76_29_149/0.82),rgb(15_23_42/0.88))] font-mono font-semibold text-violet-50 shadow-[0_8px_28px_rgb(124_58_237/0.28)] backdrop-blur ring-1 ring-violet-200/15',
		size === 'md' ? 'px-3 py-1.5 text-sm' : 'px-3 py-1 text-xs',
		className
	]}
	aria-label={ariaLabel}
>
	{price}
</span>
