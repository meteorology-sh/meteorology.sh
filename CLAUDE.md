# meteorology.sh — Petrichor

## What This Is

The website for Petrichor, a small research laboratory in Austin, Texas. Petrichor works
on cloud seeding for rain enhancement across Texas. The lab builds open source software,
neural networks, and quadcopter drones. The site is live at
[meteorology.sh](https://meteorology.sh).

The site is a static React SPA with four pages:

| Route | Page | Content |
| --- | --- | --- |
| `/` | `LandingPage` | Wordmark, mission statement, and a live conditions card for Austin (Open-Meteo). |
| `/about` | `About` | Who, what, and why: the engineers, cloud seeding, and Texas water resources. |
| `/research` | `Research` | The three research products: **Weatherman** (decision science software), **Automata** (reinforcement learning harness), **Hyades** (quadcopter drones). |
| `/contact` | `Contact` | Two cards: the lab's X account, and `hello@meteorology.sh`. |

Weatherman is a separate product with its own identity. This site carries the Petrichor
brand only.

## Repository Layout

```
meteorology.sh/
  app/                       # React SPA — Vite, React Router, Redux Toolkit, Tailwind, daisyUI
    CLAUDE.md                #   → frontend conventions
    src/                     #   app/ (UI) + lib/ (infra) + tests/ (Vitest + Playwright e2e)
    public/                  #   favicon, og-image, robots.txt, sitemap.xml, llms.txt, llms-full.txt
    Dockerfiles/             #   Dockerfile.local + hardened Dockerfile.prod (nginx)
  design/                    # Petrichor brand board and design tokens
    README.md                #   → brand rules, the five colours, the two families
    brand.html               #   the brand board, open from disk
    tokens.json              #   source of truth for every brand value
    build-tokens.mjs         #   generates the token CSS into app/src/app/
  infra/                     # Mail for the lab address — SES stack + mail.sh
    README.md                #   → how mail is received, forwarded, and sent
  .claude/skills/            # Project skills: voice, brand, daisyui
  docker-compose.yaml        # Local dev — bind mount + HMR
  docker-compose.prod.yaml   # Production — built image served by nginx
  AGENTS.md                  # Points to this file
  CLAUDE.md                  # This file — overview + pointers
```

## Running

```bash
# Local dev — app on :5173 (HMR)
docker compose up

# Production image — nginx on :8080, mapped to :5173
docker compose -f docker-compose.prod.yaml up
```

## Deploying

Production is a static build on S3 behind CloudFront. From `app/`:

```bash
yarn deploy   # build → sync dist/ to s3://meteorology.sh → invalidate CloudFront
```

Hashed assets get a one-year immutable cache. `index.html`, `robots.txt`, `sitemap.xml`,
and `llms*.txt` are uploaded with `no-cache`, so a deploy shows up on the next load.

## Design Tokens

`design/tokens.json` is the only place a brand value is written. Run
`node design/build-tokens.mjs` to regenerate `design/tokens.css`,
`app/src/app/tokens.css`, and `app/src/app/theme.css`. Never edit the generated files by
hand. See `design/README.md` for the palette and type rules.

## Project Skills — read these before you write anything

This repo carries its own skills in `.claude/skills/<name>/SKILL.md`. They are
**binding conventions, not references.** Claude Code loads them automatically; if for any
reason they do not appear in your available-skills list, read them off disk before
starting work.

| Skill | Load it before |
| --- | --- |
| `voice` | Writing **any** user-facing copy — component text, headings, docs, commit-adjacent prose. Enforced on every string that ships. |
| `brand` | Any identity work: brand boards, logos, palettes, type pairing, mockups. Defines the required output format and hard caps (≤6 colors, ≤2 type families). |
| `daisyui` | Any HTML or JSX. Use daisyUI component classes; do not hand-roll a parallel component layer. |

If a skill's rule conflicts with your own judgement, the skill wins. If it conflicts with
a direct instruction from the user in the conversation, the user wins — say which rule you
are setting aside and why.

## Shared Principles

- **One job per file, a predictable home for it.** Infrastructure (`lib/`) is
  separated from UI/transport.
- **Minimize dependencies.** Prefer the platform (`fetch`, `fs/promises`,
  `URLSearchParams`) and what's installed; adding a dependency needs a reason.
- **Copy the canonical example.** Each layer has exactly one pattern in the
  code — extend it rather than inventing a parallel approach.
- **One source of truth.** Brand values live in `design/tokens.json`; page copy lives
  in the components, and `public/llms-full.txt` mirrors it (an e2e test fails when
  they drift).
