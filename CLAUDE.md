# Rome — A Full-Stack TypeScript Template

## What This Is

A React application and website for Petrichor, a small business research and development laboratory in cloud seeding. Petrichor develops quadcopter drones for rain enhancement operations in the state of Texas.

## Repository Layout

```
rome/
  app/                       # React SPA — Vite, React Router, Redux Toolkit, Tailwind
    CLAUDE.md                #   → frontend conventions
    src/                     #   app/ (UI) + lib/ (infra) + tests/
    Dockerfiles/             #   Dockerfile.local + hardened Dockerfile.prod (nginx)
    docker-compose.yaml        # Local dev — both services, bind mounts + HMR
    docker-compose.prod.yaml   # Production — both services, built images
    CLAUDE.md                  # This file — overview + pointers
```

## Running

```bash
# Local dev — app on :5173 (HMR)
docker compose up

# Production — hardened images, app served by nginx
docker compose -f docker-compose.prod.yaml up
```

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
