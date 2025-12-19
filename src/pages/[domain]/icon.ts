import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
  try {
    const domain = params.domain;

    const iconResponse = await fetch(
      `https://www.google.com/s2/favicons?domain_url=${domain}&sz=128`
    );
    const iconBuffer = Buffer.from(await iconResponse.arrayBuffer());

    return new Response(iconBuffer, {
      headers: { "Content-Type": "image/png" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
};
