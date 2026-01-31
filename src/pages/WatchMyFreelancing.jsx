import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  FunnelIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  TagIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  StarIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

const API = import.meta.env.VITE_API_URL || "/api";

/* ================= Skeleton Card (EXACT SAME) ================= */
function SkeletonCard() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden animate-pulse">
      <div className="h-56 bg-white/10" />
      <div className="p-6 space-y-4">
        <div className="h-5 w-4/5 bg-white/10 rounded-md" />
        <div className="h-4 w-2/5 bg-white/10 rounded-md" />
        <div className="h-4 w-full bg-white/10 rounded-md" />
      </div>
    </div>
  );
}

/* ================= Stat Chip (EXACT SAME) ================= */
function StatChip({ icon: Icon, label, value }) {
  return (
    <div className="group flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl shadow-xl hover:bg-white/10 hover:border-white/20 transition">
      <div className="h-11 w-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
        <Icon className="h-5 w-5 text-gray-200" />
      </div>
      <div>
        <p className="text-xs text-gray-300">{label}</p>
        <p className="text-base font-extrabold text-white">{value}</p>
      </div>
    </div>
  );
}

export default function WatchMyFreelancing() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  /* UI State (SAME AS YOUTUBE) */
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  /* Pagination (SAME) */
  const PER_PAGE = 6;
  const [page, setPage] = useState(1);

  /* ================= Fetch ================= */
  const fetchProjects = async () => {
    setFetching(true);
    try {
      const res = await axios.get(`${API}/freelance`);
      setProjects(res.data || []);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  /* ================= All Tags ================= */
  const allTags = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => (p.technologies || []).forEach((t) => set.add(t)));
    return ["all", ...Array.from(set)];
  }, [projects]);

  /* ================= Stats ================= */
  const stats = useMemo(() => {
    const total = projects.length;
    const clients = new Set(projects.map((p) => p.clientName)).size;
    const avgRating =
      projects.reduce((a, p) => a + (p.clientRating || 0), 0) /
      (projects.length || 1);

    const latestDate = projects
      .map((p) => (p.createdAt ? new Date(p.createdAt) : null))
      .filter(Boolean)
      .sort((a, b) => b - a)[0];

    return {
      total,
      clients,
      rating: avgRating.toFixed(1),
      latest: latestDate ? latestDate.toLocaleDateString() : "—",
    };
  }, [projects]);

  /* ================= Filtering ================= */
  const filteredProjects = useMemo(() => {
    let list = [...projects];

    if (selectedTag !== "all") {
      list = list.filter((p) => (p.technologies || []).includes(selectedTag));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        [p.title, p.clientName, p.description, ...(p.technologies || [])]
          .join(" ")
          .toLowerCase()
          .includes(q),
      );
    }

    if (sortBy === "latest") {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    if (sortBy === "oldest") {
      list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    if (sortBy === "rating") {
      list.sort((a, b) => (b.clientRating || 0) - (a.clientRating || 0));
    }

    return list;
  }, [projects, search, selectedTag, sortBy]);

  /* Reset page on filter change */
  useEffect(() => setPage(1), [search, selectedTag, sortBy]);

  const totalPages = Math.ceil(filteredProjects.length / PER_PAGE) || 1;

  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filteredProjects.slice(start, start + PER_PAGE);
  }, [filteredProjects, page]);

  /* ================= UI ================= */
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] py-14 px-4 text-white overflow-hidden">
      {/* Glow */}
      <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-indigo-500/25 blur-[130px]" />
      <div className="absolute -bottom-40 -right-40 w-[420px] h-[420px] bg-fuchsia-500/25 blur-[130px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="text-center">
          <p className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/10">
            <BriefcaseIcon className="h-4 w-4" />
            Freelance Portfolio
          </p>

          <h2 className="mt-5 text-4xl sm:text-6xl lg:text-7xl font-black">
            Client{" "}
            <span className="text-indigo-400 drop-shadow-[0_0_25px_rgba(99,102,241,0.35)]">
              Projects
            </span>
            <span className="ml-3 px-3 py-1.5 rounded-full text-xs bg-indigo-500/10 border border-indigo-400/20">
              {stats.total} Projects
            </span>
          </h2>

          <p className="mt-5 text-gray-300 max-w-3xl mx-auto">
            Production-grade freelance work delivered to startups & founders.
          </p>
        </div>

        {/* STATS */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-4 gap-4">
          <StatChip icon={BriefcaseIcon} label="Projects" value={stats.total} />
          <StatChip
            icon={UserGroupIcon}
            label="Clients"
            value={stats.clients}
          />
          <StatChip icon={StarIcon} label="Avg Rating" value={stats.rating} />
          <StatChip
            icon={CalendarDaysIcon}
            label="Latest Work"
            value={stats.latest}
          />
        </div>

        {/* FILTERS (EXACT SAME AS YOUTUBE) */}
        <div className="mt-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-300" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects, clients, tech..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-black/20 border border-white/10 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <FunnelIcon className="h-5 w-5 absolute left-3 top-3 text-gray-300" />
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full sm:w-56 pl-10 pr-4 py-2.5 rounded-2xl bg-black/20 border border-white/10"
                >
                  {allTags.map((t) => (
                    <option key={t} value={t}>
                      {t === "all" ? "All Technologies" : t}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-44 px-4 py-2.5 rounded-2xl bg-black/20 border border-white/10"
              >
                <option value="latest">Sort: Latest</option>
                <option value="oldest">Sort: Oldest</option>
                <option value="rating">Sort: Rating</option>
              </select>

              {/* REFRESH — EXACT SAME */}
              <button
                onClick={fetchProjects}
                disabled={fetching}
                className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold border transition
                  ${
                    fetching
                      ? "bg-white/10 border-white/10 text-gray-400 cursor-not-allowed"
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
        </div>

        {/* CONTENT */}
        <div className="mt-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : paginated.length === 0 ? (
            <div className="text-center mt-10">
              <p className="text-lg font-semibold">No projects found</p>
              <p className="text-sm text-gray-400 mt-2">
                Try adjusting filters or search.
              </p>
            </div>
          ) : (
            <>
              {/* CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((p) => (
                  <Link
                    key={p._id}
                    to={`/freelance/${p._id}`}
                    className="group block"
                  >
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                      {/* Image */}
                      <div className="relative">
                        <img
                          src={p.images?.[0]}
                          alt={p.title}
                          className="w-full h-56 object-cover"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                        {/* VIEW DETAIL BADGE (EXACT LIKE YOUTUBE) */}
                        <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-xs backdrop-blur-md">
                          <BriefcaseIcon className="h-4 w-4 text-indigo-400" />
                          View Details
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-6">
                        <h3 className="text-lg font-extrabold leading-snug line-clamp-2 group-hover:text-indigo-300 transition">
                          {p.title}
                        </h3>

                        <p className="text-xs text-gray-400 mt-2">
                          {p.clientName} • ⭐ {p.clientRating || "N/A"}
                        </p>

                        {p.description && (
                          <p className="text-sm text-gray-300 mt-3 line-clamp-3">
                            {p.description}
                          </p>
                        )}

                        {/* Tags */}
                        {p.technologies?.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {p.technologies.slice(0, 3).map((t, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-white/10 border border-white/10"
                              >
                                <TagIcon className="h-4 w-4" />
                                {t}
                              </span>
                            ))}
                            {p.technologies.length > 3 && (
                              <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/10 border border-white/10">
                                +{p.technologies.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Glow line */}
                      <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500/40 via-fuchsia-500/40 to-purple-500/40 opacity-0 group-hover:opacity-100 transition" />
                    </div>
                  </Link>
                ))}
              </div>

              {/* PAGINATION — SAME PREMIUM */}
              {filteredProjects.length > PER_PAGE && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <button onClick={() => setPage(1)}>
                    <ChevronDoubleLeftIcon className="h-5 w-5" />
                  </button>
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))}>
                    <ChevronLeftIcon className="h-5 w-5" />
                  </button>
                  <span className="px-4">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </button>
                  <button onClick={() => setPage(totalPages)}>
                    <ChevronDoubleRightIcon className="h-5 w-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
