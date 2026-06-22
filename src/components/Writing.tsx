const POSTS = [
  {
    title: "NLP: How Machines Learned to Read Between the Lines",
    blurb:
      "A friendly tour through Natural Language Processing - how it grew from rigid rule-based systems to machine learning and finally the Transformer architecture that taught machines to actually understand the language we speak.",
    href: "https://medium.com/@gangwani.sakshi15/nlp-how-machines-learned-to-read-between-the-lines-05f0068631a4",
    date: "Jun 2026",
    readingTime: "4 min read",
    tags: ["NLP", "Transformers", "Deep Learning", "AI"],
  },
  {
    title: "The Algorithm Arc Nobody Saw Coming",
    blurb:
      "How I went from dreading Data Structures & Algorithms to actually enjoying the grind - swapping outcome-anxiety for process, leaning on visualization, and letting consistency do the heavy lifting on the road to FAANG interviews.",
    href: "https://medium.com/@gangwani.sakshi15/the-algorithm-arc-nobody-saw-coming-1b9f6909fd35",
    date: "Feb 26, 2026",
    readingTime: "4 min read",
    tags: ["DSA", "Interview Prep", "Mindset"],
  },
];

const MediumIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[1.15em] w-[1.15em]">
    <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12Zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42S20.96 8.46 20.96 12ZM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12Z" />
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

export default function Writing() {
  return (
    <section
      id="writing"
      className="relative mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-24 sm:px-8 sm:py-32"
    >
      {/* Heading */}
      <div className="max-w-2xl">
        <span className="font-mono text-sm text-accent-cyan">{"// writing"}</span>
        <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Things I&apos;ve <span className="text-gradient">written</span>
        </h2>
        <p className="mt-5 leading-relaxed text-muted">
          Occasional notes on what I&apos;m learning - the messy middle, not just
          the highlight reel.
        </p>
      </div>

      {/* Posts */}
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-8">
        {POSTS.map((post) => (
          <a
            key={post.href}
            href={post.href}
            target="_blank"
            rel="noreferrer"
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-border-soft bg-white/[0.03] p-7 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-accent-violet/40 hover:shadow-[0_20px_60px_-20px_rgba(139,92,246,0.5)] sm:p-8"
          >
            {/* Meta row */}
            <div className="flex items-center gap-3 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5 font-medium text-accent-cyan">
                <MediumIcon />
                Medium
              </span>
              <span className="h-1 w-1 rounded-full bg-muted/50" />
              <span>{post.date}</span>
              <span className="h-1 w-1 rounded-full bg-muted/50" />
              <span>{post.readingTime}</span>
            </div>

            <h3 className="mt-4 text-xl font-bold text-foreground sm:text-2xl">
              {post.title}
            </h3>
            <p className="mt-3 leading-relaxed text-muted">{post.blurb}</p>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border-soft bg-white/5 px-2.5 py-1 font-mono text-[0.7rem] text-foreground/80"
                >
                  {tag}
                </span>
              ))}
            </div>

            <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent-cyan">
              Read on Medium
              <ArrowIcon />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
