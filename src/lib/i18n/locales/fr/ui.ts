import type { LocaleBundle } from '$lib/i18n/locales/types';

export const uiBundle = {
	skipToContent: 'Aller au contenu',
	header: {
		homeAriaLabel: "Retour à l'accueil",
		contactCta: 'Me contacter',
		openMenu: 'Ouvrir le menu',
		closeMenu: 'Fermer le menu',
		languageLabel: 'Langue du site',
		languageNames: {
			fr: 'Français',
			en: 'English'
		}
	},
	navigation: {
		mainAriaLabel: 'Navigation principale',
		secondaryAriaLabel: 'Navigation secondaire'
	},
	footer: {
		eyebrow: 'Cut / rythme / export',
		description: 'Des vidéos pensées pour être regardées, comprises et publiées.'
	},
	hero: {
		titleLines: ['Tes rushs.', 'Le bon rythme.', 'Prêt à publier.'],
		description:
			'Portfolio de Palawi, monteur vidéo pour créateurs, streamers et businesses. Du contenu brut à une vidéo claire, rythmée et pensée pour sa plateforme.',
		playingLabel: 'En lecture'
	},
	showreel: {
		title: 'Sélection de montages récents',
		description:
			'Un aperçu court pour montrer le rythme, les formats et le niveau de finition des montages.'
	},
	formatsSection: {
		eyebrow: 'Trouve ton format',
		title: 'Un style différent pour chaque objectif',
		description:
			'Parcours les formats, choisis une direction et découvre les montages déjà réalisés dans ce style.',
		requestFormat: 'Demander ce format',
		viewExamples: 'Voir les exemples',
		customEyebrow: 'Commande personnalisée',
		customTitle: 'Une direction construite autour de ton projet.',
		customDescription:
			'Partage tes références et ton objectif, puis définissons le format ensemble.',
		presentIdea: 'Présenter mon idée'
	},
	formatCarousel: {
		regionAriaLabel: 'Carrousel des styles de montage',
		chooseAriaLabel: 'Choisir un style de montage',
		previousAriaLabel: 'Voir les formats précédents',
		nextAriaLabel: 'Voir les formats suivants'
	},
	projectsSection: {
		eyebrow: 'Projets',
		title: 'Le montage se juge à l’écran',
		description:
			'Des exemples concrets, avec le format, l’objectif et le travail réalisé derrière chaque vidéo.',
		viewAll: 'Voir tous les projets'
	},
	processSection: {
		eyebrow: 'Méthode',
		title: 'Une méthode simple, du brief à la livraison',
		description:
			'Un cadre clair pour avancer vite, garder la bonne direction et livrer un fichier prêt à publier.'
	},
	skillsSection: {
		eyebrow: 'Compétences',
		title: 'Des vidéos prêtes à publier',
		description: 'Le montage sert le rythme, la clarté et le format attendu sur chaque plateforme.',
		workTitle: 'Travail réalisé',
		workDescription: 'Des compétences orientées résultat, du tri des rushs à l’export final.',
		toolsTitle: 'Outils',
		toolsDescription: 'Un workflow centré sur un logiciel principal, sans liste d’outils superflue.'
	},
	contactSection: {
		eyebrow: 'Contact'
	},
	projectsPage: {
		title: 'Choisis ton style de montage.',
		metaTitle: 'Choisir un style de montage | Portfolio',
		metaDescription: 'Choisis un style de montage et découvre les projets réalisés dans ce format.',
		customTitle: 'Ton projet ne rentre pas dans une case ?',
		customDescription:
			'Envoie une référence, ton idée et la plateforme visée. Je te propose une direction de montage cohérente avec ton contenu, sans forcer un format prédéfini.',
		customCta: 'Parler de mon projet',
		orderStyle: 'Commander ce style',
		emptyState:
			'Aucun exemple publié pour ce style pour le moment. Tu peux quand même envoyer une référence pour définir un rendu adapté.'
	},
	contactPage: {
		eyebrow: 'Contact',
		metaTitle: 'Contact | Montage vidéo',
		metaDescription:
			'Présente ton projet de montage vidéo, son format, ses références et les rushs disponibles.',
		briefEyebrow: 'Préparer la demande',
		briefTitle: 'Un brief simple suffit',
		briefItems: [
			{
				title: 'Le format',
				description: 'Long, court, vertical, horizontal ou une idée sur mesure.'
			},
			{
				title: 'Les références',
				description: 'Une ou deux vidéos qui montrent le rythme et le rendu recherchés.'
			},
			{
				title: 'Les rushs',
				description: 'Le volume disponible, la durée visée et la plateforme de publication.'
			}
		],
		formatsEyebrow: 'Formats acceptés',
		formatsTitle: 'Une base ou du sur mesure',
		customBadge: 'Commande personnalisée',
		reviewStyles: 'Revoir les styles'
	},
	turnstileAriaLabel: 'Vérification anti-spam'
} satisfies LocaleBundle['ui'];
