export default function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Base radial wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.18),_transparent_55%)]" />

      {/* Floating glow blobs */}
      <div className="animate-float absolute -left-32 top-[-10%] h-[34rem] w-[34rem] rounded-full bg-accent-violet/25 blur-[120px]" />
      <div className="animate-float-slow absolute -right-24 top-1/3 h-[30rem] w-[30rem] rounded-full bg-accent-cyan/20 blur-[120px]" />
      <div className="animate-float absolute bottom-[-15%] left-1/3 h-[28rem] w-[28rem] rounded-full bg-violet-500/15 blur-[130px]" />

      {/* Fine grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {/* Subtle noise/vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,6,15,0.7))]" />
    </div>
  );
}
