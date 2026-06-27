<script lang="ts">
	import { resolve } from '$app/paths';
	import { ArrowLeft } from '@lucide/svelte';
	import Container from '$lib/components/ui/Container.svelte';

	type Props = {
		status: number;
		title: string;
		description: string;
		backHome: string;
	};

	let { status, title, description, backHome }: Props = $props();
</script>

<section class="relative grid min-h-[65vh] place-items-center overflow-hidden py-20 md:py-28">
	<div
		class="pointer-events-none absolute left-1/2 top-1/3 size-80 -translate-x-1/2 rounded-full bg-violet-500/15 blur-[110px]"
	></div>
	<Container size="narrow">
		<div class="relative mx-auto max-w-2xl text-center">
			<p class="font-mono text-sm font-semibold tracking-[0.24em] text-cyan-200 uppercase">
				{status}
			</p>
			<h1 class="display-title mt-5 text-5xl text-gradient sm:text-6xl md:text-7xl">
				{title}
			</h1>
			<p class="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-300 md:text-lg">
				{description}
			</p>
			<a
				href={resolve('/')}
				class="mt-9 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-violet-300/30 bg-violet-300/12 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-violet-200/50 hover:bg-violet-300/18"
			>
				<ArrowLeft size={18} aria-hidden="true" />
				{backHome}
			</a>
		</div>
	</Container>
</section>
