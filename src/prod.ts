// Prod
import { serveStatic } from "hono/bun";
import { handle } from 'hono/vercel'
import { join } from "path";
import { existsSync } from "node:fs";
import app from "./app";

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

export const config = {
  runtime: 'edge',
}

export default handle(app);