<script lang="ts">
	import { onMount } from 'svelte';

	type Props = {
		siteKey: string;
		onError?: () => void;
	};

	let { siteKey, onError }: Props = $props();
	let container: HTMLDivElement;
	let widgetId = $state<string>();

	const renderWidget = () => {
		if (
			!container ||
			widgetId !== undefined ||
			container.querySelector('[name="cf-turnstile-response"]') ||
			!window.turnstile
		) {
			return;
		}

		widgetId = window.turnstile.render(container, {
			sitekey: siteKey,
			theme: 'dark',
			language: 'fr',
			appearance: 'interaction-only',
			'error-callback': () => {
				onError?.();
				return true;
			}
		});
	};

	onMount(() => {
		renderWidget();

		const interval = window.setInterval(renderWidget, 100);
		const timeout = window.setTimeout(() => {
			window.clearInterval(interval);
			if (widgetId === undefined) {
				onError?.();
			}
		}, 8000);

		return () => {
			window.clearInterval(interval);
			window.clearTimeout(timeout);
			if (widgetId !== undefined) {
				window.turnstile?.remove(widgetId);
			}
		};
	});
</script>

<svelte:head>
	<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head>

<div
	bind:this={container}
	class="cf-turnstile min-h-[65px]"
	data-sitekey={siteKey}
	data-theme="dark"
	data-language="fr"
	data-appearance="interaction-only"
	aria-label="Vérification anti-spam"
></div>
