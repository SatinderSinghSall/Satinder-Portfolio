import About from "../components/About";
import Skills from "../components/Skills";
import ContactCTA_Button from "../components/ContactCTA_Button";
import Experience from "../components/Experience";
import Services from "./Services";

import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  return (
    <>
      <section
        aria-label="Introduction"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_65%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:48px_48px] opacity-25" />

        <header className="relative z-10 w-full max-w-5xl px-5 sm:px-8 text-center">
          <p className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 mb-3">
            Hello, I’m
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight mb-4">
            <span className="text-blue-400 drop-shadow-[0_0_22px_rgba(59,130,246,0.55)]">
              Satinder Singh Sall
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-5 sm:mb-7 h-[28px] sm:h-[32px]">
            <Typewriter
              words={[
                "Full-Stack Engineer",
                "Building scalable web/mobile systems",
                "Creating thoughtful user experiences",
              ]}
              loop
              cursor
              cursorStyle="_"
              typeSpeed={55}
              deleteSpeed={35}
              delaySpeed={1800}
            />
          </p>

          <p className="max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed text-gray-400 mb-6 sm:mb-10">
            I help teams and businesses build reliable, high-quality web and
            mobile applications with a strong focus on performance, usability,
            and clean architecture.
          </p>

          <nav className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-10">
            <a
              href="/projects"
              className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all duration-200 font-medium shadow-lg shadow-blue-500/25 active:scale-95"
            >
              View Work
            </a>

            <a
              href="/contact"
              className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl border border-white/20 hover:bg-white/5 transition-all duration-200 font-medium active:scale-95"
            >
              Get in Touch
            </a>
          </nav>

          <ul className="flex justify-center items-center text-gray-400">
            <div className="flex sm:hidden flex-nowrap items-center gap-3 text-[11px]">
              <li className="whitespace-nowrap">
                <span className="text-white font-medium">1+</span> yrs exp
              </li>

              <span className="opacity-40">•</span>

              <li className="whitespace-nowrap">
                <span className="text-white font-medium">15+</span> projects
              </li>

              <span className="opacity-40">•</span>

              <li className="whitespace-nowrap">
                <span className="text-white font-medium">Full-Stack</span>
              </li>
            </div>

            <div className="hidden sm:flex flex-row items-center gap-10 text-sm">
              <li>
                <span className="text-white font-medium">1+</span> years
                experience
              </li>
              <li>
                <span className="text-white font-medium">15+</span> projects
                delivered
              </li>
              <li>
                <span className="text-white font-medium">Full-Stack</span> focus
              </li>
            </div>
          </ul>
        </header>

        <div className="absolute bottom-6 sm:bottom-8 animate-bounce z-10">
          <svg
            className="w-6 h-6 text-blue-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </section>

      <main>
        <About />
        <Services />
        <Experience />
        <Skills />
        <ContactCTA_Button />
      </main>
    </>
  );
}
