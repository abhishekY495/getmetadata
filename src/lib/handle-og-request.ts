import { Context } from "hono";
import {
  OG_IMAGE_ELEMENTS,
  SITE_OG_IMAGE,
  TWITTER_IMAGE_ELEMENTS,
} from "../constants";
import { fetchWithTimeout } from "../utils/fetch-with-timeout";
import * as cheerio from "cheerio";
import { fetchDefaultOgImage } from "../utils/fetch-default-og-image";
import { isValidURL } from "../utils/is-valid-url";

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
        console.log("Fallback URL is invalid");
        return c.json({ status: "error", error: "Invalid fallback URL" }, 400);
      }
      console.log("Fallback URL is valid");
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
      console.log("No og image found");
      if (fallback) {
        console.log("Using fallback URL");
        const fallbackResponse = await fetchWithTimeout(fallback);
        const contentType =
          fallbackResponse.headers.get("content-type") ?? "image/png";

        if (!contentType.startsWith("image/")) {
          console.log("Fallback URL is not an image");
          return c.json(
            {
              status: "error",
              error: "Invalid fallback URL (must be an image)",
            },
            400
          );
        }

        console.log("Using fallback URL");
        const fallbackBuffer = await fallbackResponse.arrayBuffer();
        return c.body(fallbackBuffer, 200, {
          "Content-Type": contentType,
        });
      }

      console.log("No fallback URL, using default og image");
      const defaultOgImage = await fetchDefaultOgImage();
      if (defaultOgImage) {
        console.log("Default og image found");
        return c.body(defaultOgImage, 200, {
          "Content-Type": "image/png",
        });
      } else {
        console.log(
          "No default og image found, redirecting to default og image"
        );
        return c.redirect(SITE_OG_IMAGE, 302);
      }
    }

    console.log("Using og image");
    const ogImageResponse = await fetchWithTimeout(ogImage);
    const ogImageBuffer = await ogImageResponse.arrayBuffer();
    const contentType =
      ogImageResponse.headers.get("content-type") ?? "image/png";
    return c.body(ogImageBuffer, 200, {
      "Content-Type": contentType,
    });
  } catch (error) {
    console.log("Error fetching og image");
    if ((error as Error).name === "AbortError") {
      return c.json(
        { status: "error", error: "Took too long to respond" },
        504
      );
    }

    if (fallback) {
      console.log("error - Using fallback URL");
      const fallbackResponse = await fetchWithTimeout(fallback);
      const contentType =
        fallbackResponse.headers.get("content-type") ?? "image/png";

      if (!contentType.startsWith("image/")) {
        console.log("error - Fallback URL is not an image");
        return c.json(
          {
            status: "error",
            error: "Invalid fallback URL (must be an image)",
          },
          400
        );
      }

      console.log("error - Using fallback URL");
      const fallbackBuffer = await fallbackResponse.arrayBuffer();
      return c.body(fallbackBuffer, 200, {
        "Content-Type": contentType,
      });
    } else {
      console.log("error - No fallback URL, using default og image");
      const defaultOgImage = await fetchDefaultOgImage();
      if (defaultOgImage) {
        console.log("error - Default og image found");
        return c.body(defaultOgImage, 200, {
          "Content-Type": "image/png",
        });
      } else {
        console.log(
          "error - No default og image found, redirecting to default og image"
        );
        return c.redirect(SITE_OG_IMAGE, 302);
      }
    }
  }
};
