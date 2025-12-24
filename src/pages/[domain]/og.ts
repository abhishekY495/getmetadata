import type { APIRoute } from "astro";
import { OG_IMAGE_ELEMENTS, USER_AGENT } from "../../utils/constants";
import * as cheerio from "cheerio";

export const GET: APIRoute = async ({ params }) => {
  try {
    const domain = params.domain!;
    let ogImage = null;

    const domainResponse = await fetch(`https://${domain}`, {
      headers: {
        "User-Agent": USER_AGENT,
      },
    });
    const domainBody = await domainResponse.text();
    const cheerioData = cheerio.load(domainBody);

    for (const selector of OG_IMAGE_ELEMENTS) {
      const href = cheerioData(selector).attr("content");
      if (href) {
        ogImage = href;
        break;
      }
    }

    if (!ogImage) {
      return new Response(JSON.stringify({ status: "success", data: null }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    const imageResponse = await fetch(ogImage, {
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
