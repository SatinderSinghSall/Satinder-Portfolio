export default function DeveloperCredit() {
  return (
    <section
      className="
        relative
        w-full
        py-20 md:py-16
        overflow-hidden
        text-center
        bg-white
      "
    >
      {/* TOP BORDER */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      {/* BOTTOM BORDER */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      {/* SOFT GLOW */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[240px] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      {/* LIGHT GRID */}
      <div
        className="
          absolute inset-0 opacity-30
          bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]
          bg-[size:48px_48px]
        "
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* SMALL LABEL */}
        <p
          className="
            mb-5
            text-[11px] sm:text-xs
            uppercase
            tracking-[0.45em]
            text-cyan-500
            font-medium
          "
        >
          Crafted & Developed By
        </p>

        {/* NAME */}
        <h2
          className="
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
            font-semibold
            tracking-tight
            leading-none
          "
        >
          <span
            className="
              bg-gradient-to-r
              from-slate-900
              via-blue-700
              to-cyan-500
              bg-clip-text
              text-transparent
            "
          >
            Satinder Singh Sall
          </span>
        </h2>

        {/* SUBTEXT */}
        <p
          className="
            mt-6
            text-sm sm:text-base
            text-slate-500
            tracking-wide
          "
        >
          Full-Stack Engineer · UI/UX Focused · Scalable Systems
        </p>
      </div>
    </section>
  );
}
