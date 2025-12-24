import type { APIRoute } from "astro";
import { ICON_ELEMENTS, USER_AGENT } from "../../utils/constants";
import { normalizeIconUrl } from "../../utils/normalize-icon-url";
import * as cheerio from "cheerio";

export const GET: APIRoute = async ({ params }) => {
  try {
    const domain = params.domain!;
    let icon = null;

    const domainResponse = await fetch(`https://${domain}`, {
      headers: {
        "User-Agent": USER_AGENT,
      },
    });
    const domainBody = await domainResponse.text();
    const cheerioData = cheerio.load(domainBody);

    for (const selector of ICON_ELEMENTS) {
      const href = cheerioData(selector).attr("href");
      if (href) {
        icon = href;
        break;
      }
    }

    if (!icon) {
      const iconResponse = await fetch(
        `https://www.google.com/s2/favicons?domain_url=${domain}&sz=128`,
        {
          headers: {
            "User-Agent": USER_AGENT,
          },
        }
      );
      const iconBuffer = await iconResponse.arrayBuffer();
      return new Response(iconBuffer, {
        headers: { "Content-Type": "image/png" },
        status: 200,
      });
    }

    const iconUrl = normalizeIconUrl(icon, domain);
    const iconResponse = await fetch(iconUrl, {
      headers: {
        "User-Agent": USER_AGENT,
      },
    });
    const iconBuffer = await iconResponse.arrayBuffer();

    const contentType = iconResponse.headers.get("content-type") ?? "image/png";

    return new Response(iconBuffer, {
      headers: { "Content-Type": contentType },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        status: "fail",
        error: (error as Error).message ?? "Something went wrong",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
};
