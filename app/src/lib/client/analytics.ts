// Types
import "@/lib/types/analytics";

const MEASUREMENT_ID = "G-EZ9EH6VS8H";

/** The live site. Every other host is a developer environment. */
const HOSTS = ["meteorology.sh", "www.meteorology.sh"];

/**
 * True for the hosts the property measures. Keeps localhost, the nginx
 * container, and the Playwright preview server out of the Google Analytics
 * property, so the numbers are visitors only.
 */
export const IsMeasuredHost = (hostname: string): boolean =>
  HOSTS.includes(hostname);

const measured = (): boolean =>
  typeof window !== "undefined" && IsMeasuredHost(window.location.hostname);

/**
 * Loads gtag.js once, on the live site only. send_page_view is off because a
 * single page app loads the script one time: TrackPageView reports every
 * landing instead, including the first.
 */
export const LoadAnalytics = () => {
  if (!measured() || window.dataLayer) return;

  window.dataLayer = [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID, { send_page_view: false });
};

/** Reports one landing: the first page, and every route change after it. */
export const TrackPageView = (path: string, title: string) => {
  if (!measured()) return;

  window.gtag?.("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: title,
  });
};
