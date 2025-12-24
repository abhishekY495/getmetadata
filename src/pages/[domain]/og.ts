import type { APIRoute } from "astro";
import {
  INVALID_DOMAINS,
  OG_IMAGE_ELEMENTS,
  USER_AGENT,
} from "../../utils/constants";
import { isValidDomain } from "../../utils/is-valid-domain";
import * as cheerio from "cheerio";

export const GET: APIRoute = async ({ params }) => {
  try {
    const domain = params.domain;
    let ogImage = null;

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
    const cheerioData = cheerio.load(domainBody);

    for (const selector of OG_IMAGE_ELEMENTS) {
      const href = cheerioData(selector).attr("content");
      if (href) {
        ogImage = href;
        break;
      }
    }

    if (!ogImage) {
      return new Response(JSON.stringify({ status: "success", data: null }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    const imageResponse = await fetch(ogImage, {
      headers: {
        "User-Agent": USER_AGENT,
      },
    });
    const imageBuffer = await imageResponse.arrayBuffer();

    const contentType =
      imageResponse.headers.get("content-type") ?? "image/png";

    return new Response(imageBuffer, {
      headers: { "Content-Type": contentType },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ status: "fail", error: error }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
};
