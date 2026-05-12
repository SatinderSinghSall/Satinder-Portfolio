import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ChevronRight, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Freelancing", path: "/freelance-projects" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "AI / ML", path: "/ai-ml" },
    { name: "Blogs", path: "/blog" },
    { name: "YouTube", path: "/youtube" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-white/[0.05] backdrop-blur-xl bg-[#020617]/80">
        {/* TOP TERMINAL BAR */}
        <div className="border-b border-white/[0.04] bg-black/40">
          <div className="max-w-7xl mx-auto px-5 h-9 flex items-center justify-between">
            {/* LEFT */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/90" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/90" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/90" />
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono tracking-wide">
              <span className="text-slate-600">~/portfolio</span>

              <span className="text-cyan-400">$</span>

              {/* MOBILE */}
              <span className="text-slate-400 md:hidden">
                SatinderPortfolio.dev
              </span>

              {/* DESKTOP */}
              <span className="hidden md:inline text-slate-500">
                production
              </span>
            </div>
          </div>
        </div>

        {/* MAIN NAVBAR */}
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="h-[72px] flex items-center justify-between">
            {/* LOGO */}
            <Link to="/" className="group flex items-center gap-3">
              <div
                className="
                  h-10 w-10
                  rounded-2xl
                  border border-cyan-400/10
                  bg-cyan-400/[0.04]
                  flex items-center justify-center
                  text-cyan-300
                  font-bold
                  text-sm
                  transition-all duration-300
                  group-hover:border-cyan-400/20
                  group-hover:bg-cyan-400/[0.08]
                "
              >
                S
              </div>

              <div className="flex flex-col leading-none">
                <span className="text-white font-semibold tracking-tight text-[15px]">
                  Satinder Singh Sall
                </span>

                <span className="text-xs text-slate-500 font-mono">
                  Full-Stack Engineer
                </span>
              </div>
            </Link>

            {/* DESKTOP MENU */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => {
                const active = pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      relative px-4 py-2 rounded-xl
                      text-sm font-medium transition-all duration-300
                      ${
                        active
                          ? "text-white bg-white/[0.06]"
                          : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                      }
                    `}
                  >
                    {item.name}

                    {active && (
                      <div className="absolute inset-x-3 -bottom-[8px] h-px bg-cyan-400" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* RIGHT CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/login"
                className="
                  text-sm text-slate-400 hover:text-white
                  transition-colors duration-300
                "
              >
                Admin
              </Link>

              <Link
                to="/contact"
                className="
                  inline-flex items-center justify-center
                  rounded-xl
                  bg-white
                  px-5 py-2.5
                  text-sm font-medium text-black
                  transition-all duration-300
                  hover:scale-[1.03]
                  hover:shadow-[0_8px_30px_rgba(255,255,255,0.12)]
                "
              >
                Let&apos;s Talk
              </Link>
            </div>

            {/* MOBILE BUTTON */}
            <button
              className="
                lg:hidden
                flex items-center justify-center
                h-11 w-11 rounded-xl
                border border-white/[0.06]
                bg-white/[0.03]
                text-slate-300
              "
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {/* MOBILE MENU */}
      <div
        className={`
          fixed inset-0 z-[100] lg:hidden
          transition-all duration-300
          ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      >
        {/* BACKDROP */}
        <div
          className="
            absolute inset-0
            bg-black/70 backdrop-blur-xl
          "
          onClick={() => setIsOpen(false)}
        />

        {/* DRAWER */}
        <div
          className={`
            absolute top-0 right-0
            h-full w-[88%] max-w-[380px]
            bg-[#020617]
            border-l border-white/[0.06]
            shadow-[-20px_0_80px_rgba(0,0,0,0.55)]
            transition-transform duration-300 ease-out
            overflow-hidden
            ${isOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {/* BACKGROUND EFFECT */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-[220px] h-[220px] bg-cyan-500/[0.08] blur-[90px]" />
            <div className="absolute bottom-0 left-0 w-[180px] h-[180px] bg-purple-500/[0.08] blur-[80px]" />
          </div>

          {/* CONTENT */}
          <div className="relative z-10 flex flex-col h-full">
            {/* TOP */}
            <div className="flex items-center justify-between px-5 h-20 border-b border-white/[0.06] shrink-0">
              {/* LOGO */}
              <div className="flex items-center gap-3">
                <div
                  className="
                    h-11 w-11 rounded-2xl
                    border border-cyan-400/10
                    bg-cyan-400/[0.05]
                    flex items-center justify-center
                    text-cyan-300 font-semibold
                    shadow-[0_0_30px_rgba(34,211,238,0.08)]
                  "
                >
                  S
                </div>

                <div className="leading-none">
                  <p className="text-sm font-semibold text-white">Satinder</p>

                  <p className="text-[11px] text-slate-500 font-mono mt-1">
                    SatinderPortfolio.dev
                  </p>
                </div>
              </div>

              {/* CLOSE */}
              <button
                onClick={() => setIsOpen(false)}
                className="
                  flex items-center justify-center
                  h-11 w-11 rounded-2xl
                  border border-red-500/20
                  bg-red-500/[0.08]
                  text-red-300
                  transition-all duration-300
                  hover:bg-red-500/[0.16]
                  hover:border-red-500/30
                  hover:text-red-200
                  hover:shadow-[0_0_25px_rgba(239,68,68,0.18)]
                "
              >
                <X size={18} />
              </button>
            </div>

            {/* SCROLLABLE AREA */}
            <div className="flex-1 overflow-y-auto px-4 py-5">
              {/* NAVIGATION */}
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`
                    group
                    relative
                    overflow-hidden
                    flex items-center justify-between
                    rounded-2xl
                    px-4 py-4
                    transition-all duration-300
                    ${
                      pathname === item.path
                        ? "bg-white/[0.06] text-white"
                        : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                    }
                  `}
                  >
                    {/* glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-cyan-400/[0.03] to-transparent transition duration-300" />

                    <div className="relative z-10 flex items-center gap-4">
                      {/* NUMBER */}
                      <span className="text-[11px] font-mono text-slate-600 w-6">
                        0{index + 1}
                      </span>

                      {/* NAME */}
                      <span className="text-[15px] font-medium">
                        {item.name}
                      </span>
                    </div>

                    {/* ICON */}
                    <ChevronRight
                      size={18}
                      className="
                      relative z-10
                      text-slate-600
                      transition-all duration-300
                      group-hover:text-cyan-300
                      group-hover:translate-x-1
                    "
                    />
                  </Link>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="
                  group
                  flex items-center justify-center gap-2
                  w-full
                  rounded-2xl
                  bg-white
                  px-6 py-4
                  text-black font-medium
                  transition-all duration-300
                  hover:scale-[1.01]
                  hover:shadow-[0_8px_30px_rgba(255,255,255,0.12)]
                "
                >
                  Let&apos;s Talk
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>

              {/* FOOTER */}
              <div className="pt-8 pb-6">
                <div className="h-px bg-white/[0.06] mb-5" />

                <p className="text-xs leading-relaxed text-slate-500">
                  Building premium digital experiences with scalable full-stack
                  technologies and modern product engineering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
