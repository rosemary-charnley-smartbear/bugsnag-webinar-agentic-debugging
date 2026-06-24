// BugSnag (SmartBear Insight Hub) initialization.
// In a real service this runs once at process start. Errors thrown anywhere
// in the request lifecycle are captured here and shipped to BugSnag with the
// stack trace + metadata the SmartBear MCP server later reads back into the IDE.
import Bugsnag from "@bugsnag/js";

let started = false;

export function startBugsnag() {
  if (started) return Bugsnag;
  const apiKey = process.env.BUGSNAG_API_KEY;

  // If no key is configured we still let the app run (so the demo works
  // offline), but report() becomes a no-op instead of crashing.
  if (!apiKey || apiKey === "your_project_notifier_api_key") {
    console.warn("[bugsnag] No BUGSNAG_API_KEY set - running without reporting.");
    return null;
  }

  Bugsnag.start({
    apiKey,
    releaseStage: process.env.NODE_ENV || "development",
    enabledReleaseStages: ["production", "staging"],
    appVersion: process.env.APP_VERSION || "1.0.0",
  });
  started = true;
  return Bugsnag;
}

// Helper used by the routes to report a handled error with useful metadata.
export function report(err, metadata = {}) {
  if (!started) return;
  Bugsnag.notify(err, (event) => {
    event.addMetadata("order", metadata);
  });
}
