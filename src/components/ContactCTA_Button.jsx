import { useNavigate } from "react-router-dom";

import {
  FaArrowRight,
  FaEnvelope,
  FaCheckCircle,
  FaCode,
  FaRocket,
  FaClock,
  FaLayerGroup,
} from "react-icons/fa";

export default function CallToAction() {
  const navigate = useNavigate();

  const valuePoints = [
    {
      icon: FaCheckCircle,
      text: "Clear communication & fast iterations.",
    },
    {
      icon: FaCode,
      text: "Production-grade architecture & clean code.",
    },
    {
      icon: FaLayerGroup,
      text: "Long-term scalable systems, not quick hacks.",
    },
  ];

  const stats = [
    {
      label: "Projects built",
      value: "15+",
      icon: FaRocket,
    },
    {
      label: "Tech stack",
      value: "Full-Stack",
      icon: FaLayerGroup,
    },
    {
      label: "Deployment ready",
      value: "100%",
      icon: FaCode,
    },
    {
      label: "Response time",
      value: "< 24h",
      icon: FaClock,
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#020617] px-6 py-24 sm:py-28 lg:py-20 text-white">
      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-500/[0.06] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* MAIN HEADING */}
        <div className="text-center max-w-4xl mx-auto mb-20 lg:mb-24">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300 font-medium mb-5">
            LET&apos;S BUILD SOMETHING GREAT
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1]">
            Build with Confidence.
          </h1>

          <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Premium full-stack development focused on scalable systems, modern
            user experiences, and production-ready applications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* LEFT */}
          <div className="max-w-2xl">
            {/* TOP LABEL */}
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/10 bg-cyan-500/[0.03] px-4 py-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />

              <span className="text-xs tracking-[0.25em] uppercase text-cyan-300 font-medium">
                Available for projects
              </span>
            </div>

            {/* TITLE */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
              Build products
              <span className="block text-white/70">that actually scale.</span>
            </h2>

            {/* DESC */}
            <p className="mt-7 text-base sm:text-lg leading-relaxed text-slate-400 max-w-xl">
              I help founders and businesses design, build, and ship modern
              digital products with scalable architecture, premium frontend
              experiences, and production-ready systems.
            </p>

            {/* VALUE POINTS */}
            <div className="mt-10 flex flex-col gap-4 max-w-xl">
              {valuePoints.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="
                      group
                      flex items-center gap-4
                      rounded-2xl
                      border border-white/[0.05]
                      bg-white/[0.02]
                      px-5 py-4
                      transition-all duration-300
                      hover:bg-white/[0.04]
                      hover:border-cyan-400/10
                    "
                  >
                    {/* ICON */}
                    <div
                      className="
                        flex items-center justify-center
                        h-11 w-11 shrink-0
                        rounded-xl
                        border border-white/[0.06]
                        bg-[#0b1220]
                      "
                    >
                      <Icon className="text-cyan-300 text-sm" />
                    </div>

                    {/* TEXT */}
                    <p className="text-sm sm:text-base text-slate-300">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* BUTTONS */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/contact")}
                className="
                  group
                  relative
                  inline-flex items-center justify-center gap-3
                  overflow-hidden
                  rounded-2xl
                  bg-white
                  px-8 py-4
                  text-sm font-semibold text-black
                  transition-all duration-300
                  hover:scale-[1.02]
                  hover:shadow-[0_10px_40px_rgba(255,255,255,0.15)]
                  cursor-pointer
                "
              >
                <span className="relative z-10">Start a conversation</span>

                <FaArrowRight className="relative z-10 text-xs transition-transform duration-300 group-hover:translate-x-1" />

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-white to-slate-200 transition duration-300" />
              </button>

              <button
                onClick={() => navigate("/services")}
                className="
                  inline-flex items-center justify-center
                  rounded-2xl
                  border border-white/[0.08]
                  bg-white/[0.03]
                  px-8 py-4
                  text-sm font-medium text-slate-300
                  backdrop-blur-xl
                  transition-all duration-300
                  hover:bg-white/[0.06]
                  hover:border-white/[0.14]
                  hover:text-white
                  cursor-pointer
                "
              >
                View services
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {stats.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-3xl
                      border border-white/[0.07]
                      bg-white/[0.03]
                      p-7
                      backdrop-blur-xl
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:border-cyan-400/20
                      hover:bg-white/[0.05]
                    "
                  >
                    {/* glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-cyan-400/[0.03] to-transparent transition duration-500" />

                    <div className="relative z-10">
                      <div
                        className="
                          h-12 w-12
                          rounded-2xl
                          border border-white/[0.06]
                          bg-[#0f172a]
                          flex items-center justify-center
                        "
                      >
                        <Icon className="text-cyan-300 text-sm" />
                      </div>

                      <p className="mt-6 text-3xl font-semibold tracking-tight">
                        {item.value}
                      </p>

                      <p className="mt-2 text-sm text-slate-400">
                        {item.label}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* CONTACT CARD */}
              <div
                className="
                  sm:col-span-2
                  rounded-3xl
                  border border-white/[0.07]
                  bg-gradient-to-br from-white/[0.04] to-white/[0.02]
                  p-7
                  backdrop-blur-xl
                  flex items-start gap-5
                "
              >
                <div
                  className="
                    h-12 w-12
                    rounded-2xl
                    border border-white/[0.06]
                    bg-[#0f172a]
                    flex items-center justify-center
                    shrink-0
                  "
                >
                  <FaEnvelope className="text-cyan-300 text-sm" />
                </div>

                <div>
                  <p className="text-base font-medium text-white">
                    Prefer email communication?
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Reach out through the contact form and I’ll get back within
                    24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
