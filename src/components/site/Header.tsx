"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Mark } from "./Mark";
import styles from "./Header.module.css";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const setOpen = (v: boolean | ((o: boolean) => boolean)) => setOpenAt((typeof v === "function" ? v(open) : v) ? pathname : null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenAt(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={styles.header} data-open={open || undefined}>
      <div className={styles.bar}>
        <Link href="/" className={styles.logo} aria-label="Tech Cogniverse, home">
          <Mark className={styles.mark} />
          <span className={styles.word}>Tech <em>Cogniverse</em></span>
        </Link>
        <button
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className={styles.toggleLines} />
        </button>
        <nav id="site-nav" className={styles.nav} aria-label="Main">
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} aria-current={pathname.startsWith(n.href) ? "page" : undefined}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/#friction" className={`btn ${styles.cta}`}>
            Describe your friction
          </Link>
        </nav>
      </div>
    </header>
  );
}
