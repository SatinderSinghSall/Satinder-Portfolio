import {
  ArrowTopRightOnSquareIcon,
  ArrowUpRightIcon,
  CheckBadgeIcon,
  ClockIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/solid";

import AppStatusModal from "./AppStatusModal";

export default function AppsShowcase() {
  const apps = [
    {
      id: 1,

      name: "FinTrack: Expense & Budget",

      tagline: "Modern finance tracking for ambitious people.",

      description:
        "Track expenses, manage budgets, analyze spending patterns, and gain financial clarity with a beautifully engineered full-stack mobile experience.",

      gradient: "from-emerald-500 via-teal-500 to-cyan-500",

      glow: "bg-emerald-500/20",

      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",

      playstore: "#",

      github: "https://github.com/SatinderSinghSall",

      technologies: [
        "React Native",
        "Expo",
        "Node.js",
        "Express",
        "MongoDB",
        "TypeScript",
      ],

      features: [
        "Expense Analytics",
        "Smart Budgets",
        "Secure Authentication",
        "Dashboard Insights",
      ],

      stats: [
        {
          label: "Architecture",
          value: "Full Stack",
        },

        {
          label: "Platform",
          value: "Android",
        },

        {
          label: "Backend",
          value: "Node.js",
        },
      ],

      status: "Closed Testing",

      statusColor: "text-amber-300",

      statusBg: "bg-amber-500/20",

      badge: "Beta",

      badgeIcon: ClockIcon,
    },

    {
      id: 2,

      name: "Course Calculator",

      tagline: "Fast academic calculations without the stress.",

      description:
        "Calculate CGPA, percentages, semester grades, and academic performance instantly with a clean and distraction-free student experience.",

      gradient: "from-indigo-500 via-violet-500 to-fuchsia-500",

      glow: "bg-violet-500/20",

      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",

      playstore:
        "https://play.google.com/store/apps/details?id=com.satinder.coursecalculator",

      github: "https://github.com/SatinderSinghSall",

      technologies: [
        "React Native",
        "Expo",
        "TypeScript",
        "Tailwind",
        "Android",
      ],

      features: [
        "CGPA Calculator",
        "Percentage Tracking",
        "Semester Management",
        "Clean UI/UX",
      ],

      stats: [
        {
          label: "Category",
          value: "Education",
        },

        {
          label: "Users",
          value: "Students",
        },

        {
          label: "Status",
          value: "Production",
        },
      ],

      status: "Live on Play Store",

      statusColor: "text-emerald-300",

      statusBg: "bg-emerald-500/20",

      badge: "Production",

      badgeIcon: CheckBadgeIcon,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#050816] py-24 text-white sm:py-32">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.15),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.18),transparent_30%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* TOP SECTION TITLE */}
        <div className="mb-20 text-center">
          {/* SMALL LABEL */}
          <div className="inline-flex items-center gap-3">
            <div className="h-px w-10 bg-cyan-400/60" />

            <span
              className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.45em]
                    text-cyan-400
                "
            >
              APP SHOWCASE
            </span>

            <div className="h-px w-10 bg-cyan-400/60" />
          </div>

          {/* BIG TITLE */}
          <h1
            className="
                mt-8

                text-5xl
                font-black
                tracking-tight
                text-white

                sm:text-6xl
                lg:text-7xl
                "
          >
            My Mobile
            <span
              className="
                bg-gradient-to-r
                from-emerald-400
                via-cyan-400
                to-indigo-400

                bg-clip-text
                text-transparent
            "
            >
              {" "}
              Applications.
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p
            className="
                mx-auto
                mt-8
                max-w-3xl

                text-base
                leading-relaxed
                text-white/60

                sm:text-xl
                "
          >
            Production-grade mobile applications crafted with scalable
            architecture, premium UI/UX, and modern full-stack engineering.
          </p>
        </div>

        {/* APPS */}
        <div className="mt-24 space-y-32">
          {apps.map((app, index) => {
            const BadgeIcon = app.badgeIcon;

            return (
              <div
                key={app.id}
                className={`grid items-center gap-16 lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* LEFT */}
                <div>
                  {/* TOP BADGE */}
                  <div
                    className={`
                      inline-flex items-center gap-2
                      rounded-full
                      border border-white/10
                      bg-gradient-to-r ${app.gradient}
                      px-5 py-2
                      text-sm font-bold text-white
                      shadow-2xl
                    `}
                  >
                    <BadgeIcon className="h-4 w-4" />

                    <span>{app.badge}</span>
                  </div>

                  {/* TITLE */}
                  <h3 className="mt-8 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                    {app.name}
                  </h3>

                  {/* TAGLINE */}
                  <p
                    className={`
                      mt-5
                      bg-gradient-to-r ${app.gradient}
                      bg-clip-text
                      text-xl font-bold text-transparent
                      sm:text-2xl
                    `}
                  >
                    {app.tagline}
                  </p>

                  {/* TESTING BADGE */}
                  <div
                    className={`
                      mt-6
                      inline-flex items-center gap-2
                      rounded-full
                      border border-white/10
                      ${app.statusBg}
                      px-4 py-2
                      text-xs font-semibold
                      backdrop-blur-xl
                      ${app.statusColor}
                    `}
                  >
                    <div className="h-2 w-2 rounded-full bg-current animate-pulse" />

                    <span>{app.status}</span>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
                    {app.description}
                  </p>

                  {/* STATS */}
                  <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {app.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-2xl"
                      >
                        <p className="text-sm text-white/50">{stat.label}</p>

                        <p className="mt-2 text-lg font-bold text-white">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* FEATURES */}
                  <div className="mt-10 flex flex-wrap gap-3">
                    {app.features.map((feature) => (
                      <div
                        key={feature}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-xl"
                      >
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* TECH STACK */}
                  <div className="mt-10">
                    <h4 className="text-sm font-bold uppercase tracking-[0.25em] text-white/40">
                      Technology Stack
                    </h4>

                    <div className="mt-5 flex flex-wrap gap-3">
                      {app.technologies.map((tech) => (
                        <div
                          key={tech}
                          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm font-semibold text-white/70"
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BUTTONS */}
                  <div className="mt-12 flex flex-col gap-4">
                    {/* TOP BUTTON ROW */}
                    <div className="flex flex-col gap-4 sm:flex-row">
                      {app.id === 1 ? (
                        <AppStatusModal>
                          <button
                            className={`
                              group
                              inline-flex items-center justify-center gap-3
                              rounded-2xl
                              bg-gradient-to-r ${app.gradient}
                              px-8 py-4
                              text-sm font-bold text-white
                              shadow-[0_10px_40px_rgba(16,185,129,0.25)]
                              transition-all duration-300
                              hover:scale-[1.03]
                            `}
                          >
                            <span>View on Play Store</span>

                            <ArrowTopRightOnSquareIcon
                              className="
                                h-5 w-5
                                transition-transform duration-300
                                group-hover:translate-x-1
                                group-hover:-translate-y-1
                              "
                            />
                          </button>
                        </AppStatusModal>
                      ) : (
                        <a
                          href={app.playstore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`
                            group
                            inline-flex items-center justify-center gap-3
                            rounded-2xl
                            bg-gradient-to-r ${app.gradient}
                            px-8 py-4
                            text-sm font-bold text-white
                            shadow-[0_10px_40px_rgba(16,185,129,0.25)]
                            transition-all duration-300
                            hover:scale-[1.03]
                          `}
                        >
                          <span>View on Play Store</span>

                          <ArrowTopRightOnSquareIcon
                            className="
                              h-5 w-5
                              transition-transform duration-300
                              group-hover:translate-x-1
                              group-hover:-translate-y-1
                            "
                          />
                        </a>
                      )}

                      <a
                        href={app.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          group
                          inline-flex items-center justify-center gap-3
                          rounded-2xl
                          border border-white/10
                          bg-white/5
                          px-8 py-4
                          text-sm font-bold text-white
                          backdrop-blur-xl
                          transition-all duration-300
                          hover:border-white/20
                          hover:bg-white/10
                        "
                      >
                        <CodeBracketIcon className="h-5 w-5" />

                        <span>GitHub Repository</span>
                      </a>
                    </div>

                    {/* FINTRACK LANDING PAGE */}
                    {app.id === 1 && (
                      <a
                        href="https://fintrack-app-satinder.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          group
                          inline-flex w-full items-center justify-center gap-3
                          rounded-2xl
                          border border-emerald-400/20
                          bg-gradient-to-r
                          from-emerald-500/10
                          via-cyan-500/10
                          to-teal-500/10
                          px-8 py-4
                          text-sm font-bold text-white
                          backdrop-blur-xl
                          transition-all duration-300
                          hover:scale-[1.01]
                          hover:border-emerald-400/40
                          hover:bg-emerald-500/10
                        "
                      >
                        <RocketLaunchIcon className="h-5 w-5 text-emerald-300" />

                        <span>Visit FinTrack Landing Page</span>

                        <ArrowTopRightOnSquareIcon
                          className="
                          h-5 w-5
                          transition-transform duration-300
                          group-hover:translate-x-1
                          group-hover:-translate-y-1
                        "
                        />
                      </a>
                    )}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="relative mx-auto w-full max-w-xl">
                  {/* GLOW */}
                  <div
                    className={`absolute -inset-10 rounded-full blur-3xl ${app.glow}`}
                  />

                  {/* DEVICE */}
                  <div className="relative rounded-[40px] border border-white/10 bg-white/5 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-3xl">
                    <div className="overflow-hidden rounded-[32px] border border-white/10 bg-black">
                      {/* TOP BAR */}
                      <div className="flex items-center justify-between border-b border-white/10 bg-black/80 px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-red-500" />

                          <div className="h-3 w-3 rounded-full bg-yellow-500" />

                          <div className="h-3 w-3 rounded-full bg-green-500" />
                        </div>

                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                          Mobile Preview
                        </div>
                      </div>

                      {/* IMAGE */}
                      <div className="relative overflow-hidden">
                        <img
                          src={app.image}
                          alt={app.name}
                          className="h-[500px] w-full object-cover sm:h-[650px]"
                        />

                        {/* OVERLAY */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                        {/* FLOATING CARD */}
                        <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/10 bg-black/40 p-5 backdrop-blur-2xl">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-sm font-medium text-white/50">
                                Featured Product
                              </p>

                              <h4 className="mt-2 text-2xl font-black text-white">
                                {app.name}
                              </h4>
                            </div>

                            <div
                              className={`
                                inline-flex items-center gap-2
                                rounded-2xl
                                border border-white/10
                                ${app.statusBg}
                                px-4 py-2
                                text-xs font-bold uppercase tracking-[0.2em]
                                text-white
                                backdrop-blur-xl
                              `}
                            >
                              <BadgeIcon className="h-4 w-4" />

                              <span>{app.badge}</span>
                            </div>
                          </div>

                          {/* BOTTOM */}
                          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
                            <div>
                              <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                                Status
                              </p>

                              <p
                                className={`mt-1 text-sm font-semibold ${app.statusColor}`}
                              >
                                {app.status}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                                Platform
                              </p>

                              <p className="mt-1 text-sm font-semibold text-white">
                                Google Play
                              </p>
                            </div>

                            <div>
                              <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                                Version
                              </p>

                              <p className="mt-1 text-sm font-semibold text-white">
                                v2.0
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-32 text-center">
          <div className="mx-auto max-w-4xl rounded-[40px] border border-white/10 bg-white/5 px-8 py-16 backdrop-blur-3xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-2xl">
              <RocketLaunchIcon className="h-10 w-10 text-white" />
            </div>

            <h3 className="mt-8 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Building Modern Digital Products
            </h3>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
              Full-stack mobile apps, scalable backend systems, premium UI/UX,
              and production-ready engineering crafted for real-world users.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="/projects"
                className="
                  group
                  inline-flex items-center justify-center gap-3
                  rounded-2xl
                  bg-white
                  px-8 py-4
                  text-sm font-bold text-black
                  transition-all duration-300
                  hover:scale-[1.03]
                "
              >
                <span>Explore Projects</span>

                <ArrowUpRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <a
                href="/contact"
                className="
                  inline-flex items-center justify-center
                  rounded-2xl
                  border border-white/10
                  bg-white/5
                  px-8 py-4
                  text-sm font-bold text-white
                  backdrop-blur-xl
                  transition-all duration-300
                  hover:bg-white/10
                "
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>

        {/* HEADER */}
        <div className="mx-auto max-w-4xl text-center mt-26">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-white/80 backdrop-blur-xl">
            <RocketLaunchIcon className="h-4 w-4 text-emerald-400" />

            <span>Modern Android Applications</span>
          </div>

          <h2 className="mt-8 text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Premium Play Store
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              {" "}
              Showcase
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-white/60 sm:text-xl">
            Full-stack mobile applications engineered with scalable
            architecture, premium user experiences, and modern product design.
          </p>
        </div>
      </div>
    </section>
  );
}
