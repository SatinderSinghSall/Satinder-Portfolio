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
      text: "Clear communication & fast iterations",
    },
    {
      icon: FaCode,
      text: "Production-grade code & architecture",
    },
    {
      icon: FaLayerGroup,
      text: "Long-term mindset, not quick hacks",
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
      value: "Full-stack",
      icon: FaLayerGroup,
    },
    {
      label: "Deployment ready",
      value: "Yes",
      icon: FaCode,
    },
    {
      label: "Response time",
      value: "< 24h",
      icon: FaClock,
    },
  ];

  return (
    <section className="border-t border-[#1e293b] bg-[#020617] px-6 py-24 md:py-32 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* LEFT — CONTENT */}
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              Build with confidence.
            </h2>

            <p className="mt-5 text-base sm:text-lg text-gray-400 leading-relaxed">
              I help founders and teams design, build, and ship scalable digital
              products — from early ideas to production-ready systems.
            </p>

            {/* Value points */}
            <div className="mt-8 space-y-4">
              {valuePoints.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 text-sm sm:text-base text-gray-300"
                  >
                    <Icon className="mt-1 text-blue-400 shrink-0" />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={() => navigate("/contact")}
                className="
                  inline-flex items-center gap-3
                  px-8 py-3
                  rounded-xl text-sm font-medium
                  bg-blue-600 text-white
                  hover:bg-blue-500
                  transition
                "
              >
                Start a conversation
                <FaArrowRight className="text-xs" />
              </button>

              <button
                onClick={() => navigate("/services")}
                className="
                  inline-flex items-center gap-2
                  px-8 py-3
                  rounded-xl text-sm font-medium
                  border border-white/15
                  text-gray-300
                  hover:bg-white/5
                  transition
                "
              >
                View services
              </button>
            </div>
          </div>

          {/* RIGHT — SIGNALS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="
                    rounded-2xl border border-white/10
                    bg-white/5 p-6
                    flex items-start gap-4
                  "
                >
                  <div className="h-10 w-10 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
                    <Icon className="text-blue-400 text-sm" />
                  </div>

                  <div>
                    <p className="text-xl font-semibold text-white">
                      {item.value}
                    </p>
                    <p className="mt-1 text-sm text-gray-400">{item.label}</p>
                  </div>
                </div>
              );
            })}

            {/* Contact signal */}
            <div className="sm:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6 flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
                <FaEnvelope className="text-blue-400 text-sm" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-200">
                  Prefer email?
                </p>
                <p className="text-sm text-gray-400">
                  Reach out via the contact form anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
