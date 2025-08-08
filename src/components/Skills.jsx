import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaGitAlt,
  FaMobileAlt,
} from "react-icons/fa";
import {
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
} from "react-icons/si";

export default function Skills() {
  const skills = [
    {
      category: "Frontend",
      items: [
        { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
        { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" /> },
        { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
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
      category: "Backend",
      items: [
        { name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
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
      category: "Tools & Platforms",
      items: [
        { name: "Git", icon: <FaGitAlt className="text-orange-600" /> },
        { name: "GitHub", icon: <FaGithub className="text-white" /> },
        { name: "Vercel", icon: <SiVercel className="text-white" /> },
        { name: "Render", icon: <SiRender className="text-blue-400" /> },
      ],
    },
    {
      category: "Mobile",
      items: [
        {
          name: "Mobile App Dev",
          icon: <FaMobileAlt className="text-pink-400" />,
        },
        {
          name: "Android App Dev",
          icon: <SiAndroid className="text-green-500" />,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6 py-20 flex flex-col items-center">
      <h2 className="text-4xl md:text-5xl font-bold text-blue-500 mb-14">
        My Skills
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full">
        {skills.map((section, index) => (
          <div
            key={index}
            className="bg-gray-800/70 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-blue-500/30 transition-all duration-300 border border-gray-700"
          >
            <div className="mb-5">
              <span className="inline-block text-sm px-3 py-1 bg-blue-500 text-white rounded-full font-medium">
                {section.category}
              </span>
            </div>
            <ul className="space-y-4">
              {section.items.map((skill, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 text-lg hover:scale-105 transition-transform"
                >
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="text-gray-200">{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
