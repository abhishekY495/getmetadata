export const isValidDomain = (domain: string) => {
  try {
    let url: URL;

    if (domain.startsWith("https://")) {
      url = new URL(domain);
    } else {
      url = new URL(`https://${domain}`);
    }

    // Must have at least one dot
    if (!url.hostname.includes(".")) return false;

    // No leading or trailing dot
    if (url.hostname.startsWith(".") || url.hostname.endsWith("."))
      return false;

    // No spaces
    if (/\s/.test(domain)) return false;

    return true;
  } catch {
    return false;
  }
};
