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

Les vidéos complètes et les previews optimisées sont volontairement ignorées par Git. Elles restent dans le projet local. En production, elles sont provisionnées dans un répertoire persistant du serveur puis montées en lecture seule dans le conteneur Nginx :

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

La production utilise le réseau Docker externe `web`. Aucun port hôte n'est publié. `palawi-gateway` retire le préfixe `/editing-portfolio` puis joint directement le service `portfolio:8080` ; Caddy continue de transmettre `palawi.fr` au gateway.

Les médias ne sont pas inclus dans le contexte de build ou dans l'image Docker. Le serveur les conserve sous `MEDIA_ROOT`. Le script compare les empreintes SHA-256 locales et distantes, envoie en une seule commande SCP les dossiers contenant des MP4 absents ou modifiés, puis vérifie les 22 vidéos complètes et les 22 previews avant le build.

`BASE_PATH` définit le sous-chemin SvelteKit et doit correspondre exactement au chemin de `APP_PUBLIC_URL`. Les routes et les assets sont ainsi générés sous `/editing-portfolio` sans interférer avec les autres pages de `palawi.fr`.

Configuration minimale dans `.env.prod` :

```env
APP_PUBLIC_URL=https://palawi.fr/editing-portfolio
BASE_PATH=/editing-portfolio
MEDIA_ROOT=/opt/dockpanel/media/editing-portfolio
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

Le script exige une branche locale propre et synchronisée avec `origin`, synchronise les médias, met à jour la branche distante, vérifie le réseau `web` et l'espace disque, reconstruit le conteneur, vérifie `/healthz` puis contrôle l'URL publique sauf si `-SkipPublicCheck` est utilisé. Le fichier d'environnement transite dans un répertoire temporaire distant privé avant d'être installé avec le mode `600`.

Le répertoire `MEDIA_ROOT` doit être créé une seule fois avec les droits de l'utilisateur SSH. Le routage `/editing-portfolio` est versionné dans le dépôt `palawi-gateway` et doit être déployé avec son script serveur. Le Public Hostname Cloudflare Tunnel existant pour `palawi.fr` reste inchangé.
