import { fetchWithTimeout } from "./fetch-with-timeout";

export const fetchGoogleFavicon = async (domain: string) => {
  const domainUrl = `https://${domain}`;
  const googleFaviconUrl = `https://www.google.com/s2/favicons?domain_url=${domainUrl}&sz=128`;
  try {
    const googleFaviconResponse = await fetchWithTimeout(googleFaviconUrl);
    const googleFaviconBuffer = await googleFaviconResponse.arrayBuffer();
    const googleFaviconContentType =
      googleFaviconResponse.headers.get("content-type") ?? "image/png";
    return { googleFaviconBuffer, googleFaviconContentType };
  } catch (error) {
    return null;
  }
};
