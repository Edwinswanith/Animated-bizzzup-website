"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { EXPO_OUT } from "@/lib/animations";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
] as const;

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll progress for the top bar only — no per-frame blur/color transforms
  const { scrollYProgress } = useScroll();

  // Passive scroll listener — CSS class swap, zero JS per frame
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-[1000] w-full transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-bg-deep/80 shadow-sm"
            : "bg-transparent"
        }`}
      >
        {/* Scroll progress bar */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] w-full origin-left"
          style={{
            scaleX: scrollYProgress,
            background: "var(--gradient-1)",
          }}
        />
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-6 lg:px-10">
          {/* Logo — TODO: replace with a transparent SVG/PNG brand asset
              (public/ has logo-bizzzup.jpg and a grayscale-alpha .png only) */}
          <Link
            href="/"
            className="group flex items-center shrink-0 transition-opacity duration-300 hover:opacity-80"
          >
            <Image
              src="/logo-bizzzup-light.png"
              alt="Bizzzup AI Labs"
              width={375}
              height={200}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 nav-desktop:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="nav-link relative rounded-sm py-1 font-display text-[0.9rem] font-semibold text-text-secondary transition-colors duration-300 hover:text-text-primary focus-visible:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1/30 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <span className="hidden nav-desktop:inline-block">
              <Link
                href="/#contact"
                className="clip-corner-md inline-flex items-center justify-center bg-accent-1 px-6 py-2.5 font-display text-[0.85rem] font-semibold !text-white transition-colors duration-200 hover:bg-accent-1-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
              >
                Book an AI audit
              </Link>
            </span>

            {/* Hamburger */}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="relative z-[1010] flex h-11 w-11 flex-col items-center justify-center gap-[5px] nav-desktop:hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1/30"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              <span
                className={`block h-[2px] w-6 rounded-full bg-text-primary transition-transform duration-300 ${
                  mobileOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-6 rounded-full bg-text-primary transition-all duration-300 ${
                  mobileOpen ? "scale-x-0 opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-6 rounded-full bg-text-primary transition-transform duration-300 ${
                  mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EXPO_OUT }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-bg-deep/95 backdrop-blur-2xl nav-desktop:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={closeMobile}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.06 * i,
                    ease: EXPO_OUT,
                  }}
                  className="font-display text-[1.25rem] font-semibold text-text-secondary transition-colors duration-300 hover:text-accent-1"
                >
                  {label}
                </motion.a>
              ))}
              <motion.a
                href="/#contact"
                onClick={closeMobile}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{
                  duration: 0.4,
                  delay: 0.06 * NAV_LINKS.length,
                  ease: EXPO_OUT,
                }}
                className="clip-corner-md mt-4 inline-flex items-center justify-center bg-accent-1 px-8 py-3 font-display text-[0.95rem] font-semibold !text-white transition-colors duration-200 hover:bg-accent-1-hover"
              >
                Book an AI audit
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
