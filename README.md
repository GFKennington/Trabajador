# Trabajador

Application that will provide wire sizes/types based on an ampacity/temperature rating.

## Authors

Grant Kennington and Nate Stott

## Packages

npm workspaces monorepo:

- [`packages/client`](./packages/client) - Expo / React Native client
- [`packages/server`](./packages/server) - Hono API server (Node)
- [`packages/shared`](./packages/shared) - shared utilities

## Quick start

```sh
mise install      # pinned Node version (see mise.toml)
npm install
npm run dev:server
npm run dev:client
```

Requires Node >= 24 (via [mise](https://mise.jdx.dev)).

> **mise is required to commit** — the `pre-commit` hook runs gitleaks via
> `mise exec`, so contributors must have mise installed and `mise install` run
> before their first commit. Install mise from <https://mise.jdx.dev>.

## Docs

- Per-package: [client](./packages/client/README.md), [server](./packages/server/README.md), [shared](./packages/shared/README.md)

## CI

- `CI` workflow runs on every PR and push to `main`. Each gate is its own job,
  so GitHub reports a separate check per gate: Lint & Format (biome), Spell
  Check (cspell), Link Check (lychee), Secret Scan (gitleaks), Typecheck, and
  Build. `mise run ci` runs the same gates locally in one shot.
- `TODO issues` workflow turns new TODO/FIXME/BUG/HACK comments into GitHub
  issues when they land on `main`, and closes them automatically when the
  comment is removed.
