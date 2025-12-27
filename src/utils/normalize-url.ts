export const normalizeUrl = (iconUrl: string, domain: string): string => {
  if (iconUrl.startsWith("https://")) {
    return iconUrl;
  }

  if (iconUrl.startsWith("//")) {
    return `https:${iconUrl}`;
  }

  if (iconUrl.startsWith("/")) {
    return `https://${domain}${iconUrl}`;
  }

  return `https://${domain}/${iconUrl}`;
};
