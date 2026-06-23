<script lang="ts">
	type Props = {
		quote: string;
		name: string;
		context?: string;
	};

	let { quote, name, context }: Props = $props();
</script>

<figure class="rounded-lg border border-white/10 bg-white/[0.035] p-6">
	<blockquote class="text-base leading-7 text-slate-200">“{quote}”</blockquote>
	<figcaption class="mt-6">
		<p class="font-semibold text-white">{name}</p>
		{#if context}
			<p class="mt-1 text-sm text-slate-400">{context}</p>
		{/if}
	</figcaption>
</figure>
