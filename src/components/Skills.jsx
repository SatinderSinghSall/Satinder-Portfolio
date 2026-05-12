import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaGitAlt,
  FaMobileAlt,
  FaDocker,
  FaJava,
  FaPython,
  FaCuttlefish,
} from "react-icons/fa";

import {
  SiC,
  SiCplusplus,
  SiKotlin,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiFirebase,
  SiTailwindcss,
  SiRedux,
  SiVercel,
  SiRender,
  SiTypescript,
  SiAndroid,
  SiNextdotjs,
  SiJenkins,
  SiUnity,
  SiSupabase,
} from "react-icons/si";

export default function Skills() {
  const skills = [
    {
      category: "Programming Languages",
      items: [
        { name: "C", icon: <SiC className="text-blue-400" /> },
        { name: "C++", icon: <SiCplusplus className="text-indigo-400" /> },
        { name: "Java", icon: <FaJava className="text-orange-500" /> },
        { name: "Python", icon: <FaPython className="text-yellow-400" /> },
        { name: "Kotlin", icon: <SiKotlin className="text-purple-400" /> },
        { name: "C#", icon: <FaCuttlefish className="text-green-400" /> },
        { name: "JavaScript", icon: <FaJs className="text-yellow-300" /> },
      ],
    },

    {
      category: "Frontend Development",
      items: [
        { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
        { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" /> },
        {
          name: "React & React Native",
          icon: <FaReact className="text-cyan-400" />,
        },
        { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
        { name: "Redux", icon: <SiRedux className="text-purple-400" /> },
        {
          name: "Tailwind CSS",
          icon: <SiTailwindcss className="text-cyan-300" />,
        },
        {
          name: "TypeScript",
          icon: <SiTypescript className="text-blue-400" />,
        },
      ],
    },

    {
      category: "Backend Development",
      items: [
        { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
        { name: "Express.js", icon: <SiExpress className="text-gray-300" /> },
      ],
    },

    {
      category: "Databases",
      items: [
        { name: "MongoDB", icon: <SiMongodb className="text-green-400" /> },
        { name: "MySQL", icon: <SiMysql className="text-blue-400" /> },
        {
          name: "PostgreSQL",
          icon: <SiPostgresql className="text-indigo-400" />,
        },
        { name: "Firebase", icon: <SiFirebase className="text-yellow-400" /> },
        { name: "Supabase", icon: <SiSupabase className="text-green-300" /> },
      ],
    },

    {
      category: "DevOps & Platforms",
      items: [
        { name: "Git", icon: <FaGitAlt className="text-orange-500" /> },
        { name: "GitHub", icon: <FaGithub className="text-white" /> },
        { name: "Docker", icon: <FaDocker className="text-blue-400" /> },
        {
          name: "CI/CD Pipelines",
          icon: <SiJenkins className="text-red-400" />,
        },
        { name: "Vercel", icon: <SiVercel className="text-white" /> },
        { name: "Render", icon: <SiRender className="text-blue-300" /> },
      ],
    },

    {
      category: "Mobile Development",
      items: [
        {
          name: "Mobile App Development",
          icon: <FaMobileAlt className="text-pink-400" />,
        },
        {
          name: "Android Development",
          icon: <SiAndroid className="text-green-500" />,
        },
      ],
    },

    {
      category: "Game Development",
      items: [
        { name: "Unity", icon: <SiUnity className="text-gray-200" /> },
        { name: "C#", icon: <FaCuttlefish className="text-green-400" /> },
      ],
    },
  ];

  return (
    <section className="relative border-t border-[#111827] bg-[#020617] text-white px-5 sm:px-6 lg:px-8 py-24 sm:py-28 overflow-hidden">
      {/* subtle background */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_top,white_0%,transparent_55%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm tracking-[0.25em] uppercase text-cyan-400 font-medium mb-5">
            Expertise
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Skills & Technologies
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed">
            A refined engineering toolkit built through production-grade
            applications, scalable systems, and real-world development
            experience.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {skills.map((section, index) => (
            <div
              key={index}
              className="
                group
                relative
                rounded-3xl
                border border-white/[0.06]
                bg-[#081121]
                p-7 sm:p-8
                transition-all duration-300
                hover:border-cyan-500/20
                hover:-translate-y-1
                hover:shadow-[0_10px_50px_rgba(8,112,184,0.12)]
              "
            >
              {/* soft glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

              <div className="relative z-10">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 mb-7">
                  {section.category}
                </h3>

                <ul className="space-y-4">
                  {section.items.map((skill, i) => (
                    <li
                      key={i}
                      className="
                        flex items-center gap-4
                        text-[15px] sm:text-base
                        text-slate-300
                        transition-all duration-200
                        group/item
                      "
                    >
                      <span
                        className="
                          flex items-center justify-center
                          w-10 h-10
                          rounded-xl
                          bg-white/[0.03]
                          border border-white/[0.05]
                          text-lg
                          transition-all duration-300
                          group-hover/item:border-cyan-500/20
                          group-hover/item:bg-cyan-500/[0.04]
                        "
                      >
                        {skill.icon}
                      </span>

                      <span className="group-hover/item:text-white transition-colors duration-200">
                        {skill.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
