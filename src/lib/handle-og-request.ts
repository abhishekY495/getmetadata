import { Context } from "hono";
import {
  OG_IMAGE_BUFFER,
  OG_IMAGE_ELEMENTS,
  TWITTER_IMAGE_ELEMENTS,
} from "../utils/constants";
import { fetchWithTimeout } from "../utils/fetch-with-timeout";
import * as cheerio from "cheerio";
import { isValidURL } from "../utils/is-valid-url";
import { base64ToArrayBuffer } from "../utils/base64-to-arraybuffer";
import { normalizeUrl } from "../utils/normalize-url";

export const handleOgRequest = async (
  c: Context,
  isTwitterOg: boolean = false
) => {
  const domain = c.req.param("domain");
  const fallback = c.req.query("fallback") ?? false;

  const domainUrl = `https://${domain}`;
  let ogImage = null;

  try {
    if (fallback) {
      if (!isValidURL(fallback)) {
        return c.json({ status: "error", error: "Invalid fallback URL" }, 400);
      }
    }

    const domainResponse = await fetchWithTimeout(domainUrl);
    const domainBody = await domainResponse.text();

    const $ = cheerio.load(domainBody);
    for (const selector of isTwitterOg
      ? TWITTER_IMAGE_ELEMENTS
      : OG_IMAGE_ELEMENTS) {
      const href = $(selector).attr("content");
      if (href) {
        ogImage = href;
        break;
      }
    }

    if (!ogImage) {
      if (fallback) {
        const fallbackResponse = await fetchWithTimeout(fallback);
        const contentType =
          fallbackResponse.headers.get("content-type") ?? "image/png";

        if (!contentType.startsWith("image/")) {
          return c.json(
            {
              status: "error",
              error: "Invalid fallback URL (must be an image)",
            },
            400
          );
        }

        const fallbackBuffer = await fallbackResponse.arrayBuffer();
        return c.body(fallbackBuffer, 200, {
          "Content-Type": contentType,
        });
      }

      return c.body(base64ToArrayBuffer(OG_IMAGE_BUFFER), 200, {
        "Content-Type": "image/png",
      });
    }

    const ogImageUrl = normalizeUrl(ogImage, domain);
    const ogImageResponse = await fetchWithTimeout(ogImageUrl);
    const ogImageBuffer = await ogImageResponse.arrayBuffer();
    const contentType =
      ogImageResponse.headers.get("content-type") ?? "image/png";
    return c.body(ogImageBuffer, 200, {
      "Content-Type": contentType,
    });
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      return c.json(
        { status: "error", error: "Took too long to respond" },
        504
      );
    }

    if (fallback) {
      const fallbackResponse = await fetchWithTimeout(fallback);
      const contentType =
        fallbackResponse.headers.get("content-type") ?? "image/png";

      if (!contentType.startsWith("image/")) {
        return c.json(
          {
            status: "error",
            error: "Invalid fallback URL (must be an image)",
          },
          400
        );
      }

      const fallbackBuffer = await fallbackResponse.arrayBuffer();
      return c.body(fallbackBuffer, 200, {
        "Content-Type": contentType,
      });
    } else {
      return c.body(base64ToArrayBuffer(OG_IMAGE_BUFFER), 200, {
        "Content-Type": "image/png",
      });
    }
  }
};
