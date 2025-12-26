import Cloudflare from "cloudflare";

export const fetchFromCfBrowserRendering = async (
  domainUrl: string,
  CLOUDFLARE_API_TOKEN: string,
  CLOUDFLARE_ACCOUNT_ID: string
) => {
  try {
    const client = new Cloudflare({
      apiToken: CLOUDFLARE_API_TOKEN,
    });

    const content = await client.browserRendering.content.create({
      account_id: CLOUDFLARE_ACCOUNT_ID,
      url: domainUrl,
    });

    return content;
  } catch (error) {
    throw new Error(
      (error as Error).message ??
        "Something went wrong with Cloudflare Browser Rendering"
    );
  }
};
