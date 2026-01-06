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
      icon: <Code size={48} className="text-blue-500" />,
      title: "Web Development",
      description:
        "Responsive, scalable, and high-performance websites tailored to your goals using modern technologies like React, Next.js, and TypeScript.",
    },
    {
      icon: <Smartphone size={48} className="text-pink-500" />,
      title: "Mobile App Development",
      description:
        "Cross-platform mobile applications (Android & Native) built with clean design, fast performance, and smooth user experience.",
    },
    {
      icon: <Layers size={48} className="text-green-500" />,
      title: "Full Stack Solutions",
      description:
        "Complete end-to-end solutions covering frontend, backend, databases, and deployment — from concept to live product.",
    },
    {
      icon: <Gamepad2 size={48} className="text-indigo-500" />,
      title: "Game Development",
      description:
        "Creating immersive and interactive games using Unity and C#, focusing on engaging gameplay and smooth performance across devices.",
    },
    {
      icon: <CloudCog size={48} className="text-cyan-400" />,
      title: "DevOps & Cloud Deployment",
      description:
        "Automating workflows and deployments using Docker, CI/CD pipelines, and platforms like Render, Vercel, and GitHub Actions.",
    },
    {
      icon: <Globe size={48} className="text-purple-500" />,
      title: "SEO Optimization",
      description:
        "Boosting your visibility and rankings through SEO strategies, performance tuning, and web best practices.",
    },
    {
      icon: <Zap size={48} className="text-yellow-500" />,
      title: "Performance Tuning",
      description:
        "Improving load times, responsiveness, and overall efficiency through code optimization and advanced caching strategies.",
    },
    {
      icon: <Paintbrush size={48} className="text-red-500" />,
      title: "UI/UX Design",
      description:
        "Designing visually appealing, intuitive, and accessible user interfaces that elevate user engagement and satisfaction.",
    },
  ];

  return (
    <section className="border-t border-[#1e293b] shadow-inner min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 py-16">
      <div className="max-w-7xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">🚀 My Services</h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Building impactful digital experiences — from websites and apps to
          games and cloud solutions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)] transform hover:-translate-y-2 transition-all duration-300 space-y-4"
            >
              <div className="flex justify-center">{service.icon}</div>
              <h2 className="text-2xl font-bold text-white">{service.title}</h2>
              <p className="text-gray-300 text-base">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 space-y-4">
          <h3 className="text-3xl md:text-4xl font-bold text-white">
            Ready to level up your digital presence?
          </h3>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Let’s collaborate and bring your vision to life — whether it’s an
            app, a game, or a full-stack platform.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full text-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Contact Me 🚀
          </Link>
        </div>
      </div>
    </section>
  );
}
