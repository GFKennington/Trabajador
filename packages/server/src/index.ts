import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { formatDateTime, ok } from "trabajador-shared";

const app = new Hono();

app.get("/health", (c) => c.json({ ok: true }));

// Wiring check: uses a utility + envelope from trabajador-shared.
app.get("/api/time", (c) => c.json(ok({ now: formatDateTime(new Date()) })));

const rawPort = Number(process.env.PORT);
const port = Number.isFinite(rawPort) ? rawPort : 3000;
serve({ fetch: app.fetch, port }, (info) => {
    console.log(`Trabajador server listening on http://localhost:${info.port}`);
});
