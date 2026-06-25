# Stratégie de contact pour les demandes de montage

## Décision

Pour la première version exploitable, utiliser :

- un formulaire principal intégré au site ;
- Formspree pour recevoir et conserver les demandes ;
- Cloudflare Turnstile pour limiter le spam sans CAPTCHA intrusif ;
- une restriction au domaine public du portfolio ;
- une adresse email visible uniquement comme solution de secours ;
- aucun upload direct de rushs dans le formulaire.

Cette solution garde le portfolio statique, fonctionne avec le déploiement Nginx existant et évite de maintenir un backend uniquement pour quelques demandes par mois.

## Pourquoi cette solution

### Avantages pour le visiteur

- Il reste sur le portfolio pendant toute la demande.
- Il n'a pas besoin d'ouvrir son application email.
- Le formulaire lui indique clairement les informations utiles.
- La protection anti-spam est généralement invisible.
- Il reçoit une confirmation claire après l'envoi.
- Il peut demander un format existant ou une commande personnalisée.

### Avantages pour le monteur

- Toutes les demandes suivent une structure comparable.
- Les informations nécessaires à une première estimation sont disponibles immédiatement.
- L'adresse email n'est pas exposée dans l'URL du formulaire.
- Les demandes restent consultables dans une boîte dédiée en plus des notifications email.
- Le spam est filtré avant d'arriver dans la boîte principale.
- Aucun serveur applicatif ni stockage de fichiers n'est à maintenir.

## Parcours recommandé

### 1. Depuis le portfolio

Les CTA doivent transporter le contexte vers `/contact` :

```txt
/contact?style=gaming-short-form
/contact?style=custom
/contact?project=gaming-short-highlight
```

La page contact préremplit le type de montage et peut afficher :

```txt
Tu demandes un montage de type Shorts gaming.
```

Le visiteur peut toujours modifier ce choix.

### 2. Formulaire principal

Le formulaire reste sur une seule page. Un formulaire en plusieurs étapes serait plus spectaculaire, mais ajouterait de la friction et compliquerait la reprise après une erreur.

Champs recommandés :

1. `Nom ou pseudo` — obligatoire.
2. `Email` — obligatoire.
3. `Type de montage` — obligatoire et prérempli si possible.
4. `Décris ton projet` — obligatoire.
5. `Durée et volume des rushs` — facultatif mais visible.
6. `Date souhaitée` — facultative.
7. `Budget prévu` — choix facultatif avec une option `Je ne sais pas encore`.
8. `Liens utiles` — références, rushs cloud, chaîne ou publication existante.

Le champ `Type de montage` contient :

- Vidéo gaming longue.
- Short gaming.
- Rant et explicatif.
- Promo business et UGC.
- Commande personnalisée.

Valeurs de budget proposées :

- Moins de 100 €.
- 100 à 250 €.
- 250 à 500 €.
- Plus de 500 €.
- Je ne sais pas encore.

Ces fourchettes doivent être ajustées aux prestations réellement acceptées. Le budget ne doit pas être un champ libre : les fourchettes sont plus rapides à remplir et plus simples à comparer.

### 3. Envoi

Pendant l'envoi :

- désactiver le bouton ;
- afficher `Envoi en cours…` ;
- empêcher un double envoi ;
- conserver les valeurs si une erreur survient ;
- placer le focus sur le message d'erreur ou de succès.

Après succès :

```txt
Demande envoyée.
Je vais examiner ton projet et te répondre par email.
```

Afficher ensuite :

- un récapitulatif court ;
- un bouton `Voir les projets` ;
- un bouton `Envoyer une autre demande`.

Ne pas promettre un délai de réponse précis tant qu'il n'est pas réellement tenu.

## Ce qu'il ne faut pas demander

### Pas d'upload de rushs

Les fichiers vidéo sont lourds, lents sur mobile et coûteux à stocker. Le formulaire doit demander un lien Drive, Dropbox, WeTransfer ou équivalent.

Le visiteur peut envoyer un lien sans donner immédiatement accès aux fichiers définitifs.

### Pas de numéro de téléphone obligatoire

Un téléphone obligatoire réduit la confiance et n'aide pas à qualifier le montage. Il pourra être échangé après le premier contact si nécessaire.

### Pas de compte utilisateur

Créer un compte pour envoyer une demande serait disproportionné pour un portfolio.

### Pas de long questionnaire obligatoire

Le formulaire doit permettre une demande en moins de trois minutes. Les informations détaillées seront précisées pendant l'échange.

## Protection et confidentialité

Configuration minimale :

- Turnstile activé dans Formspree ;
- domaine du portfolio autorisé dans Formspree ;
- honeypot invisible ;
- validation HTML et validation côté service ;
- limite de longueur sur les champs ;
- aucun secret dans le frontend ;
- lien vers une courte mention de confidentialité.

Texte de confidentialité proposé :

```txt
Les informations envoyées servent uniquement à répondre à ta demande de montage.
```

Conservation recommandée :

- supprimer régulièrement les demandes sans suite ;
- ne pas demander d'informations sensibles ;
- ne pas envoyer de rushs privés directement dans le formulaire.

## Architecture technique V1

```txt
Navigateur
   │
   ├─ validation accessible dans le formulaire Svelte
   ├─ jeton Cloudflare Turnstile
   │
   └─ POST vers Formspree
          │
          ├─ validation Turnstile
          ├─ filtrage anti-spam
          ├─ stockage de la soumission
          └─ notification vers l'email du monteur
```

Variables publiques prévues :

```env
PUBLIC_FORMSPREE_FORM_ID=
PUBLIC_TURNSTILE_SITE_KEY=
PUBLIC_CONTACT_EMAIL=
```

Le secret Turnstile reste configuré dans Formspree et ne doit pas être placé dans le dépôt.

## Accessibilité

- Labels visibles, pas uniquement des placeholders.
- Instructions reliées aux champs avec `aria-describedby`.
- Erreurs associées au champ concerné.
- Résultat d'envoi annoncé avec une zone `aria-live`.
- Navigation clavier complète.
- Aucun changement automatique de page après l'envoi.
- Turnstile en mode non interactif ou géré selon les besoins.
- Le formulaire reste utilisable en soumission HTML standard si l'amélioration JavaScript échoue.

## Alternatives évaluées

### Lien `mailto:`

À garder uniquement en secours.

Problèmes :

- dépend d'une application email correctement configurée ;
- perd facilement le contexte du projet ;
- difficile à analyser et à filtrer ;
- expose plus directement l'adresse.

### Discord, Instagram ou WhatsApp

Utile comme canal secondaire pour certaines audiences, mais mauvais canal principal :

- demandes non structurées ;
- notifications faciles à perdre ;
- séparation vie privée et professionnelle moins nette ;
- historique et recherche moins fiables qu'une boîte dédiée.

### API auto-hébergée avec Resend

Bonne évolution future, pas le meilleur point de départ.

Elle permettrait :

- validation personnalisée ;
- email de confirmation contrôlé ;
- journalisation et règles métier ;
- intégration CRM ;
- indépendance vis-à-vis de Formspree.

Elle imposerait aussi :

- gestion d'une clé d'envoi ;
- vérification d'un domaine email ;
- endpoint à sécuriser ;
- rate limiting ;
- validation Turnstile côté serveur ;
- logs, supervision et mises à jour ;
- politique de conservation des demandes.

## Condition de migration vers une API dédiée

Migrer vers un petit service contact uniquement si au moins un de ces besoins apparaît :

- le coût Formspree devient supérieur au coût de maintenance ;
- plusieurs destinataires ou règles de routage complexes ;
- synchronisation avec un CRM ou un tableau de suivi ;
- besoin d'un historique propriétaire ;
- emails automatiques avancés ;
- volume de demandes suffisamment important pour justifier un service.

Architecture cible :

```txt
Portfolio Svelte statique
   │
   └─ POST /api/contact
          ├─ validation stricte
          ├─ validation Turnstile côté serveur
          ├─ rate limiting
          ├─ envoi avec Resend
          └─ journalisation minimale sans rushs
```

Le service pourrait ensuite être ajouté comme second conteneur dans Docker Compose.

## Plan d'implémentation

### Sous-étape 1 — Contenu et parcours

- Ajouter les champs et textes dans `src/lib/content`.
- Faire transmettre `style` et `project` depuis les CTA.
- Préremplir le formulaire depuis l'URL.

### Sous-étape 2 — Formulaire accessible

- Créer un composant `ContactForm.svelte`.
- Ajouter validation, erreurs, chargement et succès.
- Conserver une soumission HTML standard comme solution de secours.

### Sous-étape 3 — Formspree et Turnstile

- Créer le formulaire Formspree.
- Restreindre le domaine.
- Configurer Turnstile.
- Ajouter les variables publiques au déploiement.

### Sous-étape 4 — Qualité

- Tester clavier et lecteur d'écran.
- Tester une erreur réseau.
- Tester un double clic.
- Tester mobile.
- Vérifier la réception email et le dossier spam.
- Vérifier qu'aucun secret n'est présent dans le build.

## Sources officielles

- Formspree, formulaires AJAX : https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax
- Formspree, protection Turnstile : https://help.formspree.io/articles/form-and-project-settings/protecting-your-forms-with-cloudflare-turnstile/
- Formspree, restriction au domaine : https://help.formspree.io/articles/form-and-project-settings/restrict-to-domain
- Formspree, filtrage anti-spam : https://help.formspree.io/articles/troubleshooting/how-to-prevent-spam/
- Cloudflare, validation Turnstile : https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- Resend, envoi d'email : https://resend.com/docs/api-reference/emails/send-email
- Resend, domaines d'envoi : https://resend.com/docs/dashboard/domains/introduction
