# Trabajador

Application that will provide wire sizes/types based on an ampacity/temperature rating.

## Authors

Grant Kennington, and Nate Stott

## Monorepo layout

This is an npm workspaces monorepo:

- `packages/client` - Expo / React Native client
- `packages/server` - Hono API server (Node)
- `packages/shared` - shared utilities (date helpers, JSON envelopes, etc.)

## Prerequisites

- [Node.js](https://nodejs.org) >= 24 (pinned via [mise](https://mise.jdx.dev) in `mise.toml`)
- npm 10+

## Getting started

```sh
mise install      # installs the pinned Node version
npm install       # installs all workspace dependencies and links packages
npm run build     # builds shared + server (tsc -b)
npm run dev:server
npm run dev:client
```

## Common tasks

| Task | Command |
| ---- | ------- |
| Lint | `npm run lint` or `mise run lint` |
| Format (write) | `npm run format` |
| Lint + format + import sort | `npm run check` |
| Typecheck client | `npm run typecheck` |
| Build shared + server | `npm run build` |
| Run server (dev) | `npm run dev:server` |
| Run client (dev) | `npm run dev:client` |
| Tests | `npm test` |

## Quality gates

- **Biome** (format + lint + import organize) - config in `biome.json`. Currently covers the root, `packages/server`, and `packages/shared`; the client is excluded until its code is migrated to Biome.
- **Husky** git hooks:
  - `pre-commit` - runs a lightweight secret scan, then `lint-staged` (Biome on staged files).
  - `commit-msg` - enforces [Conventional Commits](https://www.conventionalcommits.org/) via commitlint.
- **GitHub Actions** (`.github/workflows/ci.yml`) - on push to `main` and on PRs: `biome ci`, `tsc -b` build, and a client typecheck.

> Secret scanning note: GitHub Push Protection is the primary defense for this public repo. The local pre-commit secret scan is a fast first line; it is grep-based and not exhaustive. Bypass a false positive with `git commit --no-verify`.

## Server

Skeleton with a single health endpoint. Add application routes in `packages/server/src/index.ts`.

- `GET /health` -> `{ "ok": true }`
