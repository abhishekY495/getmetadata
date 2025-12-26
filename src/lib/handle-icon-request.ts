import { Context } from "hono";
import { fetchWithTimeout } from "../utils/fetch-with-timeout";
import { ICON_BUFFER, ICON_ELEMENTS } from "../utils/constants";
import * as cheerio from "cheerio";
import { normalizeIconUrl } from "../utils/normalize-icon-url";
import { fetchGoogleFavicon } from "../utils/fetch-google-favicon";
import { base64ToArrayBuffer } from "../utils/base64-to-arraybuffer";

export const handleIconRequest = async (c: Context) => {
  const domain = c.req.param("domain");
  const domainUrl = `https://${domain}`;
  let icon = null;

  try {
    const domainResponse = await fetchWithTimeout(domainUrl);
    const domainBody = await domainResponse.text();

    const $ = cheerio.load(domainBody);
    for (const selector of ICON_ELEMENTS) {
      const href = $(selector).attr("href");
      if (href) {
        icon = href;
        break;
      }
    }

    if (!icon) {
      const googleFavicon = await fetchGoogleFavicon(domain);
      if (googleFavicon) {
        return c.body(googleFavicon.googleFaviconBuffer, 200, {
          "Content-Type": googleFavicon.googleFaviconContentType,
        });
      } else {
        return c.body(base64ToArrayBuffer(ICON_BUFFER), 200, {
          "Content-Type": "image/png",
        });
      }
    }

    const iconUrl = normalizeIconUrl(icon, domain);
    const iconResponse = await fetchWithTimeout(iconUrl);
    const iconBuffer = await iconResponse.arrayBuffer();
    const contentType = iconResponse.headers.get("content-type") ?? "image/png";

    return c.body(iconBuffer, 200, {
      "Content-Type": contentType,
    });
  } catch (error) {
    return c.body(base64ToArrayBuffer(ICON_BUFFER), 200, {
      "Content-Type": "image/png",
    });
  }
};
