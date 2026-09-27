<script lang="ts">
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
	class="inline-flex gap-0.5 rounded-full bg-white/65 p-[3px] shadow-[var(--shadow)]"
	role="group"
	aria-label={i18n.content.ui.header.languageLabel}
>
	{#each locales as option (option)}
		<button
			type="button"
			class={[
				'min-h-8 min-w-10 rounded-full px-2 text-xs font-extrabold uppercase transition-[background-color,color,transform] duration-150 active:scale-[0.97]',
				i18n.locale === option ? 'bg-paper text-white' : 'text-paper'
			]}
			aria-pressed={i18n.locale === option}
			onclick={() => selectLocale(option)}
		>
			{option}
		</button>
	{/each}
</div>
