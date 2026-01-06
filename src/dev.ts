// src/dev.ts
import app from "./app";
import index from "./client/index.html";

console.log("🚀 Running in Development Mode");

Bun.serve({
  development: true,
  routes: {
    "/api/*": app.fetch,
    "/*": index,
  },
});