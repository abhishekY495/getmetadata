import { Hono } from "hono";
import { layout } from "./layout";
import { Home } from "./pages/home";
import { NotFound } from "./components/not-found";
import { handleMetadataRequest } from "./lib/handle-metadata-request";
import { handleIconRequest } from "./lib/handle-icon-request";
import { handleOgRequest } from "./lib/handle-og-request";
import { middleware } from "./lib/middleware";
import { cache } from "hono/cache";
import { CACHE_MAX_AGE, CACHE_VERSION } from "./utils/constants";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use(layout);

app.notFound((c) => {
  return c.render(<NotFound />);
});

app.get("/", (c) => {
  return c.render(<Home />);
});

app.use(
  ":domain",
  middleware,
  cache({
    cacheName: `metadata-${CACHE_VERSION}`,
    cacheControl: `max-age=${CACHE_MAX_AGE}`,
  }),
  handleMetadataRequest
);

app.use(
  ":domain/icon",
  middleware,
  cache({
    cacheName: `icons-${CACHE_VERSION}`,
    cacheControl: `max-age=${CACHE_MAX_AGE}`,
  }),
  handleIconRequest
);

app.use(
  ":domain/og",
  middleware,
  cache({
    cacheName: `og-images-${CACHE_VERSION}`,
    cacheControl: `max-age=${CACHE_MAX_AGE}`,
  }),
  (c) => handleOgRequest(c)
);

app.use(
  ":domain/twitterog",
  middleware,
  cache({
    cacheName: `twitter-og-images-${CACHE_VERSION}`,
    cacheControl: `max-age=${CACHE_MAX_AGE}`,
  }),
  (c) => handleOgRequest(c, true)
);

export default app;
