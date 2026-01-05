import { Hono } from "hono";
import { cors } from "hono/cors";
import users from "./routes/users";

const app = new Hono();

app.use(
    "*",
    cors({
        origin: (origin) => origin,
        credentials: true,
    })
);

app.route("/users", users);

// GET /api/hello
app.get("/hello", (c) => {
  return c.json({
    message: "Hello, world!",
    method: "GET",
  });
});

// PUT /api/hello
app.put("/hello", (c) => {
  return c.json({
    message: "Hello, world!",
    method: "PUT",
  });
});

// GET /api/hello/:name
app.get("/hello/:name", (c) => {
  const name = c.req.param("name");
  return c.json({
    message: `Hello, ${name}!`,
  });
});

export default app;