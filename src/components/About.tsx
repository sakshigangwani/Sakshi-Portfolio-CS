const LINKS = {
  viterbi: "https://viterbischool.usc.edu/",
  mann: "https://mann.usc.edu/",
  djsce: "https://www.djsce.ac.in/",
};

const STATS = [
  { value: "3.5/4", label: "USC GPA" },
  { value: "1", label: "Patent as inventor" },
  { value: "Honors", label: "Intelligent Computing" },
];

const EDUCATION = [
  {
    school: "USC Viterbi School of Engineering",
    href: LINKS.viterbi,
    detail: "M.S. in Computer Science",
    meta: "University of Southern California · Los Angeles, CA · 3.5/4 GPA",
  },
  {
    school: "Dwarkadas J. Sanghvi College of Engineering",
    href: LINKS.djsce,
    detail: "B.Tech in Computer Engineering - Honors in Intelligent Computing",
    meta: "Mumbai, India · 9.24 CGPA",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-24 sm:px-8 sm:py-32"
    >
      <div className="grid gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:gap-16">
        {/* Heading */}
        <div>
          <span className="font-mono text-sm text-accent-cyan">{"// about me"}</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            A bit about
            <br />
            <span className="text-gradient">my journey</span>
          </h2>
        </div>

        {/* Body */}
        <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          <p>
            I&apos;m Sakshi, a Master&apos;s in Computer Science student at the{" "}
            <a
              href={LINKS.viterbi}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-foreground underline decoration-accent-cyan/40 underline-offset-4 transition-colors hover:text-accent-cyan"
            >
              Viterbi School of Engineering, University of Southern California
            </a>{" "}
            and an AI Engineer at the{" "}
            <a
              href={LINKS.mann}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-foreground underline decoration-accent-cyan/40 underline-offset-4 transition-colors hover:text-accent-cyan"
            >
              USC Alfred E. Mann School of Pharmacy and Pharmaceutical Sciences
            </a>
            , building intelligent systems at the intersection of machine
            learning and full-stack engineering.
          </p>
          <p>
            Before USC, I completed my{" "}
            <strong className="font-semibold text-foreground">
              B.Tech in Computer Engineering with Honors in Intelligent
              Computing
            </strong>{" "}
            from{" "}
            <a
              href={LINKS.djsce}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-foreground underline decoration-accent-cyan/40 underline-offset-4 transition-colors hover:text-accent-cyan"
            >
              Dwarkadas J. Sanghvi College of Engineering
            </a>
            , Mumbai, graduating with a{" "}
            <strong className="font-semibold text-foreground">9.24 CGPA</strong>.
            Along the way I led a full-stack DevOps team at a hardware startup,
            built industrial IoT systems, and{" "}
            <strong className="font-semibold text-foreground">
              published a patent as an inventor
            </strong>{" "}
            for an AI-driven gas leak detection robot.
          </p>
          <p>
            That journey, from embedded firmware to ML pipelines, is what brought
            me here and what keeps me building.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 pt-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border-soft bg-white/5 p-4 backdrop-blur transition-colors hover:border-white/20"
              >
                <div className="text-gradient text-2xl font-bold sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-muted sm:text-sm">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-4 pt-6">
            {EDUCATION.map((e) => (
              <div key={e.school} className="flex gap-4">
                <div className="mt-1.5 flex flex-col items-center">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan shadow-[0_0_10px_var(--accent-violet)]" />
                  <span className="mt-1 w-px flex-1 bg-border-soft" />
                </div>
                <div className="pb-1">
                  <a
                    href={e.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-foreground transition-colors hover:text-accent-cyan"
                  >
                    {e.school}
                  </a>
                  <div className="text-sm text-muted">{e.detail}</div>
                  <div className="mt-0.5 text-xs text-muted/70">{e.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
