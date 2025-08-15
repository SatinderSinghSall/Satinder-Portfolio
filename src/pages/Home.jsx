import About from "../components/About";
import Skills from "../components/Skills";
import ContactCTA_Button from "../components/ContactCTA_Button";
import Experience from "../components/Experience";
import Services from "./Services";

import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-black">
          <div className="absolute inset-0 bg-[linear-gradient(#2a2a2a_1px,transparent_1px),linear-gradient(90deg,#2a2a2a_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 z-10">
          <span className="text-gray-300">Hi, I&apos;m</span>{" "}
          <span className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
            <Typewriter
              words={[
                "Satinder Singh Sall",
                "Full-Stack Engineer",
                "UI/UX Enthusiast",
                "Tech Problem Solver",
              ]}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>
        </h1>

        <p className="text-lg md:text-2xl max-w-2xl mb-6 text-gray-400 z-10">
          Welcome to my personal portfolio 👋 — I&apos;m a developer who loves
          building <span className="text-green-400">modern</span>,{" "}
          <span className="text-yellow-400">impactful</span> web & mobile
          applications.
        </p>

        <div className="text-sm text-green-400 font-mono bg-black/50 px-4 py-2 rounded-lg border border-green-500 mb-8 z-10">
          &lt;code&gt; const passion = "Building for the web"; &lt;/code&gt;
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 z-10 w-full max-w-sm sm:max-w-none sm:justify-center">
          <a
            href="/projects"
            className="w-full sm:w-[220px] text-center px-6 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-lg font-semibold shadow-lg shadow-blue-500/30 active:scale-95"
          >
            🚀 View Projects
          </a>
          <a
            href="/contact"
            className="w-full sm:w-[220px] text-center px-6 py-4 rounded-lg border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200 text-lg font-semibold shadow-lg shadow-blue-500/20 active:scale-95"
          >
            📩 Contact Me
          </a>
        </div>

        <div className="animate-bounce mt-10 z-10">
          <svg
            className="w-6 h-6 text-blue-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <About />
      <Services />
      <Experience />
      <Skills />
      <ContactCTA_Button />
    </>
  );
}
