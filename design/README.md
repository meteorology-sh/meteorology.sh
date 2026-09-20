# Petrichor — brand assets

Company branding only. **Weatherman is a separate product with its own identity** —
nothing in here applies to it.

The browsable brand system — brand book, voice, imagery direction, naming architecture,
research format, live component previews and every token with a usage note — lives at
**<https://claude.ai/artifact/1VWJd1Z8MsDM75Ub2fWt9v>**. This directory is the
machine-readable half.

## Contents

| Path | What |
| --- | --- |
| `tokens.json` | **Source of truth.** Colours (two themes), type scale, spacing, radius, shadow — each with a usage note. |
| `build-tokens.mjs` | `node design/build-tokens.mjs` — compiles `tokens.json` into CSS. |
| `tokens.css` | Generated reference copy. **Do not edit by hand.** |
| `logos/` | The Band mark and the seal, in dark-ground, light-ground and single-ink files. |
| `icons/` | Six 24×24 line icons, single ink `#7e8b86`. |

## How the app consumes it

The Docker build context is `./app` and the dev bind mount is `./app:/usr/src/app`, so
nothing outside `app/` is reachable at runtime. `build-tokens.mjs` therefore writes two
copies of the generated CSS — one here for reference, one at `app/src/app/tokens.css`,
which is the one the app imports. **Edit `tokens.json`, run the script, commit both.**

The rest of the app's brand layer is hand-written and lives beside it:

| File | What |
| --- | --- |
| `app/src/app/tokens.css` | Generated. Custom properties for both themes + a `.t-*` class per type style. |
| `app/src/app/index.css` | Google Fonts, Tailwind, the `@theme` block, the two DaisyUI themes (`operations`, `paper`), base styles, focus ring. |
| `app/src/app/App.css` | The `.ptr-*` classes — shell, wordmark, nav, hero, rows, readout, panel, button. |

Type styles compile to `.t-<name>` (`.t-display-xl`, `.t-body`, `.t-coord`). The `t-`
prefix keeps them clear of Tailwind utilities and DaisyUI component classes — `.label`
collides otherwise.

## The palette

| Token | Operations | Paper | For |
| --- | --- | --- | --- |
| `ground` | `#000000` | `#f4f2ed` | The page. Black stays black. |
| `surface` | `#0c0f0e` | `#ffffff` | Panels. |
| `hairline` | `#252927` | `#d5d0c6` | Rules between rows. Decorative — never the sole boundary of a control. |
| `border` | `#626764` | `#8f8a7c` | Control borders (3.6:1 / 3.5:1). |
| `ink` | `#ecf9ff` | `#10130f` | Text. Cool white, never pure white. |
| `ink-muted` | `#8f9c97` | `#4a504b` | Labels, secondary copy. |
| `verdigris` | `#365b4e` | `#2c4c41` | The brand green. A **fill**, never text. |
| `verdigris-bright` | `#74c9a0` | `#1a6044` | The only green that may be set as text. Links, the mark's band, accent values. |
| `caliche` | `#c8b78f` | `#7d6e44` | Dry Texas ground. Section labels, research rules, print. |

Every foreground/background pair was checked against WCAG 2 in both themes — 4.5:1 for
text, 3:1 for borders, icons and the focus ring. Each token's `usage` field names the
grounds it is allowed on. Two recorded limits: `ink-faint` drops below 4.5:1 on
`surface-raised`, and the single-ink icons drop to 2.9:1 on Paper's `surface-raised`.

There are **no status colours.** The company site has no states to report. DaisyUI's
`info` / `success` / `warning` / `error` slots are filled from the brand palette in
`index.css` so a stray framework component cannot render off-brand.

## Type

Archivo (display + UI) · IBM Plex Mono (every number a person acts on, tabular figures) ·
Source Serif 4 (anything Petrichor publishes as research). All three are Google-hosted and
imported at the top of `app/src/app/index.css`. No font binaries in this repo.

## Known gaps

- **No outlined wordmark.** PETRICHOR is set live in Archivo 700 at `0.14em`, so anywhere
  webfonts fail it falls back to Helvetica/Arial with the wrong tracking. Commission a
  drawn logotype before print, vinyl or aircraft livery.
- **Placeholder licence number** — `TDLR WM-0000` appears in `App.tsx`'s footer and in the
  brand system. Replace with the real one before this goes public.
