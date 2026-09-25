"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  useReplay,
  containerVariants,
  fadeUpVariants,
  fadeUpBlurVariants,
  scaleLineVariants,
  EXPO_OUT,
} from "@/lib/animations";

/* ── Team data ── */

const MEMBERS: {
  name: string;
  photo: string;
  role: string;
  bio: string;
  gradient: string;
  ringColor: string;
  linkedin?: string;
  github?: string;
  objectPosition?: string;
}[] = [
  {
    name: "Suhail",
    photo: "/team/suhail.png",
    role: "Founder · Principal Design",
    bio: "Orchestrates vision, design systems, and the creative direction behind every Bizzzup product.",
    gradient: "linear-gradient(135deg, var(--color-accent-1), var(--color-accent-2))",
    ringColor: "var(--color-accent-1)",
  },
  {
    name: "Edwin Swanith",
    photo: "/team/edwin.png",
    role: "Co-Founder · AI/ML",
    bio: "Architects multi-agent systems and ML pipelines, from research prototypes to production scale.",
    gradient: "linear-gradient(135deg, var(--color-accent-2), var(--color-accent-1))",
    ringColor: "var(--color-accent-2)",
    linkedin: "https://www.linkedin.com/in/edwinswanith/",
    github: "https://github.com/Edwinswanith?tab=repositories",
  },
  {
    name: "Kishore",
    photo: "/team/kishore.jpg",
    role: "AI Engineer",
    bio: "Builds RAG platforms, fine-tuning workflows, and the inference infrastructure that powers our stack.",
    gradient: "linear-gradient(135deg, var(--color-accent-3), var(--color-accent-1))",
    ringColor: "var(--color-accent-3)",
    objectPosition: "50% 12%",
  },
  {
    name: "Vikram",
    photo: "/team/vikram.jpeg",
    role: "AI Engineer",
    bio: "Develops voice interfaces, automation pipelines, and real-time AI integrations across the product suite.",
    gradient: "linear-gradient(135deg, var(--color-accent-1), var(--color-accent-3))",
    ringColor: "var(--color-accent-1)",
  },
];

/* ── Avatar with static accent ring ── */

function Avatar({
  name,
  photo,
  ringColor,
  hovered,
  objectPosition,
}: {
  name: string;
  photo: string;
  ringColor: string;
  hovered: boolean;
  objectPosition?: string;
}) {
  return (
    <div className="relative w-20 h-20 sm:w-24 sm:h-24">
      <div
        className="absolute -inset-1 rounded-full border"
        style={{ borderColor: ringColor, opacity: 0.6 }}
      />
      {/* Avatar photo */}
      <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-bg-card">
        <Image
          src={photo}
          alt={name}
          fill
          sizes="96px"
          className="object-cover transition-all duration-500"
          style={{
            objectPosition: objectPosition || "center",
            filter: hovered ? "grayscale(0%)" : "grayscale(55%)",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
      </div>
    </div>
  );
}

/* ── Single card ── */

function TeamCard({
  member,
  prefersReduced,
}: {
  member: (typeof MEMBERS)[number];
  prefersReduced: boolean | null;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={prefersReduced ? undefined : fadeUpBlurVariants}
      whileHover={prefersReduced ? {} : { y: -8 }}
      transition={
        prefersReduced
          ? undefined
          : { type: "spring", stiffness: 300, damping: 20 }
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="clip-corner-xl relative overflow-hidden bg-bg-card border border-border p-6 sm:p-7 transition-colors duration-400"
      style={{
        background: hovered
          ? "linear-gradient(180deg, var(--color-bg-card-hover) 0%, var(--color-bg-card) 100%)"
          : undefined,
      }}
    >
      {/* Avatar */}
      <div className="mb-5">
        <Avatar
          name={member.name}
          photo={member.photo}
          ringColor={member.ringColor}
          hovered={hovered}
          objectPosition={member.objectPosition}
        />
      </div>

      {/* Name */}
      <h3 className="font-display text-2xl font-bold text-text-primary mb-1">
        {member.name}
      </h3>

      {/* Role + LinkedIn */}
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-[0.8rem] tracking-wide text-accent-1">
          {member.role}
        </span>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="text-text-muted hover:text-accent-1 transition-colors duration-200"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        )}
        {member.github && (
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on GitHub`}
            className="text-text-muted hover:text-accent-1 transition-colors duration-200"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </div>

      {/* Bio */}
      <motion.p
        className="text-[1rem] leading-[1.7] text-text-secondary"
        animate={{ opacity: hovered ? 1 : 0.7 }}
        transition={{ duration: 0.3 }}
      >
        {member.bio}
      </motion.p>

      {/* Hover gradient line at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: member.gradient,
          transformOrigin: "left",
        }}
        initial={{ scaleX: 0 }}
        animate={hovered ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.4, ease: EXPO_OUT }}
      />
    </motion.div>
  );
}

/* ── Section ── */

export default function Team() {
  const ref = useRef<HTMLElement>(null);
  const [isInView, replayKey] = useReplay(ref, { margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section
      ref={ref}
      id="team"
      className="relative py-10 sm:py-12 bg-bg-deep"
    >
      <motion.div
        key={replayKey}
        className="mx-auto max-w-[1400px] px-6 lg:px-10"
        variants={prefersReduced ? undefined : containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section heading — centered */}
        <motion.div
          variants={prefersReduced ? undefined : fadeUpVariants}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.span
              variants={prefersReduced ? undefined : scaleLineVariants}
              className="block h-px w-[30px] bg-accent-1"
            />
            <span className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-accent-1">
              The People
            </span>
            <motion.span
              variants={prefersReduced ? undefined : scaleLineVariants}
              className="block h-px w-[30px] bg-accent-1"
            />
          </div>

          <h2
            className="font-display font-[800] leading-[1.15] text-text-primary mb-6"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}
          >
            Built by builders
          </h2>

          <p className="max-w-2xl mx-auto text-[1.05rem] leading-[1.75] text-text-secondary mb-2">
            Bizzzup AI Labs is the AI engineering practice under the Bizzzup
            brand, and https://ai.bizzzup.com is its official website. We
            design, build, and run AI products end to end, including agents,
            voice systems, RAG platforms, custom software, and full-stack web
            and mobile products.
          </p>
          <p className="max-w-2xl mx-auto text-[1.05rem] leading-[1.75] text-text-secondary mb-2">
            Founded by Suhail and Edwin Swanith, the studio is based at 105,
            ECR Road, Panaiyur, Chennai 600119, Tamil Nadu, India.
          </p>
          <p className="max-w-2xl mx-auto text-[1.05rem] leading-[1.75] text-text-secondary">
            When clients work with Bizzzup AI Labs, they talk directly to the
            people designing, building, and deploying the system.
          </p>
        </motion.div>

        {/* Grid — proper responsive with Tailwind */}
        <motion.div
          variants={
            prefersReduced
              ? undefined
              : {
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
                  },
                }
          }
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
        >
          {MEMBERS.map((member) => (
            <TeamCard
              key={member.name}
              member={member}
              prefersReduced={prefersReduced}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
