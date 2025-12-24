import { defineMiddleware } from "astro:middleware";
import { INVALID_DOMAINS } from "./utils/constants";
import { isValidDomain } from "./utils/is-valid-domain";

export const onRequest = defineMiddleware((context, next) => {
  const domain = context.params.domain;

  if (!domain) {
    return next();
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
