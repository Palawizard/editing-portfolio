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

<section class="grid min-h-[65vh] place-items-center py-20 md:py-28">
	<Container size="narrow">
		<div class="mx-auto max-w-2xl text-center">
			<p class="display-title text-[clamp(6rem,24vw,14rem)] text-peach-deep">{status}</p>
			<h1 class="display-title mt-4 text-4xl text-paper sm:text-5xl">{title}</h1>
			<p class="mx-auto mt-6 max-w-xl text-base leading-7 text-mute md:text-lg">
				{description}
			</p>
			<a
				href={resolve('/')}
				class="mt-9 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-paper px-5 py-3 text-[0.9375rem] font-extrabold text-white transition-transform duration-150 active:scale-[0.97]"
			>
				<ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" />
				{backHome}
			</a>
		</div>
	</Container>
</section>
