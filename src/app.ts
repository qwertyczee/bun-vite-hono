// src/app.ts
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { existsSync } from "fs";
import { join } from "path";
import api from "./api/index";

const app = new Hono();

// 1. API
app.route("/api", api);

// 2. Production Static Logic
export const configureStaticServing = (app: Hono) => {
    app.use('/*', serveStatic({ 
        root: 'dist/public',
        onNotFound: () => {}
    }));

    app.get('*', (c) => {
        const indexPath = join(process.cwd(), 'dist', 'public', 'index.html');
        if (!existsSync(indexPath)) {
            return c.text("Build not found. Run 'bun run build' first.", 404);
        }
        return new Response(Bun.file(indexPath));
    });
};

export default app;