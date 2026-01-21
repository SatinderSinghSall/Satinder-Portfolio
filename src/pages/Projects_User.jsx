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

const API = import.meta.env.VITE_API_URL || "/api";

function SkeletonProjectCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl shadow-xl bg-white/5 backdrop-blur-md border border-white/10 animate-pulse">
      <div className="w-full h-56 bg-white/10" />
      <div className="p-6 space-y-4">
        <div className="h-6 w-4/5 bg-white/10 rounded-md" />
        <div className="h-4 w-2/5 bg-white/10 rounded-md" />
        <div className="h-4 w-full bg-white/10 rounded-md" />
        <div className="h-4 w-5/6 bg-white/10 rounded-md" />
        <div className="h-10 w-full rounded-2xl bg-white/10 mt-3" />
      </div>
    </div>
  );
}

function StatChip({ icon: Icon, label, value }) {
  return (
    <div className="group flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl shadow-xl hover:bg-white/10 hover:border-white/20 transition">
      <div className="h-11 w-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center group-hover:scale-105 transition">
        <Icon className="h-5 w-5 text-gray-200" />
      </div>
      <div>
        <p className="text-xs text-gray-300">{label}</p>
        <p className="text-base font-extrabold text-white">{value}</p>
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

  // ✅ Pagination
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

    // Sort
    if (sortBy === "latest") {
      list.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
      );
    }
    if (sortBy === "oldest") {
      list.sort(
        (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0),
      );
    }
    if (sortBy === "title") {
      list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    }

    return list;
  }, [projects, search, sortBy]);

  // ✅ Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, sortBy]);

  // ✅ Pagination calculations
  const totalPages = Math.ceil(filteredProjects.length / PER_PAGE) || 1;

  // If current page becomes invalid after filtering, fix it
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  // Add Smooth Scroll to Top on Page Change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const paginatedProjects = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filteredProjects.slice(start, start + PER_PAGE);
  }, [filteredProjects, page]);

  const skeletonCount = 6;

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] py-14 sm:py-20 px-4 sm:px-6 text-white overflow-hidden">
      {/* Premium glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full bg-indigo-500/25 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[420px] h-[420px] rounded-full bg-fuchsia-500/25 blur-[130px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center">
          <p className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-gray-200 backdrop-blur-md">
            <Squares2X2Icon className="h-4 w-4" />
            Portfolio Showcase
          </p>

          <h2 className="mt-5 text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
            Creative{" "}
            <span className="text-blue-500 drop-shadow-[0_0_25px_rgba(59,130,246,0.35)]">
              Projects
            </span>
            <span className="ml-3 inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-blue-500/10 border border-blue-400/20 text-blue-200 align-middle">
              {stats.total} Projects
            </span>
          </h2>

          <p className="mt-5 text-gray-300 text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed">
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
        <div className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-300" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects by title, tech, description..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-black/20 border border-white/10 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Sort + Refresh */}
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-44 px-4 py-2.5 rounded-2xl bg-black/20 border border-white/10 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="latest">Sort: Latest</option>
                <option value="oldest">Sort: Oldest</option>
                <option value="title">Sort: Title</option>
              </select>

              <button
                onClick={fetchProjects}
                disabled={fetching}
                className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold border transition active:scale-[0.98]
                  ${
                    fetching
                      ? "bg-white/10 border-white/10 text-gray-300 cursor-not-allowed"
                      : "bg-white/10 hover:bg-white/15 border-white/10 text-white"
                  }`}
              >
                <ArrowPathIcon
                  className={`h-5 w-5 ${fetching ? "animate-spin" : ""}`}
                />
                {fetching ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-300">
            <p>
              Showing{" "}
              <span className="text-white font-semibold">
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
                className="text-indigo-200 hover:text-white transition font-semibold"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>

        {/* Cards */}
        <div className="mt-12">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: skeletonCount }).map((_, i) => (
                <SkeletonProjectCard key={i} />
              ))}
            </div>
          ) : paginatedProjects.length === 0 ? (
            <div className="text-center mt-10">
              <p className="text-lg font-semibold text-gray-200">
                No projects found
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Try searching with different keywords or refresh the page.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProjects.map((project) => (
                  <div
                    key={project._id}
                    className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col h-full">
                      <h3 className="text-xl font-extrabold leading-snug group-hover:text-blue-300 transition-colors line-clamp-2">
                        {project.title}
                      </h3>

                      <p className="text-sm text-gray-300 mt-3 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      <Link
                        to={`/projects/${project._id}`}
                        className="mt-6 w-full inline-flex items-center justify-center gap-2 font-semibold py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-pink-500 transition-all text-white shadow-md"
                      >
                        🚀 View Details
                      </Link>
                    </div>

                    {/* bottom glow line */}
                    <div className="h-[2px] w-full bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-fuchsia-500/40 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                ))}
              </div>

              {/* ✅ Premium SaaS Pagination */}
              {filteredProjects.length > PER_PAGE && (
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Page Info */}
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg">
                      Page{" "}
                      <span className="text-white font-extrabold">{page}</span>{" "}
                      of{" "}
                      <span className="text-white font-extrabold">
                        {totalPages}
                      </span>
                    </span>

                    <span className="hidden sm:inline text-xs text-gray-400">
                      Showing {PER_PAGE} projects per page
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-2">
                    {/* First */}
                    <button
                      onClick={() => setPage(1)}
                      disabled={page === 1}
                      className={`group relative inline-flex items-center justify-center rounded-2xl px-4 py-3 border transition-all duration-300 active:scale-[0.98]
                    ${
                      page === 1
                        ? "bg-white/5 border-white/10 text-gray-500 cursor-not-allowed"
                        : "bg-white/10 border-white/10 hover:bg-white/15 text-white shadow-xl"
                    }`}
                    >
                      <ChevronDoubleLeftIcon className="h-5 w-5" />
                    </button>

                    {/* Prev */}
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className={`group relative inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold border transition-all duration-300 active:scale-[0.98]
                    ${
                      page === 1
                        ? "bg-white/5 border-white/10 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500/90 to-purple-600/90 hover:from-purple-500 hover:to-pink-500 text-white shadow-xl shadow-blue-500/20"
                    }`}
                    >
                      {/* Glow */}
                      {page !== 1 && (
                        <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/40 to-fuchsia-500/40 blur-xl opacity-0 group-hover:opacity-100 transition" />
                      )}

                      <span className="relative flex items-center gap-2">
                        <ChevronLeftIcon className="h-5 w-5" />
                        <span className="hidden sm:inline">Previous</span>
                      </span>
                    </button>

                    {/* Next */}
                    <button
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={page === totalPages}
                      className={`group relative inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold border transition-all duration-300 active:scale-[0.98]
                    ${
                      page === totalPages
                        ? "bg-white/5 border-white/10 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600/90 to-blue-500/90 hover:from-pink-500 hover:to-purple-500 text-white shadow-xl shadow-purple-500/20"
                    }`}
                    >
                      {/* Glow */}
                      {page !== totalPages && (
                        <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/40 to-blue-500/40 blur-xl opacity-0 group-hover:opacity-100 transition" />
                      )}

                      <span className="relative flex items-center gap-2">
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRightIcon className="h-5 w-5" />
                      </span>
                    </button>

                    {/* Last */}
                    <button
                      onClick={() => setPage(totalPages)}
                      disabled={page === totalPages}
                      className={`group relative inline-flex items-center justify-center rounded-2xl px-4 py-3 border transition-all duration-300 active:scale-[0.98]
                      ${
                        page === totalPages
                          ? "bg-white/5 border-white/10 text-gray-500 cursor-not-allowed"
                          : "bg-white/10 border-white/10 hover:bg-white/15 text-white shadow-xl"
                      }`}
                    >
                      <ChevronDoubleRightIcon className="h-5 w-5" />
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
