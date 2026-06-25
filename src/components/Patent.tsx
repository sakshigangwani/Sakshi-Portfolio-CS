"use client";

import { useEffect, useRef, useState } from "react";

const ML_REPO = "https://github.com/sakshigangwani/ML-model-for-detecting-Gas-Pipe-Leakage";
const LETTER_PDF = "/patent/appreciation-letter.pdf";
const IPINDIA_SEARCH =
  "https://iprsearch.ipindia.gov.in/PublicSearch/PublicationSearch/ApplicationStatus";

const PATENT = {
  title: "IoT-Enabled Robot for Detecting Gas Pipe Leakage",
  status: "Published Patent",
  applicationNo: "202421078054",
  office: "Indian Patent Office",
  published: "15 Nov 2024",
  summary:
    "A mobile robot that autonomously navigates along gas pipelines and uses a machine-learning model to detect leaks from live multi-sensor telemetry - LPG concentration, temperature, and humidity. The work was filed as a patent and recognized with a formal Letter of Appreciation from the college Principal.",
  points: [
    "Designed an IoT inspection robot (Raspberry Pi + gas/temperature/humidity sensors) that streams live telemetry while moving through pipe networks.",
    "Trained a K-Means clustering model (k = 3, k-means++) on IoT telemetry, using the elbow method to fix the optimal cluster count, to separate normal readings from leak signatures.",
    "Flagged leaks in real time by mapping new sensor readings to the learned clusters - e.g. elevated LPG with characteristic humidity/temperature ranges triggers a \"Gas Leakage Detected\" alert.",
    "Combined IoT, machine learning, and a companion mobile app into one end-to-end system for early, autonomous pipeline-leak detection.",
  ],
  stack: [
    "IoT",
    "Raspberry Pi",
    "Python",
    "scikit-learn",
    "K-Means",
    "Mobile App",
    "Sensors",
  ],
};

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

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[1.15em] w-[1.15em]">
    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.92 1.23 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
  </svg>
);

const DocIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-[1.15em] w-[1.15em]"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </svg>
);

const PatentIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <circle cx="12" cy="8" r="6" />
    <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
  </svg>
);

export default function Patent() {
  return (
    <section
      id="patent"
      className="relative mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-24 sm:px-8 sm:py-32"
    >
      {/* Heading */}
      <div className="max-w-2xl">
        <span className="font-mono text-sm text-accent-cyan">{"// patent"}</span>
        <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          A patent with my <span className="text-gradient">name on it</span>
        </h2>
        <p className="mt-5 leading-relaxed text-muted">
          During my undergrad, a project I co-built went all the way to a filed
          patent - and earned a formal Letter of Appreciation from the college.
        </p>
      </div>

      <Reveal className="mt-14">
        <article className="group relative overflow-hidden rounded-3xl border border-border-soft bg-white/[0.03] p-6 backdrop-blur sm:p-8 lg:p-10">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-accent-violet/15 blur-3xl" />

          <div className="relative">
            {/* Details */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-violet/40 bg-accent-violet/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-cyan">
                <PatentIcon />
                {PATENT.status}
              </span>

              <h3 className="mt-5 text-2xl font-bold leading-snug text-foreground sm:text-[1.7rem]">
                {PATENT.title}
              </h3>

              {/* Application number + verify */}
              <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-xs">
                <span className="rounded-md border border-border-soft bg-white/5 px-2.5 py-1 text-foreground/90">
                  {PATENT.office} · Application Number:{" "}
                  <span className="text-accent-cyan">{PATENT.applicationNo}</span>
                </span>
                <span className="rounded-md border border-border-soft bg-white/5 px-2.5 py-1 text-foreground/90">
                  Published{" "}
                  <span className="text-accent-cyan">{PATENT.published}</span>
                </span>
                <a
                  href={IPINDIA_SEARCH}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted underline decoration-accent-cyan/40 decoration-2 underline-offset-2 transition-colors hover:text-accent-cyan"
                >
                  verify status →
                </a>
              </div>

              <p className="mt-5 leading-relaxed text-muted">{PATENT.summary}</p>

              <ul className="mt-6 space-y-3">
                {PATENT.points.map((point, i) => (
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
              <div className="mt-6 flex flex-wrap gap-2">
                {PATENT.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border-soft bg-white/5 px-3 py-1 font-mono text-xs text-foreground/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={ML_REPO}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-white/5 px-4 py-2 text-sm font-medium text-foreground/90 backdrop-blur transition-colors hover:border-white/20 hover:bg-white/10"
                >
                  <GitHubIcon />
                  ML model on GitHub
                </a>
                <a
                  href={LETTER_PDF}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-white/5 px-4 py-2 text-sm font-medium text-foreground/90 backdrop-blur transition-colors hover:border-white/20 hover:bg-white/10"
                >
                  <DocIcon />
                  Letter of Appreciation
                </a>
              </div>
            </div>
          </div>
        </article>
      </Reveal>
    </section>
  );
}
