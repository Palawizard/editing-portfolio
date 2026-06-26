import type { Project, ProjectCategory, ProjectInput } from '$lib/types/project';
import { getLocalPosterFromPreview, getPublishedVideo } from '$lib/utils/media';

const categoryDefaults: Record<ProjectCategory, Pick<Project, 'format' | 'platform'>> = {
	'gaming-long-form': {
		format: '16:9',
		platform: ['YouTube']
	},
	'gaming-short-form': {
		format: '9:16',
		platform: ['TikTok', 'Reels', 'Shorts']
	},
	'explainer-short-form': {
		format: '9:16',
		platform: ['TikTok', 'Reels', 'Shorts']
	},
	'business-promo': {
		format: '9:16',
		platform: ['Instagram', 'TikTok']
	},
	'other-format': {
		format: '16:9',
		platform: ['YouTube']
	}
};

const resolveProjectPoster = (
	input: ProjectInput,
	publishedVideo: ReturnType<typeof getPublishedVideo>,
	localPoster?: string
): string => {
	if (input.poster) return input.poster;
	if (publishedVideo?.provider === 'youtube' && publishedVideo.poster) {
		return publishedVideo.poster;
	}
	if (localPoster) return localPoster;
	return publishedVideo?.poster ?? '';
};

const defineProject = (input: ProjectInput): Project => {
	const publishedVideo = getPublishedVideo(input.externalUrl);
	const localPoster = getLocalPosterFromPreview(input.previewVideo);
	const defaults = categoryDefaults[input.category];

	return {
		...input,
		referenceId: input.referenceId ?? input.slug,
		format: input.format ?? defaults.format,
		platform: input.platform ?? defaults.platform,
		poster: resolveProjectPoster(input, publishedVideo, localPoster),
		featured: input.featured ?? false
	};
};

export const projects: Project[] = [
	defineProject({
		slug: 'miyuna-retour-gaming-long',
		referenceId: 'gaming_long_miyuna_retour',
		title: 'Retour MiyunaTV',
		category: 'gaming-long-form',
		summary: 'Une vidéo gaming longue construite autour du retour de la créatrice.',
		objective: 'Rendre le retour plus fluide avec une sélection claire des moments utiles.',
		result: 'Une vidéo YouTube structurée, lisible et centrée sur les temps forts de la session.',
		work: [
			'Tri des séquences utiles',
			'Suppression des temps morts',
			'Cuts de rythme',
			'Conservation du ton stream',
			'Sound design léger'
		],
		duration: 'Long format',
		previewVideo: '/videos/gaming/miyuna-retour-gaming-long.mp4',
		externalUrl: 'https://youtu.be/l0bbmDD3gI4?si=VDm3Nbh1PJwK9WfC',
		featured: true
	}),
	defineProject({
		slug: 'genshin-whale-accident-long',
		referenceId: 'gaming_long_genshin_whale_accident',
		title: 'Genshin Impact whale accident',
		category: 'gaming-long-form',
		summary: 'Une vidéo longue avec narration, rythme et progression autour d’un moment marquant.',
		objective: 'Garder l’énergie du contenu tout en rendant la progression plus agréable à suivre.',
		result:
			'Un montage YouTube long format qui met en avant la montée du gag et les réactions clés.',
		work: [
			'Sélection des moments forts',
			'Rythme narratif',
			'Cuts de réaction',
			'Nettoyage des longueurs',
			'Transitions discrètes'
		],
		duration: 'Long format',
		previewVideo: '/videos/gaming/genshin-whale-accident-long.mp4',
		externalUrl: 'https://youtu.be/GPhsBWWzEPU?si=V3a9eEbbo2Mrjq6R',
		featured: true
	}),
	defineProject({
		slug: 'miyuna-model-reveal-best-of',
		referenceId: 'gaming_long_miyuna_model_reveal_best_of',
		title: 'Best-of reveal modèle 2D',
		category: 'gaming-long-form',
		summary: 'Un best-of de live pensé pour garder les réactions et les moments importants.',
		objective:
			'Transformer un contenu live en vidéo YouTube plus directe et plus facile à regarder.',
		result:
			'Une vidéo structurée autour des meilleurs moments, avec un rythme plus dense que le direct.',
		work: [
			'Best-of de live',
			'Tri des réactions',
			'Resserrement du rythme',
			'Cuts de respiration',
			'Structure de vidéo'
		],
		duration: 'Long format',
		previewVideo: '/videos/gaming/miyuna-model-reveal-best-of.mp4',
		externalUrl: 'https://www.youtube.com/watch?v=8htW720ozwQ',
		featured: true
	}),
	defineProject({
		slug: 'palawi-fireball-long',
		referenceId: 'gaming_long_palawi_fireball',
		title: 'Fireball',
		category: 'gaming-long-form',
		summary: 'Un montage gaming long format centré sur le rythme et les moments de partie.',
		objective: 'Construire une vidéo plus compacte autour des moments forts du gameplay.',
		result: 'Un long format YouTube avec une progression claire et des séquences mieux enchaînées.',
		work: [
			'Tri des rushs',
			'Cuts de gameplay',
			'Rythme de séquence',
			'Transitions sobres',
			'Export YouTube'
		],
		duration: 'Long format',
		previewVideo: '/videos/gaming/palawi-fireball-long.mp4',
		externalUrl: 'https://www.youtube.com/watch?v=a0VkCk89dAg',
		featured: true
	}),
	defineProject({
		slug: 'carry-the-glass-long',
		referenceId: 'gaming_long_carry_the_glass',
		title: 'Carry the Glass en temps limité',
		category: 'gaming-long-form',
		summary: 'Une vidéo gaming avec contrainte de temps et progression de défi.',
		objective: 'Mettre en valeur la tension du défi en retirant les temps morts.',
		result: 'Une vidéo YouTube plus rythmée, centrée sur les essais, réactions et moments clés.',
		work: [
			'Construction du défi',
			'Sélection des échecs utiles',
			'Cuts de rythme',
			'Moments de réaction',
			'Nettoyage des longueurs'
		],
		duration: 'Long format',
		previewVideo: '/videos/gaming/carry-the-glass-long.mp4',
		externalUrl: 'https://www.youtube.com/watch?v=mFY1k4lSGO8'
	}),
	defineProject({
		slug: 'funky-beau-fils-long',
		referenceId: 'gaming_long_funky_beau_fils',
		title: 'Story gaming long format',
		category: 'gaming-long-form',
		summary: 'Un contenu long travaillé pour garder les séquences qui font avancer la vidéo.',
		objective: 'Structurer une vidéo longue autour des passages les plus utiles et des réactions.',
		result: 'Un montage pensé pour garder le rythme sans perdre le contexte principal.',
		work: [
			'Sélection des passages clés',
			'Cuts de réaction',
			'Rythme long format',
			'Nettoyage des silences',
			'Export YouTube'
		],
		duration: 'Long format',
		previewVideo: '/videos/gaming/funky-beau-fils-long.mp4',
		externalUrl: 'https://www.youtube.com/watch?v=b9jeLxpKvuY&t=209s'
	}),
	defineProject({
		slug: 'flare-mort-short',
		referenceId: 'gaming_short_palawi_flare_mort',
		title: 'Short gaming flare',
		category: 'gaming-short-form',
		summary: 'Un moment gaming transformé en clip vertical court.',
		objective: 'Créer un extrait rapide, compréhensible et efficace dès les premières secondes.',
		result: 'Un short vertical adapté à YouTube Shorts avec un rythme direct.',
		work: [
			'Hook rapide',
			'Recadrage vertical',
			'Cuts courts',
			'Accentuation du moment',
			'Export Shorts'
		],
		duration: 'Short',
		previewVideo: '/videos/gaming/flare-mort-short.mp4',
		externalUrl: 'https://www.youtube.com/shorts/r9KrsHKDExQ',
		featured: true
	}),
	defineProject({
		slug: 'cs2-random-short',
		referenceId: 'gaming_short_terraster_random_cs2',
		title: 'Short CS2 random',
		category: 'gaming-short-form',
		summary: 'Un extrait CS2 rapide construit autour d’une situation imprévisible.',
		objective: 'Faire comprendre le gag immédiatement en gardant un rythme serré.',
		result: 'Un clip court lisible sans contexte, pensé pour la consommation mobile.',
		work: [
			'Repérage du moment drôle',
			'Resserrement du timing',
			'Recadrage vertical',
			'Cuts de réaction',
			'Export Shorts'
		],
		duration: 'Short',
		previewVideo: '/videos/gaming/cs2-random-short.mp4',
		externalUrl: 'https://www.youtube.com/shorts/0T1TAPXgpCw'
	}),
	defineProject({
		slug: 'cs2-habitude-short',
		referenceId: 'gaming_short_terraster_habitude_cs2',
		title: 'Short CS2 réaction',
		category: 'gaming-short-form',
		summary: 'Un clip vertical basé sur une réaction simple et immédiatement lisible.',
		objective: 'Transformer une séquence courte en contenu prêt pour Shorts.',
		result: 'Un short clair, direct et centré sur la réaction principale.',
		work: [
			'Coupe du contexte inutile',
			'Rythme court',
			'Recadrage mobile',
			'Timing de réaction',
			'Export vertical'
		],
		duration: 'Short',
		previewVideo: '/videos/gaming/cs2-habitude-short.mp4',
		externalUrl: 'https://www.youtube.com/shorts/w8AUOeyibhU'
	}),
	defineProject({
		slug: 'cs2-totem-short',
		referenceId: 'gaming_short_terraster_totem_cs2',
		title: 'Short CS2 totem',
		category: 'gaming-short-form',
		summary: 'Un moment visuel condensé en short gaming facile à comprendre.',
		objective: 'Garder uniquement la situation drôle et la rendre lisible sur mobile.',
		result: 'Un clip vertical court avec une chute rapide.',
		work: [
			'Sélection du gag',
			'Cuts rapides',
			'Recadrage vertical',
			'Rythme de chute',
			'Export Shorts'
		],
		duration: 'Short',
		previewVideo: '/videos/gaming/cs2-totem-short.mp4',
		externalUrl: 'https://www.youtube.com/shorts/bBnOLx1dpHQ'
	}),
	defineProject({
		slug: 'cs2-peur-short',
		referenceId: 'gaming_short_terraster_peur_cs2',
		title: 'Short CS2 peur',
		category: 'gaming-short-form',
		summary: 'Un extrait gaming court centré sur une réaction de surprise.',
		objective: 'Mettre en avant la réaction sans garder les longueurs autour.',
		result: 'Un short rapide, lisible et pensé pour une publication verticale.',
		work: [
			'Hook immédiat',
			'Resserrement de la scène',
			'Recadrage vertical',
			'Timing comique',
			'Export Shorts'
		],
		duration: 'Short',
		previewVideo: '/videos/gaming/cs2-peur-short.mp4',
		externalUrl: 'https://www.youtube.com/shorts/5PsSeDvLIk8'
	}),
	defineProject({
		slug: 'cs2-type-bizarre-short',
		referenceId: 'gaming_short_terraster_type_bizarre_cs2',
		title: 'Short CS2 situation étrange',
		category: 'gaming-short-form',
		summary: 'Un moment de partie transformé en short clair et rythmé.',
		objective: 'Faire ressortir la situation principale en quelques secondes.',
		result: 'Un clip vertical simple, centré sur le gag et prêt à publier.',
		work: [
			'Sélection du moment',
			'Rythme serré',
			'Recadrage mobile',
			'Cuts de réaction',
			'Export Shorts'
		],
		duration: 'Short',
		previewVideo: '/videos/gaming/cs2-type-bizarre-short.mp4',
		externalUrl: 'https://www.youtube.com/shorts/bytnZXOfnHM'
	}),
	defineProject({
		slug: 'rant-explicatif-drive',
		referenceId: 'explainer_short_drive_rant_visual_edit',
		title: 'Rant explicatif illustré',
		category: 'explainer-short-form',
		summary: 'Un propos parlé accompagné par du rythme et des visuels utiles.',
		objective: 'Rendre le message plus clair avec des appuis visuels et un montage plus fluide.',
		result: 'Une vidéo courte qui accompagne la parole sans surcharger le propos.',
		work: [
			'Rythme de parole',
			"Images d'appui",
			"Textes à l'écran",
			'Transitions discrètes',
			'Clarification du message'
		],
		duration: 'Court',
		format: '9:16',
		previewVideo: '/videos/explainer/rant-explicatif.mp4'
	}),
	defineProject({
		slug: 'business-boursin-short',
		referenceId: 'business_promo_boursin_short',
		title: 'Boursin',
		category: 'business-promo',
		summary: 'Un montage vertical business autour d’un produit food.',
		objective: 'Mettre en avant le produit avec un format court, clair et orienté réseaux sociaux.',
		result: 'Une vidéo promo verticale utilisable comme référence pour du contenu food et UGC.',
		work: [
			'Montage vertical',
			'Cuts de rythme',
			'Rythme publicitaire',
			'Mise en avant du produit',
			'Export réseaux sociaux'
		],
		duration: 'Short',
		format: '9:16',
		previewVideo: '/videos/business/boursin.mp4'
	}),
	defineProject({
		slug: 'business-cheese-naan-short',
		referenceId: 'business_promo_cheese_naan_short',
		title: 'Cheese naan',
		category: 'business-promo',
		summary: 'Un montage court vertical pour une offre food.',
		objective: 'Créer une vidéo simple à comprendre et rythmée dès les premières secondes.',
		result: 'Un contenu promo vertical adapté à Instagram, TikTok et Shorts.',
		work: [
			'Montage vertical',
			'Structure courte',
			'Rythme publicitaire',
			'Mise en avant du produit',
			'Export réseaux sociaux'
		],
		duration: 'Short',
		format: '9:16',
		previewVideo: '/videos/business/cheese-naan.mp4'
	}),
	defineProject({
		slug: 'business-humour-short',
		referenceId: 'business_promo_humour_short',
		title: 'Humour promo',
		category: 'business-promo',
		summary: 'Un format court qui utilise l’humour pour rendre le message plus mémorable.',
		objective: 'Garder un rythme dynamique tout en conservant une intention commerciale claire.',
		result: 'Une vidéo verticale orientée engagement, avec un ton plus léger.',
		work: [
			'Montage vertical',
			'Timing comique',
			'Cuts de rythme',
			'Mise en avant du message',
			'Export réseaux sociaux'
		],
		duration: 'Short',
		format: '9:16',
		previewVideo: '/videos/business/humour-promo.mp4'
	}),
	defineProject({
		slug: 'business-naan-short',
		referenceId: 'business_promo_naan_short',
		title: 'Naan',
		category: 'business-promo',
		summary: 'Une vidéo verticale promotionnelle centrée sur un produit food.',
		objective: 'Présenter le produit avec un montage court et direct.',
		result: 'Un exemple de contenu business pensé pour une lecture rapide sur mobile.',
		work: [
			'Montage vertical',
			'Rythme court',
			'Mise en avant du produit',
			'Structure promo',
			'Export réseaux sociaux'
		],
		duration: 'Short',
		format: '9:16',
		previewVideo: '/videos/business/naan.mp4'
	}),
	defineProject({
		slug: 'business-poulet-short',
		referenceId: 'business_promo_poulet_short',
		title: 'Poulet',
		category: 'business-promo',
		summary: 'Un montage court vertical pour valoriser un produit food.',
		objective: 'Rendre la vidéo lisible et efficace pour une diffusion sur réseaux sociaux.',
		result: 'Un contenu promo vertical centré sur le produit et le rythme.',
		work: [
			'Montage vertical',
			'Cuts de rythme',
			'Rythme publicitaire',
			'Mise en avant du produit',
			'Export réseaux sociaux'
		],
		duration: 'Short',
		format: '9:16',
		previewVideo: '/videos/business/poulet.mp4'
	}),
	defineProject({
		slug: 'business-smash-short',
		referenceId: 'business_promo_smash_short',
		title: 'Smash',
		category: 'business-promo',
		summary: 'Un exemple business court avec un montage vertical orienté impact produit.',
		objective: 'Créer une séquence promotionnelle rapide avec une lecture immédiate.',
		result: 'Un short business utilisable comme référence pour une offre food.',
		work: [
			'Montage vertical',
			'Rythme court',
			'Mise en avant du produit',
			'Structure promo',
			'Export réseaux sociaux'
		],
		duration: 'Short',
		format: '9:16',
		previewVideo: '/videos/business/smash.mp4'
	}),
	defineProject({
		slug: 'business-tacos-short',
		referenceId: 'business_promo_tacos_short',
		title: 'Tacos',
		category: 'business-promo',
		summary: 'Une vidéo promotionnelle verticale autour d’un produit food.',
		objective: 'Mettre le produit au centre avec un montage direct et exploitable sur mobile.',
		result: 'Un contenu court pensé pour une publication Instagram, TikTok ou Shorts.',
		work: [
			'Montage vertical',
			'Cuts de rythme',
			'Rythme publicitaire',
			'Mise en avant du produit',
			'Export réseaux sociaux'
		],
		duration: 'Short',
		format: '9:16',
		previewVideo: '/videos/business/tacos.mp4'
	}),
	defineProject({
		slug: 'business-ugc-short',
		referenceId: 'business_ugc_short',
		title: 'UGC',
		category: 'business-promo',
		summary: 'Un montage UGC vertical pensé pour présenter un message de manière naturelle.',
		objective: 'Transformer une prise de parole en contenu court, clair et publiable.',
		result: 'Une vidéo UGC verticale avec un rythme adapté aux réseaux sociaux.',
		work: [
			'Montage vertical',
			'Rythme de parole',
			'Structure courte',
			'Mise en avant du message',
			'Export réseaux sociaux'
		],
		duration: 'Short',
		format: '9:16',
		previewVideo: '/videos/business/ugc.mp4'
	}),
	defineProject({
		slug: 'funky-live-cuisine-other',
		referenceId: 'other_format_funky_live_cuisine',
		title: 'Live cuisine monté',
		category: 'other-format',
		summary: 'Un contenu live hors gaming travaillé comme une vidéo YouTube complète.',
		objective:
			'Garder les meilleurs moments du live et donner une structure plus claire au contenu.',
		result:
			'Une vidéo plus accessible, avec les longueurs réduites et les séquences mieux enchaînées.',
		work: [
			'Tri de live',
			'Structure de séquences',
			'Cuts de rythme',
			'Conservation des interactions',
			'Export YouTube'
		],
		duration: 'Long format',
		previewVideo: '/videos/other/funky-live-cuisine-other.mp4',
		externalUrl: 'https://www.youtube.com/watch?v=CvN1kRSoErE&t=94s'
	})
];

export const featuredProjects = projects.filter((project) => project.featured);
