<script lang="ts">
	import { onMount } from 'svelte';

	type Props = {
		src: string;
		poster: string;
		active?: boolean;
		class?: string;
		onPlaybackChange?: (playing: boolean) => void;
	};

	type NetworkInformation = EventTarget & {
		effectiveType?: string;
		saveData?: boolean;
	};

	type NavigatorWithConnection = Navigator & {
		connection?: NetworkInformation;
	};

	let { src, poster, active = true, class: className = '', onPlaybackChange }: Props = $props();

	let videoElement = $state<HTMLVideoElement>();
	let isNearViewport = $state(false);
	let pageVisible = $state(true);
	let playbackAllowed = $state(false);

	const shouldLoad = $derived(active && isNearViewport && playbackAllowed);
	const shouldPlay = $derived(shouldLoad && pageVisible);

	const requestPlayback = () => {
		if (!videoElement || !shouldPlay) return;
		void videoElement.play().catch(() => undefined);
	};

	$effect(() => {
		if (!videoElement) return;

		if (shouldPlay) {
			requestPlayback();
		} else {
			videoElement.pause();
		}
	});

	onMount(() => {
		if (!videoElement) return;

		const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		const coarsePointerQuery = window.matchMedia('(pointer: coarse)');
		const connection = (navigator as NavigatorWithConnection).connection;

		const updatePlaybackPreference = () => {
			const constrainedConnection =
				connection?.saveData === true ||
				['slow-2g', '2g'].includes(connection?.effectiveType ?? '');

			playbackAllowed =
				!reducedMotionQuery.matches && !coarsePointerQuery.matches && !constrainedConnection;
		};

		const updatePageVisibility = () => {
			pageVisible = document.visibilityState === 'visible';
		};

		const observer = new IntersectionObserver(
			([entry]) => {
				isNearViewport = entry.isIntersecting;
			},
			{ rootMargin: '120px 0px', threshold: 0.15 }
		);

		updatePlaybackPreference();
		updatePageVisibility();
		observer.observe(videoElement);
		reducedMotionQuery.addEventListener('change', updatePlaybackPreference);
		coarsePointerQuery.addEventListener('change', updatePlaybackPreference);
		connection?.addEventListener('change', updatePlaybackPreference);
		document.addEventListener('visibilitychange', updatePageVisibility);

		return () => {
			observer.disconnect();
			reducedMotionQuery.removeEventListener('change', updatePlaybackPreference);
			coarsePointerQuery.removeEventListener('change', updatePlaybackPreference);
			connection?.removeEventListener('change', updatePlaybackPreference);
			document.removeEventListener('visibilitychange', updatePageVisibility);
		};
	});
</script>

<video
	bind:this={videoElement}
	class={className}
	src={shouldLoad ? src : undefined}
	{poster}
	preload="none"
	muted
	loop
	playsinline
	tabindex="-1"
	aria-hidden="true"
	oncanplay={requestPlayback}
	onplay={() => onPlaybackChange?.(true)}
	onpause={() => onPlaybackChange?.(false)}
></video>
