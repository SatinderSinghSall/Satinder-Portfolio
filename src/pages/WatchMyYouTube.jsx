import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  FunnelIcon,
  VideoCameraIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  TagIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

import { FaYoutube } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "/api";

function SkeletonCard() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden animate-pulse">
      <div className="h-52 bg-white/10" />
      <div className="p-6 space-y-4">
        <div className="h-5 w-4/5 bg-white/10 rounded-md" />
        <div className="h-4 w-2/5 bg-white/10 rounded-md" />
        <div className="h-4 w-full bg-white/10 rounded-md" />
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

export default function WatchMyYouTube() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  // UI
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  // ✅ Pagination
  const PER_PAGE = 6;
  const [page, setPage] = useState(1);

  const fetchVideos = async () => {
    setFetching(true);
    try {
      const res = await axios.get(`${API}/youtube?status=published`);
      setVideos(res.data || []);
    } catch (err) {
      console.error("Failed to fetch videos:", err);
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const allTags = useMemo(() => {
    const set = new Set();
    videos.forEach((v) => (v.tags || []).forEach((t) => set.add(t)));
    return ["all", ...Array.from(set)];
  }, [videos]);

  const stats = useMemo(() => {
    const total = videos.length;

    const authorsSet = new Set(videos.map((v) => (v.author || "Admin").trim()));

    const latestDate = videos
      .map((v) => (v.publishedAt ? new Date(v.publishedAt) : null))
      .filter(Boolean)
      .sort((a, b) => b - a)[0];

    return {
      total,
      authors: authorsSet.size,
      latest: latestDate ? latestDate.toLocaleDateString() : "—",
    };
  }, [videos]);

  const filteredVideos = useMemo(() => {
    let list = [...videos];

    if (selectedTag !== "all") {
      list = list.filter((v) => (v.tags || []).includes(selectedTag));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((v) => {
        const title = (v.title || "").toLowerCase();
        const desc = (v.description || "").toLowerCase();
        const author = (v.author || "").toLowerCase();
        const tags = (v.tags || []).join(" ").toLowerCase();
        return (
          title.includes(q) ||
          desc.includes(q) ||
          author.includes(q) ||
          tags.includes(q)
        );
      });
    }

    if (sortBy === "latest") {
      list.sort(
        (a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0),
      );
    }
    if (sortBy === "oldest") {
      list.sort(
        (a, b) => new Date(a.publishedAt || 0) - new Date(b.publishedAt || 0),
      );
    }
    if (sortBy === "title") {
      list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    }

    return list;
  }, [videos, selectedTag, search, sortBy]);

  // ✅ Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, selectedTag, sortBy]);

  // ✅ Pagination calculations
  const totalPages = Math.ceil(filteredVideos.length / PER_PAGE) || 1;

  // If page becomes invalid after filtering, fix it
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  // ✅ Smooth scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const paginatedVideos = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filteredVideos.slice(start, start + PER_PAGE);
  }, [filteredVideos, page]);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] py-14 sm:py-20 px-4 sm:px-6 text-white overflow-hidden">
      {/* Premium glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full bg-indigo-500/25 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[420px] h-[420px] rounded-full bg-fuchsia-500/25 blur-[130px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-10">
          <div className="text-center">
            {/* SaaS badge */}
            <div className="flex justify-center">
              <p className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-gray-200 backdrop-blur-md">
                <VideoCameraIcon className="h-4 w-4" />
                Video Library
              </p>
            </div>

            {/* BIG Heading */}
            <h2 className="mt-5 text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
              Watch{" "}
              <span className="text-red-500 drop-shadow-[0_0_25px_rgba(239,68,68,0.35)]">
                My YouTube
              </span>
              <span className="ml-3 inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-red-500/10 border border-red-400/20 text-red-200 align-middle">
                {stats.total} Videos
              </span>
            </h2>

            <p className="mt-5 text-gray-300 text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed">
              Explore curated content on web development, tech insights, mobile
              app development, DSA, and tutorials — crafted for modern devs.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatChip
              icon={VideoCameraIcon}
              label="Total Videos"
              value={stats.total}
            />
            <StatChip
              icon={UserGroupIcon}
              label="Unique Authors"
              value={stats.authors}
            />
            <StatChip
              icon={CalendarDaysIcon}
              label="Latest Publish"
              value={stats.latest}
            />
          </div>

          {/* Controls */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
              {/* Search */}
              <div className="relative flex-1">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-300" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search videos by title, tags, author..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-black/20 border border-white/10 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <FunnelIcon className="h-5 w-5 absolute left-3 top-3 text-gray-300" />
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="w-full sm:w-56 pl-10 pr-4 py-2.5 rounded-2xl bg-black/20 border border-white/10 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {allTags.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag === "all" ? "All Tags" : tag}
                      </option>
                    ))}
                  </select>
                </div>

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
                  onClick={fetchVideos}
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

            {/* Results count */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-300">
              <p>
                Showing{" "}
                <span className="text-white font-semibold">
                  {filteredVideos.length}
                </span>{" "}
                results
              </p>

              {(search.trim() || selectedTag !== "all") && (
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedTag("all");
                    setSortBy("latest");
                  }}
                  className="text-indigo-200 hover:text-white transition font-semibold"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : paginatedVideos.length === 0 ? (
            <div className="text-center mt-10">
              <p className="text-lg font-semibold text-gray-200">
                No videos found
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Try searching with different keywords or clear filters.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedVideos.map((video) => (
                  <Link
                    key={video._id}
                    to={`/youtube/${video._id}`}
                    className="group block"
                  >
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-white/20">
                      {/* Thumbnail */}
                      <div className="relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-56 object-cover"
                          loading="lazy"
                        />

                        {/* overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                        {/* play badge */}
                        <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-xs text-gray-200 backdrop-blur-md">
                          <FaYoutube className="text-red-400" />
                          Watch Now
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-6">
                        <h3 className="text-lg font-extrabold leading-snug group-hover:text-red-300 transition-colors line-clamp-2">
                          {video.title}
                        </h3>

                        <p className="text-xs text-gray-400 mt-2">
                          By {video.author || "Satinder"} •{" "}
                          {video.publishedAt
                            ? new Date(video.publishedAt).toLocaleDateString()
                            : "Not published"}
                        </p>

                        {video.description && (
                          <p className="text-sm text-gray-300 mt-3 leading-relaxed line-clamp-3">
                            {video.description}
                          </p>
                        )}

                        {/* Tags */}
                        {video.tags?.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {video.tags.slice(0, 3).map((tag, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-gray-200"
                              >
                                <TagIcon className="h-4 w-4" />
                                {tag}
                              </span>
                            ))}

                            {video.tags.length > 3 && (
                              <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-gray-200">
                                +{video.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* bottom glow line */}
                      <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500/40 via-fuchsia-500/40 to-red-500/40 opacity-0 group-hover:opacity-100 transition" />
                    </div>
                  </Link>
                ))}
              </div>

              {/* ✅ Premium SaaS Pagination */}
              {filteredVideos.length > PER_PAGE && (
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
                      Showing {PER_PAGE} videos per page
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
