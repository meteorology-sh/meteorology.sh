# Petrichor — brand assets

The canonical, browsable brand system lives at
**<https://claude.ai/artifact/1VWJd1Z8MsDM75Ub2fWt9v>** — brand book, voice, imagery
direction, naming architecture, research format, live component previews and every token
with a usage note. This directory is the machine-readable half of the same system, kept
here so the app can consume it.

## Contents

| File | What |
| --- | --- |
| `tokens.json` | **Source of truth.** Colours (two themes), type scale, spacing, radius, shadow — each with a usage note. |
| `tokens.css` | Generated from `tokens.json`. CSS custom properties for both themes plus a class per type style. **Do not edit by hand.** |
| `theme.css` | Tailwind 4 `@theme` block + the two DaisyUI 5 themes (`operations`, `paper`) + the focus ring. |
| `components.css` | The `.ptr-*` component classes — Chip, Readout, Panel, Button, Wordmark. Every value comes from a token. |
| `logos/` | The Band mark, the seal, the Weatherman glyph. Dark-ground, light-ground and single-ink files. |
| `icons/` | Six 24×24 line icons, single ink `#7e8b86`. |

## Wiring it into the app

`app/src/app/index.css`:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@plugin "daisyui";

@import "../../../design/tokens.css";
@import "../../../design/theme.css";
@import "../../../design/components.css";
```

Then `<html data-theme="operations">` in `app/index.html`. `paper` is opt-in per subtree.

## The palette, in one line each

| Token | Operations | Paper | For |
| --- | --- | --- | --- |
| `ground` | `#000000` | `#f4f2ed` | The page. Black stays black. |
| `surface` | `#0c0f0e` | `#ffffff` | Panels. |
| `ink` | `#ecf9ff` | `#10130f` | Text. Cool white, never pure white. |
| `verdigris` | `#365b4e` | `#2c4c41` | The brand green — sampled from the seeded-cell polygons in Weatherman. A **fill**, never text. |
| `verdigris-bright` | `#74c9a0` | `#1a6044` | The only green that may be set as text. Links, the mark's band, accent values. |
| `glacio` | `#00bafe` | `#00618f` | Glaciogenic seeding — silver iodide, ice phase. Sampled from the ICE + SALT chip. |
| `hygro` | `#74c9a0` | `#1a6044` | Hygroscopic seeding — salt flares — and the FLY state. |
| `caution` | `#f0b354` | `#7d5206` | HOLD, marginal soundings. |
| `scrub` | `#a83a24` | `#9c3520` | Scrubbed, down, denied. A **fill** with `on-scrub`; never small text on black. |
| `caliche` | `#c8b78f` | `#7d6e44` | Dry Texas ground. Research rules, print, the other half of the name. |

Every foreground/background pair in `tokens.json` was checked against WCAG 2 in both
themes — 4.5:1 for text, 3:1 for borders, icons and focus rings. Each token's `usage`
field names the grounds it is allowed on. Two known limits are recorded there:
`ink-faint` drops below 4.5:1 on `surface-raised`, and the single-ink icons drop to 2.9:1
on Paper's `surface-raised`.

Status is never carried by hue alone: chips always carry their word, and the form
differs too — live states outlined, HOLD dashed, terminal states filled.

## Type

Archivo (display + UI) · IBM Plex Mono (every number a person acts on, tabular figures) ·
Source Serif 4 (anything Petrichor publishes as research). All three are Google-hosted;
`theme.css` imports them. There are no font binaries in this repo.

## Regenerating `tokens.css`

`tokens.css` is derived. Edit `tokens.json`, then re-run the generator (it lives with the
brand system, not in this repo) — or update both files together and keep them in sync.

## Known gaps

- **No outlined wordmark.** PETRICHOR is set live in Archivo 700 at `0.14em`. Commission a
  drawn logotype before print, vinyl or aircraft livery.
- **Placeholder licence numbers** in the brand system's Naming section (`TDLR WM-0000`).
  Replace with the real ones before anything ships publicly.
