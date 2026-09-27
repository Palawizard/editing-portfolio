---
version: 1
slug: "editing-portfolio-src-routes-page-svelte"
primary_target: "editing-portfolio/src/routes/+page.svelte"
related_targets: ["editing-portfolio/src/routes/projets/+page.svelte"]
---

## Scope

Editing portfolio `/editing-portfolio/` (SvelteKit, all routes: home, /projets, /demarrer, /estimation, /contact, errors). Opens from the peach Palawi OS widget (#ffc9a6), so peach is the app ground. Experience mode for home and /projets, Operate for the estimator and contact. Home built first with a checkpoint.

## Direction contract

THESIS: The editing portfolio is a live stream scene. Each format is a scene, the edits are the sources on screen, and switching format fires a stinger transition like going live. Refuses the showreel hero + grid of cards.

OWN-WORLD: A rounded studio window (glass white on peach) holding: the main screen (dark, rounded) that plays the edit in its native aspect on a blurred fill of its own poster, never cropped; a price alert that pops in a corner; a chat column that talks through the format, its highlights and the method; a scene bar of formats at the bottom. Peach bank (#fff1e6 / #ffc9a6 / #ffb48c), ink #2a1409, one hot accent #ff5a1f reserved for the scene that is live. Unbounded display, Figtree UI, Palawi OS shell shared with the other apps.

STORY: The visitor arrives on a studio already live with a showreel, switches scenes to see each format with its real edits and starting price, and leaves by the chat's call to action (estimate or contact).

FIRST VIEWPORT: Status bar + Home pill + app nav. Title lines in Unbounded above the studio window. Studio: main screen left with the edit playing and the price alert top right, chat column right, scene bar across the bottom with the live scene marked hot.

FORM: Stream scene (OBS), assigned by the roll, seed f14ac4a5 reroll 1. Raises: no edit is ever cropped, native aspect always (loteria); one accent reserved for the live scene (orienteering); every scene carries its literal name (streetwear); hovering a scene shows what it holds before the click (zine).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Constraints

Keep FR/EN, estimator, pricing, contact prefill, Formspree, Turnstile, lazy autoplay previews (videos only exist on the server; posters locally). Motion per Emil: stinger under 700ms, custom ease-out, hover gated to fine pointers, press scale 0.97, reduced motion = crossfade only.
