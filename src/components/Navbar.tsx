"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "patent", label: "Patent" },
  { id: "projects", label: "Projects" },
  { id: "writing", label: "Writing" },
];

const LINKS = {
  github: "https://github.com/sakshigangwani",
  linkedin: "https://www.linkedin.com/in/sakshi-gangwani/",
  medium: "https://medium.com/@gangwani.sakshi15",
  resume: "/resume.pdf",
};

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.92 1.23 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

const MediumIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12Zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42S20.96 8.46 20.96 12ZM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12Z" />
  </svg>
);

const MenuIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    className="h-6 w-6"
  >
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    className="h-6 w-6"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  // Glass background after scrolling past the hero top
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (els.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border-soft bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* Brand */}
        <a
          href="#"
          className="flex items-center gap-2.5 font-semibold tracking-tight"
        >
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-violet shadow-[0_0_12px_var(--accent-violet)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-cyan shadow-[0_0_12px_var(--accent-cyan)]" />
          </span>
          <span>Sakshi Gangwani</span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                active === s.id
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {active === s.id && (
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan align-middle" />
              )}
              {s.label}
            </a>
          ))}
        </div>

        {/* Right: social + resume (desktop) + menu button (mobile) */}
        <div className="flex items-center gap-2">
          <a
            href={LINKS.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-border-soft bg-white/5 text-foreground/80 transition-colors hover:border-white/20 hover:text-foreground sm:flex"
          >
            <GitHubIcon />
          </a>
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-border-soft bg-white/5 text-foreground/80 transition-colors hover:border-white/20 hover:text-foreground sm:flex"
          >
            <LinkedInIcon />
          </a>
          <a
            href={LINKS.medium}
            target="_blank"
            rel="noreferrer"
            aria-label="Medium"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-border-soft bg-white/5 text-foreground/80 transition-colors hover:border-white/20 hover:text-foreground sm:flex"
          >
            <MediumIcon />
          </a>
          <a
            href={LINKS.resume}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan px-4 py-2 text-sm font-semibold text-[#05060f] shadow-[0_0_24px_-8px_var(--accent-violet)] transition-all hover:brightness-110 sm:inline-block"
          >
            Resume
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-soft bg-white/5 text-foreground/90 md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-border-soft bg-background/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-6 py-4 sm:px-8">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  active === s.id
                    ? "bg-white/5 text-foreground"
                    : "text-muted hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {s.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-2 border-t border-border-soft pt-3">
              <a
                href={LINKS.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border-soft bg-white/5 text-foreground/80"
              >
                <GitHubIcon />
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border-soft bg-white/5 text-foreground/80"
              >
                <LinkedInIcon />
              </a>
              <a
                href={LINKS.medium}
                target="_blank"
                rel="noreferrer"
                aria-label="Medium"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border-soft bg-white/5 text-foreground/80"
              >
                <MediumIcon />
              </a>
              <a
                href={LINKS.resume}
                target="_blank"
                rel="noreferrer"
                className="ml-auto rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan px-4 py-2 text-sm font-semibold text-[#05060f]"
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
