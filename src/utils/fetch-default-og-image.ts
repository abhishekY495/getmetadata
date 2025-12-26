import { fetchWithTimeout } from "./fetch-with-timeout";
import { SITE_OG_IMAGE } from "./constants";

export const fetchDefaultOgImage = async () => {
  try {
    const defaultOgImageResponse = await fetchWithTimeout(SITE_OG_IMAGE);
    const defaultOgImageBuffer = await defaultOgImageResponse.arrayBuffer();
    return defaultOgImageBuffer;
  } catch (error) {
    return null;
  }
};
