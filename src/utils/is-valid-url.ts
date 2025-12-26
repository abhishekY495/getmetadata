export const isValidURL = (string: string) => {
  try {
    let url: URL;

    if (string.startsWith("https://")) {
      url = new URL(string);
    } else {
      url = new URL(`https://${string}`);
    }

    // Must have at least one dot
    if (!url.hostname.includes(".")) return false;

    // No leading or trailing dot
    if (url.hostname.startsWith(".") || url.hostname.endsWith("."))
      return false;

    // No spaces
    if (/\s/.test(string)) return false;

    return true;
  } catch {
    return false;
  }
};
