<script lang="ts">
	import { onMount } from 'svelte';
	import { getLocaleContext } from '$lib/i18n/context';

	type Props = {
		siteKey: string;
		onError?: (errorCode?: string) => void;
	};

	let { siteKey, onError }: Props = $props();
	const i18n = getLocaleContext();
	let container: HTMLDivElement;
	let widgetId = $state<string>();

	const renderWidget = () => {
		if (!container || widgetId !== undefined || !window.turnstile) {
			return;
		}

		widgetId = window.turnstile.render(container, {
			sitekey: siteKey,
			theme: 'dark',
			language: i18n.locale,
			appearance: 'interaction-only',
			'error-callback': (errorCode) => {
				onError?.(errorCode);
				return true;
			}
		});
	};

	onMount(() => {
		renderWidget();

		const interval = window.setInterval(renderWidget, 100);
		const timeout = window.setTimeout(() => {
			window.clearInterval(interval);
			if (widgetId === undefined && !container.querySelector('[name="cf-turnstile-response"]')) {
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
	<script
		src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
		async
		defer
	></script>
</svelte:head>

<div
	bind:this={container}
	class="min-h-[65px]"
	role="group"
	aria-label={i18n.content.ui.turnstileAriaLabel}
></div>
