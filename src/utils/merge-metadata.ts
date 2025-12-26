import { Metadata } from "../../types";

export const mergeMetadata = (
  primary: Metadata,
  fallback: Metadata
): Metadata => ({
  title: primary.title ?? fallback.title,
  description: primary.description ?? fallback.description,
  icon: primary.icon ?? fallback.icon,
  og: {
    title: primary.og.title ?? fallback.og.title,
    description: primary.og.description ?? fallback.og.description,
    image: primary.og.image ?? fallback.og.image,
    twitterTitle: primary.og.twitterTitle ?? fallback.og.twitterTitle,
    twitterDescription:
      primary.og.twitterDescription ?? fallback.og.twitterDescription,
    twitterImage: primary.og.twitterImage ?? fallback.og.twitterImage,
  },
});
