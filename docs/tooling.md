# Tooling

Repo-specific tooling. For each tool's own docs, follow the links.

## mise

[`mise.toml`](../mise.toml) pins Node 24 and defines task entry points so the same commands run locally and in CI. `mise tasks` lists them with descriptions.

| Task | Runs |
| ---- | ---- |
| `install` | `npm install` |
| `build` | `npm run build` (tsc -b + client web export) |
| `typecheck` | `npm run typecheck` (tsc -b + client tsc --noEmit) |
| `lint` | `npm run lint` (Biome) |
| `format` | `npm run format` (Biome --write) |
| `check` | `npm run check` (Biome lint + format + import organize) |
| `spellcheck` | `npm run spellcheck` (cspell) |
| `ci` | `npm run ci` (the full gate — see CI below) |
| `test` | `npm test` (across workspaces, `--if-present`) |
| `dev:server` | `npm run dev:server` (tsx watch) |
| `dev:client` | `npm run dev:client` (expo start) |
| `clean` | `./tools/clean-repo.sh` (artifacts + node_modules; `--keep-deps` keeps deps) |

## Biome

[`biome.json`](../biome.json) configures format + lint + import organize for the whole repo: 4-space indent, double quotes, semicolons, trailing commas, recommended lint preset. Web docs: <https://biomejs.dev/reference/configuration/>.

**Client override:** the Expo boilerplate isn't fully Biome-clean yet, so a `packages/client/**` override downgrades the noisy boilerplate lint rules (`useImportType`, `useNodejsImportProtocol`, `noUnusedImports`, `noUnusedVariables`) to `warn` and turns import organizing `off` for the client. Drop the override once the client is migrated.

## cspell

[`cspell.json`](../cspell.json) spell-checks the repo; project terms (trabajador, hono, biomejs, mise, husky, commitlint, lint-staged, tsx, kcmil, ampacity, Kennington, Stott, Pressable, Nativewind, Tamagui, unistyles, Maru, worklets) and the intentional secret-pattern fragments in `scan-secrets.sh` (`AKIA`, `baprs`, `Blbk`) are ignored. Web docs: <https://cspell.org/docs/>.

## CI (single source of truth)

[`.github/workflows/ci.yml`](../.github/workflows/ci.yml) runs on push to `main` and on PRs. The gate list lives in **one place** — the `ci` npm script — and CI calls `mise run ci`, which calls `npm run ci`. Edit the gates in `package.json` only.

```
ci.yml  →  mise run ci  →  npm run ci
                         ├── biome ci .
                         ├── npm run spellcheck
                         ├── npm run typecheck
                         └── npm run build
```

`jdx/mise-action@v2` installs the pinned Node from `mise.toml` in CI. `npm ci` (not `npm install`) is used for the install step for reproducible lockfile installs.

## Git hooks (Husky)

[`.husky/`](../.husky) — web docs: <https://typicode.github.io/husky/>

- `pre-commit` — `set -e` fail-fast, then `./tools/scan-secrets.sh`, then `npx lint-staged` (Biome + cspell on staged files). Config in the root `package.json` `lint-staged` block.
- `commit-msg` — `npx --no -- commitlint --edit "$1"`. Config in [`commitlint.config.js`](../commitlint.config.js), extends `@commitlint/config-conventional`. Web docs: <https://commitlint.js.org/>

`prepare` (`husky`) in the root `package.json` installs the hooks on `npm install`.

## Tools

- [`tools/clean-repo.sh`](../tools/clean-repo.sh) — `mise run clean`. Removes `dist/`, `web-build/`, `.expo/`, `*.tsbuildinfo`, and every `node_modules` dir. `--keep-deps` keeps dependencies (artifacts only). `--help` for usage.
- [`tools/scan-secrets.sh`](../tools/scan-secrets.sh) — lightweight grep-based secret scan run from `pre-commit`. Patterns: AWS keys (`AKIA...`), private key headers, GitHub tokens (`ghp_`/`gho_`/`github_pat_`), Slack tokens (`xox...`), OpenAI keys (`sk-...T3BlbkFJ`). GitHub **Push Protection** is the primary defense for this public repo; this is a fast first line only. Bypass a false positive with `git commit --no-verify`.

## TypeScript

Root [`tsconfig.json`](../tsconfig.json) is a [solution-style config](https://www.typescriptlang.org/docs/handbook/project-references.html) with project references to `packages/shared` and `packages/server` (composite, emit to `dist/`). The client keeps its own Expo tsconfig and is typechecked via `tsc --noEmit`. See [Architecture](./architecture.md) for why.
