<script lang="ts">
	import { resolve } from '$app/paths';
	import { getLocaleContext } from '$lib/i18n/context';

	const i18n = getLocaleContext();
</script>

<footer class="px-5 pb-8 sm:px-6 lg:px-8">
	<div
		class="panel mx-auto grid max-w-7xl gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8"
	>
		<div>
			<p class="display-title text-3xl">Palawi <span class="font-sans text-mute">Studio</span></p>
			<p class="mt-2 max-w-md text-sm leading-6 font-medium text-mute">
				{i18n.content.ui.footer.description}
			</p>
		</div>
		<nav
			class="flex flex-wrap gap-x-5 gap-y-1 text-sm font-bold"
			aria-label={i18n.content.ui.navigation.secondaryAriaLabel}
		>
			{#each i18n.content.navigationLinks as link (link.href)}
				<a
					class="inline-flex min-h-11 items-center hover:underline hover:underline-offset-4"
					href={resolve(link.href)}
				>
					{link.label}
				</a>
			{/each}
		</nav>
	</div>
</footer>
