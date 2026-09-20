# Rome — Full-Stack TypeScript Template

Rome is a beautiful TypeScript template. This codebase incorporates best practices and design patterns I picked up over many years developing research applications.

## Layout

```
rome/
  app/                       # React SPA — Vite, React Router, Redux Toolkit, Tailwind
    src/                     #   app/ (UI) + lib/ (infra) + tests/
    Dockerfiles/             #   Dockerfile.local + hardened Dockerfile.prod (nginx)
    CLAUDE.md                #   frontend conventions
  docker-compose.yaml        # Local dev — the service, bind mount + HMR
  docker-compose.prod.yaml   # Production — the service, built images
  CLAUDE.md                  # Overview
```

## Running

#### Local Development Containers

```bash
docker compose build

docker compose -f docker-compose.prod.yaml up
```

#### Hardened Production Containers

```bash
docker compose -f docker-compose.prod.yaml build

docker compose -f docker-compose.prod.yaml up
```

## Docs

- **`CLAUDE.md`** — repo overview and where to look.
- **`app/CLAUDE.md`** — frontend conventions.
