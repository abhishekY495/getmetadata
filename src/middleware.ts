import { defineMiddleware } from "astro:middleware";
import { INVALID_DOMAINS } from "./utils/constants";
import { isValidDomain } from "./utils/is-valid-domain";

export const onRequest = defineMiddleware(async (context, next) => {
  const domain = context.params.domain;

  if (!domain) {
    return next();
  }

  const userIp = context.request.headers.get("CF-Connecting-IP") || "unknown";

  // @ts-ignore
  const { success } = await context.locals.runtime?.env.RATE_LIMITER.limit({
    key: userIp,
  });

  if (!success) {
    return new Response(
      JSON.stringify({
        status: "fail",
        error: `Rate limit exceeded for ${userIp}`,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 429,
      }
    );
  }

  if (INVALID_DOMAINS.includes(domain)) {
    return new Response(
      JSON.stringify({ status: "fail", error: "Invalid domain" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }

  if (!isValidDomain(domain)) {
    return new Response(
      JSON.stringify({ status: "fail", error: "Invalid domain format" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }

  return next();
});
