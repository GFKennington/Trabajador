# Environment (`.env` files)

Four tiers, low → high precedence (later wins):

1. `.env` (root) — global committed defaults
2. `packages/<name>/.env` — package committed defaults
3. `.env.local` (root) — personal override
4. `packages/<name>/.env.local` — personal override (highest)

**Committed** (`.env`, `packages/*/.env` + `.env.example` templates): safe defaults only, never secrets.
**Gitignored** (`.env.local`, `packages/*/.env.local`): personal/local overrides.

## How the server loads them

`packages/server/src/index.ts` loads all four layers in order with `override: true`, paths resolved from `import.meta.url` so they work regardless of cwd.

dotenv docs: <https://dotenv.org/>
