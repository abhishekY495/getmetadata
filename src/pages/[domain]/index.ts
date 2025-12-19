import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
  try {
    const domain = params.domain;

    const domainResponse = await fetch(`https://${domain}`);

    const domainBody = await domainResponse.text();
    const domainTitle = domainBody.match(/<title>(.*?)<\/title>/)?.[1];
    const domainDescription = domainBody.match(
      /<meta name="description" content="(.*?)"/
    )?.[1];
    const domainImage = domainBody.match(
      /<meta property="og:image" content="(.*?)"/
    )?.[1];
    const domainUrl = domainBody.match(
      /<meta property="og:url" content="(.*?)"/
    )?.[1];

    return new Response(
      JSON.stringify({
        title: domainTitle,
        description: domainDescription,
        image: domainImage,
        url: domainUrl,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Invalid domain", details: error }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
};
