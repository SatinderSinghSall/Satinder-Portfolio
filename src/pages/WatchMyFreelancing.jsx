import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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
} from "@heroicons/react/24/outline";

const API = import.meta.env.VITE_API_URL || "/api";

/* ================= Skeleton Card ================= */
function SkeletonCard() {
  return (
    <div
      aria-hidden="true"
      className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm animate-pulse flex flex-col justify-between"
    >
      <div className="h-56 bg-slate-200" />
      <div className="p-6 space-y-4">
        <div className="h-5 w-4/5 bg-slate-200 rounded-md" />
        <div className="h-4 w-2/5 bg-slate-200 rounded-md" />
        <div className="h-4 w-full bg-slate-100 rounded-md" />
      </div>
      <div className="p-6 pt-0 flex gap-2">
        <div className="h-6 w-16 bg-slate-100 rounded-full" />
        <div className="h-6 w-16 bg-slate-100 rounded-full" />
      </div>
    </div>
  );
}

/* ================= Stat Chip ================= */
function StatChip({ icon: Icon, label, value }) {
  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="h-12 w-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-xl font-bold text-slate-900 mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export default function WatchMyFreelancing() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  /* UI State */
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  /* Pagination */
  const PER_PAGE = 6;
  const [page, setPage] = useState(1);

  /* ================= Fetch ================= */
  const fetchProjects = async () => {
    setFetching(true);
    try {
      const res = await axios.get(`${API}/freelance`);
      const dataArray = Array.isArray(res.data)
        ? res.data
        : res.data?.data || res.data?.projects || [];
      setProjects(dataArray);
    } catch (err) {
      console.error("Failed to fetch projects", err);
      setProjects([]);
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
      latest: latestDate
        ? latestDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "—",
    };
  }, [projects]);

  /* ================= Filtering ================= */
  const filteredProjects = useMemo(() => {
    let list = Array.isArray(projects) ? [...projects] : [];

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
      list.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
      );
    }
    if (sortBy === "oldest") {
      list.sort(
        (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0),
      );
    }
    if (sortBy === "rating") {
      list.sort((a, b) => (b.clientRating || 0) - (a.clientRating || 0));
    }

    return list;
  }, [projects, search, selectedTag, sortBy]);

  /* Reset page on filter change */
  useEffect(() => setPage(1), [search, selectedTag, sortBy]);

  const totalPages = Math.ceil(filteredProjects.length / PER_PAGE) || 1;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filteredProjects.slice(start, start + PER_PAGE);
  }, [filteredProjects, page]);

  /* ================= UI ================= */
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 antialiased py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      {/* Dynamic SEO Meta Tags */}
      <Helmet>
        <title>Freelance Projects & Client Work | Satinder Singh Sall</title>
        <meta
          name="description"
          content="Browse production-grade freelance projects, custom web applications, and software engineering solutions delivered for startups and global clients."
        />
        <link
          rel="canonical"
          href="https://satinder-portfolio.vercel.app/freelance"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Freelance Projects & Client Work | Satinder Singh Sall"
        />
        <meta
          property="og:description"
          content="Production-grade freelance work delivered to startups & founders."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://satinder-portfolio.vercel.app/freelance"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Freelance Projects & Client Work | Satinder Singh Sall"
        />
        <meta
          name="twitter:description"
          content="Production-grade freelance work delivered to startups & founders."
        />
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-10">
        {/* HEADER SECTION */}
        <header className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700">
            <BriefcaseIcon className="h-4 w-4" />
            <span>Freelance Portfolio</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-slate-900">
            Client{" "}
            <span className="text-indigo-600 drop-shadow-[0_0_25px_rgba(79,70,229,0.2)]">
              Projects
            </span>
            <span className="ml-3 inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-indigo-50 border border-indigo-200/80 text-indigo-700 align-middle">
              {stats.total} Projects
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Production-grade freelance work delivered to startups & founders.
          </p>
        </header>

        {/* STATS BAR */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
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

        {/* CONTROLS BAR: SEARCH + FILTERS + SORT + REFRESH */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-3 lg:space-y-0 lg:flex lg:items-center lg:gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects, clients, tech..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          {/* Controls Group */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Tag Filter */}
            <div className="relative w-full sm:w-auto">
              <FunnelIcon className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full sm:w-52 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer transition"
              >
                {allTags.map((t) => (
                  <option key={t} value={t}>
                    {t === "all" ? "All Technologies" : t}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer transition"
            >
              <option value="latest">Sort: Latest</option>
              <option value="oldest">Sort: Oldest</option>
              <option value="rating">Sort: Rating</option>
            </select>

            {/* Refresh */}
            <button
              onClick={fetchProjects}
              disabled={fetching}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all active:scale-95 ${
                fetching
                  ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm"
              }`}
            >
              <ArrowPathIcon
                className={`h-4 w-4 ${fetching ? "animate-spin text-indigo-600" : "text-slate-500"}`}
              />
              <span className="hidden sm:inline">
                {fetching ? "Syncing..." : "Refresh"}
              </span>
            </button>
          </div>
        </div>

        {/* RESULTS METADATA */}
        <div className="flex justify-between items-center text-xs sm:text-sm text-slate-500 px-1">
          <p>
            Showing{" "}
            <strong className="text-slate-800">
              {filteredProjects.length}
            </strong>{" "}
            result{filteredProjects.length === 1 ? "" : "s"}
          </p>
          {(search.trim() || selectedTag !== "all" || sortBy !== "latest") && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedTag("all");
                setSortBy("latest");
              }}
              className="text-indigo-600 hover:text-indigo-800 font-semibold transition"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* PROJECT GRID */}
        <section>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : paginated.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-lg mx-auto my-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
                <BriefcaseIcon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                No projects found
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                We couldn't find any freelance projects matching your search or
                filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((p) => (
                <article key={p._id}>
                  <Link
                    to={`/freelance/${p._id}`}
                    className="group flex flex-col justify-between h-full bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300"
                  >
                    <div>
                      {/* Image Thumbnail Header */}
                      <div className="relative h-48 sm:h-52 w-full bg-slate-100 overflow-hidden">
                        <img
                          src={p.images?.[0] || "/placeholder-project.jpg"}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                        {/* View Badge overlay */}
                        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-800 text-xs font-semibold shadow-sm">
                          <BriefcaseIcon className="h-3.5 w-3.5 text-indigo-600" />
                          <span>View Details</span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-6">
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                          <span className="font-semibold text-slate-700">
                            {p.clientName || "Direct Client"}
                          </span>
                          <span className="inline-flex items-center gap-1 font-semibold text-amber-600">
                            ⭐{" "}
                            {p.clientRating ? p.clientRating.toFixed(1) : "N/A"}
                          </span>
                        </div>

                        <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                          {p.title}
                        </h2>

                        {p.description && (
                          <p className="text-sm text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                            {p.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Tech Badges Footer */}
                    <div className="px-6 pb-6 pt-2">
                      {p.technologies?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {p.technologies.slice(0, 3).map((t, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100"
                            >
                              <TagIcon className="h-3 w-3" />
                              {t}
                            </span>
                          ))}
                          {p.technologies.length > 3 && (
                            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                              +{p.technologies.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* PAGINATION */}
        {!loading && filteredProjects.length > PER_PAGE && (
          <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              Page <strong className="text-slate-800">{page}</strong> of{" "}
              <strong className="text-slate-800">{totalPages}</strong>
            </p>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage(1)}
                disabled={page === 1}
                aria-label="First page"
                className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronDoubleLeftIcon className="h-4 w-4" />
              </button>

              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRightIcon className="h-4 w-4" />
              </button>

              <button
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                aria-label="Last page"
                className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronDoubleRightIcon className="h-4 w-4" />
              </button>
            </div>
          </nav>
        )}
      </div>
    </main>
  );
}
