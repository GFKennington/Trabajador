# trabajador-server

The Hono API server (Node). One of three workspace packages in the
Trabajador monorepo -- see the root [README](../../README.md) for the overall
layout.

## Role in the monorepo

- Consumes [`trabajador-shared`](../shared) as a workspace dependency
  (`"trabajador-shared": "0.0.0"`). It is a TS project reference, so `tsc -b`
  at the root builds `shared` before `server`.
- Built as a composite TS project that emits to `dist/`. The root
  `npm run build` runs `tsc -b` (builds the `shared -> server` graph for
  typechecking) then an `esbuild` bundle for the production artifact -- it is
  **not** a per-package `tsc`.
- Run from the root: `npm run dev:server` (dev, `tsx watch`) or after a build,
  `node packages/server/dist/index.js`.

## Scripts

| Script   | What it does                              | Run from          |
| -------- | ----------------------------------------- | ----------------- |
| `dev`    | `tsx watch src/index.ts` (rebuilds first) | package or root (`dev:server`) |
| `build`  | `esbuild` bundle -> `dist/index.js` (self-contained) | package or root   |
| `start`  | `node dist/index.js` (needs a build)      | package           |

`predev` runs `tsc -b` before the watcher starts, so the first dev launch
also builds `shared`. If you edit `shared`, `tsc -b` picks it up; with `tsx
watch` running, restart the server to pick up shared changes.

## Environment

The server reads `process.env` only -- no `.env` loading in app code. In
development the `dev` script loads `.env` then `.env.local` via Node's
`--env-file-if-exists` flag (platform env beats both). In production the
platform injects env vars.

Relevant vars: `PORT`.

## Where to put things

- **Routes / app logic** -> `src/index.ts` (or split out as it grows).
- **Types, schemas, pure logic shared with the client** -> `trabajador-shared`,
  not here.
- **Secrets** -> `packages/server/.env.local` (gitignored), never a committed
  `.env`.

Per-package docs: [docs/README.md](./docs/README.md).
