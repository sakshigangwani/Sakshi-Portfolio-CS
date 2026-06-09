"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Project = {
  slug: string;
  title: string;
  tagline: string;
  image: string;
  github: string;
  demo?: string;
  stack: string[];
  star: {
    situation: string;
    task: string;
    action: string[];
    result: string[];
  };
};

const PROJECTS: Project[] = [
  {
    slug: "notion-knowledge-assistant-mcp",
    title: "Notion Knowledge Assistant - MCP Server",
    tagline:
      "A Model Context Protocol server that turns your Notion workspace into a citable knowledge base any AI assistant can search, read, and reason over.",
    image: "/projects/notion-mcp.svg",
    github: "https://github.com/sakshigangwani/Notion-Knowledge-Assistant-MCP",
    stack: [
      "Python 3.11+",
      "MCP (FastMCP)",
      "RAG / Semantic Search",
      "ChromaDB",
      "OpenAI Embeddings",
      "Anthropic Claude API",
      "FastAPI",
      "React + Vite",
      "Pydantic",
      "SQLite",
      "Docker",
    ],
    star: {
      situation:
        "AI assistants are powerful but blind to your private Notion workspace - so answers about your own notes are generic, ungrounded, and impossible to verify.",
      task: "Build an MCP server that lets any MCP client (Claude Desktop / Claude Code) - or a standalone browser app - search, read, and reason over a Notion workspace, and answer in plain English with citations back to the source.",
      action: [
        "Exposed 5 MCP tools over stdio: keyword search, full-page → markdown rendering, database listing, semantic search, and an incremental reindex.",
        "Built a RAG pipeline with heading-aware chunking (~400–600 tokens, ~12.5% overlap), each chunk prefixed with its page + heading path so isolated chunks stay self-aware.",
        "Stored embeddings in an on-disk ChromaDB vector store with deterministic chunk IDs, so re-runs upsert instead of duplicating.",
        "Made embeddings pluggable - OpenAI text-embedding-3-small by default, or a fully-local sentence-transformers backend (no API key, no network).",
        "Implemented incremental sync via a SQLite manifest tracking last_edited_time - only changed pages re-embed, stale chunks get pruned, and a model change forces a full rebuild.",
        "Shipped a standalone browser app: FastAPI backend streaming NDJSON (sources → tokens → done) and a React/Vite UI rendering answers with clickable Notion citations.",
        "Hardened for production: typed Pydantic I/O with structured errors, client-side rate limiting to ~3 req/s, exponential-backoff retries honoring Retry-After, and stderr-only logging to protect the MCP stdio stream.",
      ],
      result: [
        "Every answer is grounded - each result carries a similarity score and a citation (title, URL, heading path) that deep-links straight back to Notion.",
        "Retrieval quality is measurable: a question→expected-page eval set tracks Recall@k and MRR so chunk size and top_k can be tuned with evidence, not guesswork.",
        "Reindexing is cheap and safe to schedule - only changed pages are touched, and archived/shrunk pages are cleaned up automatically.",
        "Ships as one multi-stage Docker image (UI build + FastAPI + RAG) with a persistent volume - `docker compose up` and it's live on port 8000.",
      ],
    },
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

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[1.15em] w-[1.15em]">
    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.92 1.23 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-[1.05em] w-[1.05em] transition-transform duration-300 group-hover:translate-x-1"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative flex w-full flex-col overflow-hidden rounded-3xl border border-border-soft bg-white/[0.03] text-left backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-accent-violet/40 hover:shadow-[0_20px_60px_-20px_rgba(139,92,246,0.5)]"
    >
      {/* Cover image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-lg font-bold text-foreground sm:text-xl">
          {project.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
          {project.tagline}
        </p>

        {/* Tech stack (preview) */}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border-soft bg-white/5 px-2.5 py-1 font-mono text-[0.7rem] text-foreground/80"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span className="rounded-full border border-border-soft bg-white/5 px-2.5 py-1 font-mono text-[0.7rem] text-muted">
              +{project.stack.length - 5}
            </span>
          )}
        </div>

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-cyan">
          View details
          <ArrowIcon />
        </span>
      </div>
    </button>
  );
}

function StarBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan">
        {label}
      </span>
      <div className="mt-2 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
        {children}
      </div>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/80 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className="animate-fade-up relative my-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-border-soft bg-background-soft shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cover */}
        <div className="relative aspect-[16/9]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 42rem"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-soft via-background-soft/40 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border-soft bg-background/60 text-foreground/90 backdrop-blur transition-colors hover:border-white/30 hover:bg-background/90"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-8 pt-2 sm:px-8">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">
            {project.title}
          </h3>
          <p className="mt-3 leading-relaxed text-muted">{project.tagline}</p>

          {/* Links */}
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-white/5 px-4 py-2 text-sm font-medium text-foreground/90 backdrop-blur transition-colors hover:border-white/20 hover:bg-white/10"
            >
              <GitHubIcon />
              View on GitHub
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan px-4 py-2 text-sm font-semibold text-[#05060f] transition-all hover:brightness-110"
              >
                Live demo
                <ArrowIcon />
              </a>
            )}
          </div>

          {/* Tech stack (full) */}
          <div className="mt-7 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border-soft bg-white/5 px-3 py-1 font-mono text-xs text-foreground/80"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* STAR breakdown */}
          <div className="mt-8 space-y-6 border-t border-border-soft pt-7">
            <StarBlock label="Situation">{project.star.situation}</StarBlock>
            <StarBlock label="Task">{project.star.task}</StarBlock>
            <StarBlock label="Action">
              <Bullets items={project.star.action} />
            </StarBlock>
            <StarBlock label="Result">
              <Bullets items={project.star.result} />
            </StarBlock>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-24 sm:px-8 sm:py-32"
    >
      {/* Heading */}
      <div className="max-w-2xl">
        <span className="font-mono text-sm text-accent-cyan">{"// projects"}</span>
        <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Things I&apos;ve <span className="text-gradient">shipped</span>
        </h2>
        <p className="mt-5 leading-relaxed text-muted">
          A selection of what I&apos;ve been building. Click any card for the
          full story - the problem, what I did, and what came out of it.
        </p>
      </div>

      {/* Grid */}
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-8">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.slug} delay={i * 100}>
            <ProjectCard project={project} onOpen={() => setActive(project)} />
          </Reveal>
        ))}
      </div>

      {active && (
        <ProjectModal project={active} onClose={() => setActive(null)} />
      )}
    </section>
  );
}
