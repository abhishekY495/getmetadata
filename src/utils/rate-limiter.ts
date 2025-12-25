import {
  RATE_LIMIT_MAX_REQUESTS,
  RATE_LIMIT_WINDOW_SECONDS,
} from "./constants";

interface RateLimitStore {
  requests: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitStore>();

export function checkRateLimit(identifier: string): {
  isLimited: boolean;
  remaining: number;
  resetTime: number;
  limit: number;
} {
  const now = Date.now();
  const windowMs = RATE_LIMIT_WINDOW_SECONDS * 1000;

  let store = rateLimitMap.get(identifier);

  if (!store || now > store.resetTime) {
    store = {
      requests: 1,
      resetTime: now + windowMs,
    };
    rateLimitMap.set(identifier, store);

    return {
      isLimited: false,
      remaining: RATE_LIMIT_MAX_REQUESTS - 1,
      resetTime: store.resetTime,
      limit: RATE_LIMIT_MAX_REQUESTS,
    };
  }

  store.requests++;

  const isLimited = store.requests > RATE_LIMIT_MAX_REQUESTS;
  const remaining = Math.max(0, RATE_LIMIT_MAX_REQUESTS - store.requests);

  return {
    isLimited,
    remaining,
    resetTime: store.resetTime,
    limit: RATE_LIMIT_MAX_REQUESTS,
  };
}

export function getClientIdentifier(request: Request): string {
  // IP from CF-Connecting-IP header (Cloudflare specific)
  const cfIp = request.headers.get("CF-Connecting-IP");
  if (cfIp) return cfIp;

  // X-Forwarded-For header
  const forwardedFor = request.headers.get("X-Forwarded-For");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  // X-Real-IP header
  const realIp = request.headers.get("X-Real-IP");
  if (realIp) return realIp;

  // Generic identifier
  return "unknown";
}
