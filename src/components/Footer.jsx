import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Youtube,
  ArrowUpRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import DeveloperCredit from "./DeveloperCredit";

export default function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },

    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Skills", path: "/skills" },

    { name: "Experience", path: "/experience" },
    { name: "YouTube", path: "/youtube" },
    { name: "Contact", path: "/contact" },

    { name: "AI / ML", path: "/ai-ml" },
  ];

  const socials = [
    {
      href: "https://github.com/SatinderSinghSall",
      icon: Github,
      label: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/satinder-singh-sall-b62049204/",
      icon: Linkedin,
      label: "LinkedIn",
    },
    {
      href: "https://www.youtube.com/@satindersinghsall.3841/featured",
      icon: Youtube,
      label: "YouTube",
    },
    {
      href: "https://x.com/SallSatinder",
      icon: Twitter,
      label: "Twitter",
    },
    {
      href: "mailto:satindersinghsall@gmail.com",
      icon: Mail,
      label: "Email",
    },
  ];

  return (
    <>
      <DeveloperCredit />

      <footer
        className="
        relative overflow-hidden
        border-t border-white/[0.06]
        bg-[#020617]
        text-white
      "
      >
        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] to-black" />

        {/* GLOW */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-500/[0.05] blur-[120px]" />

        {/* GRID */}
        <div
          className="
          absolute inset-0
          bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]
          bg-[size:52px_52px]
          opacity-40
        "
        />

        {/* CONTENT */}
        <div className="relative z-10">
          {/* TOP SECTION */}
          <div
            className="
            max-w-7xl mx-auto
            px-6
            pt-24 pb-16
          "
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1fr] gap-16">
              {/* LEFT */}
              <div className="max-w-md">
                {/* TITLE */}
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                  Satinder.dev
                </h2>

                {/* DESC */}
                <p className="mt-5 text-[15px] sm:text-base leading-relaxed text-slate-400">
                  Designing and building scalable, production-ready digital
                  products with a strong focus on performance, usability, clean
                  architecture, and premium user experiences.
                </p>

                {/* INFO CARD */}
                <div
                  className="
                  mt-8
                  rounded-2xl
                  border border-white/[0.06]
                  bg-white/[0.03]
                  backdrop-blur-xl
                  p-5
                "
                >
                  <div className="flex flex-wrap gap-3 text-xs">
                    <span className="rounded-full bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 text-slate-300">
                      Product mindset
                    </span>

                    <span className="rounded-full bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 text-slate-300">
                      Clean architecture
                    </span>

                    <span className="rounded-full bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 text-slate-300">
                      Reliable delivery
                    </span>
                  </div>
                </div>
              </div>

              {/* QUICK LINKS */}
              <div>
                <h3
                  className="
                  text-sm font-semibold
                  uppercase tracking-[0.25em]
                  text-white
                  mb-7
                "
                >
                  Quick Links
                </h3>

                <ul className="grid grid-cols-2 gap-x-10 gap-y-4">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="
                        group
                        inline-flex items-center gap-2
                        text-slate-400
                        hover:text-white
                        transition-all duration-300
                      "
                      >
                        <span className="text-sm">{link.name}</span>

                        <ArrowUpRight
                          size={14}
                          className="
                          opacity-0
                          -translate-x-1 translate-y-1
                          transition-all duration-300
                          group-hover:opacity-100
                          group-hover:translate-x-0
                          group-hover:translate-y-0
                        "
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CONNECT */}
              <div>
                <h3
                  className="
                  text-sm font-semibold
                  uppercase tracking-[0.25em]
                  text-white
                  mb-7
                "
                >
                  Connect
                </h3>

                {/* SOCIALS */}
                <div className="flex flex-wrap gap-4">
                  {socials.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={index}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                        className="
                        group
                        relative
                        overflow-hidden
                        h-12 w-12
                        flex items-center justify-center
                        rounded-2xl
                        border border-white/[0.08]
                        bg-white/[0.03]
                        text-slate-400
                        transition-all duration-300
                        hover:border-cyan-400/20
                        hover:bg-cyan-400/[0.05]
                        hover:text-cyan-300
                        hover:-translate-y-1
                      "
                      >
                        {/* glow */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-cyan-400/[0.08] to-transparent transition duration-300" />

                        <Icon size={18} className="relative z-10" />
                      </a>
                    );
                  })}
                </div>

                {/* TEXT */}
                <p className="mt-7 text-sm leading-relaxed text-slate-500 max-w-sm">
                  Open to collaborations, freelance opportunities, product
                  engineering, and meaningful conversations.
                </p>

                {/* CTA */}
                <div className="mt-8">
                  <Link
                    to="/contact"
                    className="
                    inline-flex items-center gap-2
                    rounded-2xl
                    bg-white
                    px-5 py-3
                    text-sm font-medium text-black
                    transition-all duration-300
                    hover:scale-[1.02]
                    hover:shadow-[0_10px_40px_rgba(255,255,255,0.12)]
                  "
                  >
                    Let&apos;s Talk
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="border-t border-white/[0.06]">
            <div
              className="
              max-w-7xl mx-auto
              px-6 py-6
              flex flex-col sm:flex-row
              items-center justify-between
              gap-4
            "
            >
              {/* LEFT */}
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <span className="text-slate-600">~/portfolio</span>

                <span className="text-cyan-400">$</span>

                <span>production</span>
              </div>

              {/* CENTER */}
              <p className="text-xs text-slate-500 text-center">
                © {new Date().getFullYear()} Satinder Singh Sall · Crafted with
                precision & modern technologies.
              </p>

              {/* RIGHT */}
              <div className="text-xs text-slate-600">India</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
