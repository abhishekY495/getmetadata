import { Context } from "hono";
import {
  OG_IMAGE_ELEMENTS,
  SITE_OG_IMAGE,
  TWITTER_IMAGE_ELEMENTS,
} from "../constants";
import { fetchWithTimeout } from "../utils/fetch-with-timeout";
import * as cheerio from "cheerio";
import { fetchDefaultOgImage } from "../utils/fetch-default-og-image";

export const handleOgRequest = async (
  c: Context,
  isTwitterOg: boolean = false
) => {
  const domain = c.req.param("domain");
  const domainUrl = `https://${domain}`;
  let ogImage = null;

  try {
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
      const defaultOgImage = await fetchDefaultOgImage();
      if (defaultOgImage) {
        return c.body(defaultOgImage, 200, {
          "Content-Type": "image/png",
        });
      } else {
        return c.redirect(SITE_OG_IMAGE, 302);
      }
    }

    const ogImageResponse = await fetchWithTimeout(ogImage);
    const ogImageBuffer = await ogImageResponse.arrayBuffer();
    const contentType =
      ogImageResponse.headers.get("content-type") ?? "image/png";
    return c.body(ogImageBuffer, 200, {
      "Content-Type": contentType,
    });
  } catch (error) {
    const defaultOgImage = await fetchDefaultOgImage();
    if (defaultOgImage) {
      return c.body(defaultOgImage, 200, {
        "Content-Type": "image/png",
      });
    } else {
      return c.redirect(SITE_OG_IMAGE, 302);
    }
  }
};
