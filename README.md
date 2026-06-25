# Portfolio de montage vidéo

Portfolio statique construit avec SvelteKit, TypeScript et Tailwind CSS.

La stratégie recommandée pour les demandes de montage est documentée dans [`docs/CONTACT_STRATEGY.md`](docs/CONTACT_STRATEGY.md).

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

Le lien publié est intégré sur la fiche projet et reste accessible avec un bouton externe.

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

## Docker Compose

La conteneurisation génère le site statique avec Node, puis le sert avec Nginx sur le port `8080`.

### Lancement local

```sh
docker compose --env-file .env.example -f docker/docker-compose.yml up -d --build
```

Le site est disponible sur `http://127.0.0.1:8080`.

Vérification :

```sh
docker compose --env-file .env.example -f docker/docker-compose.yml ps
curl http://127.0.0.1:8080/healthz
```

Arrêt :

```sh
docker compose --env-file .env.example -f docker/docker-compose.yml down
```

### Production derrière un reverse proxy

La production reprend le modèle du projet EasyForumGo :

- stack clonée dans `/opt/dockpanel/stacks/editing-portfolio` ;
- réseau Docker externe `web` ;
- TLS géré par le reverse proxy ;
- conteneur accessible sur le port interne `8080` ;
- healthcheck Docker et contrôle HTTP après déploiement.

Créer le réseau une fois sur le serveur :

```sh
docker network create web
```

Créer le fichier local `.env.prod` depuis `.env.prod.example` :

```env
HOST_BIND=127.0.0.1
HOST_PORT=8080
APP_PUBLIC_URL=https://portfolio.example.com
```

Valider la configuration :

```sh
docker compose --env-file .env.prod \
  -f docker/docker-compose.yml \
  -f docker/docker-compose.prod.yml \
  config
```

Le reverse proxy doit router le domaine public vers le service `portfolio` sur le réseau `web`, port `8080`.

### Déploiement SSH

Depuis PowerShell :

```powershell
./scripts/deploy.ps1 `
  -SshHost "server.example.com" `
  -SshUser "deploy"
```

Options utiles :

```powershell
-SshPort 22
-RemoteStack "/opt/dockpanel/stacks/editing-portfolio"
-Branch "dev"
-EnvFile ".env.prod"
-SkipPublicCheck
```

Le script :

1. vérifie SSH, Git, Docker Compose et le réseau `web` ;
2. clone ou met à jour la branche demandée ;
3. installe `.env.prod` avec des permissions restrictives ;
4. reconstruit et redémarre le conteneur ;
5. vérifie `/healthz` dans le conteneur ;
6. vérifie ensuite l'URL publique.
