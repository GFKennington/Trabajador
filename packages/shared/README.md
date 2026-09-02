# trabajador-shared

Generic utilities shared by the client and server. One of three workspace
packages in the Trabajador monorepo -- see the root
[README](../../README.md) for the overall layout.

## Role in the monorepo

This is a **library**, not a runnable service. It has no `dev` / `start` script
and loads no environment files itself. Both `trabajador-client` and
`trabajador-server` depend on it (`"trabajador-shared": "0.0.0"`); npm
workspaces symlinks it into their `node_modules`, so they import it by name:

```ts
import { ok, formatDateTime } from "trabajador-shared";
```

It is a TS **project reference** (composite) that emits to `dist/` with
declarations (`.d.ts`) and source maps. The root `tsc -b` builds it first,
which is why the client and server both have a `pre*` hook that builds `shared`
before they run.

## Scripts

| Script  | What it does                          |
| ------- | ------------------------------------- |
| `build` | `tsc -b` (incremental, emits `dist/`) |

No tests, lint, or dev script here -- lint/format run from the root via Biome,
and tests run from the root (`npm test`).

## Environment

None of its own. Any env a shared helper needs is supplied at runtime by
whichever package imported it.

## Where to put things

- **Pure, dependency-free utilities** (date helpers, JSON envelopes,
  parsers, shared types/schemas) -> `src/index.ts`, or split into modules
  under `src/` and re-export from `index.ts`.
- **Anything that reads `process.env` or a network** -> does not belong here;
  put it in the package that owns that concern.
- **Domain logic the user owns** -> leave to the user; this package stays
  generic.

Per-package docs: [docs/README.md](./docs/README.md).
