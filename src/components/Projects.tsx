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
    slug: "gas-pipe-leakage-detection-ml",
    title: "Gas Pipe Leakage Detection - ML Model",
    tagline:
      "The machine-learning brain of a patented IoT robot - it reads live LPG, temperature, and humidity telemetry and clusters it to flag gas leaks in pipelines in real time.",
    image: "/patent/gas-leakage-clusters.jpeg",
    github:
      "https://github.com/sakshigangwani/ML-model-for-detecting-Gas-Pipe-Leakage",
    stack: [
      "Python",
      "scikit-learn",
      "K-Means",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "IoT Telemetry",
    ],
    star: {
      situation:
        "Gas-pipe leaks are dangerous and often go unnoticed until they're serious. An IoT inspection robot can patrol pipelines and stream sensor data - but raw LPG, temperature, and humidity readings on their own don't tell you whether a leak is actually happening.",
      task: "Build the ML layer that turns a robot's live multi-sensor telemetry into a clear, real-time leak / no-leak decision - and make it the detection engine behind a patented IoT system.",
      action: [
        "Worked from an IoT telemetry dataset, selecting the three signals that matter for leak detection: humidity, LPG concentration, and temperature.",
        "Used the elbow method (WCSS over k = 1–10) to objectively choose the optimal number of clusters rather than guessing.",
        "Trained a K-Means model (k = 3, k-means++ init, fixed random_state for reproducibility) to separate normal operating conditions from leak-like signatures.",
        "Built a real-time inference path: a new (humidity, LPG, temperature) reading is mapped to its nearest cluster, and leak-characteristic clusters (elevated LPG with telltale humidity/temperature ranges) raise a \"Gas Leakage Detected\" alert.",
        "Visualized the learned structure as a 3D scatter plot of the clusters and their centroids to validate and communicate the separation.",
      ],
      result: [
        "Became the detection engine of an IoT-enabled leak-detection robot that was filed as a patent and recognized with a Letter of Appreciation from the college.",
        "Turns three cheap sensor readings into an instant, automatable leak decision - no manual inspection required.",
        "Reproducible and interpretable: fixed seeding plus a 3D cluster visualization make the model's behavior easy to inspect and explain.",
      ],
    },
  },
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
  {
    slug: "flowsync-ai-health-assistant",
    title: "FlowSync - Multi-Agent AI Health Assistant",
    tagline:
      "A production-style, multi-agent RAG system for women's health: a hybrid router sends each question to one of three specialized LLM agents, every answer grounded in a Pinecone vector store.",
    image: "/projects/flowsync.svg",
    github: "https://github.com/sakshigangwani/FlowSync-AI-Health-Assistant",
    stack: [
      "Python 3",
      "LangChain",
      "OpenAI LLM",
      "RAG",
      "Pinecone",
      "Hugging Face",
      "Sentence-Transformers (all-MiniLM-L6-v2)",
      "Flask",
      "Multi-Agent Orchestration",
      "pypdf",
    ],
    star: {
      situation:
        "General-purpose health chatbots are single bloated prompts - they give ungrounded, one-size-fits-all answers, and a medical question, a symptom description, and a lifestyle query all get handled the same way.",
      task: "Build an applied-LLM product end to end - data ingestion, vector retrieval, agent orchestration, API, and a real-time chat client - that specializes answers by domain and grounds every response in source documents, under real cost and latency constraints.",
      action: [
        "Decomposed the system into three specialized LLM agents (Medical, Symptom, Lifestyle), each with independently tuned decoding params and retrieval depth (temp 0.3-0.5, k=3-4) so prompts stay small, auditable, and domain-accurate.",
        "Built a hybrid router: a low-temperature LLM classifier labels each query MEDICAL/SYMPTOM/LIFESTYLE, with a deterministic keyword-scoring fallback that takes over on any LLM error or timeout - the routing step never hard-fails.",
        "Grounded answers with RAG behind a MedicalRetriever abstraction - local Sentence-Transformers embeddings (all-MiniLM-L6-v2, 384-dim) and cosine top-k search over a serverless Pinecone index - so the vector backend or embedding model can change without touching agent code.",
        "Made it cost-aware: routing uses a cheap ~50-token call and only the chosen specialist runs the expensive generation, while local embeddings avoid per-query embedding API costs.",
        "Kept clean seams for scale: an offline indexing job (PDF -> 500-char chunks -> embed -> upsert) decoupled from a stateless serving path, with the SymptomAgent able to delegate to the MedicalAgent for collaboration.",
        "Served it over a Flask REST API (structured /api/chat with agent metadata, plus /get backing a streaming chat UI with typing and retrieval animations).",
      ],
      result: [
        "Every answer is grounded in retrieved source documents and tagged with the agent that produced it, so responses are domain-specific and traceable rather than generic.",
        "Graceful degradation by design - the keyword fallback guarantees the router stays available at zero extra cost even when the LLM classifier fails.",
        "Cost and latency stay low: a tiny classification call routes to one specialist, and local embeddings remove per-query embedding spend.",
        "Modular and swappable - independent agents, a retriever abstraction over Pinecone, and an offline batch index mean each piece can be scaled or replaced in isolation.",
      ],
    },
  },
  {
    slug: "ai-resume-analyzer",
    title: "AI Resume Analyzer",
    tagline:
      "A Streamlit app that parses a resume PDF into a structured profile and scores it against any job description - returning a match score, missing skills, and personalized improvement suggestions via an LLM.",
    image: "/projects/resume-analyzer.svg",
    github: "https://github.com/sakshigangwani/ai-resume-analyzer",
    stack: [
      "Python",
      "Streamlit",
      "OpenAI API (gpt-4.1-mini)",
      "pdfplumber",
      "LLM Prompting",
      "JSON Extraction",
    ],
    star: {
      situation:
        "Tailoring a resume to a job posting is slow and guesswork-heavy - candidates can't easily see how well they match a role or which specific skills they're missing, and recruiters skim hundreds of unstructured PDFs.",
      task: "Build a tool that turns a raw resume PDF into structured data and objectively measures it against a target job description, with concrete, actionable feedback - all without storing the user's API key.",
      action: [
        "Extracted raw text from uploaded resume PDFs with pdfplumber, then prompted gpt-4.1-mini to return a structured JSON profile - skills, education, experience, projects, patents, publications, awards, certifications, languages, courses, and contact links.",
        "Built a matching step that sends the parsed resume plus a pasted job description to the LLM and returns a 0-100 match score, the missing skills, and personalized suggestions to improve.",
        "Split the codebase into clear modules - parser.py (PDF extraction + resume parsing), matcher.py (resume-to-JD comparison), and app.py (Streamlit UI) - so parsing and matching are independently testable.",
        "Designed a two-tab Streamlit UI: a Parsed Resume view showing the structured profile and a Match Analysis view showing score, gaps, and suggestions.",
        "Handled the API key safely - entered in the sidebar and used only for the current session, with an OPENAI_API_KEY environment variable as a fallback.",
      ],
      result: [
        "Converts an unstructured PDF into a clean, structured profile in seconds, ready to display or feed into downstream tooling.",
        "Gives candidates an objective, per-role match score plus a concrete list of missing skills and improvements - turning vague 'tailor your resume' advice into specific action items.",
        "Keeps the user in control of their credentials: the key lives only in the session, never persisted.",
        "Modular and lightweight - three small Python files and three dependencies (streamlit, openai, pdfplumber) make it easy to run, read, and extend.",
      ],
    },
  },
  {
    slug: "collabdocs-realtime-editor",
    title: "CollabDocs - Real-Time Collaborative Editor",
    tagline:
      "A production-grade real-time collaborative document editor (think Google Docs / Notion), architected from a FAANG-level engineering spec - CRDT-based multi-user editing, version history, and granular permissions across a TypeScript monorepo.",
    image: "/projects/collabdocs.svg",
    github: "https://github.com/sakshigangwani/CollabDocs-Real-Time-Collaborative-Docs",
    stack: [
      "TypeScript",
      "Turborepo + pnpm",
      "React 18 + Vite",
      "Fastify",
      "Prisma + PostgreSQL",
      "Redis",
      "MinIO / S3",
      "JWT (jose) + Argon2",
      "Zod",
      "Docker Compose",
    ],
    star: {
      situation:
        "Real-time collaborative editing - multiple cursors, conflict-free merges, offline support, version history - is one of the hardest problems in product engineering, and most side projects skip the design rigor that makes it actually correct at scale.",
      task: "Design and build a Google-Docs-class collaborative editor to a production-grade engineering spec (CRDT real-time collaboration with sub-100ms latency, offline-first reconciliation, document version history, and granular per-document permissions) - and lay a foundation a real team could execute on.",
      action: [
        "Authored a full FAANG-level engineering specification - product features, user journeys, system architecture, data models, real-time collaboration algorithms (Yjs CRDTs over a custom WebSocket server), service decomposition, and a scaling/observability strategy.",
        "Scaffolded a type-safe Turborepo + pnpm monorepo: a Fastify API, a React 18 + Vite web app, and a shared package of Zod-validated request/response contracts reused across client and server.",
        "Modeled the core domain in Prisma/PostgreSQL - users, workspaces and roles, documents with snapshot versioning, and a polymorphic document-ACL table (user / workspace / link principals) backing owner/editor/commenter/viewer permissions.",
        "Implemented secure authentication from scratch: Argon2 password hashing, short-lived HS256 JWT access tokens (jose), and opaque refresh tokens stored hashed in Postgres with rotation and revocation.",
        "Stood up the full local infra with Docker Compose - PostgreSQL, Redis (sessions / presence / awareness fanout), and MinIO (S3-compatible snapshot & attachment storage) - each with health checks.",
        "Built the web foundation - marketing, auth, and onboarding flows with a React Router app shell, protected routes, an auth context, and React Hook Form + Zod validation shared with the backend.",
      ],
      result: [
        "A clear, defensible architecture for the hard parts - CRDT convergence, offline reconciliation, presence, and snapshot versioning - documented before a line of the editor was written.",
        "A working, type-safe monorepo foundation: shared contracts mean the API and UI can't drift, and `docker compose up` brings the whole backend stack online locally.",
        "Production-minded auth and data modeling from day one - hashed rotating refresh tokens and a flexible ACL model that already supports shareable-link and workspace-wide access.",
        "Structured for real teamwork: independent services, a single source of truth for types, and turbo-cached build/typecheck/test pipelines across every package.",
      ],
    },
  },
];

// Display order for the projects grid.
const PROJECT_ORDER = [
  "notion-knowledge-assistant-mcp",
  "collabdocs-realtime-editor",
  "flowsync-ai-health-assistant",
  "gas-pipe-leakage-detection-ml",
  "ai-resume-analyzer",
];

const ORDERED_PROJECTS = [...PROJECTS].sort(
  (a, b) => PROJECT_ORDER.indexOf(a.slug) - PROJECT_ORDER.indexOf(b.slug)
);

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
        {ORDERED_PROJECTS.map((project, i) => (
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
