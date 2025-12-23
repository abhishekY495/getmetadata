import type { APIRoute } from "astro";
import { invalidDomains, ogImageElements } from "../../utils/constants";
import { isValidDomain } from "../../utils/is-valid-domain";
import * as cheerio from "cheerio";

export const GET: APIRoute = async ({ params }) => {
  try {
    const domain = params.domain;
    let ogImage = null;

    if (!domain) {
      return new Response(JSON.stringify({ error: "Domain is required" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    if (invalidDomains.includes(domain)) {
      return new Response(JSON.stringify({ error: "Invalid domain" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    if (!isValidDomain(domain)) {
      return new Response(JSON.stringify({ error: "Invalid domain format" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    const domainResponse = await fetch(`https://${domain}`);
    const domainBody = await domainResponse.text();
    const cheerioData = cheerio.load(domainBody);

    for (const selector of ogImageElements) {
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

    const imageResponse = await fetch(ogImage);
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    return new Response(imageBuffer, {
      headers: { "Content-Type": "image/png" },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ status: "fail", error: "Something went wrong" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
};
