import type { APIRoute } from "astro";
import { iconElements, invalidDomains } from "../../utils/constants";
import { isValidDomain } from "../../utils/is-valid-domain";
import { normalizeIconUrl } from "../../utils/normalize-icon-url";
import * as cheerio from "cheerio";

export const GET: APIRoute = async ({ params }) => {
  try {
    const domain = params.domain;
    let icon = null;

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

    for (const selector of iconElements) {
      const href = cheerioData(selector).attr("href");
      if (href) {
        icon = href;
        break;
      }
    }

    if (!icon) {
      const iconResponse = await fetch(
        `https://www.google.com/s2/favicons?domain_url=${domain}&sz=128`
      );
      const iconBuffer = Buffer.from(await iconResponse.arrayBuffer());
      return new Response(iconBuffer, {
        headers: { "Content-Type": "image/png" },
        status: 200,
      });
    }

    const iconUrl = normalizeIconUrl(icon, domain);
    const iconResponse = await fetch(iconUrl);
    const iconBuffer = Buffer.from(await iconResponse.arrayBuffer());

    let contentType = "image/png";
    if (iconUrl.endsWith(".svg")) {
      contentType = "image/svg+xml";
    } else if (iconUrl.endsWith(".ico")) {
      contentType = "image/x-icon";
    } else if (iconUrl.endsWith(".jpg") || iconUrl.endsWith(".jpeg")) {
      contentType = "image/jpeg";
    } else if (iconUrl.endsWith(".png")) {
      contentType = "image/png";
    } else if (iconUrl.endsWith(".webp")) {
      contentType = "image/webp";
    }

    return new Response(iconBuffer, {
      headers: { "Content-Type": contentType },
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
