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
          ) : filteredVideos.length === 0 ? (
            <div className="text-center mt-10">
              <p className="text-lg font-semibold text-gray-200">
                No videos found
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Try searching with different keywords or clear filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
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
          )}
        </div>

        <div className="h-10" />
      </div>
    </section>
  );
}
