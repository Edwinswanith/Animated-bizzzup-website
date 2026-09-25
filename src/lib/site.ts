import type { Metadata } from "next";

/** Canonical production origin for this repository. Do not hardcode this
 * elsewhere — import SITE_URL (or the helpers below) instead. */
export const SITE_URL = "https://ai.bizzzup.com";
export const SITE_NAME = "Bizzzup AI Labs";
export const SITE_TITLE = "AI Systems Live in 45 Days | Bizzzup AI Labs";
export const SITE_DESCRIPTION =
  "Fixed-price AI agents, voice systems, RAG, and custom software, built around a 45-day delivery window with a demo every Friday. Bizzzup AI Labs, Chennai.";

export function absoluteUrl(path: string = "/"): string {
  return new URL(path, SITE_URL).toString();
}

/** Stable @id of the Organization JSON-LD node defined in src/app/layout.tsx.
 * Reuse this as the `provider`/`publisher` reference from other structured
 * data (Service, BreadcrumbList, etc.) instead of duplicating the string —
 * keeps every entity pointing at the same Organization node. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/**
 * Builds a self-contained per-route Metadata object: unique title/description,
 * a self-referencing canonical, and a matching Open Graph/Twitter url — so no
 * route ever inherits another route's canonical. `absoluteTitle` bypasses the
 * root layout's title template (only the homepage needs this, since its title
 * already equals the template's default and would otherwise be duplicated).
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${SITE_NAME}: ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@bizzzup",
      site: "@bizzzup",
      images: ["/opengraph-image"],
    },
  };
}
