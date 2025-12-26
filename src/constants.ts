export const SITE_URL = "https://getmetadata.abhisheky495.workers.dev";
export const SITE_NAME = "GetMetadata";
export const SITE_DESCRIPTION =
  "Get metadata of a website including title, description, icon, og, etc.";
export const SITE_ICON = `${SITE_URL}/icon.png`;
export const SITE_OG_IMAGE = `${SITE_URL}/og-image.png`;

//

export const FETCH_TIMEOUT_MS = 10000;
export const USER_AGENT =
  "GetMetaDataBot/1.0 (https://getmetadata.abhisheky495.workers.dev)";

//

export const TITLE_ELEMENTS = ["head > title", "title"];
export const DESCRIPTION_ELEMENTS = [
  "head > meta[name='description']",
  "meta[property='og:description']",
  "meta[name='twitter:description']",
];
export const ICON_ELEMENTS = [
  "head > link[rel='icon']",
  "head > link[rel='shortcut icon']",
  "head > link[rel='apple-touch-icon']",
];

// Open Graph
export const OG_TITLE_ELEMENTS = [
  "head > meta[property='og:title']",
  "meta[property='og:title']",
];
export const OG_DESCRIPTION_ELEMENTS = [
  "head > meta[property='og:description']",
  "meta[property='og:description']",
];
export const OG_IMAGE_ELEMENTS = [
  "head > meta[property='og:image']",
  "meta[property='og:image']",
];

// Twitter
export const TWITTER_TITLE_ELEMENTS = [
  "head > meta[name='twitter:title']",
  "meta[name='twitter:title']",
];
export const TWITTER_DESCRIPTION_ELEMENTS = [
  "head > meta[name='twitter:description']",
  "meta[name='twitter:description']",
];
export const TWITTER_IMAGE_ELEMENTS = [
  "head > meta[name='twitter:image']",
  "meta[name='twitter:image']",
];
