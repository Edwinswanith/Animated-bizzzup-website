"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { containerVariants, fadeUpVariants, EXPO_OUT } from "@/lib/animations";
import { SERVICES } from "@/data/services";

const linkColumns = [
  {
    heading: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Work", href: "/work" },
      { label: "Process", href: "/process" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/about#team" },
      { label: "Engineering", href: "/process#built-for-production" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

const socials = [
  {
    label: "X / Twitter",
    href: "https://x.com/bizzzup",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16H20L8.267 4z" />
        <path d="M4 20l6.768-6.768M15.232 10.232L20 4" />
      </svg>
    ),
  },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReduced = useReducedMotion();

  return (
    <motion.footer
      ref={ref}
      variants={prefersReduced ? undefined : containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative bg-bg-surface"
    >
      {/* Animated top divider */}
      <motion.div
        className="absolute top-0 inset-x-0 h-px bg-border origin-center"
        initial={prefersReduced ? undefined : { scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : prefersReduced ? undefined : { scaleX: 0 }}
        transition={{ duration: 0.7, ease: EXPO_OUT }}
      />

      {/* Main footer content */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Brand column */}
          <motion.div
            variants={prefersReduced ? undefined : fadeUpVariants}
            className="md:col-span-3"
          >
            <Link href="/" className="inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-text-primary mb-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-1" />
              </span>
              Bizzzup AI Labs
            </Link>
            <p className="text-[1rem] leading-[1.7] text-text-secondary max-w-xs mt-3">
              We build AI agents, voice systems, and custom software that run real operations. Chennai, India.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-md bg-bg-card border border-border text-text-muted transition-all duration-300 hover:border-border-hover hover:text-accent-1 hover:shadow-[0_2px_12px_var(--color-accent-glow)]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation columns */}
          {linkColumns.map((column) => (
            <motion.div
              key={column.heading}
              variants={prefersReduced ? undefined : fadeUpVariants}
              className="md:col-span-3"
            >
              <h4 className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-accent-1 mb-4">
                {column.heading}
              </h4>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[0.92rem] text-text-secondary transition-colors duration-300 hover:text-text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* CTA column */}
          <motion.div
            variants={prefersReduced ? undefined : fadeUpVariants}
            className="md:col-span-3"
          >
            <h4 className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-accent-1 mb-4">
              Let&apos;s Talk
            </h4>
            <p className="text-[1rem] text-text-secondary mb-4 leading-relaxed">
              Ready to scope your build?
            </p>
            <Link
              href="/#contact"
              className="clip-corner-md inline-flex items-center justify-center bg-accent-1 px-6 py-3.5 font-display text-[0.9rem] font-semibold !text-white transition-colors duration-200 hover:bg-accent-1-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
            >
              Start a project
            </Link>
          </motion.div>
        </div>

        {/* Service categories — concise list, not a full nav column */}
        <motion.div
          variants={prefersReduced ? undefined : fadeUpVariants}
          className="mt-8 pt-6 border-t border-border/60"
        >
          <h4 className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-accent-1 mb-3">
            Services
          </h4>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="text-[0.85rem] text-text-secondary transition-colors duration-300 hover:text-text-primary"
              >
                {service.navLabel}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-5 pb-20 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <motion.span
            variants={prefersReduced ? undefined : fadeUpVariants}
            className="font-mono text-[0.75rem] text-text-muted text-center sm:text-left"
          >
            &copy; 2024 &ndash; 2026 Bizzzup AI Labs. All rights reserved.
          </motion.span>
          <motion.div
            variants={prefersReduced ? undefined : fadeUpVariants}
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[0.75rem] text-text-muted sm:justify-end"
          >
            <Link href="/privacy-policy" className="transition-colors hover:text-text-primary">
              Privacy Policy
            </Link>
            <Link href="/content-rights" className="transition-colors hover:text-text-primary">
              Content Rights
            </Link>
            <span>Chennai, India</span>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}
