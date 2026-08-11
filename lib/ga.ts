"use client";

type EventParams = Record<string, string | number | boolean | undefined>;

export function trackGaEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", name, params);
}
