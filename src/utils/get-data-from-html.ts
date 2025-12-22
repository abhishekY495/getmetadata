import * as cheerio from "cheerio";
import type { Metadata } from "../types";
import {
  descriptionElements,
  iconElements,
  ogDescriptionElements,
  ogImageElements,
  ogTitleElements,
  titleElements,
  twitterDescriptionElements,
  twitterImageElements,
  twitterTitleElements,
} from "./constants";

export const getDataFromHtml = async (html: string): Promise<Metadata> => {
  const cheerioData = cheerio.load(html);

  let title = null;
  let description = null;
  let icon = null;
  let ogTitle = null;
  let ogDescription = null;
  let ogImage = null;
  let twitterTitle = null;
  let twitterDescription = null;
  let twitterImage = null;

  for (const selector of titleElements) {
    const text = cheerioData(selector).text();
    if (text) {
      title = text;
      break;
    }
  }
  for (const selector of descriptionElements) {
    const text = cheerioData(selector).attr("content");
    if (text) {
      description = text;
      break;
    }
  }
  for (const selector of iconElements) {
    const href = cheerioData(selector).attr("href");
    if (href) {
      icon = href;
      break;
    }
  }

  for (const selector of ogTitleElements) {
    const text = cheerioData(selector).attr("content");
    if (text) {
      ogTitle = text;
      break;
    }
  }
  for (const selector of ogDescriptionElements) {
    const text = cheerioData(selector).attr("content");
    if (text) {
      ogDescription = text;
      break;
    }
  }
  for (const selector of ogImageElements) {
    const text = cheerioData(selector).attr("content");
    if (text) {
      ogImage = text;
      break;
    }
  }

  for (const selector of twitterTitleElements) {
    const text = cheerioData(selector).attr("content");
    if (text) {
      twitterTitle = text;
      break;
    }
  }
  for (const selector of twitterDescriptionElements) {
    const text = cheerioData(selector).attr("content");
    if (text) {
      twitterDescription = text;
      break;
    }
  }
  for (const selector of twitterImageElements) {
    const text = cheerioData(selector).attr("content");
    if (text) {
      twitterImage = text;
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
