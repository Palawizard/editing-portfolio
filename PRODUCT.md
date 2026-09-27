# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Visitors landing on palawi.fr from a bio link, a CV, a video description or word of mouth, mostly on phones, wanting to reach one of Palawi's activities fast.
- Recruiters / school contacts evaluating Palawi as a student developer (dev portfolio).
- Creators and small businesses evaluating Palawi as a paid video editor (editing portfolio: examples, price estimate, contact).
- Listeners and viewers who want the right streaming platform or social link in one tap (music links, stream links).

## Product Purpose

palawi.fr is the personal domain of Palawi (Baptiste de Ménorval, student developer at Ynov Toulouse, video editor, singer/producer, streamer). Five front doors:

1. `/` home hub: routes to the portfolios, link pages and hosted projects.
2. `/portfolio/` dev portfolio (Vue): projects, education, experience, skills, contact; private details behind an access code / public mode.
3. `/editing-portfolio/` video editing portfolio (SvelteKit): formats, examples by category with prices, adaptive estimator, contact brief (Formspree + Turnstile).
4. `/musiclinks/` music links: platforms + featured release.
5. `/streamlinks/` stream / social links: platforms + featured video.

Success: each visitor reaches their destination in one or two taps, and the pages read as one person's coherent, hand-made identity rather than generic templates.

## Positioning

One person, four crafts, one domain. The "pro" side (hub, dev portfolio) and the "perso/créa" side (music, stream, editing) are two assumed universes, tied by shared typography and grid.

## Capabilities and Constraints

- Static front ends: Vue 3 + Vite + Tailwind v4 apps under `palawifr-static-pages/apps/*` served by one Express server; editing portfolio is SvelteKit 2 / Svelte 5 / Tailwind v4, static adapter, Nginx.
- Bilingual FR/EN on hub, dev portfolio and editing portfolio must stay.
- Dev portfolio access lock (code, unlock link, public mode masking real name, CV, LinkedIn, education) must stay.
- Editing portfolio logic (estimator, pricing, contact prefill, Formspree, Turnstile, lazy video previews) must stay intact.
- Videos for the editing portfolio are not in the repo locally; posters (WebP) are the fallback.

## Brand Commitments

- Name: Palawi (GitHub: Palawizard). Real name only shown in unlocked dev portfolio.
- Photo: night fisheye portrait on a metal walkway (red and white rails) used as pfp for hub, dev, music.
- Stream persona: chibi avatar on pink.
- Voice: casual, self-deprecating on stream page, straightforward elsewhere. Light copy edits allowed, facts and links unchanged.
- User dislikes: neon/glow "gamer" aesthetic (black + luminous halos).
- 2026-09-27: the "Pressage" direction (flat printed B&W inserts, square corners, text-led) was rejected as too plain. Binding for future directions: colour and gradients, rounded shapes, depth and motion, imagery carrying the page. Music and stream link pages were the parts that worked best.
- Dev portfolio projects: a few featured projects, then a compact filterable grid (the list will keep growing).
- Link pages on mobile: profile picture + name must not eat the first screen.
- Palawi is 19 (music bio).

## Evidence on Hand

- Project GIFs/covers in `palawifr-static-pages/apps/yboost-portfollio/src/assets/` and `page-daccueil/src/assets/`.
- Editing posters in `editing-portfolio/static/images/posters/**`.
- Featured single cover "fall (mylancore - hoodtrap remix)" and featured YouTube thumbnail.
- No testimonials, client logos, or stats exist; do not invent them.

## Product Principles

1. The destination first: every page answers "where do I click" within the first viewport.
2. Two universes, one hand: pro pages stay precise, créa pages get to be expressive, both share type and grid.
3. Real material over decoration: photos, covers, GIFs and posters carry the identity, not effects.
4. Nothing invented: no fake stats, clients or claims.
