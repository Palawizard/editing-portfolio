import { browser } from '$app/environment';
import { defaultLocale, type Locale } from '$lib/i18n/types';

export const LOCALE_STORAGE_KEY = 'portfolio-locale';

const isLocale = (value: string | null | undefined): value is Locale =>
	value === 'fr' || value === 'en';

export const detectBrowserLocale = (): Locale => {
	if (!browser) {
		return defaultLocale;
	}

	const languages =
		navigator.languages?.length > 0 ? navigator.languages : [navigator.language || defaultLocale];

	for (const language of languages) {
		const normalized = language.toLowerCase();

		if (normalized.startsWith('en')) {
			return 'en';
		}

		if (normalized.startsWith('fr')) {
			return 'fr';
		}
	}

	return defaultLocale;
};

export const readStoredLocale = (): Locale | null => {
	if (!browser) {
		return null;
	}

	const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
	return isLocale(stored) ? stored : null;
};

export const readDocumentLocale = (): Locale | null => {
	if (!browser) {
		return null;
	}

	return isLocale(document.documentElement.dataset.initialLocale)
		? document.documentElement.dataset.initialLocale
		: null;
};

export const resolveLocaleFromSearch = (searchParams: URLSearchParams): Locale | null => {
	const langParam = searchParams.get('lang')?.trim().toLowerCase();

	if (langParam === 'en' || langParam === 'fr') {
		return langParam;
	}

	return null;
};

export const resolveInitialLocale = (searchParams?: URLSearchParams): Locale =>
	resolveLocaleFromSearch(searchParams ?? new URLSearchParams()) ??
	readDocumentLocale() ??
	readStoredLocale() ??
	detectBrowserLocale();

export const persistLocale = (locale: Locale) => {
	if (!browser) {
		return;
	}

	localStorage.setItem(LOCALE_STORAGE_KEY, locale);
	document.documentElement.lang = locale;
	document.documentElement.dataset.initialLocale = locale;
};
