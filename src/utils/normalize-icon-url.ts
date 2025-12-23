export const normalizeIconUrl = (iconUrl: string, domain: string): string => {
  if (iconUrl.startsWith("https://")) {
    return iconUrl;
  }

  if (iconUrl.startsWith("/")) {
    return `https://${domain}${iconUrl}`;
  }

  return `https://${domain}/${iconUrl}`;
};
