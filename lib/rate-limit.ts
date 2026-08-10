export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  limit: number;
};

export interface RateLimitProvider {
  check(key: string): Promise<RateLimitResult>;
}

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 5;

declare global {
  // eslint-disable-next-line no-var
  var __postDoctorRateLimitStore: Map<string, RateLimitEntry> | undefined;
}

const store =
  globalThis.__postDoctorRateLimitStore ??
  (globalThis.__postDoctorRateLimitStore = new Map<string, RateLimitEntry>());

export class MemoryRateLimitProvider implements RateLimitProvider {
  async check(key: string): Promise<RateLimitResult> {
    const now = Date.now();

    if (store.size > 5000) {
      for (const [entryKey, entry] of store.entries()) {
        if (entry.resetAt <= now) store.delete(entryKey);
      }
    }

    const existing = store.get(key);

    if (!existing || existing.resetAt <= now) {
      const resetAt = now + WINDOW_MS;
      store.set(key, { count: 1, resetAt });

      return {
        allowed: true,
        remaining: MAX_REQUESTS - 1,
        resetAt,
        limit: MAX_REQUESTS,
      };
    }

    if (existing.count >= MAX_REQUESTS) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: existing.resetAt,
        limit: MAX_REQUESTS,
      };
    }

    existing.count += 1;
    store.set(key, existing);

    return {
      allowed: true,
      remaining: MAX_REQUESTS - existing.count,
      resetAt: existing.resetAt,
      limit: MAX_REQUESTS,
    };
  }
}

/**
 * Swap this function when a durable/shared provider is added.
 * The API route does not need to change.
 */
export function getRateLimitProvider(): RateLimitProvider {
  return new MemoryRateLimitProvider();
}
