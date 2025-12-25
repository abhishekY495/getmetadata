import { Hono } from "hono";
import { layout } from "./layout";
import { Home } from "./pages/home";
import { NotFound } from "./components/not-found";
import { isValidURL } from "./utils/is-valid-url";
import { fetchWithTimeout } from "./utils/fetch-with-timeout";
import { getDataFromHtml } from "./utils/get-data-from-html";

const app = new Hono();

app.use(layout);

app.get("/", (c) => {
  return c.render(<Home />);
});

app.notFound((c) => {
  return c.render(<NotFound />);
});

app.get(":domain", async (c) => {
  try {
    const domain = c.req.param("domain");

    const domainUrl = `https://${domain}`;

    if (!isValidURL(domainUrl)) {
      return c.json({ status: "error", error: "Invalid domain" }, 400);
    }

    const domainResponse = await fetchWithTimeout(domainUrl);
    const domainBody = await domainResponse.text();

    const data = await getDataFromHtml(domainBody, domain);

    return c.json({ status: "success", data }, 200, {
      "Content-Type": "application/json",
    });
  } catch (error) {
    console.error(error as Error);

    if ((error as Error).name === "AbortError") {
      return c.json(
        { status: "error", error: "Took too long to respond" },
        504
      );
    }

    return c.json(
      {
        status: "error",
        error: (error as Error).message ?? "Internal server error",
      },
      500
    );
  }
});

export default app;
