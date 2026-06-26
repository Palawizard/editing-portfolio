import { projectCategoryLabels as projectCategoryLabelsEn } from '$lib/i18n/locales/en/formats';
import { projectCategoryLabels as projectCategoryLabelsFr } from '$lib/i18n/locales/fr/formats';
import { contactBundle as contactBundleEn } from '$lib/i18n/locales/en/contact';
import { contactBundle as contactBundleFr } from '$lib/i18n/locales/fr/contact';
import { formatsBundle as formatsBundleEn } from '$lib/i18n/locales/en/formats';
import { formatsBundle as formatsBundleFr } from '$lib/i18n/locales/fr/formats';
import { servicesBundle as servicesBundleEn } from '$lib/i18n/locales/en/services';
import { servicesBundle as servicesBundleFr } from '$lib/i18n/locales/fr/services';
import { siteBundle as siteBundleEn } from '$lib/i18n/locales/en/site';
import { siteBundle as siteBundleFr } from '$lib/i18n/locales/fr/site';
import { uiBundle as uiBundleEn } from '$lib/i18n/locales/en/ui';
import { uiBundle as uiBundleFr } from '$lib/i18n/locales/fr/ui';
import type { LocaleBundle } from '$lib/i18n/locales/types';
import { getProjects } from '$lib/content/projects';
import type { Locale } from '$lib/i18n/types';
import type { Project } from '$lib/types/project';

export type LocaleContent = LocaleBundle & {
	locale: Locale;
	projects: Project[];
};

const bundles: Record<Locale, LocaleBundle> = {
	fr: {
		siteMetadata: siteBundleFr.siteMetadata,
		navigationLinks: siteBundleFr.navigationLinks,
		heroActions: siteBundleFr.heroActions,
		contactCopy: siteBundleFr.contactCopy,
		editingFormats: formatsBundleFr.editingFormats,
		projectCategoryLabels: projectCategoryLabelsFr,
		customFormatChoice: formatsBundleFr.customFormatChoice,
		contactStyleOptions: contactBundleFr.contactStyleOptions,
		contactFormCopy: contactBundleFr.contactFormCopy,
		services: servicesBundleFr.services,
		processSteps: servicesBundleFr.processSteps,
		skills: servicesBundleFr.skills,
		tools: servicesBundleFr.tools,
		beforeAfterSection: servicesBundleFr.beforeAfterSection,
		ui: uiBundleFr
	},
	en: {
		siteMetadata: siteBundleEn.siteMetadata,
		navigationLinks: siteBundleEn.navigationLinks,
		heroActions: siteBundleEn.heroActions,
		contactCopy: siteBundleEn.contactCopy,
		editingFormats: formatsBundleEn.editingFormats,
		projectCategoryLabels: projectCategoryLabelsEn,
		customFormatChoice: formatsBundleEn.customFormatChoice,
		contactStyleOptions: contactBundleEn.contactStyleOptions,
		contactFormCopy: contactBundleEn.contactFormCopy,
		services: servicesBundleEn.services,
		processSteps: servicesBundleEn.processSteps,
		skills: servicesBundleEn.skills,
		tools: servicesBundleEn.tools,
		beforeAfterSection: servicesBundleEn.beforeAfterSection,
		ui: uiBundleEn
	}
};

export const getContent = (locale: Locale): LocaleContent => ({
	locale,
	...bundles[locale],
	projects: getProjects(locale)
});
