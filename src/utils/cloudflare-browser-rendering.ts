import Cloudflare from "cloudflare";

export const cloudflareBrowserRendering = async (domain: string) => {
  try {
    const CLOUDFLARE_ACCOUNT_ID = import.meta.env.CLOUDFLARE_ACCOUNT_ID;
    const CLOUDFLARE_API_TOKEN = import.meta.env.CLOUDFLARE_API_TOKEN;

    if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
      throw new Error("Missing env");
    }

    const client = new Cloudflare({
      apiToken: CLOUDFLARE_API_TOKEN,
    });

    const content = await client.browserRendering.content.create({
      account_id: CLOUDFLARE_ACCOUNT_ID,
      url: `https://${domain}`,
    });

    return content;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong with Cloudflare Browser Rendering");
  }
};
