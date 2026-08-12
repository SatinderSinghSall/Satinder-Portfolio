import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  CalendarDaysIcon,
  Squares2X2Icon,
  CpuChipIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const API = import.meta.env.VITE_API_URL || "/api";
const SITE_URL = window.location.origin;

function SEO({ title, description, keywords, image }) {
  useEffect(() => {
    // 1. Page Title
    document.title = title;

    // 2. Helper function to create/update meta tags
    const setMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Standard Meta Tags
    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywords);

    // Open Graph / Facebook
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:image", image);
    setMetaTag("property", "og:url", window.location.href);

    // Twitter
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", image);

    // Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.href);
  }, [title, description, keywords, image]);

  return null;
}

function SkeletonProjectCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm animate-pulse">
      <div className="w-full h-56 bg-slate-200" />
      <div className="p-6 space-y-4">
        <div className="h-6 w-4/5 bg-slate-200 rounded-md" />
        <div className="h-4 w-2/5 bg-slate-200 rounded-md" />
        <div className="h-4 w-full bg-slate-200 rounded-md" />
        <div className="h-4 w-5/6 bg-slate-200 rounded-md" />
        <div className="h-10 w-full rounded-2xl bg-slate-200 mt-3" />
      </div>
    </div>
  );
}

function StatChip({ icon: Icon, label, value }) {
  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm hover:border-indigo-200 hover:shadow-md transition">
      <div className="h-11 w-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center group-hover:scale-105 transition">
        <Icon className="h-5 w-5 text-indigo-600" />
      </div>
      <div>
        <p className="text-xs text-slate-500 font-medium">{label}</p>
        <p className="text-base font-extrabold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  // UI
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest"); // latest | oldest | title

  // Pagination
  const PER_PAGE = 6;
  const [page, setPage] = useState(1);

  const fetchProjects = async () => {
    setFetching(true);
    try {
      const res = await axios.get(`${API}/projects`);
      setProjects(res.data || []);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const stats = useMemo(() => {
    const total = projects.length;

    const latestDate = projects
      .map((p) => (p.createdAt ? new Date(p.createdAt) : null))
      .filter(Boolean)
      .sort((a, b) => b - a)[0];

    const techSet = new Set();
    projects.forEach((p) =>
      (p.technologies || []).forEach((t) => techSet.add(t)),
    );

    return {
      total,
      latest: latestDate ? latestDate.toLocaleDateString() : "—",
      tech: techSet.size || "—",
    };
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let list = [...projects];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => {
        const title = (p.title || "").toLowerCase();
        const desc = (p.description || "").toLowerCase();
        const tech = (p.technologies || []).join(" ").toLowerCase();
        return title.includes(q) || desc.includes(q) || tech.includes(q);
      });
    }

    // FEATURED → PRIORITY → USER SORT
    list.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;

      if (a.featured && b.featured) {
        const priorityDiff = (b.priority || 0) - (a.priority || 0);
        if (priorityDiff !== 0) return priorityDiff;
      }

      if (sortBy === "latest") {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }

      if (sortBy === "oldest") {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      }

      if (sortBy === "title") {
        return (a.title || "").localeCompare(b.title || "");
      }

      return 0;
    });

    return list;
  }, [projects, search, sortBy]);

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProjects.length / PER_PAGE) || 1;

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  // Smooth Scroll to Top on Page Change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const paginatedProjects = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filteredProjects.slice(start, start + PER_PAGE);
  }, [filteredProjects, page]);

  // JSON-LD Schema.org Data for SEO
  const structuredData = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: paginatedProjects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: `${SITE_URL}/projects/${project._id}`,
          image: project.images?.[0] || "",
        },
      })),
    };
  }, [paginatedProjects]);

  const skeletonCount = 6;

  return (
    <section className="relative min-h-screen bg-slate-50 py-14 sm:py-20 px-4 sm:px-6 text-slate-800 overflow-hidden">
      {/* SEO Metadata Injector */}
      <SEO
        title="Portfolio Showcase | Creative Software & Web Projects | by Satinder Singh Sall"
        description="Explore a curated showcase of full-stack web applications, open-source software, and modern design solutions."
        keywords="full stack developer, web applications, portfolio, React, Node.js, software engineering projects"
        image={
          projects[0]?.images?.[0] ||
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
        }
      />

      {/* Schema.org Structured Data Injection */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Subtle Background Accent Lighting */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-100/60 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-100/60 blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center">
          <p className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-slate-200 text-indigo-600 shadow-sm">
            <Squares2X2Icon className="h-4 w-4" />
            Portfolio Showcase
          </p>

          <h1 className="mt-5 text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-slate-900">
            Creative <span className="text-indigo-600">Projects</span>
            <span className="ml-3 inline-flex items-center justify-center px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-indigo-50 border border-indigo-200 text-indigo-700 align-middle">
              {stats.total} Projects
            </span>
          </h1>

          <p className="mt-5 text-slate-600 text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed">
            A collection of my finest work, blending clean design with impactful
            functionality.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
          <StatChip
            icon={Squares2X2Icon}
            label="Total Projects"
            value={stats.total}
          />
          <StatChip
            icon={CalendarDaysIcon}
            label="Latest Added"
            value={stats.latest}
          />
          <StatChip
            icon={CpuChipIcon}
            label="Tech Stack Count"
            value={stats.tech}
          />
        </div>

        {/* Controls */}
        <div className="mt-8 bg-white border border-slate-200/80 rounded-3xl p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3.5 top-3 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects by title, tech, description..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>

            {/* Sort + Refresh */}
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-44 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              >
                <option value="latest">Sort: Latest</option>
                <option value="oldest">Sort: Oldest</option>
                <option value="title">Sort: Title</option>
              </select>

              <button
                onClick={fetchProjects}
                disabled={fetching}
                className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold border transition active:scale-[0.98] ${
                  fetching
                    ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-sm"
                }`}
              >
                <ArrowPathIcon
                  className={`h-5 w-5 ${fetching ? "animate-spin" : ""}`}
                />
                {fetching ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </div>

          {/* Results Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <p>
              Showing{" "}
              <span className="text-slate-900 font-semibold">
                {filteredProjects.length}
              </span>{" "}
              results
            </p>

            {search.trim() && (
              <button
                onClick={() => {
                  setSearch("");
                  setSortBy("latest");
                }}
                className="text-indigo-600 hover:text-indigo-800 transition font-semibold"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="mt-12">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: skeletonCount }).map((_, i) => (
                <SkeletonProjectCard key={i} />
              ))}
            </div>
          ) : paginatedProjects.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <p className="text-lg font-bold text-slate-800">
                No projects found
              </p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try searching with different keywords or refresh the page.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProjects.map((project) => {
                  const isPopular = (project.views || 0) > 50;
                  const defaultImage =
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f";

                  return (
                    <article
                      key={project._id}
                      className={`group relative overflow-hidden rounded-3xl bg-white border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-xl ${
                        project.featured
                          ? "border-amber-300/80 shadow-md ring-1 ring-amber-300/50"
                          : "border-slate-200/80 shadow-sm"
                      }`}
                    >
                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold bg-amber-400 text-slate-900 rounded-lg shadow-sm">
                          ⭐ FEATURED
                        </div>
                      )}

                      {/* Popular Badge */}
                      {isPopular && (
                        <div className="absolute top-3 right-3 z-10 px-2.5 py-1 text-[10px] font-bold bg-rose-500 text-white rounded-lg shadow-sm">
                          🔥 POPULAR
                        </div>
                      )}

                      <div>
                        {/* Image */}
                        <div className="relative overflow-hidden bg-slate-100 h-56">
                          <img
                            src={project.images?.[0] || defaultImage}
                            alt={project.title}
                            onError={(e) => {
                              e.target.src = defaultImage;
                            }}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60" />
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h2 className="text-xl font-bold text-slate-900 leading-snug transition-colors line-clamp-1 group-hover:text-indigo-600">
                            {project.title}
                          </h2>

                          <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                            {project.description || "No description provided."}
                          </p>

                          {/* Tech Stack Tags */}
                          {Array.isArray(project.technologies) &&
                            project.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-4">
                                {project.technologies
                                  .slice(0, 4)
                                  .map((tech, idx) => (
                                    <span
                                      key={idx}
                                      className="bg-indigo-50 text-indigo-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-md border border-indigo-100"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                              </div>
                            )}
                        </div>
                      </div>

                      {/* Card Action / Footer */}
                      <div className="p-6 pt-2">
                        <Link
                          to={`/projects/${project._id}`}
                          className="group/btn relative w-full inline-flex items-center justify-center gap-2.5 font-semibold text-sm py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white transition-all duration-300 shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] overflow-hidden"
                        >
                          {/* Subtle Glow Overlay on Hover */}
                          <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

                          <span className="relative z-10 tracking-wide">
                            View Project Details
                          </span>

                          <ArrowRightIcon className="relative z-10 w-4 h-4 transition-transform duration-300 ease-out group-hover/btn:translate-x-1.5" />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Pagination Controls */}
              {filteredProjects.length > PER_PAGE && (
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200/80 rounded-3xl p-4 shadow-sm">
                  {/* Page Info */}
                  <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                    <span className="px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200">
                      Page{" "}
                      <span className="text-slate-900 font-bold">{page}</span>{" "}
                      of{" "}
                      <span className="text-slate-900 font-bold">
                        {totalPages}
                      </span>
                    </span>

                    <span className="hidden sm:inline text-slate-400">
                      Showing {PER_PAGE} projects per page
                    </span>
                  </div>

                  {/* Pagination Nav Buttons */}
                  <div className="flex items-center gap-2">
                    {/* First */}
                    <button
                      onClick={() => setPage(1)}
                      disabled={page === 1}
                      className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition"
                    >
                      <ChevronDoubleLeftIcon className="h-4 w-4" />
                    </button>

                    {/* Previous */}
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition"
                    >
                      <ChevronLeftIcon className="h-4 w-4" />
                      <span className="hidden sm:inline">Previous</span>
                    </button>

                    {/* Next */}
                    <button
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={page === totalPages}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRightIcon className="h-4 w-4" />
                    </button>

                    {/* Last */}
                    <button
                      onClick={() => setPage(totalPages)}
                      disabled={page === totalPages}
                      className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition"
                    >
                      <ChevronDoubleRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="h-10" />
      </div>
    </section>
  );
}
