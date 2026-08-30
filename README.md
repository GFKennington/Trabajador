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
