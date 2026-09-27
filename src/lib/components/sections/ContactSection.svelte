<script lang="ts">
	import { Calculator, Send } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import { getLocaleContext } from '$lib/i18n/context';

	const i18n = getLocaleContext();
</script>

<section class="pb-12 md:pb-20">
	<Container size="wide">
		<div
			class="grid gap-8 rounded-[32px] bg-[linear-gradient(135deg,#ffd3b8,#ff9a66)] p-7 text-paper shadow-[var(--shadow-lift)] md:p-12 lg:grid-cols-[1fr_auto] lg:items-end"
		>
			<div>
				<h2 class="display-title max-w-3xl text-[clamp(2.25rem,5vw,4rem)]">
					{i18n.content.contactCopy.title}
				</h2>
				<p class="mt-5 max-w-[56ch] text-base leading-7 font-medium text-paper/80 md:text-lg">
					{i18n.content.contactCopy.description}
				</p>
			</div>
			<div class="flex flex-col gap-2 sm:flex-row lg:flex-col">
				<Button href="/estimation" class="w-full sm:w-auto">
					<Calculator size={18} strokeWidth={2.2} aria-hidden="true" />
					<span>{i18n.content.contactCopy.estimateActionLabel}</span>
				</Button>
				<Button href="/contact" variant="secondary" class="w-full sm:w-auto">
					<Send size={18} strokeWidth={2.2} aria-hidden="true" />
					<span>{i18n.content.contactCopy.actionLabel}</span>
				</Button>
			</div>
		</div>
	</Container>
</section>
