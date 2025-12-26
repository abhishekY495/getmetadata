import { Hono } from "hono";
import { layout } from "./layout";
import { Home } from "./pages/home";
import { NotFound } from "./components/not-found";
import { handleMetadataRequest } from "./lib/handle-metadata-request";
import { handleIconRequest } from "./lib/handle-icon-request";
import { handleOgRequest } from "./lib/handle-og-request";
import { middleware } from "./lib/middleware";
import { Bindings } from "../types";

const app = new Hono<{ Bindings: Bindings }>();

app.use(layout);

app.notFound((c) => {
  return c.render(<NotFound />);
});

app.get("/", (c) => {
  return c.render(<Home />);
});

app.use(":domain", middleware);
app.use(":domain/icon", middleware);
app.use(":domain/og", middleware);
app.use(":domain/twitterog", middleware);

app.get(":domain", handleMetadataRequest);
app.get(":domain/icon", handleIconRequest);
app.get(":domain/og", (c) => handleOgRequest(c));
app.get(":domain/twitterog", (c) => handleOgRequest(c, true));

export default app;
