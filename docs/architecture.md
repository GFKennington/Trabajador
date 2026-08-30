# Architecture

npm workspaces monorepo: one root package (`trabajador`) and three workspace packages under `packages/*`.

```
.
|-- package.json            workspaces + root scripts
|-- tsconfig.json           root TS solution config
\- packages/
    |-- client/             trabajador-client  -- Expo / React Native app
    |-- server/             trabajador-server  -- Hono API server (Node)
    \- shared/              trabajador-shared -- utilities shared by client + server
```

## Why the client isn't in `tsc -b`

The root `tsconfig.json` is a solution-style config with project references to `packages/shared` and `packages/server` only. Those are composite projects that emit to `dist/` and are consumed as libraries.

The client is an Expo app built by Metro, not `tsc` -- it can't be a project reference (it isn't composite, and `tsc -b` would wrongly try to emit JS for the whole app). The client is typechecked separately via `tsc --noEmit` (`mise run typecheck`).

So `tsc -b` builds the library graph (shared -> server) for typechecking and emit, and Metro builds the app (client).

## Server production build is a bundle, not `tsc` output

`tsc -b` type-checks the shared -> server graph and emits `dist/`, but the
**production server artifact** is produced by `esbuild` (the `packages/server`
`build` script): it bundles `src/index.ts` with `trabajador-shared`, `hono`,
and `@hono/node-server` inlined into a single self-contained
`packages/server/dist/index.js`. The only remaining imports are Node.js
builtins (`node:http`, etc.).

This is what makes the server deployable without the monorepo: copy that one
file into an image (no `node_modules`, no `packages/shared`) and run
`node dist/index.js`. The workspace symlink to `trabajador-shared` that breaks
in a dist-only copy is no longer involved at runtime. See
[environment.md](./environment.md) for how config reaches the deployed server
(platform env vars, no `.env` files).
