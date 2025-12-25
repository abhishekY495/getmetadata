import { defineMiddleware } from "astro:middleware";
import { INVALID_DOMAINS } from "./utils/constants";
import { isValidDomain } from "./utils/is-valid-domain";
import { checkRateLimit, getClientIdentifier } from "./utils/rate-limiter";

export const onRequest = defineMiddleware(async (context, next) => {
  const domain = context.params.domain;

  if (!domain) {
    return next();
  }

  // Check rate limit for API endpoints
  const clientId = getClientIdentifier(context.request);
  const rateLimitResult = checkRateLimit(clientId);

  console.log(123, clientId);
  console.log(456, rateLimitResult);

  if (rateLimitResult.isLimited) {
    const retryAfter = Math.ceil(
      (rateLimitResult.resetTime - Date.now()) / 1000
    );

    return new Response(
      JSON.stringify({
        status: "fail",
        error: "Rate limit exceeded",
        message: `Too many requests. Please try again in ${retryAfter} seconds.`,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Limit": rateLimitResult.limit.toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": new Date(
            rateLimitResult.resetTime
          ).toISOString(),
          "Retry-After": retryAfter.toString(),
        },
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

  //Add rate limit headers
  const response = await next();

  const newHeaders = new Headers(response.headers);
  newHeaders.set("X-RateLimit-Limit", rateLimitResult.limit.toString());
  newHeaders.set("X-RateLimit-Remaining", rateLimitResult.remaining.toString());
  newHeaders.set(
    "X-RateLimit-Reset",
    new Date(rateLimitResult.resetTime).toISOString()
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
});
