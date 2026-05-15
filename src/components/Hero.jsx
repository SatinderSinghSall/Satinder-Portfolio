import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="
      relative overflow-hidden
      bg-[#020617] text-white
      flex items-start justify-center
      min-h-[85vh] sm:min-h-screen
    "
    >
      {/* ================= BACKGROUND ================= */}

      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#030712] to-black" />

      {/* Glow */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-cyan-500/10 blur-[140px] rounded-full" />

      <div className="absolute bottom-[-25%] right-[-10%] w-[420px] h-[420px] bg-blue-600/10 blur-[120px] rounded-full" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:42px_42px] sm:bg-[size:58px_58px]" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_45%)]" />

      {/* ================= CONTENT ================= */}

      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 pt-16 sm:pt-12 lg:pt-14 pb-14 sm:pb-16">
        <div className="flex flex-col items-center text-center">
          {/* Intro */}
          <p className="text-[10px] sm:text-sm uppercase tracking-[0.35em] text-slate-400 mb-3">
            HELLO, I’M
          </p>

          {/* Heading */}
          <h1
            className="
              relative
              font-black
              tracking-[-0.04em]
              leading-none
              mb-5
              text-[2.15rem]
              sm:text-6xl
              md:text-7xl
              lg:text-8xl
              text-center
            "
          >
            <span
              className="
                whitespace-nowrap
                bg-gradient-to-r
                from-white
                via-blue-200
                to-cyan-400
                bg-clip-text
                text-transparent
              "
            >
              Satinder Singh Sall
            </span>

            {/* Glow */}
            <div className="absolute inset-0 blur-3xl opacity-20 bg-cyan-400" />
          </h1>

          {/* Typewriter */}
          <div className="h-[46px] sm:h-[42px] mb-5 sm:mb-6">
            <p
              className="
                text-lg
                sm:text-2xl
                md:text-3xl
                text-slate-300
                font-medium
                max-w-[320px]
                sm:max-w-full
                mx-auto
                leading-snug
              "
            >
              <Typewriter
                words={[
                  "Full-Stack Engineer",
                  "Building scalable web & mobile systems",
                  "Creating premium digital experiences",
                ]}
                loop
                cursor
                cursorStyle="_"
                typeSpeed={55}
                deleteSpeed={35}
                delaySpeed={1800}
              />
            </p>
          </div>

          {/* Description */}
          <p
            className="
              max-w-xl sm:max-w-2xl
              text-[15px] sm:text-lg md:text-xl
              leading-relaxed
              text-slate-400
              mb-8 sm:mb-10
            "
          >
            I help teams and businesses build reliable, high-quality web and
            mobile applications with a strong focus on performance, usability,
            and clean architecture.
          </p>

          {/* Buttons */}
          <div
            className="
              flex flex-col
              sm:flex-row
              items-stretch sm:items-center
              justify-center
              gap-3 sm:gap-4
              w-full
              max-w-md
              sm:max-w-none
              mb-10 sm:mb-14
            "
          >
            {/* View Work */}
            <a
              href="/projects"
              className="
                group relative overflow-hidden
                inline-flex items-center justify-center gap-2
                px-7 py-4
                rounded-2xl
                bg-gradient-to-r from-blue-600 to-cyan-500
                hover:from-blue-500 hover:to-cyan-400
                transition-all duration-300
                font-semibold
                shadow-[0_10px_40px_rgba(37,99,235,0.35)]
                hover:scale-[1.02]
                active:scale-95
                text-sm sm:text-base
                w-full sm:w-auto
              "
            >
              <span className="relative z-10">View Work</span>

              <ArrowRight
                size={18}
                className="
                  relative z-10
                  transition-transform duration-300
                  group-hover:translate-x-1
                "
              />

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/10 transition-opacity duration-300" />
            </a>

            {/* AI / ML */}
            <a
              href="/ai-ml"
              className="
                group relative overflow-hidden
                inline-flex items-center justify-center gap-2
                px-7 py-4
                rounded-2xl
                bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500
                text-white font-semibold
                shadow-[0_12px_45px_rgba(168,85,247,0.28)]
                transition-all duration-300
                hover:scale-[1.02]
                active:scale-95
                text-sm sm:text-base
                w-full sm:w-auto
              "
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/10" />

              <span className="relative z-10">Explore AI / ML</span>
            </a>

            {/* Contact */}
            <a
              href="/contact"
              className="
                group
                inline-flex items-center justify-center
                px-7 py-4
                rounded-2xl
                border border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                text-white font-semibold
                transition-all duration-300
                hover:bg-white/[0.06]
                hover:border-white/20
                hover:shadow-[0_10px_35px_rgba(255,255,255,0.08)]
                hover:scale-[1.02]
                active:scale-95
                text-sm sm:text-base
                w-full sm:w-auto
              "
            >
              Get in Touch
            </a>
          </div>

          {/* Stats */}
          {/* ================= STATS ================= */}

          <div className="w-full">
            {/* Mobile Stats */}
            <div className="flex sm:hidden items-center justify-center gap-3 text-[11px] text-slate-400 flex-wrap">
              <div className="flex items-center gap-1 whitespace-nowrap">
                <span className="text-white font-semibold">1+</span>
                yrs exp
              </div>

              <span className="opacity-30">•</span>

              <div className="flex items-center gap-1 whitespace-nowrap">
                <span className="text-white font-semibold">15+</span>
                projects
              </div>

              <span className="opacity-30">•</span>

              <div className="flex items-center gap-1 whitespace-nowrap">
                <span className="text-white font-semibold">Full-Stack</span>
              </div>
            </div>

            {/* Desktop Stats */}
            <div className="hidden sm:flex items-center justify-center gap-10 md:gap-14 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-base">1+</span>

                <span>years experience</span>
              </div>

              <div className="w-1 h-1 rounded-full bg-white/20" />

              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-base">15+</span>

                <span>projects delivered</span>
              </div>

              <div className="w-1 h-1 rounded-full bg-white/20" />

              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-base">
                  Full-Stack
                </span>

                <span>engineering focus</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
