# design/artifacts — generated brand assets

## What is here

Profile pictures and social headers for the accounts Petrichor posts from. Every file in
`avatars/`, `headers/`, and `svg/` is generated and gitignored. `build.mjs` and
`README.md` are the only tracked files in this folder.

## Regenerating

```bash
node design/artifacts/build.mjs
```

The script makes the three output folders itself, so it works on a fresh clone. It needs
`google-chrome` on the path and nothing else. No install step, no dependency.

## How it works

`build.mjs` reads the five colours from `design/tokens.json`, inlines the Archivo and IBM
Plex Mono woff2 subsets from `app/src/app/assets/fonts/`, lays each asset out in HTML, and
photographs it with headless Chrome at the exact pixel size the platform asks for. The
two vector files are written directly, with no font, because they carry geometry only.

## Rules

- A colour, a font, or a proportion here comes from `design/tokens.json` or the shipped
  stylesheets. Do not type a hex value into this folder.
- The colour bar keeps the home page proportion: primary at half width, secondary and
  accent at a quarter each.
- Chrome asks the desktop keyring for a key on a fresh profile. The render flags include
  `--password-store=basic` and `--use-mock-keychain` to keep a build from raising a
  credentials prompt. Leave them in.
- Adding a size means adding a row to the `shots` list. Centre the lockup, because a
  platform crops the sides.
- The bolt and the live-set wordmark are placeholders. Regenerate once a drawn logotype
  exists.
