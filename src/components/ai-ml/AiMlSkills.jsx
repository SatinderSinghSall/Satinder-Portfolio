import {
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiOpencv,
  SiDocker,
  SiKubernetes,
  SiFlask,
  SiPandas,
  SiNumpy,
  SiGithub,
} from "react-icons/si";

import { Brain, Cpu, Database, Sparkles, Boxes, Rocket } from "lucide-react";

export default function AiSkills() {
  const skillSections = [
    {
      title: "AI / ML Foundations",
      icon: <Cpu className="w-5 h-5 text-cyan-300" />,
      description:
        "Strong foundations in Python, mathematics, data processing, and analytics.",
      skills: [
        "Python",
        "NumPy",
        "Pandas",
        "Matplotlib",
        "Seaborn",
        "Data Analysis",
        "EDA",
        "OOP",
        "File Handling",
        "JSON",
        "Statistics",
        "Probability",
        "Linear Algebra",
        "Calculus",
      ],
    },

    {
      title: "Machine Learning",
      icon: <Brain className="w-5 h-5 text-blue-300" />,
      description:
        "Building predictive systems using supervised and unsupervised learning.",
      skills: [
        "Regression",
        "Classification",
        "KNN",
        "Naive Bayes",
        "Decision Trees",
        "Clustering",
        "K-Means",
        "DBSCAN",
        "PCA",
        "Reinforcement Learning",
        "Scikit-learn",
        "Kaggle",
        "F1 Score",
        "Bias / Variance",
      ],
    },

    {
      title: "Deep Learning",
      icon: <Sparkles className="w-5 h-5 text-purple-300" />,
      description:
        "Neural network architectures and deep learning model development.",
      skills: [
        "Neural Networks",
        "CNN",
        "RNN",
        "LSTM",
        "Transformers",
        "PyTorch",
        "TensorFlow",
        "Keras",
        "Forward Propagation",
        "Backpropagation",
        "Perceptron",
      ],
    },

    {
      title: "Generative AI",
      icon: <Database className="w-5 h-5 text-pink-300" />,
      description:
        "Working with modern LLM workflows, NLP systems, and AI tooling.",
      skills: [
        "LLMs",
        "RAG",
        "GANs",
        "Agentic AI",
        "NLP",
        "OpenAI APIs",
        "Prompt Engineering",
        "AI Assistants",
        "Cursor AI",
        "Claude",
        "GitHub Copilot",
      ],
    },

    {
      title: "AI Engineering",
      icon: <Boxes className="w-5 h-5 text-emerald-300" />,
      description:
        "Deploying and engineering scalable AI-powered applications.",
      skills: [
        "Flask",
        "Docker",
        "Kubernetes",
        "SQL",
        "Git",
        "GitHub",
        "REST APIs",
        "Frontend Basics",
        "Deployment",
        "Cloud Systems",
      ],
    },

    {
      title: "Applied Projects",
      icon: <Rocket className="w-5 h-5 text-orange-300" />,
      description:
        "Real-world projects across multiple domains and intelligent systems.",
      skills: [
        "Finance AI",
        "Medical AI",
        "Sentiment Analysis",
        "E-commerce Clustering",
        "Recommendation Systems",
        "GenAI Assistant",
        "Domain Projects",
        "Industry-grade Projects",
      ],
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#020617] py-28 text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_55%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[140px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-cyan-400/10
              bg-cyan-400/[0.04]
              px-5 py-2
              mb-6
            "
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />

            <span className="text-xs uppercase tracking-[0.3em] text-cyan-300 font-medium">
              AI Engineering Stack
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1]">
            Artificial Intelligence
            <span className="block text-white/65">& Machine Learning</span>
          </h2>

          <p className="mt-8 text-lg sm:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
            Building intelligent systems using machine learning, deep learning,
            generative AI, and scalable AI engineering workflows.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">
          {skillSections.map((section, index) => (
            <div
              key={index}
              className="
                group
                relative
                overflow-hidden
                rounded-[28px]
                border border-white/[0.07]
                bg-white/[0.03]
                backdrop-blur-2xl
                p-8
                transition-all duration-500
                hover:-translate-y-1
                hover:border-cyan-400/20
                hover:bg-white/[0.05]
              "
            >
              {/* GLOW */}
              <div
                className="
                  absolute inset-0
                  opacity-0 group-hover:opacity-100
                  transition duration-500
                  bg-gradient-to-br
                  from-cyan-400/[0.05]
                  via-transparent
                  to-blue-500/[0.04]
                "
              />

              {/* TOP */}
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="
                      flex items-center justify-center
                      h-12 w-12
                      rounded-2xl
                      border border-white/[0.08]
                      bg-[#0f172a]
                    "
                  >
                    {section.icon}
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {section.title}
                    </h3>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <p className="text-sm leading-relaxed text-slate-400 mb-7">
                  {section.description}
                </p>

                {/* SKILLS */}
                <div className="flex flex-wrap gap-3">
                  {section.skills.map((skill, i) => (
                    <div
                      key={i}
                      className="
                        rounded-xl
                        border border-white/[0.06]
                        bg-white/[0.03]
                        px-4 py-2
                        text-sm text-slate-300
                        transition-all duration-300
                        hover:border-cyan-400/20
                        hover:bg-cyan-400/[0.05]
                        hover:text-white
                      "
                    >
                      {skill}
                    </div>
                  ))}
                </div>

                {/* BOTTOM LINE */}
                <div
                  className="
                    mt-8
                    h-px w-full
                    bg-gradient-to-r
                    from-cyan-400/20
                    via-white/5
                    to-transparent
                  "
                />
              </div>
            </div>
          ))}
        </div>

        {/* TECH STACK */}
        <div className="mt-20">
          <div
            className="
              relative overflow-hidden
              rounded-[32px]
              border border-white/[0.07]
              bg-white/[0.03]
              backdrop-blur-2xl
              px-8 py-10
            "
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.04] via-transparent to-blue-500/[0.04]" />

            <div className="relative z-10">
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                  Tools & Technologies
                </h3>

                <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
                  Technologies and frameworks used throughout my AI engineering
                  and machine learning workflow.
                </p>
              </div>

              {/* ICONS */}
              <div className="mt-10 flex flex-wrap justify-center gap-8">
                {[
                  {
                    icon: <SiPython />,
                    color: "text-yellow-400",
                    name: "Python",
                  },
                  {
                    icon: <SiTensorflow />,
                    color: "text-orange-400",
                    name: "TensorFlow",
                  },
                  {
                    icon: <SiPytorch />,
                    color: "text-red-400",
                    name: "PyTorch",
                  },
                  {
                    icon: <SiScikitlearn />,
                    color: "text-blue-400",
                    name: "Scikit-learn",
                  },
                  {
                    icon: <SiOpencv />,
                    color: "text-emerald-400",
                    name: "OpenCV",
                  },
                  {
                    icon: <SiDocker />,
                    color: "text-cyan-400",
                    name: "Docker",
                  },
                  {
                    icon: <SiKubernetes />,
                    color: "text-indigo-400",
                    name: "Kubernetes",
                  },
                  {
                    icon: <SiFlask />,
                    color: "text-gray-300",
                    name: "Flask",
                  },
                  {
                    icon: <SiPandas />,
                    color: "text-purple-400",
                    name: "Pandas",
                  },
                  {
                    icon: <SiNumpy />,
                    color: "text-sky-400",
                    name: "NumPy",
                  },
                  {
                    icon: <SiGithub />,
                    color: "text-white",
                    name: "GitHub",
                  },
                ].map((tool, index) => (
                  <div
                    key={index}
                    className="
                      group
                      flex flex-col items-center gap-3
                    "
                  >
                    <div
                      className="
                        flex items-center justify-center
                        h-16 w-16
                        rounded-2xl
                        border border-white/[0.08]
                        bg-[#0b1220]
                        text-3xl
                        transition-all duration-300
                        group-hover:-translate-y-1
                        group-hover:border-cyan-400/20
                      "
                    >
                      <div className={tool.color}>{tool.icon}</div>
                    </div>

                    <span className="text-xs text-slate-400">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BANNER */}
        <div className="mt-14">
          <div
            className="
              rounded-[28px]
              border border-cyan-400/10
              bg-gradient-to-r
              from-cyan-500/[0.05]
              via-blue-500/[0.03]
              to-transparent
              px-8 py-7
              text-center
            "
          >
            <p className="text-lg text-slate-300 leading-relaxed">
              Built multiple AI/ML projects across
              <span className="text-cyan-300 font-medium"> Finance</span> •
              <span className="text-cyan-300 font-medium"> Medical</span> •
              <span className="text-cyan-300 font-medium"> NLP</span> •
              <span className="text-cyan-300 font-medium">
                {" "}
                Sentiment Analysis
              </span>{" "}
              •
              <span className="text-cyan-300 font-medium">
                {" "}
                Recommendation Systems
              </span>{" "}
              •<span className="text-cyan-300 font-medium"> GenAI</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
