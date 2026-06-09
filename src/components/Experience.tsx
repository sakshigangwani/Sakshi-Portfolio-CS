"use client";

import { useEffect, useRef, useState } from "react";

const EXPERIENCE = [
  {
    role: "AI Engineer",
    org: "USC Alfred E. Mann School of Pharmacy and Pharmaceutical Sciences",
    team: "Dogra Lab",
    href: "https://mann.usc.edu/",
    period: "March 2026 - Present",
    summary:
      "Built LLM-powered systems that automate scientific literature mining and structured data extraction for pharmaceutical R&D, spanning antibody, siRNA, and lipid-nanoparticle research.",
    points: [
      "Designed and built multi-module pipelines that orchestrate 9+ biomedical APIs in parallel, engineered for reliability with per-source rate limiting, exponential-backoff retries, and multi-tier fallback retrieval.",
      "Built hybrid scoring and field-routing engines that combine deterministic computation, structured APIs, and LLM extraction - screening 500–600 candidate papers per compound down to the ~20–25 with genuine data, cutting manual review effort by ~95%.",
      "Eliminated model hallucination on quantitative fields by computing them deterministically, and enforced full data lineage so every extracted value traces back to its source (DOI/PMID/URL).",
      "Applied vision models to parse data directly from scientific figures - charts, plots, and tables - extracting axis units, cohorts, and data points alongside 100+ structured text fields.",
      "Architected full-stack applications (FastAPI + React/TypeScript) with field-by-field Server-Sent Events streaming for responsive UX, plus PDF-native processing with OCR and figure extraction.",
      "Engineered high-throughput screening with concurrent querying, disk-based caching, and run persistence, plus identifier-normalized deduplication across sources.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "LLMs",
      "Vision Models",
      "RAG / Retrieval",
      "Server-Sent Events",
      "OCR",
    ],
  },
];

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-24 sm:px-8 sm:py-32"
    >
      <div className="grid gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:gap-16">
        {/* Heading */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <span className="font-mono text-sm text-accent-cyan">
            {"// experience"}
          </span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Where I&apos;ve
            <br />
            <span className="text-gradient">been building</span>
          </h2>
        </div>

        {/* Roles */}
        <div className="space-y-10">
          {EXPERIENCE.map((job) => (
            <Reveal key={job.role + job.org}>
              <article className="group relative overflow-hidden rounded-3xl border border-border-soft bg-white/[0.03] p-6 backdrop-blur transition-colors duration-500 hover:border-accent-violet/40 sm:p-8">
                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent-violet/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                {/* Header */}
                <div className="relative flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#990000] font-bold tracking-tight text-[#ffcc00] shadow-[0_0_24px_-6px_rgba(153,0,0,0.9)] ring-1 ring-[#ffcc00]/30">
                      USC
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                        {job.role}
                      </h3>
                      <div className="text-[0.95rem] text-muted sm:text-base">
                        <a
                          href={job.href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-foreground/90 transition-colors hover:text-accent-cyan"
                        >
                          {job.org}
                        </a>
                        {job.team && (
                          <span className="text-accent-cyan"> · {job.team}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="rounded-full border border-border-soft bg-white/5 px-3 py-1 font-mono text-xs text-muted">
                    {job.period}
                  </span>
                </div>

                <p className="relative mt-5 leading-relaxed text-muted">
                  {job.summary}
                </p>

                {/* Bullets */}
                <ul className="relative mt-7 space-y-3">
                  {job.points.map((point, i) => (
                    <Reveal key={i} delay={i * 80}>
                      <li className="flex gap-3 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan" />
                        <span>{point}</span>
                      </li>
                    </Reveal>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="relative mt-7 flex flex-wrap gap-2 border-t border-border-soft pt-6">
                  {job.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border-soft bg-white/5 px-3 py-1 font-mono text-xs text-foreground/80 transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
