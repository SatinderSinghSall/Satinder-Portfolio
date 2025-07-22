import { Code, Smartphone, Layers, Globe, Zap, Paintbrush } from "lucide-react";

export default function MyServices() {
  const services = [
    {
      icon: <Code size={48} className="text-blue-500" />,
      title: "Web Development",
      description:
        "Responsive and high-performance websites tailored to your business needs using the latest technologies.",
    },
    {
      icon: <Smartphone size={48} className="text-pink-500" />,
      title: "Mobile App Development",
      description:
        "Cross-platform mobile applications with stunning UI and smooth user experience.",
    },
    {
      icon: <Layers size={48} className="text-green-500" />,
      title: "Full Stack Solutions",
      description:
        "End-to-end solutions covering both frontend and backend development with clean architecture.",
    },
    {
      icon: <Globe size={48} className="text-purple-500" />,
      title: "SEO Optimization",
      description:
        "Boost your online visibility with optimized content, meta tags, and performance improvements.",
    },
    {
      icon: <Zap size={48} className="text-yellow-500" />,
      title: "Performance Tuning",
      description:
        "Enhance your application's speed and responsiveness with advanced performance tuning strategies.",
    },
    {
      icon: <Paintbrush size={48} className="text-red-500" />,
      title: "UI/UX Design",
      description:
        "Crafting user-friendly and visually appealing designs that keep your audience engaged.",
    },
  ];

  return (
    <section className="border-t border-[#1e293b] shadow-inner min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 py-16">
      <div className="max-w-7xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">🚀 My Services</h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Elevating your digital presence with modern design and development
          solutions.
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
      </div>
    </section>
  );
}
