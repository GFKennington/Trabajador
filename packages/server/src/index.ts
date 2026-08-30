import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { serve } from "@hono/node-server";
import dotenv from "dotenv";
import { Hono } from "hono";
import { formatDateTime, ok } from "trabajador-shared";

// Load env in layered precedence (low -> high; later wins):
//   root .env < package .env < root .env.local < package .env.local
// (committed defaults first, then personal overrides; package overrides root
// within each tier.) Paths resolve relative to this module, not cwd.
const here = dirname(fileURLToPath(import.meta.url)); // packages/server/dist
const serverDir = join(here, ".."); // packages/server
const monorepoRoot = join(here, "../../.."); // monorepo root (dist -> server -> packages -> root)
const envFiles = [
    join(monorepoRoot, ".env"),
    join(serverDir, ".env"),
    join(monorepoRoot, ".env.local"),
    join(serverDir, ".env.local"),
];
for (const f of envFiles) {
    dotenv.config({ path: f, override: true, quiet: true });
}

const app = new Hono();

app.get("/health", (c) => c.json({ ok: true }));

// Wiring check: uses a utility + envelope from trabajador-shared.
app.get("/api/time", (c) => c.json(ok({ now: formatDateTime(new Date()) })));

const rawPort = Number(process.env.PORT);
const port = Number.isFinite(rawPort) ? rawPort : 3000;
serve({ fetch: app.fetch, port }, (info) => {
    console.log(`Trabajador server listening on http://localhost:${info.port}`);
});
