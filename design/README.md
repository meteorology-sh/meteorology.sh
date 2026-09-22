# Petrichor — brand

Company branding. Weatherman is a separate product with its own identity.

Open **`design/brand.html`** in a browser. That is the brand board: positioning, the five
colours, the type pairing, four logo concepts, mockups, voice, and the don'ts.

## The rule that keeps this honest

`design/tokens.json` is the only place a brand value is written. Everything else is
generated:

```
design/tokens.json                 source of truth
  └─ node design/build-tokens.mjs
       ├─ design/tokens.css        reference copy
       ├─ app/src/app/tokens.css   the app reads this
       └─ app/src/app/theme.css    Tailwind @theme + both daisyUI themes
```

`design/brand.html` links `../app/src/app/tokens.css` and `../app/src/app/App.css`
directly. The board renders with the exact stylesheets the site ships, so a colour cannot
drift between the two. Change `tokens.json`, run the script, and both update together.

The Docker build context is `./app` and the dev bind mount is `./app:/usr/src/app`, which
is why the generated CSS is written into `app/src/app/` rather than imported from here.

## Files

| Path | What |
| --- | --- |
| `brand.html` | The brand board. Commit it, open it from disk, send the file. |
| `tokens.json` | Source of truth. Five colours, two families, type scale, spacing, radii, don'ts. |
| `build-tokens.mjs` | Generates the three CSS files above. |
| `tokens.css` | Generated reference copy. Do not edit. |
| `logos/` | The placeholder bolt mark, dark and light ground plus one colour. Iconography is still open. |

## Five colours

| Token | Operations | Paper | Job |
| --- | --- | --- | --- |
| `ground` | `#000000` | `#f4f2ed` | The page. Also text on a filled accent or secondary block. |
| `ink` | `#ecf9ff` | `#10130f` | All primary text and numerals. |
| `primary` | `#365b4e` | `#2c4c41` | The one most important fill on a page. |
| `accent` | `#74c9a0` | `#1a6044` | Links, the mark's band, the value a decision turns on. |
| `secondary` | `#c8b78f` | `#756739` | Section labels, record numbers, print. |

Surfaces, rules and muted inks derive from `ground` and `ink` with `color-mix(in srgb)` at
ratios set per theme. Every pair clears its floor: 4.5:1 for text, 3:1 for borders and the
focus ring, in both themes.

There are no status colours. Status belongs in a word.

## Two families

Archivo for display and interface. IBM Plex Mono for every number a person acts on. Both
SIL Open Font License 1.1. The site self-hosts the latin and latin-ext woff2 subsets from
Google Fonts in `app/src/app/assets/fonts/`, with the licence text beside them, so the
first paint does not wait on a third-party request. `app/src/app/fonts.css` declares them.

## Type scale

Every style in `tokens.json` becomes a `t-<name>` class in the generated `tokens.css`.

| Class | Size / line | Job |
| --- | --- | --- |
| `t-display-xl` | 64 / 61 | The wordmark. One per page. |
| `t-display-l` | 44 / 46 | The one statement at the top of a page. |
| `t-display-m` | 28 / 32 | Section openers and record titles. |
| `t-heading` | 20 / 26 | Panel and row headings. |
| `t-subheading` | 13 / 18 | Group headers. Set in ink-muted. |
| `t-body-md` | 17 / 24 | Taglines and lead lines under a display style. |
| `t-body` | 15 / 22 | Running copy. Measure near 65 characters. |
| `t-body-sm` | 13 / 19 | Captions and help text. |
| `t-label` | 11 / 14 | Buttons, chips, axis labels. |
| `t-data-l` | 22 / 26 | Mono. The single number a screen exists to show. |
| `t-data` | 14 / 20 | Mono. Every value in a readout row. |
| `t-coord` | 12 / 16 | Mono. Coordinates, tail numbers, record numbers. |

## Known gaps

- No outlined wordmark. PETRICHOR is set live in Archivo 700 at `0.14em`. Commission a
  drawn logotype before print, vinyl or aircraft livery.
- `TDLR WM-0000` is a placeholder. It appears in the site footer and on the board. Replace
  it before launch.
