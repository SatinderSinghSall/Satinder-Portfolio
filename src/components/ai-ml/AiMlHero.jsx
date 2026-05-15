import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

export default function AiHero() {
  return (
    <section
      className="
        relative overflow-hidden
        bg-[#020617] text-white
        flex items-center justify-center
        min-h-[88vh] sm:min-h-screen
      "
    >
      {/* ================= BACKGROUND ================= */}

      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#030712] to-black" />

      {/* Main glow */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/10 blur-[150px] rounded-full" />

      {/* Secondary glow */}
      <div className="absolute bottom-[-20%] right-[-10%] w-[450px] h-[450px] bg-purple-600/10 blur-[130px] rounded-full" />

      {/* Grid */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
          bg-[size:42px_42px]
          sm:bg-[size:56px_56px]
        "
      />

      {/* Radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_45%)]" />

      {/* ================= CONTENT ================= */}

      <div
        className="
          relative z-10
          w-full max-w-6xl
          mx-auto
          px-5 sm:px-8
          pt-20 sm:pt-28
          pb-16 sm:pb-20
        "
      >
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div
            className="
              mb-6
              inline-flex items-center gap-2
              px-4 py-2
              rounded-full
              border border-cyan-400/20
              bg-cyan-400/10
              backdrop-blur-xl
              text-cyan-300
              text-[11px] sm:text-xs
              uppercase
              tracking-[0.28em]
            "
          >
            <Sparkles size={14} />
            AI / ML Engineer
          </div>

          {/* Heading */}
          <h1
            className="
              font-black
              tracking-[-0.05em]
              leading-[0.95]
              mb-6
              max-w-[1000px]

              text-[2.4rem]
              sm:text-6xl
              md:text-7xl
              lg:text-8xl
            "
          >
            <span className="block text-white">Building Intelligent</span>

            <span
              className="
                block mt-2
                bg-gradient-to-r
                from-cyan-300
                via-blue-300
                to-fuchsia-400
                bg-clip-text
                text-transparent
              "
            >
              <Typewriter
                words={[
                  "AI & Machine Learning",
                  "Deep Learning Systems",
                  "Computer Vision Models",
                  "NLP Applications",
                ]}
                loop
                cursor
                cursorStyle="_"
                typeSpeed={55}
                deleteSpeed={35}
                delaySpeed={1800}
              />
            </span>
          </h1>

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
            I design and develop AI-powered applications using deep learning,
            computer vision, and NLP to solve real-world problems with scalable
            intelligent systems.
          </p>

          {/* Terminal typing */}
          <div className="mb-10 sm:mb-12 w-full flex justify-center">
            <div
              className="
                relative overflow-hidden
                max-w-[90vw] sm:max-w-none
                px-4 sm:px-5
                py-3
                rounded-2xl
                border border-cyan-400/15
                bg-white/[0.03]
                backdrop-blur-xl
                shadow-[0_10px_40px_rgba(37,99,235,0.15)]
              "
            >
              {/* glow */}
              <div className="absolute inset-0 bg-cyan-400/5 blur-2xl" />

              <div className="relative flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />

                <span
                  className="
                    text-cyan-300
                    font-mono
                    text-[11px]
                    sm:text-sm
                    tracking-wide
                  "
                >
                  <Typewriter
                    words={[
                      "Initializing neural networks...",
                      "Training computer vision models...",
                      "Optimizing transformer pipelines...",
                      "Deploying intelligent systems...",
                    ]}
                    loop
                    cursor
                    cursorStyle="▋"
                    typeSpeed={50}
                    deleteSpeed={30}
                    delaySpeed={1800}
                  />
                </span>
              </div>
            </div>
          </div>

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
            {/* Primary */}
            <Link to="/ai-ml" className="w-full sm:w-auto">
              <button
                className="
                  group relative overflow-hidden
                  w-full
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
                "
              >
                <span className="relative z-10">View AI Projects</span>

                <ArrowRight
                  size={18}
                  className="
                    relative z-10
                    transition-transform duration-300
                    group-hover:translate-x-1
                  "
                />

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/10 transition-opacity duration-300" />
              </button>
            </Link>

            {/* Secondary */}
            <Link to="/contact" className="w-full sm:w-auto">
              <button
                className="
                  group
                  w-full
                  inline-flex items-center justify-center gap-2
                  px-7 py-4
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.03]
                  backdrop-blur-xl
                  hover:bg-white/[0.06]
                  hover:border-white/20
                  transition-all duration-300
                  font-semibold
                  hover:scale-[1.02]
                  active:scale-95
                "
              >
                Contact Me
                <Mail
                  size={18}
                  className="opacity-80 group-hover:opacity-100"
                />
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="w-full">
            {/* Mobile */}
            <div className="flex sm:hidden items-center justify-center gap-3 text-[11px] text-slate-400 flex-wrap">
              <div className="flex items-center gap-1 whitespace-nowrap">
                <span className="text-white font-semibold">5+</span>
                AI Projects
              </div>

              <span className="opacity-30">•</span>

              <div className="flex items-center gap-1 whitespace-nowrap">
                <span className="text-white font-semibold">3+</span>
                Domains
              </div>

              <span className="opacity-30">•</span>

              <div className="flex items-center gap-1 whitespace-nowrap">
                <span className="text-white font-semibold">1+</span>
                Years
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden sm:flex items-center justify-center gap-10 md:gap-14 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-base">5+</span>

                <span>AI projects built</span>
              </div>

              <div className="w-1 h-1 rounded-full bg-white/20" />

              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-base">3+</span>

                <span>AI domains explored</span>
              </div>

              <div className="w-1 h-1 rounded-full bg-white/20" />

              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-base">1+</span>

                <span>years experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
