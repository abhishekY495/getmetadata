import { Context, Next } from "hono";
import { isValidURL } from "../utils/is-valid-url";

export const middleware = async (c: Context, next: Next) => {
  const domain = c.req.param("domain");
  const CLOUDFLARE_ACCOUNT_ID = c.env?.CLOUDFLARE_ACCOUNT_ID;
  const CLOUDFLARE_API_TOKEN = c.env?.CLOUDFLARE_API_TOKEN;

  if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
    return c.json({ status: "error", error: "ENV variables are not set" }, 500);
  }

  if (!domain) {
    return c.json({ status: "error", error: "Domain is required" }, 400);
  }

  if (!isValidURL(domain)) {
    return c.json({ status: "error", error: "Invalid domain" }, 400);
  }

  await next();
};
