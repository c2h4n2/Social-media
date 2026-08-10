export type AnalyticsEventName =
  | "analysis_started"
  | "analysis_completed"
  | "analysis_failed"
  | "analysis_rate_limited";

export type AnalyticsEvent = {
  name: AnalyticsEventName;
  requestId: string;
  mode?: "image" | "description";
  platform?: string;
  goal?: string;
  tone?: string;
  durationMs?: number;
  statusCode?: number;
  errorType?: string;
  timestamp?: string;
};

export async function trackEvent(event: AnalyticsEvent) {
  const enabled =
    (process.env.POST_DOCTOR_ANALYTICS || "true").toLowerCase() === "true";

  if (!enabled) return;

  const payload = {
    ...event,
    timestamp: event.timestamp || new Date().toISOString(),
  };

  // Public-beta default: structured server log.
  // This intentionally does NOT include post text, image content, API keys,
  // raw IP addresses, or model output.
  console.log(`[PostDoctorAnalytics] ${JSON.stringify(payload)}`);
}
