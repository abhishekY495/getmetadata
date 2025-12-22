export const invalidDomains = ["favicon.ico", "robots.txt", "sitemap.xml"];

export const titleElements = ["head > title", "title"];

export const descriptionElements = [
  "head > meta[name='description']",
  "meta[property='og:description']",
  "meta[name='twitter:description']",
];

export const iconElements = [
  "head > link[rel='icon']",
  "head > link[rel='shortcut icon']",
];

// Open Graph
export const ogTitleElements = [
  "head > meta[property='og:title']",
  "meta[property='og:title']",
];
export const ogDescriptionElements = [
  "head > meta[property='og:description']",
  "meta[property='og:description']",
];
export const ogImageElements = [
  "head > meta[property='og:image']",
  "meta[property='og:image']",
];

// Twitter
export const twitterTitleElements = [
  "head > meta[name='twitter:title']",
  "meta[name='twitter:title']",
];
export const twitterDescriptionElements = [
  "head > meta[name='twitter:description']",
  "meta[name='twitter:description']",
];
export const twitterImageElements = [
  "head > meta[name='twitter:image']",
  "meta[name='twitter:image']",
];
