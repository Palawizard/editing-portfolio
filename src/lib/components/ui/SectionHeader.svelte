<script lang="ts">
	type Props = {
		title: string;
		description?: string;
		align?: 'left' | 'center';
		class?: string;
	};

	let { title, description, align = 'left', class: className = '' }: Props = $props();
</script>

<div class={[align === 'center' ? 'mx-auto text-center' : '', 'max-w-3xl', className]}>
	<h2 class="display-title text-[2.25rem] text-paper md:text-5xl">{title}</h2>
	{#if description}
		<p class="mt-4 max-w-[56ch] text-base leading-7 font-medium text-mute md:text-lg">
			{description}
		</p>
	{/if}
</div>
