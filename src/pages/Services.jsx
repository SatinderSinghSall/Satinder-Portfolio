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
    <section className="border-t border-[#1e293b] shadow-inner shadow-[#0a0a0a] min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">🚀 My Services</h1>
        <p className="text-lg text-gray-300 mb-12">
          I offer a range of development and design services to help bring your
          ideas to life.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-tr from-gray-800 to-gray-700 rounded-2xl p-6 shadow-lg transform hover:scale-105 transition duration-300"
            >
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h2 className="text-2xl font-semibold mb-2">{service.title}</h2>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
