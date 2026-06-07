import Image from "next/image";

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[1.15em] w-[1.15em]">
    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.92 1.23 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[1.15em] w-[1.15em]">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

const ResumeIcon = () => (
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

// TODO: replace these with your real profile URLs / resume file
const LINKS = {
  github: "https://github.com/sakshigangwani",
  linkedin: "https://www.linkedin.com/in/sakshigangwani",
  resume: "/resume.pdf",
};

export default function Hero() {
  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 sm:px-8">
      {/* Nav */}
      <nav className="animate-fade-up flex items-center justify-between py-7">
        <a href="#" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-violet shadow-[0_0_12px_var(--accent-violet)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-cyan shadow-[0_0_12px_var(--accent-cyan)]" />
          </span>
          <span>Sakshi Gangwani</span>
        </a>
        <div className="hidden items-center gap-8 text-sm text-muted sm:flex">
          <a href="#projects" className="transition-colors hover:text-foreground">
            Projects
          </a>
          <a href={LINKS.github} className="transition-colors hover:text-foreground">
            GitHub
          </a>
          <a href={LINKS.linkedin} className="transition-colors hover:text-foreground">
            LinkedIn
          </a>
        </div>
      </nav>

      {/* Hero grid */}
      <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        {/* Left: copy */}
        <div className="order-2 lg:order-1">
          <span
            className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border-soft bg-white/5 px-4 py-1.5 text-sm text-muted backdrop-blur"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-cyan" />
            </span>
            Open to opportunities
          </span>

          <h1
            className="animate-fade-up mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.12s" }}
          >
            Sakshi
            <br />
            <span className="text-gradient">Gangwani</span>
          </h1>

          <p
            className="animate-fade-up mt-5 text-xl font-medium text-foreground/90 sm:text-2xl"
            style={{ animationDelay: "0.2s" }}
          >
            AI Engineer &amp; Full-Stack Developer
          </p>

          <p
            className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            style={{ animationDelay: "0.28s" }}
          >
            AI Engineer at{" "}
            <strong className="font-semibold text-foreground">
              USC Alfred E. Mann School of Pharmacy
            </strong>{" "}
            and CS Master&apos;s student at{" "}
            <strong className="font-semibold text-foreground">
              USC Viterbi School of Engineering
            </strong>
            , building intelligent systems end-to-end from ML models and
            retrieval pipelines to the full-stack products around them. And yes,
            one of those projects even got a{" "}
            <strong className="font-semibold text-foreground">
              published patent
            </strong>{" "}
            with my name on it.
          </p>

          {/* CTAs */}
          <div
            className="animate-fade-up mt-9 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "0.36s" }}
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan px-6 py-3 text-sm font-semibold text-[#05060f] shadow-[0_0_30px_-6px_var(--accent-violet)] transition-all duration-300 hover:shadow-[0_0_40px_-4px_var(--accent-cyan)] hover:brightness-110"
            >
              View Projects
              <ArrowIcon />
            </a>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-white/5 px-5 py-3 text-sm font-medium text-foreground/90 backdrop-blur transition-colors hover:border-white/20 hover:bg-white/10"
            >
              <GitHubIcon />
              GitHub
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-white/5 px-5 py-3 text-sm font-medium text-foreground/90 backdrop-blur transition-colors hover:border-white/20 hover:bg-white/10"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
            <a
              href={LINKS.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-white/5 px-5 py-3 text-sm font-medium text-foreground/90 backdrop-blur transition-colors hover:border-white/20 hover:bg-white/10"
            >
              <ResumeIcon />
              Resume
            </a>
          </div>
        </div>

        {/* Right: photo */}
        <div
          className="animate-fade-up order-1 flex justify-center lg:order-2 lg:justify-end"
          style={{ animationDelay: "0.22s" }}
        >
          <div className="animate-float-slow relative">
            {/* Soft ambient glow */}
            <div className="animate-glow-pulse absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-accent-violet/50 to-accent-cyan/50 blur-3xl" />
            {/* Thin static gradient frame */}
            <div className="relative rounded-[2rem] bg-gradient-to-br from-accent-violet/70 via-white/10 to-accent-cyan/70 p-px shadow-[0_20px_60px_-15px_rgba(139,92,246,0.4)]">
              <div className="overflow-hidden rounded-[1.95rem] bg-background-soft">
                <Image
                  src="/sakshi.png"
                  alt="Sakshi Gangwani"
                  width={460}
                  height={460}
                  priority
                  className="h-[20rem] w-[20rem] object-cover sm:h-[24rem] sm:w-[24rem]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
