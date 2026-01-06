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
    <section className="border-t border-[#1e293b] min-h-screen bg-[#020617] px-6 py-20 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            My Services
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-400">
            Building high-quality digital products with a focus on performance,
            scalability, and long-term value.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="
                  rounded-3xl border border-white/10
                  bg-white/5 p-8
                  transition-all duration-300
                  hover:border-blue-500/40 hover:bg-white/[0.06]
                "
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
                    <Icon className="h-7 w-7 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {service.title}
                    </h2>
                    <p className="text-sm text-gray-400">{service.stack}</p>
                  </div>
                </div>

                <p className="text-base text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-24 text-center max-w-3xl mx-auto">
          <h3 className="text-3xl font-semibold">Ready to start a project?</h3>
          <p className="mt-4 text-lg text-gray-400">
            Let’s discuss your idea and turn it into a well-crafted, reliable
            product.
          </p>

          <Link
            to="/contact"
            className="
              inline-flex items-center justify-center
              mt-8 px-10 py-4
              rounded-xl text-lg font-medium
              bg-blue-600 text-white
              hover:bg-blue-500
              transition
            "
          >
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  );
}
