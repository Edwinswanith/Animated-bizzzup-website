"use client";

import Image from "next/image";

type MediaMode = "thumbnail" | "detail";
type MediaKind = "desktop" | "mobile";

const MOBILE_CAPTURE_SLUGS = [
  "apex",
  "kanaka-gold-loan",
  "mediscribe",
  "neura",
];

function getMediaKind(src: string): MediaKind {
  const normalized = src.toLowerCase();
  return MOBILE_CAPTURE_SLUGS.some((slug) =>
    normalized.includes(`/projects/${slug}`)
  )
    ? "mobile"
    : "desktop";
}

/** Renders a project screenshot, or a polished placeholder when none exists yet. */
export default function ProjectMedia({
  src,
  alt,
  label,
  category,
  previewLabel,
  sizes,
  priority,
  mode = "thumbnail",
}: {
  src: string;
  alt: string;
  label: string;
  category?: string;
  /** Specific preview text (e.g. "Clinical note preview") — falls back to a generic line if not given. */
  previewLabel?: string;
  sizes?: string;
  priority?: boolean;
  mode?: MediaMode;
}) {
  if (!src) {
    return (
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--color-accent-1) 9%, var(--color-bg-surface)) 0%, color-mix(in srgb, var(--color-accent-2) 7%, var(--color-bg-surface)) 100%)",
        }}
      >
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-card/70 border border-border text-accent-1"
          aria-hidden="true"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1.2" />
            <rect x="14" y="3" width="7" height="7" rx="1.2" />
            <rect x="3" y="14" width="7" height="7" rx="1.2" />
            <rect x="14" y="14" width="7" height="7" rx="1.2" />
          </svg>
        </span>
        {category && (
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-accent-1 font-medium">
            {category}
          </span>
        )}
        <span className="font-display font-[700] text-[0.85rem] text-text-primary leading-snug">
          {label}
        </span>
        <span className="font-mono text-[0.64rem] text-text-muted">
          {previewLabel || "Interface preview coming soon"}
        </span>
      </div>
    );
  }

  const mediaKind = getMediaKind(src);

  if (mode === "detail") {
    const frameClass =
      mediaKind === "mobile"
        ? "rounded-[1.35rem]"
        : "w-[88%] max-w-[520px] aspect-[16/10] rounded-md";

    return (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-bg-surface p-4 sm:p-5">
        <div
          className={`relative overflow-hidden border border-border bg-bg-card shadow-[0_14px_35px_color-mix(in_srgb,var(--color-shadow)_14%,transparent)] ${frameClass}`}
          style={mediaKind === "mobile" ? { height: "86%", aspectRatio: "9 / 18" } : undefined}
        >
          {mediaKind === "desktop" && (
            <div className="absolute inset-x-0 top-0 z-10 flex h-4 items-center gap-1 border-b border-border bg-bg-card px-2">
              <span className="h-1.5 w-1.5 rounded-full bg-border-hover" />
              <span className="h-1.5 w-1.5 rounded-full bg-border-hover" />
              <span className="h-1.5 w-1.5 rounded-full bg-border-hover" />
            </div>
          )}
          <div className={mediaKind === "desktop" ? "absolute inset-x-0 bottom-0 top-4" : "absolute inset-0"}>
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain object-top"
              sizes={sizes}
              priority={priority}
            />
          </div>
        </div>
      </div>
    );
  }

  if (mediaKind === "mobile") {
    return (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-bg-surface p-3">
        <div
          className="relative overflow-hidden rounded-[1.15rem] border border-border bg-bg-card shadow-[0_12px_26px_color-mix(in_srgb,var(--color-shadow)_14%,transparent)]"
          style={{ height: "88%", aspectRatio: "9 / 18" }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes={sizes}
            priority={priority}
          />
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover object-top"
      sizes={sizes}
      priority={priority}
    />
  );
}
