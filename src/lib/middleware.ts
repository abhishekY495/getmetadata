import { Context, Next } from "hono";
import { isValidURL } from "../utils/is-valid-url";

export const middleware = async (c: Context, next: Next) => {
  const domain = c.req.param("domain");

  if (!domain) {
    return c.json({ status: "error", error: "Domain is required" }, 400);
  }

  if (!isValidURL(domain)) {
    return c.json({ status: "error", error: "Invalid domain" }, 400);
  }

  await next();
};
