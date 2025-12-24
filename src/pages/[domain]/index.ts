import type { APIRoute } from "astro";
import { USER_AGENT } from "../../utils/constants";
import { getDataFromHtml } from "../../utils/get-data-from-html";
import { fetchWithTimeout } from "../../utils/fetch-with-timeout";
import { cloudflareBrowserRendering } from "../../utils/cloudflare-browser-rendering";
import { doesMetadataHaveNull } from "../../utils/does-metadata-have-null-values";
import { mergeMetadata } from "../../utils/merge-metadata";

export const GET: APIRoute = async ({ params, locals }) => {
  try {
    const domain = params.domain!;

    const domainResponse = await fetchWithTimeout(`https://${domain}`, {
      headers: {
        "User-Agent": USER_AGENT,
      },
    });
    const domainBody = await domainResponse.text();
    let metadata = await getDataFromHtml(domainBody, domain);

    // If metadata is incomplete, try Cloudflare Browser Rendering
    if (doesMetadataHaveNull(metadata)) {
      console.log("Trying Cloudflare Browser Rendering");
      const browserRenderingResult = await cloudflareBrowserRendering(
        domain,
        // @ts-ignore
        locals?.runtime?.env
      );

      if (browserRenderingResult) {
        const browserMetadata = await getDataFromHtml(
          browserRenderingResult,
          domain
        );
        metadata = mergeMetadata(metadata, browserMetadata);
      }
    }

    // return new Response(domainBody);
    return new Response(
      JSON.stringify({
        status: "success",
        data: metadata,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
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
