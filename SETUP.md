# SETUP.md

## Vercel Configuration Strategies

Choose one of the following configurations for `vercel.json` based on your caching and routing needs.

### Option 1: CDN & Caching (Recommended)
Offloads frontend assets to Vercel's Edge Network.

```json
{
  "bunVersion": "1.x",
  "buildCommand": "bun run build",
  "outputDirectory": "dist/public",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/index.js"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Option 2: Server-Side Routing
Routes all traffic through the Hono application. Useful if you require middleware execution for static files or wish to bypass Vercel's CDN.

**Note:** Increases latency and disables edge caching.

```json
{
  "bunVersion": "1.x",
  "framework": "hono",
  "buildCommand": "bun run build",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api/index.js"
    }
  ],
  "functions": {
    "api/index.js": {
      "includeFiles": "dist/public/**"
    }
  }
}
```

## Application Entry Point

Configure `src/index.ts` to handle static file serving conditionally. This setup supports both Vercel environments and standalone execution.

```ts
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
```