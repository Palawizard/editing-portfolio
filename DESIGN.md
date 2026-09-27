---
name: Palawi
description: Palawi OS. palawi.fr is a phone home screen; every craft is an app that opens from its widget in its own colour bank.
colors:
  os-night: "#120c2a"
  dusk-violet: "#1c1245"
  dusk-plum: "#2b1238"
  dusk-wine: "#3b1224"
  os-white: "#fbfaff"
  lavender-light: "#f7f4ff"
  lavender-bank: "#efeaff"
  lavender-deep: "#d9ceff"
  lavender-ink: "#16112b"
  lavender-ink-soft: "#4b4166"
  binder-violet: "#6a3dff"
  peach-case: "#fff1e6"
  peach-bank: "#ffc9a6"
  peach-deep: "#ffb48c"
  peach-ink: "#2a1409"
  peach-mute: "#7a4632"
  live-orange: "#ff5a1f"
  studio-screen: "#1c0f0a"
  preview-green: "#22b573"
  icy-light: "#eef8fd"
  icy-bank: "#bfe0f4"
  icy-periwinkle: "#8fa9ff"
  icy-ink: "#0e1d33"
  icy-ink-soft: "#34506b"
  pink-light: "#ffe3f8"
  pink-bank: "#ffb8ee"
  pink-hot: "#ff86c4"
  pink-ink: "#3a0c31"
  pink-ink-soft: "#6b2a5c"
  card-web: "#3f6bff"
  card-web-light: "#9bb8ff"
  card-desktop: "#6a3dff"
  card-desktop-light: "#c2acff"
  card-terminal: "#0f9b73"
  card-terminal-light: "#7fe6c3"
  card-game: "#ff6a1f"
  card-game-light: "#ffc07a"
  white: "#ffffff"
  glass: "rgb(255 255 255 / 0.6)"
typography:
  display:
    fontFamily: "Unbounded, ui-rounded, system-ui, sans-serif"
    fontSize: "clamp(4rem, 17vw, 8.5rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Unbounded, ui-rounded, system-ui, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Unbounded, ui-rounded, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.5
  ui:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.01em"
  label:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  art: "10px"
  inner: "14px"
  frame: "16px"
  scene: "20px"
  card: "22px"
  row: "22px"
  widget: "28px"
  dock: "34px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  row-gap: "0.6rem"
  widget-gap: "14px"
  panel: "14px"
  stack: "1rem"
  section: "clamp(3rem, 7vw, 5.5rem)"
components:
  home-pill:
    backgroundColor: "{colors.glass}"
    rounded: "{rounded.pill}"
    padding: "0 1rem 0 0.7rem"
    height: "2.75rem"
    typography: "{typography.ui}"
  button-ink:
    backgroundColor: "{colors.lavender-ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0 1.25rem"
    height: "2.9rem"
    typography: "{typography.ui}"
  button-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.lavender-ink}"
    rounded: "{rounded.pill}"
    padding: "0 1.25rem"
    height: "2.9rem"
    typography: "{typography.ui}"
  lang-switch-active:
    backgroundColor: "{colors.lavender-ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    height: "2.1rem"
  platform-row:
    backgroundColor: "{colors.glass}"
    rounded: "{rounded.row}"
    padding: "0.55rem 1rem 0.55rem 0.55rem"
    height: "4.25rem"
  widget-dev:
    backgroundColor: "{colors.lavender-bank}"
    textColor: "{colors.lavender-ink}"
    rounded: "{rounded.widget}"
    padding: "18px"
  widget-editing:
    backgroundColor: "{colors.peach-bank}"
    textColor: "{colors.peach-ink}"
    rounded: "{rounded.widget}"
    padding: "18px"
  widget-music:
    backgroundColor: "{colors.icy-bank}"
    textColor: "{colors.icy-ink}"
    rounded: "{rounded.widget}"
    padding: "12px"
  widget-stream:
    backgroundColor: "{colors.pink-bank}"
    textColor: "{colors.pink-ink}"
    rounded: "{rounded.widget}"
    padding: "12px"
  holo-card:
    backgroundColor: "{colors.card-desktop}"
    rounded: "{rounded.card}"
    padding: "8px"
  holo-card-inner:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.inner}"
    padding: "0.75rem"
  filter-chip:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.lavender-ink}"
    rounded: "{rounded.pill}"
    padding: "0 0.6rem 0 1rem"
    height: "2.6rem"
  filter-chip-active:
    backgroundColor: "{colors.card-web}"
    textColor: "{colors.white}"
  scene-button:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.peach-ink}"
    rounded: "{rounded.scene}"
    padding: "0.45rem 0.45rem 0.65rem"
  scene-button-live:
    backgroundColor: "{colors.peach-ink}"
    textColor: "{colors.white}"
  price-alert:
    backgroundColor: "{colors.white}"
    textColor: "{colors.peach-ink}"
    rounded: "{rounded.pill}"
    padding: "0.375rem 0.875rem"
  live-badge:
    backgroundColor: "{colors.live-orange}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.625rem"
    typography: "{typography.label}"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.lavender-ink}"
    rounded: "{rounded.inner}"
    padding: "0.7rem 0.95rem"
    height: "3rem"
---

# Design System: Palawi

## Overview

**Creative North Star: "Palawi OS"**

palawi.fr is a phone home screen. The hub is the lock-screen and widget grid on a dusk wallpaper: Palawi's name sits where the clock would, the four crafts are widgets, the hosted projects sit in a glass dock. Tapping a widget grows a sheet of that widget's colour to fill the screen, and the app underneath opens already wearing the same colour. Every page after that is an app: a live status bar (clock, palawi.fr, language switch), a rounded Home pill back to the hub, and a light colour bank that belongs to that craft alone.

Three grammars share the one shell. The link apps (music, stream) are glass rows with brand-coloured platform icons under a now-playing or latest-video panel. The dev portfolio is a holographic trading-card binder on lavender: each project is a card with a type-coloured frame and a foil that follows the pointer, and the portfolio's own lock is the back of Palawi's card, which flips to the front once opened. The editing portfolio is a stream scene on peach, built like OBS: a studio window with an on-air screen, a chat bubble that explains the scene, a scene bar to switch formats (a stinger wipes the screen between them) and, on /projets, an on-air monitor over a wall of source tiles with preview and on-air tallies.

The material is colour, glass and soft depth, carried by real imagery (project captures, edit frames, the "fall" cover, the chibi, stream thumbnails). Rejected and binding: the flat black-and-white printed "Pressage" direction with square corners, and the neon "gamer" look of black grounds with luminous halos.

**Key Characteristics:**
- One shell everywhere: status bar with a live clock, palawi.fr, pill language switch; rounded Home pill on apps.
- One colour bank per app, equal to its hub widget colour, laid as a three-stop radial wash.
- Glass (white 55 to 62% with backdrop blur) is the window material for rows, panels, pills, chips and scene buttons.
- Soft downward shadows tinted with the bank's own ink, two levels only (rest, lift); no glow.
- Generous radii: 28px widgets, 22px rows and cards, 999px pills.
- Unbounded for names and titles, Figtree for everything else.
- Motion that is quick and never bounces: ease-out for response, drawer curve for app opening, in-out for things that move across the screen.

## Colors

Each world is a light pastel bank with its own dark ink, set against one dark dusk wallpaper on the hub; saturated colour is spent on imagery, type-coloured card frames and one hot live accent.

### Primary
- **Dusk Wallpaper** (os-night, dusk-violet, dusk-plum, dusk-wine): the hub only. A 165deg linear gradient violet to plum to wine, with a faint violet tint at the top-left corner and a faint coral tint at the bottom-right, under a fractal-noise film grain at 16% overlay. os-white is the hub's text.
- **Lavender Bank** (lavender-light, lavender-bank, lavender-deep): the dev portfolio ground and its hub widget. lavender-ink is the text and the ink button; lavender-ink-soft is secondary text. binder-violet is the dev world's accent: focus ring, section counts, the unlock hint, date pills.
- **Peach Bank** (peach-case, peach-bank, peach-deep): the editing portfolio ground and its hub widget. peach-ink is text and the primary button; peach-mute is secondary text. studio-screen is the dark ground behind every video.
- **Icy Bank** (icy-light, icy-bank, icy-periwinkle): the music app, lifted from the "fall" cover. icy-ink and icy-ink-soft are its inks.
- **Pink Bank** (pink-light, pink-bank, pink-hot): the stream app, lifted from the chibi. pink-ink and pink-ink-soft are its inks.

### Secondary
- **Live Orange** (live-orange): the editing world's one hot accent. It marks what is on air: the EN DIRECT badge, the dot and 3px ring of the live scene and live source, the current-page dot in the nav, the dot in a price alert, the playing indicator, the streamer's name in chat, and the caret in fields.
- **Preview Green** (preview-green): the preview tally on a source tile (the take that is cued but not yet live). Nowhere else.

### Tertiary
- **Card Type Colours** (card-web and card-web-light, card-desktop and card-desktop-light, card-terminal and card-terminal-light, card-game and card-game-light): the dev binder's taxonomy. Each pair is the 150deg gradient frame of a trading card of that type, the type pill on its art, its year, the tint of its stack tags, and the fill of its filter chip when pressed.

### Neutral
- **White** (white): buttons at rest on the light banks, card interiors (at 93%), chat bubbles, price alerts, inputs.
- **Glass** (glass): the window material. The token is tuned per bank between 55% (link apps) and 62% (editing); hover and focus raise it to about 78 to 90%.

### Named Rules
**The Matching Bank Rule.** An app's ground is the colour of its hub widget (the widget's `--app-bg`). The zoom-open sheet is that colour, so the transition lands on a page that is already the same colour. A new app gets a new bank and a new widget in the same step.

**The Bank Ink Rule.** Every bank has its own dark ink and soft ink of the same hue; text, the primary button, the active language cell and the selection colour all use it. Pure black is not an ink.

**The One Hot Thing Rule.** A world has at most one hot accent and it belongs to whatever is live or active right now. In editing that is live orange; in dev the type colours only light up on the pressed chip and the cards themselves.

## Typography

**Display Font:** Unbounded (with ui-rounded, system-ui)
**Body Font:** Figtree (with ui-sans-serif, system-ui)

**Character:** Unbounded is wide, round and heavy, the voice of an app icon label blown up; Figtree is a friendly grotesque that stays out of the way in rows, pills and prose. Both load from Google Fonts with Figtree 400 to 800 and Unbounded 500 to 900.

### Hierarchy
- **Display** (Unbounded 800, clamp(4rem, 17vw, 8.5rem), 0.92): the hub name only. App landings step down (dev landing clamp(2.75rem, 9vw, 6.5rem), editing hero clamp(2.5rem, 7vw, 5rem) at -0.045em, 0.95 to 0.98).
- **Headline** (Unbounded 800, clamp(2rem, 5vw, 3.25rem), 1): section titles, hero-panel titles (clamp(2rem, 8vw, 3rem) on link apps), profile names.
- **Title** (Unbounded 700, 1.0625 to 1.25rem, 1.1): widget names, trading-card names, large scene names, the app bar title.
- **Body** (Figtree 500, 1 to 1.125rem, 1.4 to 1.5): leads and descriptions, capped at 34 to 56ch.
- **UI** (Figtree 800, 0.875rem, 1): buttons, pills, chips, row titles (1.125rem), scene names.
- **Label** (Figtree 800, 0.75 to 0.8125rem, 0.06 to 0.08em, uppercase): names a list or group (platform list, Experience/Education columns, the chat and method blocks), plus the pill-shaped badges (EN DIRECT, card type, tallies at 0.6875rem).

### Named Rules
**The Two Voices Rule.** Unbounded is for names and titles (people, apps, projects, scenes, sections); everything a user reads or taps is Figtree. Unbounded never sets a sentence.

**The Numbers Hold Still Rule.** Clocks, years, counts and prices use tabular numerals.

## Layout

A centred column with a fluid gutter (spacing.gutter): 66rem on the hub, 64rem on link apps, 76rem on the dev portfolio, 80rem (max-w-7xl) in editing. Every page opens with the status bar grid (clock left, palawi.fr centred at 70 to 75% opacity, language switch right).

The hub widget grid has one module in two sizes, 2x2 (dev, editing) and 2x1 (music, stream): two columns on phones, four from 40rem, and at 64rem a 1fr 1fr 1.45fr grid of two rows where the big widgets stay square. The dock is a four-column grid on phones and a wrapped centred row from 40rem. Link apps stack profile, hero panel and rows on phones and split into two equal columns from 56rem with the left side sticky. The compact profile (3.75rem picture beside the name) never eats the first screen. The dev binder deals cards into an auto-fill grid of min 16.5rem columns. The editing studio stacks screen, scenes, chat on phones and becomes screen plus a 20rem chat column with the scene bar below from 64rem.

Rhythm: 14px between widgets, 0.6rem between rows, 1rem inside stacks, 14px panel padding (10 to 14px in studio windows), sections clamp(3rem, 7vw, 5.5rem) apart.

## Elevation & Depth

Depth is layered: a coloured ground, glass windows that blur it, and soft shadows that fall downward. Each world defines exactly two shadow levels, tinted with its own ink (dusk night on the hub, lavender ink, peach ink, a neutral navy on link apps): a tight 1 to 3px contact shadow plus a long negatively spread drop. Hover and focus move a surface from rest to lift. State rings (2 to 3px solid, zero blur) stack on top of the shadow to mark live, preview or avatar edges.

### Shadow Vocabulary
- **Rest** (`box-shadow: 0 1px 3px rgb(22 17 43 / 0.12), 0 18px 36px -20px rgb(22 17 43 / 0.5)`): every glass row, pill, chip, card and panel at rest (shown with lavender ink; each bank swaps in its own ink).
- **Lift** (`box-shadow: 0 2px 6px rgb(22 17 43 / 0.14), 0 30px 50px -22px rgb(22 17 43 / 0.6)`): hover and focus of rows, cards, buttons; the live scene and live source.
- **Hub rest / lift** (`0 2px 6px rgb(6 3 20 / 0.22), 0 22px 44px -18px rgb(6 3 20 / 0.7)` / `0 4px 10px rgb(6 3 20 / 0.25), 0 34px 60px -20px rgb(6 3 20 / 0.8)`): widgets and dock icons on the dark wallpaper.
- **Ink drop** (`box-shadow: 0 12px 24px -12px rgb(22 17 43 / 0.8)`): the dark primary button, so it sits heavier than white ones.
- **Media drop** (`box-shadow: 0 10px 22px -12px <bank ink at 0.6 to 0.7>`): covers, thumbnails and frames inside widgets and hero panels.
- **Live ring** (`box-shadow: 0 0 0 3px #ff5a1f, <lift>`): the live scene button and the on-air source tile.

### Named Rules
**The Falling Light Rule.** Shadows are offset downward and tinted with the bank's ink. A shadow with zero offset and a wide blur is a glow, and the system has none.

**The Glass Window Rule.** Anything that behaves like an OS window or control (row, pill, panel, dock, nav, chip) is glass over the bank with backdrop blur 14 to 22px. Imagery and cards are opaque.

## Shapes

Everything is rounded, and nested radii step down so corners stay concentric: widget 28px holding a 16px frame, card 22px holding a 14px interior holding 10px art, scene button 20px holding a 14px thumb. Pills (999px) for every button, chip, switch, badge and alert. App icons are rounded squares (9px at 30px size in widgets, 12 to 15px in rows, 19 to 26px in the dock); avatars are circles. The dock is the roundest surface (34px). The chat bubble is a 18px rounded rectangle with a 4px top-left corner and a clipped tail pointing at the avatar. There are no borders drawn for structure; edges come from fill contrast and shadow. The one border is the 2px transparent field border that becomes the accent on focus, and the 10px white border that frames the back of a card.

## Components

### Buttons
Tactile pills that press in.
- **Shape:** fully rounded (999px), 2.9rem tall (2.25rem small, 3.5rem big).
- **Primary:** the bank ink with white text and the ink drop, 0 1.25rem, Figtree 800 0.875rem.
- **Secondary:** white with the bank ink and the rest shadow.
- **Hover / Focus:** on fine pointers, a 1px rise and the lift shadow. Focus is a 3px outline in the bank ink (violet in dev) at 3px offset. Active scales to 0.97.
- **Disabled:** white at 50%, soft ink, no shadow.

### Home Pill and Language Switch
- **Home pill:** glass pill 2.75rem tall with a chevron and "Home"; glass-strong on hover; scale 0.97 on press. It is the way back to the hub on every link app and the dev portfolio.
- **Language switch:** a glass pill track (3px padding) holding two 2.6rem pill cells; the pressed cell is filled with the bank ink (white on the hub).

### Chips
- **Filter chip (dev):** glass pill 2.6rem, Figtree 800 0.875rem, with a count bubble. Pressed, it fills with its card type colour and turns white. Scale 0.97 on press.
- **Tags:** small pills; on cards, the type's light colour mixed 35% into white; in editing, peach at 60% with a check icon.

### Cards / Containers
- **Panel:** glass, 22 to 28px radius, rest shadow, blur 16 to 20px. The editing studio window and the link-app hero panel are panels.
- **Hub widget:** a 28px tile on the wallpaper with the hub shadow. Dev and editing widgets are 2x2 with an app-icon head, a 16px media frame cycling three real captures (cut with a 6px blur), and a sub line. Music is 2x1 now-playing (cover, Unbounded track title, equaliser bars); stream is 2x1 (thumbnail, chibi head, "latest video" pill). Hover lifts 4px; press scales 0.97.
- **Dock:** 34px glass tray (white 13%, blur 22px, 1px inset top highlight) of rounded app icons with labels; icons rise 6px on hover and scale 0.95 on press.

### Inputs / Fields
- **Style:** white, 14px radius (16px, rounded-2xl, in editing), 3rem tall, 2px transparent border, a 1px inset shadow, Figtree 500 1rem.
- **Focus:** the border becomes the world accent (binder violet in dev, peach ink in editing); no outline. Editing fields show peach on hover and a live-orange caret.
- **Error:** the border turns the error red; the message is Figtree 700 0.875rem.

### Navigation
- **Status bar:** three-column grid, Figtree 700 0.875rem, live clock updated every 15s in tabular numerals.
- **App nav (editing, dev):** a glass pill track; the current item is a filled ink pill, and in editing it carries a live-orange dot like the live scene in a scene list. Mobile collapses to a 2.75rem round glass menu button and a stacked list of glass pills.

### Stuck Brand Pill
At the top of the page the sticky header is unchanged. Once it is stuck, the brand name gains a glass pill behind it so it stays legible over content of the same colour. An IntersectionObserver sets `.is-stuck` on the brand: in dev (`SiteHeader.vue`) when a 1px `.bar__sentinel` above the bar leaves the viewport, in editing (`Header.svelte`) when the status bar above the header has fully left it. The pill is the brand's `::before` (999px, the rest shadow, blur 16px; glass in dev, white 65% like the editing nav) on a negative inset, `-0.35rem -0.85rem`, so the text never moves; in dev the side inset is `max(-0.85rem, calc(6px - var(--gutter)))` to stay 6px or more from the screen edge, and the brand keeps a 0.5rem end margin for the overhang, with the ellipsis on the inner `.bar__name`. It fades in over 200ms and scales from 0.94 over 250ms (ease-out in dev, ease-out-expo in editing). Reduced motion keeps the fade and drops the scale in dev; in editing the global reduced-motion rule makes it instant.

**The Stuck Brand Pill Rule.** The brand pill exists only in the stuck state; the header at the top of the page never wears it.

### Platform Row
Glass row (22px, 4.25rem tall) with a rounded app icon filled with the platform's own brand colour (from Simple Icons), title in Figtree 800 1.125rem, meta in soft ink (hidden under 30rem), and a chevron at 55%. Hover: glass-strong, lift, 2px rise. Compact variant: 18px radius, 3.4rem tall. Rows rise in with a 40ms stagger.

### Holographic Trading Card
The dev binder's unit. A 22px frame filled with a 150deg gradient of its type pair, 8px padding (10px on rare cards), a white 14px interior: Unbounded name and a type-coloured year, 16:10 art with a 2px light-colour ring and a type pill, description, stack tags, small pill links. A foil layer (pointer-tracked light spot over rainbow bands, color-dodge) sits at 8% and rises to 40% while the pointer moves; rare cards keep it at 22%. On fine pointers the card tilts toward the pointer (up to 5deg by 6deg) and a corner peels on hover. The access lock is the back of Palawi's own card (lavender striped foil, a giant faded "P", the code form), which flips to the profile front in 500ms.

### Studio Window (editing)
A glass panel holding the scene header (EN DIRECT badge in live orange plus the scene name), a 22px screen on the studio-screen ground where the edit plays at its native aspect over a blurred, saturated copy of its own poster, and a chat column (white 75%, 22px) with a speech-bubble message from Palawi. Switching scene runs the stinger over the screen only. The hero's headline lines print in with the rise.

### Scene Button
White 70% tile, 20px, with a 16:10 thumb and a name. Three layouts share it: **bar** (2, 3, then 6 or 7 columns), **large** (26px tile, Unbounded 1.25rem name, promise text, price alert pinned on the thumb), and **dock** (on desktop, a single OBS-style column with the thumb beside the name). The live scene inverts to the peach ink, gains a live-orange dot and the live ring.

### Stinger (editing)
The one cut transition in editing (`Stinger.svelte`), sized to the player it sits in and never to the page: the home studio screen on scene switch, the /projets program monitor on a cut. Peach and peach-deep 115deg bands (28px) with a white Unbounded 900 "P". The clip-path wipes closed in 260ms from wherever it currently is (an interrupted exit closes back without flashing), the swap runs at full cover, then it wipes out in 300ms, both cubic-bezier(0.77, 0, 0.175, 1). A click during the wipe replaces the pending swap (latest wins). Reduced motion swaps instantly. aria-hidden.

### Price Alert
A white pill with a small live-orange dot and a tabular price in Figtree 800, dropping in like a donation notification (450ms pop from -8px and 0.92 scale).

### On-Air Monitor and Source Tile (editing /projets)
The monitor is the studio screen with the EN DIRECT badge top-left. Every change of what is on air is a stinger cut on the monitor, whether from a source click on the wall or a format choice in the scene dock (the page calls the control room's `cut()`); each cut resets the pick to the format's first source and clears the hover preview. There is no other cut transition. Beneath it, source tiles (18px, white 70%) carry a dark glass tally pill with a lamp: preview green with a 3px green ring when cued, live orange with the live ring and inverted ink when on air.

### App Entrance
Shared by the link apps, the dev portfolio and the editing portfolio, gated by prefers-reduced-motion: no-preference. The page shell carries `.app-open`: from opacity 0 and scale 0.97, 400ms, cubic-bezier(0.32, 0.72, 0, 1). Its blocks carry `.rise` (editing headline lines `.print-in`): from opacity 0 and translateY(14px), 400ms, cubic-bezier(0.23, 1, 0.32, 1), delay calc(100ms + var(--i) * 40ms), fill backwards. The dev deck caps the stagger at 12; after the first filter click `.deck.is-dealt > li` drops the entrance so only the `deal` transition runs (delay min(i, 12) * 30ms).

**The One Riser Rule.** A container that rises never has rising children; `.rise` is not nested.

### Announcements
/projets announces changes through visually hidden `role="status"` lines (the format label on the page, "À l'antenne : {title}" in the control room), not aria-live over large regions.

## Do's and Don'ts

### Do:
- **Do** give every page the shell: status bar with live clock, palawi.fr and the pill language switch; on apps, the rounded Home pill.
- **Do** set an app's bank to its hub widget's colour and lay it as a three-stop radial wash (light at top-left, deep at bottom-right).
- **Do** use glass with backdrop blur for OS-like controls and windows, and the two tinted shadow levels (rest, lift) for depth.
- **Do** keep radii concentric: 28px widget, 22px row and card, 14 to 16px inner frames, 999px pills.
- **Do** ease out with cubic-bezier(0.23, 1, 0.32, 1) for responses, open apps with cubic-bezier(0.32, 0.72, 0, 1) in 400ms, and move things across the screen with cubic-bezier(0.77, 0, 0.175, 1) (flip 500ms, stinger 260ms in and 300ms out, over the player only).
- **Do** gate hover effects to (hover: hover) and (pointer: fine), press to scale 0.95 to 0.97, stagger lists 30 to 60ms, blur the hub widget frame cuts (6px), and honour prefers-reduced-motion (no zoom-open, no tilt, the flip becomes a fade).
- **Do** fill platform icons with the platform's brand colour and card frames with their type colour.

### Don't:
- **Don't** return to flat printed black and white, square corners or text-only pages; the Pressage direction was rejected.
- **Don't** use neon or glow: no black grounds with luminous halos, no zero-offset blurred shadows.
- **Don't** use overshoot, bounce or spring easing.
- **Don't** use pure black as an ink or ground; the darkest values are the bank inks, the dusk wallpaper and the studio screen.
- **Don't** spend the hot accent on decoration; live orange is only for what is on air or current.
- **Don't** set sentences in Unbounded.
- **Don't** add new small uppercase labels above headings; the label names a list or group and stands alone.

Open items: 10 dev project covers are icon-on-gradient placeholders until real captures exist; a few small labels above headings (music "New release", stream "Dernière vidéo", the hub music widget's "Musique") were kept by owner choice and are not a pattern to extend.
