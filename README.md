# Portfolio de montage vidéo

Portfolio statique de Palawi construit avec SvelteKit 2, Svelte 5, TypeScript et Tailwind CSS v4.

## Parcours disponibles

- `/` : présentation, formats, méthode, compétences et contact ;
- `/projets` : sélection d'un style puis affichage des exemples correspondants ;
- `/estimation` : questionnaire adaptatif et fourchette indicative ;
- `/demarrer` : choix entre estimation et contact direct ;
- `/contact` : brief, Formspree et Cloudflare Turnstile.

Les vidéos sont présentées directement dans la grille de `/projets`. Il n'existe pas de page détail `/projets/[slug]`.

## Développement

Prérequis : Node.js 22 et pnpm 10.

```sh
pnpm install
pnpm dev
```

## Ajouter un projet

Les projets sont centralisés dans `src/lib/content/projects.ts` et leurs prix dans `src/lib/content/project-pricing.ts`.

Pour chaque projet :

1. ajouter le contenu français et anglais dans `projects.ts` ;
2. renseigner une catégorie, un poster, une vidéo locale et le prix d'origine ;
3. déposer la vidéo complète dans `static/videos/<categorie>/` ;
4. générer ou déposer sa preview dans `static/videos/previews/` ;
5. exécuter les vérifications locales.

Catégories disponibles :

- `gaming-long-form` ;
- `gaming-short-form` ;
- `explainer-short-form` ;
- `business-promo` ;
- `other-format`.

## Médias vidéo

Les vidéos complètes et les previews optimisées sont volontairement ignorées par Git. Elles restent dans le projet local et sont provisionnées directement sur le serveur aux mêmes chemins :

```txt
static/videos/business/
static/videos/explainer/
static/videos/gaming/
static/videos/other/
static/videos/previews/
```

Le contrôle suivant vérifie que chaque vidéo déclarée possède sa source complète et sa preview :

```sh
pnpm check:media
```

Il est aussi exécuté automatiquement avant `pnpm build`. Un build échoue donc clairement si les médias n'ont pas été provisionnés.

Les previews de huit secondes peuvent être régénérées avec FFmpeg :

```powershell
./scripts/generate-video-previews.ps1
```

Les posters WebP restent suivis par Git et servent de fallback lorsque l'autoplay est désactivé ou qu'une vidéo est indisponible.

## Formulaire de contact

Créer un fichier `.env` à partir de `.env.example`, puis renseigner :

```env
PUBLIC_FORMSPREE_FORM_ID=form_id
PUBLIC_TURNSTILE_SITE_KEY=turnstile_site_key
PUBLIC_CONTACT_EMAIL=contact@example.com
```

La clé secrète Turnstile reste uniquement dans Formspree. Les variables publiques sont intégrées pendant le build statique : toute modification nécessite un nouveau build.

La soumission Formspree, la réception email, le domaine Turnstile et les restrictions Formspree doivent être validés manuellement sur le domaine public.

## Vérifications

```sh
pnpm format
pnpm lint
pnpm check
pnpm test
pnpm build
```

## Docker Compose

Le build multi-stage génère le site avec Node 22 puis le sert avec Nginx sur le port interne `8080`.

### Lancement local

```sh
docker compose --env-file .env.example -f docker/docker-compose.yml up -d --build
```

Le site est ensuite disponible sur `http://127.0.0.1:8080` et le healthcheck sur `/healthz`.

### Production

Le serveur doit conserver les dossiers ignorés `static/videos/*` dans le checkout avant le build. Les mises à jour Git ne les suppriment pas. Le contrôle média bloque le déploiement si un fichier attendu manque.

Configuration minimale dans `.env.prod` :

```env
HOST_BIND=127.0.0.1
HOST_PORT=8080
APP_PUBLIC_URL=https://portfolio.example.com
PUBLIC_FORMSPREE_FORM_ID=form_id
PUBLIC_TURNSTILE_SITE_KEY=turnstile_site_key
PUBLIC_CONTACT_EMAIL=contact@example.com
```

Déploiement depuis PowerShell :

```powershell
./scripts/deploy.ps1 `
  -SshHost "server.example.com" `
  -SshUser "deploy"
```

Le script met à jour la branche demandée, reconstruit le conteneur, vérifie `/healthz` puis contrôle l'URL publique sauf si `-SkipPublicCheck` est utilisé. Aucun média local n'est envoyé automatiquement par ce script.
