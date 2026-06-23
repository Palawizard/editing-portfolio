<script lang="ts">
	import { Send } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import { contactCopy } from '$lib/content/site';
</script>

<section class="pb-20 pt-14 md:pb-24 md:pt-18">
	<Container>
		<div
			class="rounded-lg border border-violet-300/20 bg-violet-300/[0.08] p-6 shadow-[var(--shadow-premium)] md:p-10"
		>
			<div class="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
				<div>
					<p class="text-sm font-semibold uppercase tracking-[0.2em] text-violet-100">Contact</p>
					<h2 class="mt-3 max-w-3xl text-3xl font-bold text-balance text-white md:text-5xl">
						{contactCopy.title}
					</h2>
					<p class="mt-5 max-w-2xl text-base leading-7 text-slate-200">
						{contactCopy.description}
					</p>
				</div>

				<Button href="/contact" class="w-full sm:w-auto">
					<Send size={18} aria-hidden="true" />
					<span>{contactCopy.actionLabel}</span>
				</Button>
			</div>
		</div>
	</Container>
</section>
