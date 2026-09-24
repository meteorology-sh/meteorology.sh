# Profile pictures and social headers

Everything here is generated. `build.mjs` reads the five colours from
`design/tokens.json`, inlines the two shipped woff2 subsets, and photographs each
layout with headless Chrome. Change a colour in `tokens.json`, run the script, and
these files change with it. None of it is committed, so run the script before you need a
file. It makes its own folders and needs only `google-chrome` on the path.

```bash
node design/artifacts/build.mjs
```

## Profile pictures

The placeholder bolt in secondary on black. The mark sits inside the inscribed circle,
so a round crop takes nothing off it.

| File | Size | Use |
| --- | --- | --- |
| `avatars/petrichor-avatar-1000.png` | 1000 × 1000 | Upload this one. Every platform downsamples. |
| `avatars/petrichor-avatar-512.png` | 512 × 512 | Where an upload is capped. |
| `avatars/petrichor-avatar-400.png` | 400 × 400 | X and small forms. |
| `avatars/petrichor-avatar-paper-1000.png` | 1000 × 1000 | Paper theme, for a light page. |
| `avatars/petrichor-avatar-paper-400.png` | 400 × 400 | Paper theme, small. |
| `svg/petrichor-avatar.svg` | vector | Any size. Operations theme. |
| `svg/petrichor-avatar-paper.svg` | vector | Any size. Paper theme. |

## Headers

The three brand fills run across the top edge: primary at half width, secondary and
accent at a quarter each, the same proportion the home page shows. The lockup is the
mark, the wordmark, the tagline, and the domain, centred so a platform that crops the
sides keeps all of it.

| File | Size | Use |
| --- | --- | --- |
| `headers/header-x-1500x500.png` | 1500 × 500 | X. |
| `headers/header-linkedin-personal-1584x396.png` | 1584 × 396 | LinkedIn profile. |
| `headers/header-linkedin-company-1128x191.png` | 1128 × 191 | LinkedIn company page. Mark and wordmark only. |
| `headers/header-facebook-820x312.png` | 820 × 312 | Facebook page. |
| `headers/header-github-1280x640.png` | 1280 × 640 | GitHub social preview, and any open graph card. |
| `headers/header-youtube-2560x1440.png` | 2560 × 1440 | YouTube channel art. Everything sits in the 1546 × 423 box a desktop shows. |
| `headers/banner-plain-1500x500.png` | 1500 × 500 | The colour bar alone, flush to the bottom edge. For X, which lifts a banner under its own chrome. |
| `svg/banner-plain.svg` | vector | The colour bar alone, flush to the bottom edge. |

## Open

The bolt is a placeholder and the wordmark is set live in Archivo 700. Regenerate these
files once a drawn logotype and a final mark exist.
