export type Locale = 'fr' | 'en';

export const locales: Locale[] = ['fr', 'en'];

export const defaultLocale: Locale = 'fr';

export const localeLabels: Record<Locale, string> = {
	fr: 'Français',
	en: 'English'
};

export const htmlLocales: Record<Locale, string> = {
	fr: 'fr',
	en: 'en'
};

export const ogLocales: Record<Locale, string> = {
	fr: 'fr_FR',
	en: 'en_US'
};
