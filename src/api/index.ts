import { Hono } from "hono";
import users from "./routes/users";

const app = new Hono();

app.route("/api/users", users);

// GET /api/hello
app.get("/api/hello", (c) => {
  return c.json({
    message: "Hello, world!",
    method: "GET",
  });
});

// PUT /api/hello
app.put("/api/hello", (c) => {
  return c.json({
    message: "Hello, world!",
    method: "PUT",
  });
});

// GET /api/hello/:name
app.get("/api/hello/:name", (c) => {
  const name = c.req.param("name");
  return c.json({
    message: `Hello, ${name}!`,
  });
});

export default app;