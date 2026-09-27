<script lang="ts">
	import { tick } from 'svelte';

	type Props = { class?: string };

	let { class: className = '' }: Props = $props();
	let el = $state<HTMLDivElement>();
	let pending: (() => void) | undefined;

	/**
	 * The studio's scene change: peach bands and the P sweep in, `swap` runs behind them,
	 * the sweep leaves. A call during the sweep only replaces the swap (latest click wins).
	 */
	export async function play(swap: () => void) {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!el || reduce) {
			swap();
			return;
		}
		if (pending) {
			pending = swap;
			return;
		}
		pending = swap;
		// A sweep still leaving is caught where it is and closed again, never snapped back.
		const from = getComputedStyle(el).clipPath;
		el.getAnimations().forEach((animation) => animation.cancel());
		const easing = 'cubic-bezier(0.77, 0, 0.175, 1)';
		try {
			await el.animate([{ clipPath: from }, { clipPath: 'inset(0 0 0 0)' }], {
				duration: 260,
				easing,
				fill: 'forwards'
			}).finished;
		} catch {
			// Cancelled mid-sweep: still swap, so the click is never lost.
		}
		const run = pending;
		pending = undefined;
		run?.();
		await tick();
		el.animate([{ clipPath: 'inset(0 0 0 0)' }, { clipPath: 'inset(0 0 0 100%)' }], {
			duration: 300,
			easing,
			fill: 'forwards'
		});
	}
</script>

<div bind:this={el} class={['stinger', className]} aria-hidden="true">
	<span>P</span>
</div>

<style>
	.stinger {
		position: absolute;
		inset: 0;
		z-index: 30;
		display: grid;
		place-items: center;
		border-radius: inherit;
		clip-path: inset(0 100% 0 0);
		background: repeating-linear-gradient(
			115deg,
			var(--color-peach) 0 28px,
			var(--color-peach-deep) 28px 56px
		);
		pointer-events: none;
	}

	.stinger span {
		font-family: var(--font-display);
		font-size: clamp(5rem, 14vw, 9rem);
		font-weight: 900;
		line-height: 1;
		color: #ffffff;
		text-shadow: 0 10px 30px rgb(42 20 9 / 0.35);
	}
</style>
