<script lang="ts">
	import { contactCopy } from '$lib/content/site';
	import { editingFormats } from '$lib/content/formats';
</script>

<svelte:head>
	<title>Contact | Montage vidéo</title>
	<meta
		name="description"
		content="Contact pour discuter d'un montage vidéo long format, court vertical, explicatif ou promotionnel."
	/>
</svelte:head>

<main class="mx-auto max-w-6xl px-6 py-16">
	<p class="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">Contact</p>
	<h1 class="mt-3 max-w-3xl text-4xl font-bold text-white">{contactCopy.title}</h1>
	<p class="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{contactCopy.description}</p>

	<section class="mt-10 rounded-lg border border-white/10 bg-white/[0.04] p-6">
		<h2 class="text-xl font-semibold text-white">Formats acceptés</h2>
		<div class="mt-5 flex flex-wrap gap-2">
			{#each editingFormats as format (format.id)}
				<span class="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300">
					{format.title}
				</span>
			{/each}
			<span class="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300">
				Autre projet
			</span>
		</div>
	</section>
</main>
