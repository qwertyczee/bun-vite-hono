import { serve } from "bun";
import api from "./api";
import index from "./client/index.html";

const server = serve({
  routes: {
    "/api/*": api.fetch,
    "/*": index,
  },
  
  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
  },
});

console.log(`Server running at ${server.url}`);