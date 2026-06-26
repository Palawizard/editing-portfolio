<script lang="ts">
	import { Globe } from '@lucide/svelte';
	import { getLocaleContext } from '$lib/i18n/context';
	import { locales, type Locale } from '$lib/i18n/types';

	const i18n = getLocaleContext();

	const selectLocale = (nextLocale: Locale) => {
		if (nextLocale !== i18n.locale) {
			i18n.setLocale(nextLocale);
		}
	};
</script>

<div
	class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1 shadow-[inset_0_1px_0_rgb(255_255_255/0.04)]"
	role="group"
	aria-label={i18n.content.ui.header.languageLabel}
>
	<Globe class="ml-2 shrink-0 text-slate-400" size={15} aria-hidden="true" />

	{#each locales as option (option)}
		<button
			type="button"
			class={[
				'min-w-[2.75rem] rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide uppercase transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300',
				i18n.locale === option
					? 'bg-violet-300/15 text-white shadow-[0_0_0_1px_rgb(167_139_250/0.35)]'
					: 'text-slate-400 hover:bg-white/[0.06] hover:text-slate-200'
			]}
			aria-pressed={i18n.locale === option}
			onclick={() => selectLocale(option)}
		>
			{option}
		</button>
	{/each}
</div>
