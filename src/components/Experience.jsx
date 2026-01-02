import { FaMapMarkerAlt } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { HiCheckCircle } from "react-icons/hi2";

export default function Experience() {
  return (
    <section className="border-t border-[#1e293b] relative min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white px-4 sm:px-6 py-16 sm:py-24 flex justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative w-full max-w-5xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-20">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Experience
          </span>
        </h2>

        <div className="relative md:pl-10">
          <span className="hidden md:block absolute left-3 top-0 h-full w-[2px] bg-gradient-to-b from-blue-500/60 via-slate-600 to-transparent" />

          <div className="relative bg-slate-900/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-slate-800 p-5 sm:p-8 md:p-10 shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
            <span className="hidden md:block absolute -left-[14px] top-10 h-7 w-7 rounded-full bg-blue-500 ring-4 ring-blue-500/30 shadow-lg" />

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold flex items-center gap-2 sm:gap-3">
                  <MdWork className="text-blue-400 text-2xl sm:text-3xl" />
                  Full-Stack Developer
                </h3>
                <p className="text-blue-300 mt-1 sm:mt-2 text-sm sm:text-lg">
                  Internship @{" "}
                  <span className="font-medium text-white">VEHO Study</span>
                </p>
              </div>

              <div className="text-xs sm:text-sm text-gray-400 md:text-right leading-relaxed">
                Jan 2025 – May 2025 · 5 mos
                <br />
                <FaMapMarkerAlt className="inline-block mr-1" />
                Bengaluru, India · Remote
              </div>
            </div>

            <div className="my-6 sm:my-8 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

            <ul className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-[15.5px] leading-relaxed">
              {[
                <>
                  Built and maintained scalable web applications using{" "}
                  <strong className="text-white">
                    React.js, TailwindCSS, JavaScript
                  </strong>
                  .
                </>,
                <>
                  Developed backend services with{" "}
                  <strong className="text-white">Node.js & Express.js</strong>{" "}
                  following RESTful architecture.
                </>,
                <>
                  Designed and worked with both{" "}
                  <strong className="text-white">MongoDB</strong> and{" "}
                  <strong className="text-white">MySQL</strong> databases.
                </>,
                <>
                  Implemented authentication using{" "}
                  <strong className="text-white">JWT</strong> and explored{" "}
                  <strong className="text-white">SSO</strong> mechanisms.
                </>,
                <>
                  Integrated APIs using{" "}
                  <strong className="text-white">Axios</strong> and managed
                  global state with{" "}
                  <strong className="text-white">Redux</strong>.
                </>,
                <>
                  Utilized{" "}
                  <strong className="text-white">
                    Git, GitHub, Postman, Cloudinary
                  </strong>{" "}
                  for collaboration and media handling.
                </>,
                <>
                  Deployed production-ready apps on{" "}
                  <strong className="text-white">Vercel and Render</strong>.
                </>,
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <HiCheckCircle className="text-blue-400 text-base sm:text-lg mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 sm:mt-10 flex flex-wrap gap-2 sm:gap-3">
              {[
                "HTML",
                "CSS",
                "JavaScript",
                "React",
                "Node.js",
                "Express",
                "MongoDB",
                "MySQL",
                "PostgreSQL",
                "Redux",
                "JWT",
                "SSO",
                "REST APIs",
                "Axios",
                "Git",
                "GitHub",
                "Postman",
                "Cloudinary",
                "Vercel",
                "Render",
                "Netlify",
                "Vite",
                "npm",
                "VS Code",
              ].map((skill, i) => (
                <span
                  key={i}
                  className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm bg-slate-800/80 text-gray-200 border border-slate-700 hover:border-blue-400 hover:text-blue-300 transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-10 sm:mt-12 max-w-4xl mx-auto">
              <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 sm:p-6 md:p-8 shadow-lg">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-3 sm:mb-4">
                  Internship Reflection
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  This internship has been a valuable learning experience,
                  helping me sharpen my technical skills and deepen my
                  understanding of full-stack development practices. It also
                  strengthened my problem-solving abilities, teamwork, and
                  adaptability while working on real-world projects. Overall,
                  the experience has prepared me to take on future challenges
                  with greater confidence and a stronger foundation in software
                  development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
