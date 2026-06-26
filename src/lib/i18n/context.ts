import { getContext } from 'svelte';
import type { LocaleContent } from '$lib/i18n/content';
import type { Locale } from '$lib/i18n/types';

export const LOCALE_CONTEXT_KEY = Symbol('portfolio-locale');

export type LocaleContext = {
	readonly locale: Locale;
	readonly content: LocaleContent;
	setLocale: (locale: Locale) => void;
};

export const getLocaleContext = (): LocaleContext => {
	const context = getContext<LocaleContext>(LOCALE_CONTEXT_KEY);

	if (!context) {
		throw new Error('Locale context is not available. Wrap the app with setLocaleContext().');
	}

	return context;
};
