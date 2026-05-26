import {
  Briefcase,
  MapPin,
  Calendar,
  CheckCircle2,
  Globe,
  Database,
  ShieldCheck,
  Cloud,
  GitBranch,
  Code2,
} from "lucide-react";

import InternshipCompletionLetterSatinder from "../assets/InternshipCompletionLetterSatinder.pdf";

const highlights = [
  {
    icon: <Code2 size={18} />,
    title: "Frontend Engineering",
    desc: "Built scalable and responsive interfaces using React.js, JavaScript, Tailwind CSS, and reusable component architectures.",
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "Backend & Security",
    desc: "Developed secure RESTful APIs using Node.js & Express.js with JWT authentication and SSO integration.",
  },
  {
    icon: <Database size={18} />,
    title: "Database Systems",
    desc: "Worked with MongoDB and MySQL for schema design, optimized queries, and scalable data handling.",
  },
  {
    icon: <Cloud size={18} />,
    title: "Deployment & Cloud",
    desc: "Deployed production-ready applications using Vercel, Render, and Netlify with cloud media handling.",
  },
];

const technologies = [
  "React.js",
  "JavaScript",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
  "Redux",
  "JWT",
  "SSO",
  "Axios",
  "Postman",
  "Cloudinary",
  "Git",
  "GitHub",
  "Vercel",
  "Render",
  "Netlify",
  "Vite",
  "npm",
];

export default function Experience() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-blue-50 py-24 px-4 sm:px-6 lg:px-8">
      {/* Background Blur Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-100/50 rounded-full blur-3xl" />

      {/* ================= HERO HEADING SECTION ================= */}
      <div className="relative text-center mb-15 pt-10">
        {/* Background Glow */}
        <div className="absolute inset-0 flex justify-center">
          <div className="w-[500px] h-[500px] bg-blue-200/30 blur-3xl rounded-full" />
        </div>

        <div className="relative z-10">
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-slate-900">
            Experience That Builds
            <span className="block mt-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500 bg-clip-text text-transparent">
              Production Systems
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed text-slate-600">
            A journey of building scalable full-stack applications, modern
            frontend experiences, secure backend systems, and production-ready
            digital products with real-world engineering practices.
          </p>

          {/* Bottom Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-6">
            {[
              "Full-Stack Development",
              "Production Deployment",
              "REST API Architecture",
              "Cloud & Database Systems",
            ].map((item, index) => (
              <div
                key={index}
                className="px-5 py-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200 shadow-sm text-sm font-medium text-slate-700 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium border border-blue-200">
            <Briefcase size={16} />
            Professional Experience at VEHO Study
          </span>

          <h2 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900">
            Building Real-World
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Full-Stack Applications
            </span>
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
            During my internship at VEHO Study, I worked across frontend,
            backend, databases, cloud deployment, and authentication systems —
            gaining hands-on experience building scalable production-ready web
            applications.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-8 top-0 h-full w-[2px] bg-gradient-to-b from-blue-500 via-slate-300 to-transparent" />

          {/* Experience Card */}
          <div className="relative lg:pl-24">
            {/* Timeline Dot */}
            <div className="hidden lg:flex absolute left-[17px] top-12 w-6 h-6 rounded-full bg-blue-600 border-[6px] border-white shadow-lg items-center justify-center" />

            <div className="group relative bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[32px] p-6 sm:p-10 shadow-[0_10px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_70px_rgba(37,99,235,0.12)] transition-all duration-500">
              {/* Top Row */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                {/* Left */}
                <div className="flex items-start gap-5">
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg">
                    <Briefcase size={28} />
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold text-slate-900">
                      Full-Stack Engineer Intern
                    </h3>

                    <p className="mt-2 text-lg text-slate-600">
                      Internship at{" "}
                      <span className="font-semibold text-blue-600">
                        VEHO Study
                      </span>
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                        <span className="flex items-center gap-2">
                          <Calendar size={15} />
                          Jan 2024 – May 2025
                        </span>

                        {/* Dot */}
                        <span className="hidden sm:block text-slate-300">
                          •
                        </span>

                        {/* Duration */}
                        <span className="font-medium text-slate-600">
                          1 yr 5 mos
                        </span>
                      </div>

                      <span className="flex items-center gap-2">
                        <MapPin size={15} />
                        Bengaluru, India · Remote
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Badge */}
                <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold w-fit overflow-hidden">
                  {/* Animated Glow */}
                  <span className="absolute inset-0 rounded-full bg-emerald-400/20 blur-xl animate-pulse" />

                  {/* Live Dot */}
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>

                  {/* Icon */}
                  <Globe size={16} className="relative z-10" />

                  {/* Text */}
                  <span className="relative z-10">Production Experience</span>
                </div>
              </div>

              {/* Divider */}
              <div className="my-10 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

              {/* Highlights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {highlights.map((item, index) => (
                  <div
                    key={index}
                    className="group/card rounded-2xl border border-slate-200 bg-white p-6 hover:border-blue-300 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600">
                        {item.icon}
                      </div>

                      <h4 className="font-semibold text-slate-900">
                        {item.title}
                      </h4>
                    </div>

                    <p className="text-slate-600 leading-relaxed text-sm">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Experience Summary */}
              <div className="mt-12 rounded-3xl bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 p-8">
                <h4 className="text-xl font-semibold text-slate-900 mb-5">
                  Key Contributions & Learning
                </h4>

                <div className="space-y-4">
                  {[
                    "Engineered scalable full-stack applications using modern frontend and backend technologies.",
                    "Implemented secure authentication systems using JWT and explored SSO workflows.",
                    "Integrated APIs, cloud storage services, and optimized RESTful backend architectures.",
                    "Worked with real-world deployment pipelines and production hosting platforms.",
                    "Collaborated using Git, GitHub, Postman, and modern development tooling.",
                  ].map((point, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 text-slate-700"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-blue-600 mt-1 shrink-0"
                      />

                      <p className="leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mt-12">
                <div className="flex items-center gap-2 mb-6">
                  <GitBranch size={18} className="text-blue-600" />

                  <h4 className="text-lg font-semibold text-slate-900">
                    Technologies & Tools
                  </h4>
                </div>

                <div className="flex flex-wrap gap-3">
                  {technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reflection */}
              <div className="mt-14 border-t border-slate-200 pt-10">
                <div className="max-w-4xl">
                  <h4 className="text-2xl font-bold text-slate-900 mb-5">
                    Internship Reflection
                  </h4>

                  <p className="text-slate-600 leading-relaxed text-lg">
                    This internship strengthened my understanding of modern
                    full-stack development, production deployment workflows, API
                    architecture, authentication systems, and scalable frontend
                    engineering. Working on real-world applications helped me
                    improve problem-solving, collaboration, and software design
                    skills while building confidence as a developer ready for
                    larger engineering challenges.
                  </p>
                </div>
              </div>

              {/* Internship Completion Letter */}
              <div className="mt-14 border-t border-slate-200 pt-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div>
                    <h4 className="text-2xl font-bold text-slate-900">
                      Internship Completion Letter
                    </h4>

                    <p className="mt-3 text-slate-600 leading-relaxed max-w-2xl">
                      View my official internship completion certificate issued
                      after successfully completing my Full-Stack Engineering
                      Internship at VEHO Study.
                    </p>
                  </div>

                  {/* Button */}
                  <a
                    href={InternshipCompletionLetterSatinder}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg hover:scale-[1.03] hover:shadow-blue-200 transition-all duration-300 w-full sm:w-fit"
                  >
                    <Briefcase size={20} />
                    View Internship Letter
                  </a>
                </div>

                {/* Responsive PDF Preview */}
                <div className="mt-8 rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-white">
                  <iframe
                    src={InternshipCompletionLetterSatinder}
                    title="Internship Completion Letter"
                    className="w-full h-[500px] sm:h-[650px] lg:h-[800px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
