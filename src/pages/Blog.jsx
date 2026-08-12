import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";

import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ClockIcon,
  ArrowRightIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

const API = import.meta.env.VITE_API_URL || "/api";

function SkeletonCard() {
  return (
    <div
      aria-hidden="true"
      className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm animate-pulse space-y-4 flex flex-col justify-between"
    >
      <div className="space-y-3">
        <div className="h-4 w-24 bg-slate-200 rounded-full" />
        <div className="h-6 w-5/6 bg-slate-200 rounded-md" />
        <div className="h-4 w-full bg-slate-100 rounded-md" />
        <div className="h-4 w-4/5 bg-slate-100 rounded-md" />
      </div>
      <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
        <div className="h-4 w-20 bg-slate-200 rounded-md" />
        <div className="h-4 w-16 bg-slate-200 rounded-md" />
      </div>
    </div>
  );
}

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

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  // UI States
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  // Pagination
  const PER_PAGE = 6;
  const [page, setPage] = useState(1);

  const fetchBlogs = async () => {
    setFetching(true);
    try {
      const res = await axios.get(`${API}/blogs`);

      // Check if res.data is an array, or if it's wrapped inside res.data.data or res.data.blogs
      const dataArray = Array.isArray(res.data)
        ? res.data
        : res.data?.data || res.data?.blogs || [];

      setBlogs(dataArray);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      setBlogs([]); // Fallback to an empty array so it won't crash
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const stats = useMemo(() => {
    const total = blogs.length;
    const authorsSet = new Set(blogs.map((b) => (b.author || "Admin").trim()));
    const latestDate = blogs
      .map((b) => (b.publishedAt ? new Date(b.publishedAt) : null))
      .filter(Boolean)
      .sort((a, b) => b - a)[0];

    return {
      total,
      authors: authorsSet.size,
      latest: latestDate
        ? latestDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "—",
    };
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    // Ensure list is strictly an array
    let list = Array.isArray(blogs) ? [...blogs] : [];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((b) => {
        const title = (b.title || "").toLowerCase();
        const content = (b.content || "").toLowerCase();
        const author = (b.author || "").toLowerCase();
        return title.includes(q) || content.includes(q) || author.includes(q);
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
  }, [blogs, search, sortBy]);

  const totalPages = Math.ceil(filteredBlogs.length / PER_PAGE) || 1;

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const paginatedBlogs = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filteredBlogs.slice(start, start + PER_PAGE);
  }, [filteredBlogs, page]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 antialiased py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      {/* Dynamic SEO Meta Tags */}
      <Helmet>
        <title>Articles & Insights | By - Satinder Singh Sall</title>
        <meta
          name="description"
          content="Read articles and technical tutorials on React, Node.js, Web Development, and Software Engineering by Satinder Singh Sall."
        />
        <link
          rel="canonical"
          href="https://satinder-portfolio.vercel.app/blog"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Articles & Insights | Satinder Singh Sall"
        />
        <meta
          property="og:description"
          content="Explore technical insights on Web Development, Software Engineering, and Modern Tech Stacks."
        />
        <meta property="og:type" content="blog" />
        <meta
          property="og:url"
          content="https://satinder-portfolio.vercel.app/blog"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Articles & Insights | Satinder Singh Sall"
        />
        <meta
          name="twitter:description"
          content="Explore technical insights on Web Development, Software Engineering, and Modern Tech Stacks."
        />
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Section */}
        <header className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700">
            <DocumentTextIcon className="h-4 w-4" />
            <span>Articles & Insights</span>
          </div>

          {/* BIG Headline matching the YouTube hero section */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-slate-900">
            Latest{" "}
            <span className="text-indigo-600 drop-shadow-[0_0_25px_rgba(79,70,229,0.2)]">
              Blog Posts
            </span>
            <span className="ml-3 inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-indigo-50 border border-indigo-200/80 text-indigo-700 align-middle">
              {stats.total} Articles
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Explore articles on modern full-stack development, architectural
            designs, and real-world software engineering insights.
          </p>
        </header>

        {/* Analytics / Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatChip
            icon={DocumentTextIcon}
            label="Total Articles"
            value={stats.total}
          />
          <StatChip
            icon={UserGroupIcon}
            label="Authors"
            value={stats.authors}
          />
          <StatChip
            icon={CalendarDaysIcon}
            label="Last Updated"
            value={stats.latest}
          />
        </div>

        {/* Controls Bar: Search + Sort + Refresh */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, content, or author..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer transition"
            >
              <option value="latest">Sort: Latest</option>
              <option value="oldest">Sort: Oldest</option>
              <option value="title">Sort: Title</option>
            </select>

            <button
              onClick={fetchBlogs}
              disabled={fetching}
              className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all active:scale-95 ${
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

        {/* Results Metadata */}
        <div className="flex justify-between items-center text-xs sm:text-sm text-slate-500 px-1">
          <p>
            Showing{" "}
            <strong className="text-slate-800">{filteredBlogs.length}</strong>{" "}
            result{filteredBlogs.length === 1 ? "" : "s"}
          </p>
          {search.trim() && (
            <button
              onClick={() => {
                setSearch("");
                setSortBy("latest");
              }}
              className="text-indigo-600 hover:text-indigo-800 font-semibold transition"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Blog Posts Grid */}
        <section>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : paginatedBlogs.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-lg mx-auto my-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
                <DocumentTextIcon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                No blog posts found
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                We couldn't find any articles matching your search criteria. Try
                modifying your keywords.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedBlogs.map((blog) => (
                <article key={blog._id}>
                  <Link
                    to={`/blog/${blog._id}`}
                    className="group flex flex-col justify-between h-full bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300"
                  >
                    <div>
                      {/* Category / Badge */}
                      <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-3">
                        <TagIcon className="h-3.5 w-3.5" />
                        <span>Article</span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                        {blog.title}
                      </h2>

                      {/* Snippet / Content */}
                      <p className="text-sm text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                        {blog.content}
                      </p>
                    </div>

                    {/* Post Footer */}
                    <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-700">
                          {blog.author || "Admin"}
                        </span>
                        <span>•</span>
                        <time
                          dateTime={blog.publishedAt}
                          className="flex items-center gap-1"
                        >
                          <ClockIcon className="h-3.5 w-3.5 text-slate-400" />
                          {blog.publishedAt
                            ? new Date(blog.publishedAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )
                            : "Draft"}
                        </time>
                      </div>

                      <span className="inline-flex items-center gap-1 font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
                        Read
                        <ArrowRightIcon className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Pagination Section */}
        {!loading && filteredBlogs.length > PER_PAGE && (
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
