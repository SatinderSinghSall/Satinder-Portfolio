import {
  FaLinkedinIn,
  FaGithub,
  FaXTwitter,
  FaYoutube,
  FaDownload,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

import profileImage from "../assets/Satinder_Image.jpg";
import resumePDF from "../assets/Satinder_Resume.pdf";

export default function About() {
  return (
    <section className="relative overflow-hidden bg-[#030712] text-white py-24 px-6 border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[-100px] w-[350px] h-[350px] bg-cyan-500/20 blur-[140px] rounded-full" />
      <div className="absolute bottom-[-120px] right-[-100px] w-[350px] h-[350px] bg-blue-600/20 blur-[140px] rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto text-center mb-15">
        <p
          className="
          text-sm uppercase tracking-[0.35em]
          text-cyan-300 font-medium
          mb-5
        "
        >
          GET TO KNOW ME
        </p>

        <h1
          className="
          text-5xl sm:text-6xl lg:text-7xl
          font-semibold tracking-tight
          leading-[1]
        "
        >
          About Me.
        </h1>

        <p
          className="
          mt-6 max-w-2xl mx-auto
          text-lg text-slate-400
          leading-relaxed
        "
        >
          Full-stack engineer focused on scalable architecture, premium frontend
          experiences, and production-ready digital products.
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        {/* LEFT */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 text-sm font-medium backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Full-Stack Developer
          </div>

          <h1 className="mt-8 text-5xl md:text-7xl font-black leading-tight tracking-tight">
            Crafting
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
              Scalable Digital
            </span>
            Experiences
          </h1>

          <p className="mt-8 text-lg text-gray-400 leading-relaxed max-w-2xl">
            I build high-performance full-stack applications with a strong focus
            on modern UI/UX, scalability, security, and real-world usability.
            Passionate about creating production-grade digital experiences that
            feel clean, fast, and impactful.
          </p>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-5">
            {[
              {
                number: "1+",
                label: "Years Experience",
              },
              {
                number: "15+",
                label: "Projects Built",
              },
              {
                number: "24/7",
                label: "Learning & Building",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="
                  group relative overflow-hidden
                  rounded-2xl sm:rounded-3xl
                  border border-white/10
                  bg-white/[0.03]
                  backdrop-blur-2xl

                  px-4 py-5
                  sm:px-6 sm:py-7

                  hover:border-cyan-400/30
                  transition-all duration-300
                "
              >
                {/* Glow */}
                <div
                  className="
                  absolute inset-0
                  opacity-0 group-hover:opacity-100
                  transition duration-500
                  bg-gradient-to-br
                  from-cyan-500/10
                  to-blue-600/10
                "
                />

                {/* Number */}
                <h3
                  className="
                  relative z-10
                  text-2xl sm:text-4xl
                  font-black tracking-tight
                  text-white
                "
                >
                  {item.number}
                </h3>

                {/* Label */}
                <p
                  className="
                  relative z-10
                  mt-2
                  text-xs sm:text-sm
                  leading-relaxed
                  text-gray-400
                "
                >
                  {item.label}
                </p>

                {/* Bottom Accent */}
                <div
                  className="
                    absolute bottom-0 left-0
                    h-[2px] w-0
                    bg-gradient-to-r from-cyan-400 to-blue-500
                    group-hover:w-full
                    transition-all duration-500
                  "
                />
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mt-12 space-y-6 text-gray-300 leading-relaxed text-lg">
            <p>
              Currently pursuing an{" "}
              <span className="text-white font-semibold">
                MCA at KIIT University
              </span>{" "}
              with strong expertise in React, Node.js, TypeScript, Express,
              MongoDB, MySQL, Docker, and cloud deployment systems.
            </p>

            <p>
              I specialize in building scalable backend architectures, modern
              responsive frontends, authentication systems, REST APIs, and
              production-ready deployment pipelines.
            </p>

            <p>
              Alongside web engineering, I’m exploring{" "}
              <span className="text-cyan-300 font-medium">
                Game Development
              </span>{" "}
              and{" "}
              <span className="text-cyan-300 font-medium">
                Mobile App Development
              </span>{" "}
              to create immersive cross-platform digital products.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-wrap gap-5">
            <a
              href={resumePDF}
              download="Satinder_Resume.pdf"
              className="
                group inline-flex items-center gap-3
                px-8 py-4 rounded-2xl
                bg-gradient-to-r from-cyan-500 to-blue-600
                text-white font-semibold
                hover:scale-105 transition-all duration-300
                shadow-[0_0_40px_rgba(6,182,212,0.35)]
              "
            >
              <FaDownload className="group-hover:translate-y-[2px] transition" />
              Download Resume
            </a>

            <a
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center
                px-8 py-4 rounded-2xl
                border border-white/10
                bg-white/5 backdrop-blur-xl
                hover:bg-white/10
                transition-all duration-300
              "
            >
              Let’s Connect
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[480px]">
            {/* BACKGROUND GLOWS */}
            <div className="absolute top-10 -left-10 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600/20 blur-[120px] rounded-full" />

            {/* MAIN PREMIUM CARD */}
            <div
              className="
              relative overflow-hidden
              rounded-[40px]
              border border-white/10
              bg-gradient-to-b from-white/[0.08] to-white/[0.03]
              backdrop-blur-3xl
              shadow-[0_20px_80px_rgba(0,0,0,0.45)]
            "
            >
              {/* TOP LIGHT */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

              {/* IMAGE SECTION */}
              <div className="relative p-5">
                <div className="relative overflow-hidden rounded-[30px]">
                  <img
                    src={profileImage}
                    alt="Satinder Singh Sall"
                    className="
                      w-full h-[580px]
                      object-cover object-top
                      transition duration-700
                      hover:scale-105
                    "
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />

                  {/* FLOATING STATUS */}
                  <div
                    className="
                      absolute top-5 left-5
                      flex items-center gap-3
                      px-4 py-2
                      rounded-full
                      border border-white/10
                      bg-black/30
                      backdrop-blur-xl
                    "
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm text-white/90">
                      Available for Projects
                    </span>
                  </div>

                  {/* FLOATING QUOTE */}
                  <div
                    className="
                      absolute bottom-5 left-5 right-5
                      rounded-2xl
                      border border-white/10
                      bg-black/30
                      backdrop-blur-xl
                      px-5 py-4
                    "
                  >
                    <p className="text-sm text-gray-200 leading-relaxed">
                      “I design and engineer scalable digital experiences with
                      modern technologies, performance, and clean architecture.”
                    </p>
                  </div>
                </div>
              </div>

              {/* INFO SECTION */}
              <div className="px-7 pb-7">
                {/* NAME */}
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                      Satinder Singh Sall
                    </h2>

                    <p className="mt-2 text-gray-400 text-lg">
                      Full-Stack Engineer
                    </p>
                  </div>
                </div>

                {/* DIVIDER */}
                <div className="mt-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* TECH STACK */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {["React", "Node.js", "TypeScript", "MongoDB"].map(
                    (tech, index) => (
                      <div
                        key={index}
                        className="
                          px-4 py-2 rounded-xl
                          border border-white/10
                          bg-white/[0.03]
                          text-sm text-gray-300
                          hover:border-cyan-400/40
                          hover:text-cyan-300
                          transition-all duration-300
                        "
                      >
                        {tech}
                      </div>
                    ),
                  )}
                </div>

                {/* SOCIALS */}
                <div className="mt-8 flex items-center justify-between">
                  {/* SOCIAL ICONS */}
                  <div className="flex items-center gap-4">
                    {[
                      {
                        href: "https://www.linkedin.com/in/satinder-singh-sall-b62049204/",
                        icon: <FaLinkedinIn />,
                      },
                      {
                        href: "https://github.com/SatinderSinghSall",
                        icon: <FaGithub />,
                      },
                      {
                        href: "https://x.com/SallSatinder",
                        icon: <FaXTwitter />,
                      },
                      {
                        href: "https://www.youtube.com/@satindersinghsall.3841/featured",
                        icon: <FaYoutube />,
                      },
                    ].map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                        group relative
                        h-12 w-12
                        rounded-2xl
                        border border-white/10
                        bg-white/[0.04]
                        flex items-center justify-center
                        text-gray-300 text-lg
                        overflow-hidden
                        transition-all duration-300
                        hover:border-cyan-400/40
                        hover:text-white
                        hover:-translate-y-1
                      "
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition duration-300" />

                        <span className="relative z-10">{item.icon}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* FLOATING EXPERIENCE CARD */}
            <div
              className="
                hidden xl:flex
                absolute -left-20 top-20
                flex-col
                rounded-3xl
                border border-white/10
                bg-white/[0.06]
                backdrop-blur-2xl
                px-6 py-5
                shadow-2xl
              "
            >
              <span className="text-gray-400 text-sm">Experience</span>

              <h3 className="mt-2 text-4xl font-black text-white">1+</h3>

              <p className="mt-1 text-sm text-cyan-300">
                Years Building Products
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
