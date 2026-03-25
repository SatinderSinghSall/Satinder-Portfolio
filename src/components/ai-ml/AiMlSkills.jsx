import {
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiOpencv,
} from "react-icons/si";
import { Brain, Cpu, Database, Sparkles } from "lucide-react";

export default function AiSkills() {
  const skills = [
    {
      category: "Core Foundations",
      icon: <Cpu className="w-5 h-5 text-blue-400" />,
      items: ["Python", "NumPy", "Pandas", "Data Analysis", "EDA"],
    },
    {
      category: "Machine Learning",
      icon: <Brain className="w-5 h-5 text-purple-400" />,
      items: [
        "Supervised Learning",
        "Unsupervised Learning",
        "Regression",
        "Classification",
        "Scikit-learn",
      ],
    },
    {
      category: "Deep Learning",
      icon: <Sparkles className="w-5 h-5 text-pink-400" />,
      items: [
        "Neural Networks",
        "CNN",
        "RNN",
        "LSTM",
        "Transformers",
        "TensorFlow",
        "PyTorch",
      ],
    },
    {
      category: "AI Domains",
      icon: <Database className="w-5 h-5 text-green-400" />,
      items: [
        "NLP",
        "Computer Vision",
        "Deep Learning",
        "OpenCV",
        "GenAI Basics",
      ],
    },
  ];

  return (
    <section className="relative py-24 bg-black text-white overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {/* HEADER */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-6">
            AI / ML Skills
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            My journey in Artificial Intelligence — from fundamentals to
            building intelligent systems and real-world AI applications.
          </p>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((section, index) => (
            <div
              key={index}
              className="
                group rounded-3xl border border-white/10
                bg-white/[0.04] backdrop-blur-xl
                p-8 sm:p-10 text-left
                transition-all duration-300
                hover:border-blue-500/40
                hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]
                hover:-translate-y-1
              "
            >
              {/* HEADER */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  {section.icon}
                </div>

                <h3 className="text-base font-semibold uppercase tracking-wide text-gray-200">
                  {section.category}
                </h3>
              </div>

              {/* LIST */}
              <ul className="space-y-3">
                {section.items.map((skill, i) => (
                  <li
                    key={i}
                    className="
                      flex items-center gap-3
                      text-gray-400 text-sm sm:text-base
                      group-hover:text-gray-200
                      transition
                    "
                  >
                    {/* Modern dot */}
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-70" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* TOOL ICONS */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-3xl opacity-80">
          <SiPython className="text-yellow-400 hover:scale-110 transition" />
          <SiTensorflow className="text-orange-500 hover:scale-110 transition" />
          <SiPytorch className="text-red-500 hover:scale-110 transition" />
          <SiScikitlearn className="text-blue-400 hover:scale-110 transition" />
          <SiOpencv className="text-green-400 hover:scale-110 transition" />
        </div>
      </div>
    </section>
  );
}
