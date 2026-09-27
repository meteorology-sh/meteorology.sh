/**
 * The Google tag installs a queue and a command function on the window. Both
 * are absent until LoadAnalytics runs, which happens on the live site only.
 */
declare global {
  interface Window {
    dataLayer: unknown[] | undefined;
    gtag: ((...args: unknown[]) => void) | undefined;
  }
}

export {};
