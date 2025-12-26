import defaultOgImage from "../../public/og-image.png";

export const fetchDefaultOgImage = async (baseUrl: string) => {
  try {
    const url = new URL(defaultOgImage, baseUrl);
    console.log("Fetching default og image", url.toString());
    const defaultOgImageResponse = await fetch(url.toString());
    const defaultOgImageBuffer = await defaultOgImageResponse.arrayBuffer();
    return defaultOgImageBuffer;
  } catch (error) {
    console.log("Error fetching default og image", error);
    return null;
  }
};
