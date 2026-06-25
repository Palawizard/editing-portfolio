# Portfolio de montage vidéo

Portfolio statique construit avec SvelteKit, TypeScript et Tailwind CSS.

## Ajouter un montage déjà publié

L'ajout se fait uniquement dans `src/lib/content/projects.ts`.

1. Copier un bloc `defineProject(...)` existant.
2. Remplacer son contenu et ajouter `externalUrl` avec le lien public de la vidéo.
3. Lancer `pnpm check` puis `pnpm dev`.

Exemple minimal :

```ts
defineProject({
	slug: 'nom-court-et-unique',
	title: 'Titre visible du montage',
	category: 'gaming-short-form',
	summary: 'Une phrase qui présente le résultat.',
	objective: 'Ce que le montage devait accomplir.',
	result: 'Le rendu obtenu ou son intention.',
	work: ['Cuts', 'Sous-titres', 'Sound design'],
	duration: '35 secondes',
	externalUrl: 'https://www.youtube.com/shorts/VIDEO_ID',
	featured: true
});
```

Liens pris en charge :

- YouTube et YouTube Shorts ;
- Vimeo ;
- TikTok avec une URL contenant `/video/` ;
- Instagram Reels et publications vidéo.

Pour YouTube, la miniature est récupérée automatiquement. Pour TikTok, Instagram et Vimeo, ajouter une image dans `static/images/posters`, puis renseigner :

```ts
poster: '/images/posters/nom-du-projet.webp';
```

Les valeurs `platform` et `format` sont déduites de `category`. Elles peuvent être remplacées au besoin :

```ts
platform: ['Instagram'],
format: '9:16'
```

Catégories disponibles :

- `gaming-long-form`
- `gaming-short-form`
- `explainer-short-form`
- `business-promo`

`featured: true` affiche le projet sur la page d'accueil. Le lien publié est intégré sur la fiche projet et reste accessible avec un bouton externe.

## Développement

```sh
pnpm install
pnpm dev
```

## Vérifications

```sh
pnpm format
pnpm lint
pnpm check
pnpm build
```
