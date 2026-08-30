# Architecture

npm workspaces monorepo: one root package (`trabajador`) and three workspace packages under `packages/*`.

```
.
├── package.json             workspaces + root scripts
├── tsconfig.json            root TS solution config
└── packages/
    ├── client/              trabajador-client  — Expo / React Native app
    ├── server/              trabajador-server  — Hono API server (Node)
    └── shared/              trabajador-shared — utilities shared by client + server
```

## Why the client isn't in `tsc -b`

The root `tsconfig.json` is a solution-style config with project references to `packages/shared` and `packages/server` only. Those are composite projects that emit to `dist/` and are consumed as libraries.

The client is an Expo app built by Metro, not `tsc` — it can't be a project reference (it isn't composite, and `tsc -b` would wrongly try to emit JS for the whole app). The client is typechecked separately via `tsc --noEmit` (`mise run typecheck`).

So `tsc -b` builds the library graph (shared → server), and Metro builds the app (client).
