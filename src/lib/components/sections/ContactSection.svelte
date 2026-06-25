<script lang="ts">
	import { Send } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import { contactCopy } from '$lib/content/site';
</script>

<section class="pb-20 pt-16 md:pb-28 md:pt-24">
	<Container size="wide">
		<div
			class="relative overflow-hidden rounded-[1.75rem] border border-violet-300/20 bg-[linear-gradient(120deg,rgb(155_124_255/0.16),rgb(101_216_255/0.06)_55%,rgb(255_255_255/0.025))] p-7 shadow-[var(--shadow-premium)] md:p-12"
		>
			<div
				class="pointer-events-none absolute -right-20 -top-28 size-80 rounded-full bg-violet-400/12 blur-3xl"
			></div>
			<div class="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
				<div>
					<p class="text-sm font-semibold uppercase tracking-[0.2em] text-violet-100">Contact</p>
					<h2 class="display-title mt-4 max-w-3xl text-4xl text-balance text-white md:text-6xl">
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
