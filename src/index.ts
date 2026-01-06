// Prod
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import api from "./api/index";
import { existsSync } from "fs";
import { join } from "path";

const app = new Hono();

app.route("/api", api);

app.use('/*', serveStatic({ 
    root: 'dist/public',
    onNotFound: () => {}
}));

app.get('*', async (c) => {
    const indexPath = join(process.cwd(), 'dist', 'public', 'index.html');
    if (!existsSync(indexPath)) {
        return c.text("Build not found. Run 'bun run build' first.", 404);
    }

    return new Response(Bun.file(indexPath));
});

export default app;









// Dev

/* import { serve } from "bun";
import index from "./client/index.html";
import api from "./api";

console.log("🚀 Running in Development Mode");
const server = serve({
  routes: {
    "/api/*": api.fetch,
    "/*": index,
  },
  
  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
  },
});

console.log(`Server running at ${server.url}`);  */

