<script lang="ts">
	type Props = {
		price: string;
		ariaLabel: string;
		size?: 'sm' | 'md';
		class?: string;
	};

	let { price, ariaLabel, size = 'sm', class: className = '' }: Props = $props();
</script>

<!-- A stream alert: the price pops like a donation notification. -->
<span
	class={[
		'inline-flex items-center gap-1.5 rounded-full bg-white font-extrabold text-paper tabular-nums shadow-[0_8px_20px_-8px_rgb(42_20_9/0.6)]',
		size === 'md' ? 'px-3.5 py-1.5 text-sm' : 'px-2.5 py-1 text-xs',
		className
	]}
	aria-label={ariaLabel}
>
	<span class="size-1.5 rounded-full bg-live" aria-hidden="true"></span>
	{price}
</span>
