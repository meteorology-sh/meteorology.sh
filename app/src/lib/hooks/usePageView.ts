// React
import { useEffect } from "react";

// Router
import { useLocation } from "react-router";

// Client
import { LoadAnalytics, TrackPageView } from "@/lib/client/analytics";

/**
 * Reports a page view for every landing on every route. The title comes from
 * the route handle, not document.title, so the event carries the right page
 * even before usePageMeta writes it.
 */
export const usePageView = (title: string | undefined) => {
  const location = useLocation();

  useEffect(() => {
    LoadAnalytics();
  }, []);

  useEffect(() => {
    if (!title) return;

    TrackPageView(`${location.pathname}${location.search}`, title);
  }, [location.pathname, location.search, title]);
};
