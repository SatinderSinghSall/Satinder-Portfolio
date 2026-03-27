import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

export default function AiHero() {
  return (
    <section className="relative min-h-[calc(100vh-70px)] flex items-center justify-center overflow-hidden bg-black text-white">
      {/* 🌌 BACKGROUND */}
      <div className="absolute inset-0 bg-black" />

      {/* LIGHT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.65),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(59,130,246,0.35),transparent_65%)]" />

      {/* LIGHT RAYS */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_35%,rgba(59,130,246,0.25),transparent_65%)]" />

      {/* GRID */}
      <div
        className="
        absolute inset-0 opacity-40 
        bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)]
        [background-size:50px_50px]
        sm:[background-size:60px_60px]
        md:[background-size:70px_70px]
        lg:[background-size:80px_80px]
      "
      />

      {/* CENTER FOCUS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.9))]" />

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-6xl px-4 sm:px-6 md:px-8 text-center flex flex-col items-center justify-center gap-6 sm:gap-8">
        {/* Badge */}
        <div className="px-3 sm:px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-[10px] sm:text-xs tracking-widest uppercase">
          AI / ML Engineer
        </div>

        {/* Heading */}
        <h1
          className="
          font-bold leading-[1.15]
          text-[28px] 
          sm:text-[34px] 
          md:text-[48px] 
          lg:text-[64px] 
          xl:text-[72px]
          drop-shadow-[0_0_25px_rgba(59,130,246,0.35)]
        "
        >
          Building Intelligent Systems with{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            <Typewriter
              words={[
                "AI & Machine Learning",
                "Deep Learning Systems",
                "Computer Vision Models",
                "NLP Applications",
              ]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1800}
            />
          </span>
        </h1>

        {/* Description */}
        <p
          className="
          text-gray-400 
          max-w-md sm:max-w-lg md:max-w-xl 
          text-[14px] sm:text-[15px] md:text-[17px] lg:text-[18px]
          leading-relaxed
        "
        >
          I design and develop AI-powered applications using deep learning,
          computer vision, and NLP to solve real-world problems.
        </p>

        <div className="mt-2 font-mono text-xs sm:text-sm tracking-wide">
          <div className="relative inline-block px-4 py-2 rounded-lg bg-white/5 border border-blue-500/20 backdrop-blur-md shadow-[0_0_25px_rgba(59,130,246,0.15)]">
            {/* subtle glow */}
            <div className="absolute inset-0 rounded-lg bg-blue-500/10 blur-lg opacity-40" />

            {/* typing text */}
            <span className="relative text-blue-300">
              <Typewriter
                words={[
                  "Initializing neural networks...",
                  "Loading training datasets...",
                  "Optimizing model weights...",
                  "Deploying intelligent systems...",
                ]}
                loop
                cursor
                cursorStyle="▋"
                typeSpeed={50}
                deleteSpeed={28}
                delaySpeed={1700}
              />
            </span>

            {/* blinking dot (system alive feel) */}
            <span className="ml-2 inline-block w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-2">
          {/* Primary */}
          <Link to="/ai-ml">
            <button
              className="
              w-full sm:w-auto
              group flex items-center justify-center gap-2
              bg-gradient-to-r from-purple-600 to-blue-600
              hover:scale-[1.04]
              hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]
              transition-all duration-300
              text-white 
              px-6 sm:px-8 
              py-3.5 sm:py-4.5
              text-[14px] sm:text-[15px] md:text-[16px]
              rounded-xl font-medium
            "
            >
              View AI Projects
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition" />
            </button>
          </Link>

          {/* Contact */}
          <Link to="/contact">
            <button
              className="
              w-full sm:w-auto
              group flex items-center justify-center gap-2
              border border-white/20
              bg-white/5 backdrop-blur-md
              hover:bg-white/10
              hover:border-white/40
              transition-all duration-300
              text-white 
              px-6 sm:px-8 
              py-3.5 sm:py-4.5
              text-[14px] sm:text-[15px] md:text-[16px]
              rounded-xl font-medium
            "
            >
              Contact Me
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 opacity-80 group-hover:opacity-100" />
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-6 sm:gap-10 text-gray-400 text-[11px] sm:text-sm pt-2">
          <div>
            <span className="text-white text-[14px] sm:text-base md:text-lg font-semibold">
              5+
            </span>
            <p>AI Projects</p>
          </div>
          <div>
            <span className="text-white text-[14px] sm:text-base md:text-lg font-semibold">
              3+
            </span>
            <p>Domains</p>
          </div>
          <div>
            <span className="text-white text-[14px] sm:text-base md:text-lg font-semibold">
              1+
            </span>
            <p>Years</p>
          </div>
        </div>
      </div>
    </section>
  );
}
