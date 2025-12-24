import type { APIRoute } from "astro";
import { INVALID_DOMAINS, USER_AGENT } from "../../utils/constants";
import { isValidDomain } from "../../utils/is-valid-domain";
import { getDataFromHtml } from "../../utils/get-data-from-html";

export const GET: APIRoute = async ({ params }) => {
  try {
    const domain = params.domain;

    if (!domain) {
      return new Response(
        JSON.stringify({ status: "fail", error: "Domain is required" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
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

    const domainResponse = await fetch(`https://${domain}`, {
      headers: {
        "User-Agent": USER_AGENT,
      },
    });
    const domainBody = await domainResponse.text();

    const metadata = await getDataFromHtml(domainBody, domain);

    // return new Response(domainBody);
    return new Response(
      JSON.stringify({
        status: "success",
        data: metadata,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ status: "fail", error: error }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
};
