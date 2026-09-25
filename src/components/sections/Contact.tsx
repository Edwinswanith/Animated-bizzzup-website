"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  useReplay,
  containerVariants,
  fadeUpVariants,
  scaleLineVariants,
  EXPO_OUT,
} from "@/lib/animations";
import { trackEvent } from "@/lib/analytics";

const HELP_OPTIONS = [
  "AI Agent",
  "RAG / Chatbot",
  "Workflow Automation",
  "Voice AI",
  "Computer Vision",
  "Custom AI App",
  "Business Software",
  "Not sure yet",
];

const STAGE_OPTIONS = [
  "Idea",
  "Prototype",
  "Existing product",
  "Need automation",
  "Need AI integration",
  "Need technical audit",
];

const BUDGET_OPTIONS = [
  "Under ₹1L (~$1.2k)",
  "₹1L–₹3L ($1.2k–$3.6k)",
  "₹3L–₹5L ($3.6k–$6k)",
  "₹5L+ ($6k+)",
  "Not sure yet",
];

const CALENDLY_URL = "https://calendly.com/bizzzup/20min"; // TODO: real booking link

const contactItems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    label: "Email",
    value: "edwinswanith006@gmail.com",
    href: "mailto:edwinswanith006@gmail.com",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: "Phone",
    value: "+91 9003 020 030",
    href: "tel:+919003020030",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Office",
    value: "105, ECR Road, Panaiyur, Chennai 600119, Tamil Nadu, India",
    href: null,
  },
];

const formFieldVariants = {
  hidden: { opacity: 1, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EXPO_OUT },
  },
};

type FormStatus = "idle" | "loading" | "success" | "error";

/** `journey`: rendered inside the Connected Build journey, which supplies the chapter
 * heading and the studio backdrop, so the section drops its own intro and background. */
export default function Contact({ variant }: { variant?: "journey" } = {}) {
  const journey = variant === "journey";
  const ref = useRef<HTMLElement>(null);
  const [isInView, replayKey] = useReplay(ref, { margin: "-80px" });
  const prefersReduced = useReducedMotion();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [helpType, setHelpType] = useState("");
  const [projectStage, setProjectStage] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg("Please fill in your name, email, and message.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, helpType, projectStage, budgetRange, message }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send message.");
      }
      setStatus("success");
      trackEvent("contact_form_submit", {
        form_name: "ai_audit_contact",
        form_location: "contact_section",
        status: "success",
        help_type: helpType || undefined,
        project_stage: projectStage || undefined,
        budget_range: budgetRange || undefined,
      });
      setName(""); setEmail(""); setCompany(""); setHelpType(""); setProjectStage(""); setBudgetRange(""); setMessage("");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <section
      ref={ref}
      id="contact"
      className={journey ? "relative" : "relative py-10 sm:py-12 lg:py-14 bg-bg-deep overflow-hidden"}
    >
      {!journey && (<>
      {/* Background radial accents */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 20% 50%, var(--color-accent-glow) 0%, transparent 60%),
                       radial-gradient(ellipse at 80% 50%, var(--color-accent-glow) 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />

      {/* Subtle static accent orbs — no animation, no blur filter */}
      <div
        className="pointer-events-none absolute -top-[5%] -left-[5%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, var(--color-accent-1), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-[5%] -right-[8%] w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, var(--color-accent-3), transparent 70%)",
        }}
        aria-hidden="true"
      />
      </>)}

      <motion.div
        key={replayKey}
        className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10"
        variants={prefersReduced ? undefined : containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Top CTA block — absorbed from the former standalone CTA section */}
        {!journey && (<motion.div
          variants={
            prefersReduced
              ? undefined
              : {
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1 } },
                }
          }
          className="mb-10 sm:mb-12 text-center max-w-[640px] mx-auto"
        >
          <motion.div
            variants={prefersReduced ? undefined : fadeUpVariants}
            className="mb-6 flex items-center justify-center gap-3"
          >
            <motion.span
              variants={prefersReduced ? undefined : scaleLineVariants}
              className="block h-px w-[30px] bg-accent-1"
            />
            <span className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-accent-1">
              Get Started
            </span>
            <motion.span
              variants={prefersReduced ? undefined : scaleLineVariants}
              className="block h-px w-[30px] bg-accent-1"
            />
          </motion.div>

          <motion.h2
            variants={prefersReduced ? undefined : fadeUpVariants}
            className="font-display font-[800] leading-[1.15] text-text-primary mb-4 text-balance"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}
          >
            Not sure where to start? Book an AI audit.
          </motion.h2>

          <motion.p
            variants={prefersReduced ? undefined : fadeUpVariants}
            className="mx-auto max-w-[480px] text-[1.05rem] leading-[1.75] text-text-secondary text-balance"
          >
            A 20-minute call is enough to scope your project and give you a
            fixed price.
          </motion.p>
        </motion.div>)}

        {/* Two-column grid — responsive */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left — Heading + Contact Info */}
          <motion.div
            variants={
              prefersReduced
                ? undefined
                : {
                    hidden: {},
                    visible: {
                      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
                    },
                  }
            }
            className="flex flex-col gap-6 sm:gap-7"
          >
            {/* Section heading — inside left column */}
            <div className="mb-2">
              <motion.h3
                variants={prefersReduced ? undefined : fadeUpVariants}
                className="font-display font-[800] leading-[1.15] text-text-primary mb-4"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
              >
                Tell us what you need built.
              </motion.h3>

              <motion.p
                variants={prefersReduced ? undefined : fadeUpVariants}
                className="text-[1.05rem] leading-[1.75] text-text-secondary max-w-md"
              >
                Tell us what you are building. We will show you what it takes
                to ship it.
              </motion.p>
            </div>

            {contactItems.map((item, i) => (
              <motion.div
                key={i}
                variants={prefersReduced ? undefined : fadeUpVariants}
                className="flex items-start gap-5 group"
              >
                <div className="clip-corner-sm flex h-12 w-12 shrink-0 items-center justify-center bg-bg-surface border border-border-accent text-accent-1 transition-colors duration-300 group-hover:bg-accent-glow">
                  {item.icon}
                </div>
                <div>
                  <span className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-text-muted block mb-1">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      onClick={() => {
                        if (item.href?.startsWith("mailto:")) {
                          trackEvent("email_click", { link_location: "contact_section" });
                        }
                        if (item.href?.startsWith("tel:")) {
                          trackEvent("phone_click", { link_location: "contact_section" });
                        }
                      }}
                      className="text-text-primary text-[1rem] leading-relaxed transition-colors duration-300 hover:text-accent-1"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-text-primary text-[1rem] leading-relaxed">
                      {item.value}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Additional trust signal */}
            <motion.div
              variants={prefersReduced ? undefined : fadeUpVariants}
              className="mt-4 flex items-center gap-3 border-t border-border pt-6"
            >
              <span className="flex h-2 w-2">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-2" />
              </span>
              <span className="font-mono text-[0.72rem] text-text-muted">
                Typically respond within 24 hours
              </span>
            </motion.div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.form
            variants={
              prefersReduced
                ? undefined
                : {
                    hidden: {},
                    visible: {
                      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
                    },
                  }
            }
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            {/* Name + Email row */}
            <motion.div
              variants={prefersReduced ? undefined : formFieldVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <label className="sr-only" htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={status === "loading" || status === "success"}
                className="contact-input w-full clip-corner-md px-4 py-4 bg-bg-card border border-border text-text-primary text-[1rem] outline-none transition-all duration-300 focus:border-border-accent focus:shadow-[0_0_0_3px_var(--color-accent-glow)] disabled:opacity-60"
              />
              <label className="sr-only" htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading" || status === "success"}
                className="contact-input w-full clip-corner-md px-4 py-4 bg-bg-card border border-border text-text-primary text-[1rem] outline-none transition-all duration-300 focus:border-border-accent focus:shadow-[0_0_0_3px_var(--color-accent-glow)] disabled:opacity-60"
              />
            </motion.div>

            {/* Company */}
            <motion.div variants={prefersReduced ? undefined : formFieldVariants}>
              <label className="sr-only" htmlFor="contact-company">Company</label>
              <input
                id="contact-company"
                type="text"
                placeholder="Company (optional)"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                disabled={status === "loading" || status === "success"}
                className="contact-input w-full clip-corner-md px-4 py-4 bg-bg-card border border-border text-text-primary text-[1rem] outline-none transition-all duration-300 focus:border-border-accent focus:shadow-[0_0_0_3px_var(--color-accent-glow)] disabled:opacity-60"
              />
            </motion.div>

            {/* Help type + Project stage row */}
            <motion.div
              variants={prefersReduced ? undefined : formFieldVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div>
                <label className="sr-only" htmlFor="contact-help-type">What do you need help with?</label>
                <select
                  id="contact-help-type"
                  value={helpType}
                  onChange={(e) => setHelpType(e.target.value)}
                  disabled={status === "loading" || status === "success"}
                  className="contact-input w-full clip-corner-md px-4 py-4 bg-bg-card border border-border text-text-primary text-[1rem] outline-none transition-all duration-300 focus:border-border-accent focus:shadow-[0_0_0_3px_var(--color-accent-glow)] disabled:opacity-60"
                >
                  <option value="" disabled>What do you need help with?</option>
                  {HELP_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="sr-only" htmlFor="contact-stage">Project stage</label>
                <select
                  id="contact-stage"
                  value={projectStage}
                  onChange={(e) => setProjectStage(e.target.value)}
                  disabled={status === "loading" || status === "success"}
                  className="contact-input w-full clip-corner-md px-4 py-4 bg-bg-card border border-border text-text-primary text-[1rem] outline-none transition-all duration-300 focus:border-border-accent focus:shadow-[0_0_0_3px_var(--color-accent-glow)] disabled:opacity-60"
                >
                  <option value="" disabled>Project stage</option>
                  {STAGE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </motion.div>

            {/* Budget range */}
            <motion.div variants={prefersReduced ? undefined : formFieldVariants}>
              <label className="sr-only" htmlFor="contact-budget">Budget range</label>
              <select
                id="contact-budget"
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                disabled={status === "loading" || status === "success"}
                className="contact-input w-full clip-corner-md px-4 py-4 bg-bg-card border border-border text-text-primary text-[1rem] outline-none transition-all duration-300 focus:border-border-accent focus:shadow-[0_0_0_3px_var(--color-accent-glow)] disabled:opacity-60"
              >
                <option value="" disabled>Budget range</option>
                {BUDGET_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </motion.div>

            {/* Textarea */}
            <motion.div variants={prefersReduced ? undefined : formFieldVariants}>
              <label className="sr-only" htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                placeholder="Tell us about your project..."
                rows={6}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={status === "loading" || status === "success"}
                className="contact-input w-full clip-corner-md px-4 py-3.5 bg-bg-card border border-border text-text-primary text-[1rem] outline-none transition-all duration-300 resize-y min-h-[140px] focus:border-border-accent focus:shadow-[0_0_0_3px_var(--color-accent-glow)] disabled:opacity-60"
              />
            </motion.div>

            {/* Success message */}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 px-4 py-3 bg-accent-glow border border-border-accent clip-corner-md"
              >
                <span className="flex h-2 w-2 shrink-0">
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-2" />
                </span>
                <span className="font-mono text-[0.8rem] text-text-primary">
                  Message sent! We&apos;ll get back to you within 24 hours.
                </span>
              </motion.div>
            )}

            {/* Error message */}
            {status === "error" && errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 border border-border clip-corner-md"
              >
                <span className="font-mono text-[0.8rem] text-text-secondary">
                  {errorMsg}
                </span>
              </motion.div>
            )}

            {/* Submit — no animation wrapper so it's always visible */}
            <div>
              <motion.button
                type="submit"
                disabled={status === "loading" || status === "success"}
                whileHover={prefersReduced || status !== "idle" ? {} : { scale: 1.015 }}
                whileTap={prefersReduced || status !== "idle" ? {} : { scale: 0.985 }}
                className="clip-corner-md w-full flex items-center justify-center gap-3 px-8 py-4 !bg-accent-1 hover:!bg-accent-1-hover !text-white font-display text-[1rem] font-semibold transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
              >
                {/* Spinner when loading */}
                {status === "loading" && (
                  <svg className="animate-spin h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                )}
                {/* Checkmark when sent */}
                {status === "success" && (
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                {/* Arrow icon when idle */}
                {status === "idle" && (
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                )}
                <span>
                  {status === "loading" ? "Sending…" : status === "success" ? "Message sent!" : "Book an AI audit"}
                </span>
              </motion.button>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("calendly_click", { link_location: "contact_section" })}
                className="group mt-4 inline-flex items-center gap-2 font-display text-[0.9rem] font-semibold text-text-primary hover:text-accent-2 transition-colors duration-200"
              >
                Or book a 20-minute call directly
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </motion.form>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 640px) {
          .contact-input {
            font-size: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
