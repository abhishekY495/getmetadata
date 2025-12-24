import type { APIRoute } from "astro";
import { USER_AGENT } from "../../utils/constants";
import { getDataFromHtml } from "../../utils/get-data-from-html";

export const GET: APIRoute = async ({ params }) => {
  try {
    const domain = params.domain!;

    const domainResponse = await fetch(`https://${domain}`, {
      headers: {
        "User-Agent": USER_AGENT,
      },
    });
    const domainBody = await domainResponse.text();

    const metadata = await getDataFromHtml(domainBody, domain);

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
