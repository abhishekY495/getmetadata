import { fetchWithTimeout } from "./fetch-with-timeout";
import { SITE_OG_IMAGE } from "../constants";

export const fetchDefaultOgImage = async () => {
  try {
    console.log("Fetching default og image", SITE_OG_IMAGE);
    const defaultOgImageResponse = await fetchWithTimeout(SITE_OG_IMAGE);
    const defaultOgImageBuffer = await defaultOgImageResponse.arrayBuffer();
    return defaultOgImageBuffer;
  } catch (error) {
    console.log("Error fetching default og image", error);
    return null;
  }
};
