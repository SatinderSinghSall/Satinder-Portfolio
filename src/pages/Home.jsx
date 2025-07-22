import About from "../components/About";
import Skills from "../components/Skills";
import ContactCTA_Button from "../components/ContactCTA_Button";
import Experience from "../components/Experience";
import Services from "./Services";

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white min-h-screen flex flex-col items-center justify-center px-6 text-center">
        {/* Hero Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4">
          Hi, I'm <span className="text-blue-500">Satinder Singh Sall</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl max-w-2xl mb-6 text-gray-300">
          Welcome to my personal portfolio 👋 — I'm a developer who loves
          building modern, impactful web & mobile applications.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex space-x-4 mb-8">
          <a
            href="/projects"
            className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 transition text-lg font-semibold"
          >
            View Projects
          </a>
          <a
            href="/contact"
            className="px-6 py-3 rounded-full border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition text-lg font-semibold"
          >
            Contact Me
          </a>
        </div>

        {/* Animated Scroll Indicator */}
        <div className="animate-bounce mt-10">
          <svg
            className="w-6 h-6 text-blue-500"
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

      {/* About Section */}
      <About />

      {/* Services Section */}
      <Services />

      {/* Experience Section */}
      <Experience />

      {/* Skills Section */}
      <Skills />

      {/* Call to Action Button */}
      <ContactCTA_Button />
    </>
  );
}
