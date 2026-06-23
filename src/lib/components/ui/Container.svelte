<script lang="ts">
	type ContainerSize = 'default' | 'narrow' | 'wide';

	type Props = {
		size?: ContainerSize;
		class?: string;
		children?: import('svelte').Snippet;
	};

	let { size = 'default', class: className = '', children }: Props = $props();

	const sizeClasses: Record<ContainerSize, string> = {
		default: 'max-w-6xl',
		narrow: 'max-w-4xl',
		wide: 'max-w-7xl'
	};
</script>

<div class={['mx-auto w-full px-5 sm:px-6 lg:px-8', sizeClasses[size], className]}>
	{@render children?.()}
</div>
