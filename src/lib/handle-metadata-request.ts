import { Context } from "hono";
import { fetchWithTimeout } from "../utils/fetch-with-timeout";
import { getDataFromHtml } from "../utils/get-data-from-html";
import { doesMetadataHaveNull } from "../utils/does-metadata-have-null-values";
import { fetchFromCfBrowserRendering } from "../utils/fetch-from-cf-browser-rendering";
import { mergeMetadata } from "../utils/merge-metadata";

export const handleMetadataRequest = async (c: Context) => {
  try {
    const domain = c.req.param("domain");
    const domainUrl = `https://${domain}`;
    let metadata = null;

    const domainResponse = await fetchWithTimeout(domainUrl);
    const domainBody = await domainResponse.text();

    metadata = await getDataFromHtml(domainBody, domain);

    // if metadata has null values, use Cloudflare Browser Rendering
    if (doesMetadataHaveNull(metadata)) {
      console.log("Using Cloudflare Browser Rendering");
      const CLOUDFLARE_API_TOKEN = c.env.CLOUDFLARE_API_TOKEN;
      const CLOUDFLARE_ACCOUNT_ID = c.env.CLOUDFLARE_ACCOUNT_ID;
      const content = await fetchFromCfBrowserRendering(
        domainUrl,
        CLOUDFLARE_API_TOKEN,
        CLOUDFLARE_ACCOUNT_ID
      );
      if (content) {
        const cfMetadata = await getDataFromHtml(content, domain);
        metadata = mergeMetadata(metadata, cfMetadata);
      }
    }

    return c.json({ status: "success", metadata }, 200, {
      "Content-Type": "application/json",
    });
  } catch (error) {
    console.error(error as Error);

    if ((error as Error).name === "AbortError") {
      return c.json(
        { status: "error", error: "Took too long to respond" },
        504
      );
    }

    return c.json(
      {
        status: "error",
        error: (error as Error).message ?? "Internal server error",
      },
      500
    );
  }
};
