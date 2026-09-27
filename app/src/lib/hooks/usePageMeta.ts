// React
import { useEffect } from "react";

// Router
import { useMatches } from "react-router";

// Types
import type { PageMetaT } from "@/lib/types/page";

const isPageMeta = (handle: unknown): handle is PageMetaT =>
  typeof handle === "object" &&
  handle !== null &&
  "title" in handle &&
  "description" in handle;

/**
 * Sets the document title and meta description from the deepest route that
 * declares them, and returns them. index.html carries the home page's values
 * for crawlers that do not run JavaScript.
 */
export const usePageMeta = () => {
  const matches = useMatches();
  const meta = matches.map((match) => match.handle).findLast(isPageMeta);

  useEffect(() => {
    if (!meta) return;

    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.description);
  }, [meta]);

  return meta;
};
