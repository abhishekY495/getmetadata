import type { APIRoute } from "astro";
import { ICON_ELEMENTS, USER_AGENT } from "../../utils/constants";
import { normalizeIconUrl } from "../../utils/normalize-icon-url";
import { fetchWithTimeout } from "../../utils/fetch-with-timeout";
import * as cheerio from "cheerio";
import { isValidDomain } from "../../utils/is-valid-domain";

export const GET: APIRoute = async ({ params, url }) => {
  try {
    const domain = params.domain!;
    const fallback = url.searchParams.get("fallback");

    let icon = null;

    const domainResponse = await fetchWithTimeout(`https://${domain}`, {
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
      // Use custom fallback if provided and valid
      if (fallback && fallback.length > 0) {
        const isFallbackValid = isValidDomain(fallback);
        if (!isFallbackValid) {
          return new Response(
            JSON.stringify({
              status: "fail",
              error: "Invalid fallback domain",
            }),
            {
              headers: { "Content-Type": "application/json" },
              status: 400,
            }
          );
        }

        const iconResponse = await fetchWithTimeout(fallback, {
          headers: { "User-Agent": USER_AGENT },
        });
        const iconBuffer = await iconResponse.arrayBuffer();
        return new Response(iconBuffer, {
          headers: { "Content-Type": "image/png" },
          status: 200,
        });
      }

      // Default: use Google's favicon service
      const iconResponse = await fetchWithTimeout(
        `https://www.google.com/s2/favicons?domain_url=${domain}&sz=128`,
        {
          headers: { "User-Agent": USER_AGENT },
        }
      );
      const iconBuffer = await iconResponse.arrayBuffer();
      return new Response(iconBuffer, {
        headers: { "Content-Type": "image/png" },
        status: 200,
      });
    }

    const iconUrl = normalizeIconUrl(icon, domain);
    const iconResponse = await fetchWithTimeout(iconUrl, {
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

    if ((error as Error).name === "AbortError") {
      return new Response(
        JSON.stringify({
          status: "fail",
          error: "Took too long to respond",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 504,
        }
      );
    }

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
