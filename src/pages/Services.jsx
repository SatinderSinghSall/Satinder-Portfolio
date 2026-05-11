import {
  Code,
  Smartphone,
  Layers,
  Globe,
  Zap,
  Paintbrush,
  Gamepad2,
  CloudCog,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function MyServices() {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      stack: "React · Next.js · TypeScript",
      description:
        "Modern, responsive, and scalable web applications built with clean architecture and performance in mind.",
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      stack: "React Native · Android",
      description:
        "Cross-platform mobile apps with smooth UX, fast performance, and a native-like experience.",
    },
    {
      icon: Layers,
      title: "Full Stack Solutions",
      stack: "Frontend · Backend · Databases",
      description:
        "End-to-end product development covering architecture, APIs, databases, and deployment.",
    },
    {
      icon: Gamepad2,
      title: "Game Development",
      stack: "Unity · C#",
      description:
        "Interactive and immersive games focused on performance, gameplay mechanics, and polish.",
    },
    {
      icon: CloudCog,
      title: "DevOps & Cloud",
      stack: "Docker · CI/CD · Cloud Platforms",
      description:
        "Automated deployments, scalable infrastructure, and production-ready DevOps workflows.",
    },
    {
      icon: Globe,
      title: "SEO & Optimization",
      stack: "SEO · Accessibility · Performance",
      description:
        "Improving search visibility, accessibility, and Core Web Vitals for better reach.",
    },
    {
      icon: Zap,
      title: "Performance Engineering",
      stack: "Profiling · Caching · Optimization",
      description:
        "Reducing load times and improving responsiveness through code and runtime optimization.",
    },
    {
      icon: Paintbrush,
      title: "UI / UX Design",
      stack: "Design Systems · Usability",
      description:
        "Designing clean, intuitive, and accessible interfaces that users actually enjoy.",
    },
  ];

  return (
    <section
      className="
        relative overflow-hidden
        border-t border-white/5
        bg-[#030712]
        px-6 py-24
        text-white
      "
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-[-120px] h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="absolute bottom-0 right-[-120px] h-[320px] w-[320px] rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-cyan-400/20
              bg-cyan-400/10
              px-4 py-2
              text-sm font-medium text-cyan-300
              backdrop-blur-xl
            "
          >
            ✦ Premium Digital Services
          </div>

          <h1
            className="
              mt-7
              text-5xl md:text-6xl
              font-black
              tracking-tight
              leading-tight
            "
          >
            My
            <span
              className="
                ml-3
                bg-gradient-to-r
                from-cyan-400
                via-blue-500
                to-indigo-500
                bg-clip-text
                text-transparent
              "
            >
              Services
            </span>
          </h1>

          <p
            className="
              mt-6
              text-lg md:text-xl
              leading-relaxed
              text-gray-400
            "
          >
            Building premium digital experiences focused on scalability,
            performance, modern UI/UX, and long-term product quality.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="
                  group relative overflow-hidden

                  rounded-[32px]
                  border border-white/10

                  bg-gradient-to-b
                  from-white/[0.07]
                  to-white/[0.03]

                  backdrop-blur-3xl

                  p-8

                  transition-all duration-500

                  hover:-translate-y-2
                  hover:border-cyan-400/20

                  hover:shadow-[0_20px_60px_rgba(6,182,212,0.12)]
                "
              >
                {/* Glow */}
                <div
                  className="
                    absolute inset-0
                    opacity-0
                    group-hover:opacity-100
                    transition duration-500

                    bg-gradient-to-br
                    from-cyan-500/10
                    to-blue-600/10
                  "
                />

                {/* Top Light */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start gap-5">
                    {/* Icon */}
                    <div
                      className="
                        relative

                        flex h-16 w-16
                        items-center justify-center

                        rounded-3xl

                        bg-gradient-to-br
                        from-cyan-500/20
                        to-blue-600/20

                        border border-white/10

                        shadow-[0_10px_30px_rgba(6,182,212,0.15)]
                      "
                    >
                      <div className="absolute inset-0 rounded-3xl bg-white/5" />

                      <Icon className="relative h-7 w-7 text-cyan-300" />
                    </div>

                    {/* Title */}
                    <div>
                      <h2
                        className="
                          text-2xl
                          font-semibold
                          tracking-tight
                          text-white
                        "
                      >
                        {service.title}
                      </h2>

                      <p
                        className="
                          mt-2
                          text-sm
                          text-cyan-300/80
                        "
                      >
                        {service.stack}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className="
                      mt-7
                      text-base
                      leading-relaxed
                      text-gray-400
                    "
                  >
                    {service.description}
                  </p>

                  {/* Bottom Accent */}
                  <div
                    className="
                      mt-8
                      flex items-center gap-2
                    "
                  >
                    <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />

                    <span className="text-sm text-gray-500">
                      Premium Quality Delivery
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-28 max-w-4xl mx-auto">
          <div
            className="
              relative overflow-hidden

              rounded-[40px]
              border border-white/10

              bg-gradient-to-b
              from-white/[0.07]
              to-white/[0.03]

              backdrop-blur-3xl

              px-8 py-14 md:px-14

              text-center

              shadow-[0_20px_80px_rgba(0,0,0,0.35)]
            "
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10" />

            {/* Top Line */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

            <div className="relative z-10">
              <h3
                className="
                  text-4xl md:text-5xl
                  font-black
                  tracking-tight
                  text-white
                "
              >
                Ready to build something amazing?
              </h3>

              <p
                className="
                  mt-6
                  text-lg md:text-xl
                  leading-relaxed
                  text-gray-400
                "
              >
                Let’s turn your ideas into premium digital products with
                scalable architecture, beautiful interfaces, and reliable
                performance.
              </p>

              <Link
                to="/contact"
                className="
                  group inline-flex items-center justify-center

                  mt-10

                  rounded-2xl

                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-600

                  px-10 py-4

                  text-lg font-semibold
                  text-white

                  shadow-[0_10px_40px_rgba(6,182,212,0.35)]

                  transition-all duration-300

                  hover:scale-105
                "
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
