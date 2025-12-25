import { Hono } from "hono";
import { layout } from "./layout";
import { Home } from "./pages/home";
import { NotFound } from "./components/not-found";

const app = new Hono();

app.use(layout);

app.get("/", (c) => {
  return c.render(<Home />);
});

app.notFound((c) => {
  return c.render(<NotFound />);
});

export default app;
