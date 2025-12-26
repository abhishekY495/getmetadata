import { Context, Next } from "hono";
import { isValidURL } from "../utils/is-valid-url";
import { Bindings } from "../../types";

export const middleware = async (
  c: Context<{ Bindings: Bindings }>,
  next: Next
) => {
  const domain = c.req.param("domain");
  const CLOUDFLARE_ACCOUNT_ID = c.env.CLOUDFLARE_ACCOUNT_ID;
  const CLOUDFLARE_API_TOKEN = c.env.CLOUDFLARE_API_TOKEN;
  const RATE_LIMITER = c.env.RATE_LIMITER;

  if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
    return c.json({ status: "error", error: "ENV variables are not set" }, 500);
  }

  if (!RATE_LIMITER) {
    return c.json(
      { status: "error", error: "Rate limiter not configured" },
      500
    );
  }

  const userIp = c.req.header("CF-Connecting-IP") || "unknown";
  const { success } = await RATE_LIMITER.limit({
    key: userIp,
  });

  if (!success) {
    return c.json(
      {
        status: "error",
        error: `${
          userIp !== "unknown" ? userIp : "Unauthorized"
        } - Rate limit exceeded`,
      },
      429
    );
  }

  if (!domain) {
    return c.json({ status: "error", error: "Domain is required" }, 400);
  }

  if (!isValidURL(domain)) {
    return c.json({ status: "error", error: "Invalid domain" }, 400);
  }

  await next();
};
