"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useReplay, containerVariants, fadeUpVariants } from "@/lib/animations";

const MEMBERS = [
  {
    name: "Suhail",
    photo: "/team/suhail.png",
    role: "Founder · Principal Design",
    ringColor: "var(--color-accent-1)",
  },
  {
    name: "Edwin Swanith",
    photo: "/team/edwin.png",
    role: "Co-Founder · AI/ML",
    ringColor: "var(--color-accent-2)",
  },
  {
    name: "Kishore",
    photo: "/team/kishore.jpg",
    role: "AI Engineer",
    ringColor: "var(--color-accent-3)",
    objectPosition: "50% 12%",
  },
  {
    name: "Vikram",
    photo: "/team/vikram.jpeg",
    role: "AI Engineer",
    ringColor: "var(--color-accent-1)",
  },
];

function MiniAvatar({
  name,
  photo,
  ringColor,
  objectPosition,
}: {
  name: string;
  photo: string;
  ringColor: string;
  objectPosition?: string;
}) {
  return (
    <div className="relative w-12 h-12">
      <div
        className="absolute -inset-0.5 rounded-full border"
        style={{ borderColor: ringColor, opacity: 0.6 }}
      />
      <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-bg-surface">
        <Image
          src={photo}
          alt={name}
          fill
          sizes="48px"
          className="object-cover"
          style={{ objectPosition: objectPosition || "center" }}
        />
      </div>
    </div>
  );
}

export default function TeamPreview() {
  const ref = useRef<HTMLElement>(null);
  const [isInView, replayKey] = useReplay(ref, { margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section ref={ref} className="relative py-10 sm:py-12 bg-bg-surface">
      <motion.div
        key={replayKey}
        className="mx-auto max-w-[1400px] px-6 lg:px-10"
        variants={prefersReduced ? undefined : containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <motion.h2
            variants={prefersReduced ? undefined : fadeUpVariants}
            className="font-display font-[800] leading-[1.15] text-text-primary text-center sm:text-left"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
          >
            The team behind the systems
          </motion.h2>

          <motion.div
            variants={
              prefersReduced
                ? undefined
                : { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
            }
            className="flex items-center gap-5"
          >
            {MEMBERS.map((member) => (
              <motion.div
                key={member.name}
                variants={prefersReduced ? undefined : fadeUpVariants}
                className="flex flex-col items-center gap-1.5"
              >
                <MiniAvatar
                  name={member.name}
                  photo={member.photo}
                  ringColor={member.ringColor}
                  objectPosition={member.objectPosition}
                />
                <span className="font-mono text-[0.65rem] text-text-muted whitespace-nowrap">
                  {member.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={prefersReduced ? undefined : fadeUpVariants}>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 font-display text-[0.9rem] font-semibold text-text-primary hover:text-accent-2 transition-colors duration-200 whitespace-nowrap"
            >
              Meet the full team
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
