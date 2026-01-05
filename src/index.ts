import { Hono } from "hono";
import { serveStatic } from 'hono/bun'
import api from "./api";

console.log(process.env.NODE_ENV)

const app = new Hono();

// 1. Mount API
app.route("/api", api);

// 2. Serve Frontend
if (process.env.NODE_ENV === "production") {
  console.log("🚀 Running in Development Mode");
  
  // DEV: Serve the raw source HTML. 
  // Bun automatically injects the HMR client into this stream.
  app.get("*", serveStatic({ path: "./client/index.html" }));

} else {
  console.log("📦 Running in Production Mode");

  // PROD: Serve built static assets (JS, CSS, SVG)
  app.use("/*", serveStatic({ root: "./dist/public" }));
  
  // Fallback for SPA Routing (Serve index.html)
  app.get("*", serveStatic({ path: "./dist/public/index.html" }));
}

export default {
  port: process.env.PORT || 3000,
  fetch: app.fetch,
};