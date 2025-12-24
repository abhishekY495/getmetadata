import type { APIRoute } from "astro";
import {
  FALLBACK_OG_IMAGE_URL,
  TWITTER_IMAGE_ELEMENTS,
  USER_AGENT,
} from "../../utils/constants";
import { fetchWithTimeout } from "../../utils/fetch-with-timeout";
import * as cheerio from "cheerio";
import { isValidDomain } from "../../utils/is-valid-domain";

export const GET: APIRoute = async ({ params, url }) => {
  try {
    const domain = params.domain!;
    const fallback = url.searchParams.get("fallback");

    let twitterImage = null;

    const domainResponse = await fetchWithTimeout(`https://${domain}`, {
      headers: {
        "User-Agent": USER_AGENT,
      },
    });
    const domainBody = await domainResponse.text();
    const cheerioData = cheerio.load(domainBody);

    for (const selector of TWITTER_IMAGE_ELEMENTS) {
      const href = cheerioData(selector).attr("content");
      if (href) {
        twitterImage = href;
        break;
      }
    }

    if (!twitterImage) {
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

        const twitterImageResponse = await fetchWithTimeout(fallback, {
          headers: { "User-Agent": USER_AGENT },
        });
        const twitterImageBuffer = await twitterImageResponse.arrayBuffer();
        return new Response(twitterImageBuffer, {
          headers: { "Content-Type": "image/png" },
          status: 200,
        });
      }

      // Default: use fallback image
      const twitterImageResponse = await fetchWithTimeout(
        FALLBACK_OG_IMAGE_URL,
        {
          headers: { "User-Agent": USER_AGENT },
        }
      );
      const twitterImageBuffer = await twitterImageResponse.arrayBuffer();
      return new Response(twitterImageBuffer, {
        headers: { "Content-Type": "image/png" },
        status: 200,
      });
    }

    const imageResponse = await fetchWithTimeout(twitterImage, {
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
