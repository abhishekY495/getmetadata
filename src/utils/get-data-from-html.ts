import { Metadata } from "../../types";
import {
  DESCRIPTION_ELEMENTS,
  ICON_ELEMENTS,
  OG_DESCRIPTION_ELEMENTS,
  OG_IMAGE_ELEMENTS,
  OG_TITLE_ELEMENTS,
  TITLE_ELEMENTS,
  TWITTER_DESCRIPTION_ELEMENTS,
  TWITTER_IMAGE_ELEMENTS,
  TWITTER_TITLE_ELEMENTS,
} from "./constants";
import { normalizeIconUrl } from "./normalize-icon-url";
import * as cheerio from "cheerio";

export const getDataFromHtml = async (
  html: string,
  domain: string
): Promise<Metadata> => {
  const $ = cheerio.load(html);

  let title = null;
  let description = null;
  let icon = null;
  let ogTitle = null;
  let ogDescription = null;
  let ogImage = null;
  let twitterTitle = null;
  let twitterDescription = null;
  let twitterImage = null;

  for (const selector of TITLE_ELEMENTS) {
    const text = $(selector).text();
    if (text) {
      title = text;
      break;
    }
  }
  for (const selector of DESCRIPTION_ELEMENTS) {
    const text = $(selector).attr("content");
    if (text) {
      description = text;
      break;
    }
  }
  for (const selector of ICON_ELEMENTS) {
    const href = $(selector).attr("href");
    if (href) {
      icon = normalizeIconUrl(href, domain);
      break;
    }
  }

  for (const selector of OG_TITLE_ELEMENTS) {
    const text = $(selector).attr("content");
    if (text) {
      ogTitle = text;
      break;
    }
  }
  for (const selector of OG_DESCRIPTION_ELEMENTS) {
    const text = $(selector).attr("content");
    if (text) {
      ogDescription = text;
      break;
    }
  }
  for (const selector of OG_IMAGE_ELEMENTS) {
    const text = $(selector).attr("content");
    if (text) {
      ogImage = normalizeIconUrl(text, domain);
      break;
    }
  }

  for (const selector of TWITTER_TITLE_ELEMENTS) {
    const text = $(selector).attr("content");
    if (text) {
      twitterTitle = text;
      break;
    }
  }
  for (const selector of TWITTER_DESCRIPTION_ELEMENTS) {
    const text = $(selector).attr("content");
    if (text) {
      twitterDescription = text;
      break;
    }
  }
  for (const selector of TWITTER_IMAGE_ELEMENTS) {
    const text = $(selector).attr("content");
    if (text) {
      twitterImage = normalizeIconUrl(text, domain);
      break;
    }
  }

  return {
    title,
    description,
    icon,
    og: {
      title: ogTitle,
      description: ogDescription,
      image: ogImage,
      twitterTitle: twitterTitle,
      twitterDescription: twitterDescription,
      twitterImage: twitterImage,
    },
  };
};
