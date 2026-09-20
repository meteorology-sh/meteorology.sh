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

## Shared Principles

- **One job per file, a predictable home for it.** Infrastructure (`lib/`) is
  separated from UI/transport.
- **Minimize dependencies.** Prefer the platform (`fetch`, `fs/promises`,
  `URLSearchParams`) and what's installed; adding a dependency needs a reason.
- **Copy the canonical example.** Each layer has exactly one pattern in the
  code — extend it rather than inventing a parallel approach.
