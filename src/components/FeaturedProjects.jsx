import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { ArrowUpRightIcon, SparklesIcon } from "@heroicons/react/24/outline";

const API = import.meta.env.VITE_API_URL || "/api";

export default function FeaturedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API}/projects`);

        const sorted = [...(res.data || [])].sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;

          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        });

        setProjects(sorted);
      } catch (err) {
        console.error("Failed to fetch featured projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section
      className="
        relative overflow-hidden

        bg-gradient-to-b
        from-[#f8fafc]
        via-[#f1f5f9]
        to-white

        py-20 sm:py-24 lg:py-28
        px-4 sm:px-6
      "
    >
      {/* Glow */}
      <div className="pointer-events-none absolute top-0 left-[-120px] h-[320px] w-[320px] rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="pointer-events-none absolute bottom-0 right-[-120px] h-[320px] w-[320px] rounded-full bg-indigo-500/10 blur-[120px]" />

      {/* Grid */}
      <div
        className="
          absolute inset-0 opacity-[0.03]

          [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)]

          [background-size:70px_70px]
        "
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* HEADER */}
        <div
          className="
            flex flex-col
            xl:flex-row

            xl:items-end
            xl:justify-between

            gap-10
          "
        >
          {/* LEFT */}
          <div className="max-w-3xl">
            {/* Badge */}
            <div
              className="
                inline-flex items-center gap-2

                rounded-full

                border border-blue-200
                bg-white/80

                px-4 py-2

                backdrop-blur-xl

                text-sm font-semibold
                text-blue-700

                shadow-lg
              "
            >
              <SparklesIcon className="h-4 w-4" />
              Featured Projects
            </div>

            {/* TITLE */}
            <h2
              className="
                mt-6

                text-4xl
                sm:text-5xl
                lg:text-6xl

                font-black
                leading-[1]
                tracking-tight

                text-slate-900
              "
            >
              Crafted
              <span
                className="
                  block sm:inline

                  sm:ml-4

                  bg-gradient-to-r
                  from-blue-600
                  via-indigo-500
                  to-violet-500

                  bg-clip-text
                  text-transparent
                "
              >
                Experiences
              </span>
            </h2>

            {/* DESC */}
            <p
              className="
                mt-6

                max-w-2xl

                text-base sm:text-lg
                leading-relaxed

                text-slate-600
              "
            >
              A curated showcase of premium digital products focused on
              scalability, performance, modern UI/UX, and impactful user
              experiences.
            </p>
          </div>

          {/* CTA */}
          <div className="w-full sm:w-auto">
            <Link
              to="/projects"
              className="
                group

                inline-flex w-full sm:w-auto
                items-center justify-center gap-3

                rounded-2xl

                bg-slate-900

                px-7 py-4

                text-sm sm:text-base
                font-bold
                text-white

                shadow-[0_10px_40px_rgba(15,23,42,0.15)]

                transition-all duration-300

                hover:bg-slate-800
                hover:scale-[1.02]
              "
            >
              View All Projects
              <ArrowUpRightIcon
                className="
                  h-5 w-5

                  transition-transform duration-300

                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </Link>
          </div>
        </div>

        {/* MOBILE */}
        {!loading && (
          <div
            className="
              mt-14

              grid grid-cols-1 gap-6

              md:hidden
            "
          >
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}

        {/* DESKTOP */}
        {!loading && (
          <div
            className="
              mt-14

              hidden md:grid

              md:grid-cols-2
              xl:grid-cols-3

              gap-6 sm:gap-8
            "
          >
            {projects.slice(0, 6).map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}

        {/* LOADER */}
        {loading && (
          <div
            className="
              mt-14

              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3

              gap-6 sm:gap-8
            "
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="
                  overflow-hidden

                  rounded-[32px]

                  border border-slate-200
                  bg-white

                  shadow-[0_10px_40px_rgba(15,23,42,0.04)]
                "
              >
                {/* IMAGE */}
                <div className="h-[240px] w-full animate-pulse bg-slate-200" />

                {/* CONTENT */}
                <div className="p-6">
                  <div className="h-7 w-3/4 rounded-xl bg-slate-200 animate-pulse" />

                  <div className="mt-5 space-y-3">
                    <div className="h-4 rounded-full bg-slate-200 animate-pulse" />
                    <div className="h-4 rounded-full bg-slate-200 animate-pulse" />
                    <div className="h-4 w-2/3 rounded-full bg-slate-200 animate-pulse" />
                  </div>

                  <div className="mt-6 flex gap-2">
                    <div className="h-8 w-20 rounded-full bg-slate-200 animate-pulse" />
                    <div className="h-8 w-20 rounded-full bg-slate-200 animate-pulse" />
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <div className="h-5 w-28 rounded-full bg-slate-200 animate-pulse" />

                    <div className="h-11 w-11 rounded-2xl bg-slate-200 animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BOTTOM CTA */}
        <div className="mt-16 sm:mt-20 flex justify-center">
          <Link
            to="/projects"
            className="
              group

              inline-flex items-center gap-3

              rounded-2xl

              border border-slate-300
              bg-white

              px-7 py-4

              text-sm sm:text-base
              font-bold

              text-slate-900

              shadow-lg

              transition-all duration-300

              hover:border-blue-300
              hover:bg-blue-50
            "
          >
            Explore Complete Portfolio
            <ArrowUpRightIcon
              className="
                h-5 w-5

                transition-transform duration-300

                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* PROJECT CARD */
function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project._id}`} className="block">
      <div
        className="
          group relative overflow-hidden

          rounded-[32px]

          border border-slate-200/80

          bg-white/90

          backdrop-blur-2xl

          shadow-[0_10px_40px_rgba(15,23,42,0.06)]

          transition-all duration-500

          hover:-translate-y-2
          hover:shadow-[0_20px_70px_rgba(59,130,246,0.12)]
          hover:border-blue-200
        "
      >
        {/* Hover Glow */}
        <div
          className="
            absolute inset-0

            opacity-0
            group-hover:opacity-100

            transition duration-500

            bg-gradient-to-br
            from-blue-500/[0.03]
            to-violet-500/[0.03]
          "
        />

        {/* IMAGE */}
        <div className="relative overflow-hidden">
          <img
            src={project.images?.[0]}
            alt={project.title}
            className="
              h-[220px] sm:h-[240px]
              w-full
              object-cover

              transition-transform duration-700

              group-hover:scale-105
            "
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Featured Badge */}
          {project.featured && (
            <div
              className="
                absolute top-4 left-4

                rounded-full

                bg-gradient-to-r
                from-amber-400
                to-yellow-500

                px-4 py-2

                text-[11px]
                font-black
                tracking-wide

                text-black

                shadow-lg
              "
            >
              ✦ FEATURED
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-6 sm:p-7">
          {/* TITLE */}
          <h3
            className="
              text-2xl
              font-black
              leading-tight
              tracking-tight

              text-slate-900

              transition-colors duration-300

              group-hover:text-blue-600
            "
          >
            {project.title}
          </h3>

          {/* DESC */}
          <p
            className="
              mt-4

              line-clamp-3

              text-sm sm:text-[15px]
              leading-relaxed

              text-slate-600
            "
          >
            {project.description}
          </p>

          {/* TECH */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies?.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="
                  rounded-full

                  border border-slate-200
                  bg-slate-100

                  px-3 py-1.5

                  text-[11px]
                  font-semibold

                  text-slate-700
                "
              >
                {tech}
              </span>
            ))}
          </div>

          {/* BOTTOM */}
          <div
            className="
              mt-8

              flex items-center
              justify-between
            "
          >
            {/* LINK */}
            <div
              className="
                inline-flex items-center gap-2

                text-sm
                font-bold

                text-blue-600
              "
            >
              View Project
              <ArrowUpRightIcon className="h-4 w-4" />
            </div>

            {/* ARROW */}
            <div
              className="
                flex h-11 w-11
                items-center justify-center

                rounded-2xl

                bg-slate-100

                text-slate-700

                transition-all duration-300

                group-hover:bg-blue-600
                group-hover:text-white
                group-hover:scale-110
              "
            >
              <ArrowUpRightIcon className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
