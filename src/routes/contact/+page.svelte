<script lang="ts">
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { editingFormats } from '$lib/content/formats';
	import { contactCopy } from '$lib/content/site';
</script>

<svelte:head>
	<title>Contact | Montage vidéo</title>
	<meta
		name="description"
		content="Contact pour discuter d'un montage vidéo long format, court vertical, explicatif ou promotionnel."
	/>
</svelte:head>

<main id="main-content" class="py-16 md:py-20">
	<Container>
		<div class="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start">
			<div>
				<SectionHeader
					eyebrow="Contact"
					title={contactCopy.title}
					description={contactCopy.description}
				/>
				<div class="mt-8">
					<Button href="/contact">{contactCopy.actionLabel}</Button>
				</div>
			</div>

			<section class="rounded-lg border border-white/10 bg-white/[0.035] p-6">
				<h2 class="text-xl font-semibold text-white">Formats acceptés</h2>
				<div class="mt-5 flex flex-wrap gap-2">
					{#each editingFormats as format (format.id)}
						<Badge>{format.title}</Badge>
					{/each}
					<Badge tone="cyan">Autre projet</Badge>
				</div>
			</section>
		</div>
	</Container>
</main>
