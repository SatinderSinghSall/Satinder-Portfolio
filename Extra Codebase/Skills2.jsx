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
        { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
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
        { name: "Redux", icon: <SiRedux className="text-purple-500" /> },
        {
          name: "Tailwind CSS",
          icon: <SiTailwindcss className="text-teal-300" />,
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
        { name: "MySQL", icon: <SiMysql className="text-blue-500" /> },
        {
          name: "PostgreSQL",
          icon: <SiPostgresql className="text-indigo-400" />,
        },
        { name: "Firebase", icon: <SiFirebase className="text-yellow-500" /> },
      ],
    },
    {
      category: "DevOps & Platforms",
      items: [
        { name: "Git", icon: <FaGitAlt className="text-orange-600" /> },
        { name: "GitHub", icon: <FaGithub className="text-white" /> },
        { name: "Docker", icon: <FaDocker className="text-blue-400" /> },
        {
          name: "CI/CD Pipelines",
          icon: <SiJenkins className="text-red-400" />,
        },
        { name: "Vercel", icon: <SiVercel className="text-white" /> },
        { name: "Render", icon: <SiRender className="text-blue-400" /> },
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
        { name: "Unity", icon: <SiUnity className="text-gray-300" /> },
        { name: "C#", icon: <FaCuttlefish className="text-green-400" /> },
      ],
    },
  ];

  return (
    <section className="border-t border-[#1e293b] bg-[#020617] text-white px-6 py-24">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Skills & Technologies
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            A practical toolkit built through real-world projects and
            production-grade development.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((section, index) => (
            <div
              key={index}
              className="
                rounded-2xl border border-white/10 bg-white/5
                p-8 transition-all
                hover:border-blue-500/40
              "
            >
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wide mb-6">
                {section.category}
              </h3>

              <ul className="space-y-4">
                {section.items.map((skill, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-4 text-base text-gray-300"
                  >
                    <span className="text-xl">{skill.icon}</span>
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
