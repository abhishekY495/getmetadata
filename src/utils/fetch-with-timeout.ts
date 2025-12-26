import { FETCH_TIMEOUT_MS, USER_AGENT } from "../constants";

export const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  timeoutMs: number = FETCH_TIMEOUT_MS
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "User-Agent": USER_AGENT,
      },
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};
