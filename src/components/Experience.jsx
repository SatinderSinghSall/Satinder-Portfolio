import { FaMapMarkerAlt } from "react-icons/fa";
import { MdWork } from "react-icons/md";

export default function Experience() {
  return (
    <div className="border-t border-[#1e293b] shadow-inner shadow-[#0a0a0a] min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 py-16 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-blue-500 mb-12">Experience</h2>

      <div className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6 hover:shadow-blue-500/40 transition">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
              <MdWork className="text-blue-400 text-2xl" />
              Full-Stack Developer
            </h3>
            <p className="text-blue-300 text-sm mt-1">
              Internship @ Veho Study
            </p>
          </div>
          <div className="text-sm text-gray-400 mt-3 md:mt-0">
            Jan 2025 – May 2025 · 5 mos
            <br />
            <FaMapMarkerAlt className="inline-block mr-1 text-gray-400" />
            Bengaluru, India · Remote
          </div>
        </div>

        {/* Description */}
        {/* Description */}
        <p className="text-gray-300 leading-relaxed text-[16px] space-y-2">
          As a Full-Stack Developer, I worked on building and maintaining web
          applications using technologies such as{" "}
          <strong>HTML, CSS, JavaScript, React.js</strong> for the frontend, and{" "}
          <strong>Node.js, Express.js</strong> for the backend.
          <br />
          <br />I also gained hands-on experience with databases like{" "}
          <strong>MongoDB</strong> and <strong>MySQL</strong> — covering both
          SQL & NoSQL approaches.
          <br />
          <br />I worked with tools and technologies including{" "}
          <strong>Git, GitHub, Postman, JWT</strong> for authentication,{" "}
          <strong>RESTful APIs, Axios</strong> for API integration,{" "}
          <strong>Redux</strong> for state management, <strong>SSOs</strong>{" "}
          (Single Sign-On Options), and <strong>Cloudinary</strong> for media
          management.
          <br />
          <br />
          Additionally, I became familiar with deployment tools like{" "}
          <strong>Vercel, Render, and Netlify</strong>, and I used development
          utilities like <strong>Visual Studio Code, Vite, and npm</strong>.
          <br />
          <br />
          This internship has been a valuable learning experience, helping me
          sharpen my technical skills and deepen my understanding of full-stack
          development practices.
        </p>

        {/* Tags */}
        {/* Colorful Tags */}
        <div className="flex flex-wrap gap-3 pt-2">
          {[
            { name: "HTML", color: "bg-red-500" },
            { name: "CSS", color: "bg-blue-500" },
            { name: "JavaScript", color: "bg-yellow-500 text-black" },
            { name: "React.js", color: "bg-cyan-500" },
            { name: "Node.js", color: "bg-green-600" },
            { name: "Express.js", color: "bg-gray-700" },
            { name: "MongoDB", color: "bg-green-700" },
            { name: "MySQL", color: "bg-blue-600" },
            { name: "PostgreSQL", color: "bg-indigo-700" },
            { name: "Git", color: "bg-orange-600" },
            { name: "GitHub", color: "bg-gray-800" },
            { name: "Postman", color: "bg-orange-500" },
            { name: "JWT", color: "bg-pink-600" },
            { name: "REST APIs", color: "bg-purple-600" },
            { name: "Axios", color: "bg-sky-500" },
            { name: "Redux", color: "bg-indigo-500" },
            { name: "SSO", color: "bg-fuchsia-600" },
            { name: "Cloudinary", color: "bg-blue-400" },
            { name: "Vercel", color: "bg-zinc-700" },
            { name: "Render", color: "bg-emerald-600" },
            { name: "Netlify", color: "bg-lime-600" },
            { name: "VS Code", color: "bg-blue-700" },
            { name: "Vite", color: "bg-purple-500" },
            { name: "npm", color: "bg-red-600" },
          ].map((skill, index) => (
            <span
              key={index}
              className={`${skill.color} px-3 py-1 rounded-full text-sm font-medium shadow hover:scale-105 transition-transform`}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
