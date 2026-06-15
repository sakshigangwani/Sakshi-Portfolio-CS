"use client";

import { useEffect, useRef, useState } from "react";

const EXPERIENCE = [
  {
    role: "AI Research Engineer",
    org: "USC Alfred E. Mann School of Pharmacy and Pharmaceutical Sciences",
    team: "Dogra Lab",
    href: "https://mann.usc.edu/",
    period: "March 2026 - Present",
    location: "Los Angeles, USA",
    badge: {
      label: "USC",
      className:
        "bg-[#990000] text-[#ffcc00] shadow-[0_0_24px_-6px_rgba(153,0,0,0.9)] ring-1 ring-[#ffcc00]/30",
    },
    summary:
      "Built LLM-powered systems that automate scientific literature mining and structured data extraction for pharmaceutical R&D, spanning antibody, siRNA, and lipid-nanoparticle research.",
    points: [
      "Built a biomedical literature-mining pipeline that retrieved and screened 4,500+ candidate papers across 23 therapeutic antibodies down to ~430 structured study records, replacing the lab's manual review workflow (9 external APIs incl. PubMed; async rate-limited search; 3-tier DOI/PMID/fuzzy-title dedup).",
      "Engineered a hybrid extraction engine pairing keyword heuristics with GPT-4o text + Vision (reading concentration–time figures) to auto-extract 20+ structured clinical fields per paper at ~95% accuracy - cutting search-and-extraction from ~1 day to ~10–15 minutes (~40× faster).",
      "Shipped full-stack, self-serve extraction tools (FastAPI/Flask + React/TypeScript) enabling researchers to curate siRNA & lipid-nanoparticle datasets on demand, eliminating hours of ad-hoc spreadsheet work per dataset.",
      "Eliminated fabricated LLM outputs by routing each field to deterministic computation, PubChem lookups, or cited LLM extraction with reference-level provenance - driving unverifiable values to ~0 while keeping every value source-traceable.",
      "Applied vision models to parse data directly from scientific figures - charts, plots, and tables - extracting axis units, cohorts, and data points alongside 100+ structured text fields.",
      "Engineered high-throughput screening with concurrent querying, disk-based caching, run persistence, and field-by-field Server-Sent Events streaming for responsive UX, plus PDF-native processing with OCR and figure extraction.",
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
  {
    role: "Full Stack & Embedded Software Developer Intern",
    org: "Meshnet Electronics LLP",
    team: null,
    href: null,
    period: "November 2023 - January 2025",
    location: "Mumbai, India",
    badge: {
      label: "ME",
      className:
        "bg-emerald-500/15 text-emerald-300 shadow-[0_0_24px_-6px_rgba(16,185,129,0.8)] ring-1 ring-emerald-400/30",
    },
    summary:
      "Built memory-constrained embedded firmware and full-stack tooling for ESP32-based industrial IoT devices deployed across 100+ field units.",
    points: [
      "Optimized memory-constrained embedded C/C++ firmware for ESP32-based IIoT devices deployed across 100+ field units, with real-time task scheduling to run reliably under tight resource limits.",
      "Hardened device-to-device communication with custom protocol stacks (Modbus, MQTT, OPC UA) and robust error-handling, ensuring reliable data transmission across noisy industrial environments.",
      "Designed persistent-storage and fault-recovery mechanisms that guaranteed zero data loss during system failures.",
      "Streamlined device deployment by 60% via real-time configuration interfaces on a C++ backend with a responsive HTML/CSS/JavaScript frontend.",
    ],
    stack: [
      "C / C++",
      "ESP32",
      "Modbus",
      "MQTT",
      "OPC UA",
      "HTML/CSS",
      "JavaScript",
      "Embedded Systems",
    ],
  },
  {
    role: "Software Developer Intern",
    org: "Empire Circuits LLC",
    team: null,
    href: null,
    period: "September 2023 - November 2023",
    location: "New Jersey, USA",
    badge: {
      label: "EC",
      className:
        "bg-amber-500/15 text-amber-300 shadow-[0_0_24px_-6px_rgba(245,158,11,0.8)] ring-1 ring-amber-400/30",
    },
    summary:
      "Developed desktop applications bridging antenna hardware and operators with real-time monitoring and control.",
    points: [
      "Developed desktop UI applications in C++/Qt (Qt Creator) with XML-based layouts, exposing 10+ configurable antenna parameters to operators.",
      "Integrated real-time hardware-to-software data flow with responsive UI updates, enabling live monitoring of antenna performance during operation.",
    ],
    stack: ["C++", "Qt", "Qt Creator", "XML", "Real-Time Systems"],
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
      className="relative mx-auto w-full max-w-7xl scroll-mt-20 px-6 py-24 sm:px-8 sm:py-32"
    >
      {/* Heading */}
      <div className="mb-16 text-center sm:mb-20">
        <span className="font-mono text-sm text-accent-cyan">
          {"// experience"}
        </span>
        <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Where I&apos;ve <span className="text-gradient">been building</span>
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="pointer-events-none absolute bottom-0 left-[27px] top-0 w-px bg-gradient-to-b from-accent-violet/70 via-border-soft to-transparent lg:left-1/2 lg:-translate-x-1/2" />

        <div className="space-y-12 lg:space-y-20">
          {EXPERIENCE.map((job, idx) => {
            const cardLeft = idx % 2 === 0;
            return (
              <Reveal key={job.role + job.org}>
                <div className="relative">
                  {/* Node badge on the line */}
                  <span
                    className={`absolute left-[27px] top-2 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full text-sm font-bold tracking-tight ring-4 ring-background sm:h-14 sm:w-14 lg:left-1/2 ${job.badge.className}`}
                  >
                    {job.badge.label}
                  </span>

                  <div className="flex flex-col gap-3 pl-16 lg:grid lg:grid-cols-2 lg:items-start lg:gap-16 lg:pl-0">
                    {/* Date label */}
                    <div
                      className={`flex font-mono lg:pt-3 ${
                        cardLeft
                          ? "lg:order-2 lg:justify-start lg:pl-10"
                          : "lg:order-1 lg:justify-end lg:pr-10 lg:text-right"
                      }`}
                    >
                      <span>
                        <span className="block text-sm text-accent-cyan sm:text-base">
                          {job.period}
                        </span>
                        <span className="block text-xs text-muted/80">
                          {job.location}
                        </span>
                      </span>
                    </div>

                    {/* Card */}
                    <article
                      className={`group relative overflow-hidden rounded-3xl border border-border-soft bg-white/[0.03] p-6 backdrop-blur transition-colors duration-500 hover:border-accent-violet/40 sm:p-8 ${
                        cardLeft ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      {/* Hover glow */}
                      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent-violet/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                      {/* Role + Org */}
                      <h3 className="relative text-xl font-bold text-foreground sm:text-2xl">
                        {job.role}
                      </h3>
                      <div className="relative mt-1 text-[0.95rem] text-muted sm:text-base">
                        {job.href ? (
                          <a
                            href={job.href}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-foreground/90 transition-colors hover:text-accent-cyan"
                          >
                            {job.org}
                          </a>
                        ) : (
                          <span className="font-medium text-foreground/90">
                            {job.org}
                          </span>
                        )}
                        {job.team && (
                          <span className="text-accent-cyan"> · {job.team}</span>
                        )}
                      </div>

                      <p className="relative mt-5 leading-relaxed text-muted">
                        {job.summary}
                      </p>

                      {/* Bullets */}
                      <ul className="relative mt-7 space-y-3">
                        {job.points.map((point, i) => (
                          <li
                            key={i}
                            className="flex gap-3 text-sm leading-relaxed text-muted sm:text-[0.95rem]"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan" />
                            <span>{point}</span>
                          </li>
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
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
