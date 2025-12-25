export const INVALID_DOMAINS = ["favicon.ico", "robots.txt", "sitemap.xml"];

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

//
export const USER_AGENT = "GetMetaDataBot/1.0 (https://getmetadata.pages.dev)";

export const FALLBACK_OG_IMAGE_URL =
  "https://getmetadata.pages.dev/og-image.png";

// Rate Limiting
export const RATE_LIMIT_MAX_REQUESTS = 5;
export const RATE_LIMIT_WINDOW_SECONDS = 60;