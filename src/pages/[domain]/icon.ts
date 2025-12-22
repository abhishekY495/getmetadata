import type { APIRoute } from "astro";
// import Cloudflare from "cloudflare";

export const GET: APIRoute = async ({ params }) => {
  try {
    const CLOUDFLARE_ACCOUNT_ID = import.meta.env.CLOUDFLARE_ACCOUNT_ID;
    const CLOUDFLARE_API_TOKEN = import.meta.env.CLOUDFLARE_API_TOKEN;

    if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
      return new Response(
        JSON.stringify({ error: "Missing environment variables" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    const domain = params.domain;

    // const client = new Cloudflare({
    //   apiToken: CLOUDFLARE_API_TOKEN,
    // });

    // const content = await client.browserRendering.content.create({
    //   account_id: CLOUDFLARE_ACCOUNT_ID,
    //   url: `https://${domain}`,
    // });

    // const content = await client.browserRendering.scrape.create({
    //   userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    //   account_id: CLOUDFLARE_ACCOUNT_ID,
    //   url: `https://${domain}`,
    //   elements: [
    //     {
    //       selector: "h1",
    //     },
    //   ],
    // });

    const content = await fetch(`https://${domain}`).then((res) => res.text());

    console.log(content);

    return new Response(JSON.stringify(content), {
      headers: { "Content-Type": "application/json" },
    });

    // const iconResponse = await fetch(
    //   `https://www.google.com/s2/favicons?domain_url=${domain}&sz=128`
    // );
    // const iconBuffer = Buffer.from(await iconResponse.arrayBuffer());

    // return new Response(iconBuffer, {
    //   headers: { "Content-Type": "image/png" },
    // });
  } catch (error) {
    // console.error(321, error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
};
