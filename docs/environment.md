# Environment

The server reads `process.env` only -- it never opens a `.env` file and never
assumes a monorepo layout, so the built artifact runs anywhere.

- **Dev:** the `packages/server` `dev` script loads `.env` then `.env.local`
  via Node's `--env-file-if-exists` flag, before the server starts.
- **Prod:** the platform (container, PaaS, k8s) injects env vars. No `.env`
  files are needed or loaded.

Precedence (high -> low): **platform env** > `.env.local` (gitignored) >
`.env` (committed default).

## Variables

| Variable                  | Default                       | Notes                                      |
| ------------------------- | ----------------------------- | ------------------------------------------ |
| `PORT`                    | `3000` (`packages/server/.env`) | server listen port                        |
| `EXPO_PUBLIC_API_BASE_URL`| `http://localhost:3000` (`packages/client/.env`) | client -> server base URL (build-time, see below) |

## Client env is build-time

Expo embeds a variable into the bundle **only** if its name starts with
`EXPO_PUBLIC_`; a bare `API_BASE_URL` is silently dropped. Client env is set at
build time (Metro embeds it), not runtime -- for a deployed client, set
`EXPO_PUBLIC_*` in the EAS build environment.

## Files

- `packages/<name>/.env` -- committed, safe defaults, never secrets.
- `packages/<name>/.env.local` -- gitignored, personal overrides / secrets.
- `packages/<name>/.env.example` -- documentation of overridable keys; not
  loaded at runtime.

## Reference

- Node `--env-file`: <https://nodejs.org/api/cli.html#--env-fileconfig>
- Expo env vars: <https://docs.expo.dev/guides/environment-variables/>
