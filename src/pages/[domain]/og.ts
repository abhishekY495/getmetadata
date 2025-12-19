import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
  try {
    const domain = params.domain;

    const domainResponse = await fetch(`https://${domain}`);
    const domainBody = await domainResponse.text();

    const domainImage = domainBody.match(
      /<meta property="og:image" content="(.*?)"/
    )?.[1];

    if (!domainImage) {
      return new Response(null, {
        headers: { "Content-Type": "image/png" },
        status: 400,
      });
    }

    const imageResponse = await fetch(domainImage);
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    return new Response(imageBuffer, {
      headers: { "Content-Type": "image/png" },
    });
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
