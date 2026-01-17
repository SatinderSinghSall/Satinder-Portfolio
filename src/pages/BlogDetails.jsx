import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import toast from "react-hot-toast";

import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  TagIcon,
  ShareIcon,
  LinkIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import EditorBlocksRenderer from "../components/EditorBlocksRenderer";

const API = import.meta.env.VITE_API_URL || "/api";

function calculateReadingTime(text = "") {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export default function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Image Preview Modal
  const [isImageOpen, setIsImageOpen] = useState(false);

  const readingTime = useMemo(() => {
    return calculateReadingTime(blog?.content || "");
  }, [blog?.content]);

  // ✅ FIX: Works for ALL line breaks (Windows/Mac/Linux)
  const formattedMarkdown = useMemo(() => {
    if (!blog?.content) return "";

    return blog.content
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/\n/g, "  \n");
  }, [blog?.content]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`${API}/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog post.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  // ✅ Close modal on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsImageOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const shareTo = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(blog?.title || "Blog Post");

    let shareUrl = "";
    if (platform === "twitter")
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
    if (platform === "linkedin")
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;

    if (shareUrl) window.open(shareUrl, "_blank");
  };

  if (loading)
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white text-lg animate-pulse px-4 text-center">
        Loading blog post...
      </section>
    );

  if (error)
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-red-400 text-lg px-4 text-center">
        {error}
      </section>
    );

  if (!blog)
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-gray-300 text-lg px-4 text-center">
        Blog not found.
      </section>
    );

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] py-10 sm:py-14 px-4 sm:px-6 text-white">
      <div className="max-w-5xl mx-auto">
        {/* ✅ Responsive Top bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Blogs
          </Link>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-xs sm:text-sm transition"
            >
              <LinkIcon className="h-4 w-4" />
              Copy
            </button>

            <button
              onClick={() => shareTo("twitter")}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-xs sm:text-sm transition"
            >
              <ShareIcon className="h-4 w-4" />
              Tweet
            </button>

            <button
              onClick={() => shareTo("linkedin")}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-xs sm:text-sm transition"
            >
              <ShareIcon className="h-4 w-4" />
              LinkedIn
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          {/* ✅ Responsive Hero Image + Click to open modal */}
          {blog.image && (
            <button
              type="button"
              onClick={() => setIsImageOpen(true)}
              className="relative w-full text-left group"
              title="Click to view full image"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-[200px] sm:h-[260px] md:h-[320px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* hint */}
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-xs text-gray-200 backdrop-blur-md">
                Click to expand
              </div>
            </button>
          )}

          <div className="p-6 sm:p-8 md:p-10">
            {/* ✅ Responsive Title */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight">
              {blog.title}
            </h1>

            {/* Summary */}
            {blog.summary && (
              <p className="text-sm sm:text-base md:text-lg text-gray-200/90 mt-4 leading-relaxed">
                {blog.summary}
              </p>
            )}

            {/* ✅ Responsive Meta */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6 border-t border-white/10 pt-6">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                  <UserCircleIcon className="h-7 w-7 text-gray-200" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    {blog.author || "Admin"}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-300">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDaysIcon className="h-4 w-4" />
                      {blog.publishedAt
                        ? new Date(blog.publishedAt).toLocaleDateString()
                        : "Not published"}
                    </span>
                    <span className="opacity-40 hidden sm:inline">•</span>
                    <span>{readingTime}</span>
                  </div>
                </div>
              </div>

              {/* Chips */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                    blog.status === "published"
                      ? "bg-green-500/10 text-green-300 border-green-400/20"
                      : "bg-yellow-500/10 text-yellow-300 border-yellow-400/20"
                  }`}
                >
                  {blog.status?.toUpperCase()}
                </span>

                <span className="text-xs font-semibold px-3 py-1 rounded-full border bg-indigo-500/10 text-indigo-200 border-indigo-400/20">
                  {blog.editorType === "markdown"
                    ? "Markdown"
                    : "Notion Editor"}
                </span>
              </div>
            </div>

            {/* Tags */}
            {blog.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10 text-gray-200 hover:bg-white/15 transition"
                  >
                    <TagIcon className="h-4 w-4" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="mt-8">
              {blog.editorType === "markdown" ? (
                <div className="prose prose-invert max-w-none leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                  <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                    {formattedMarkdown}
                  </ReactMarkdown>
                </div>
              ) : (
                <EditorBlocksRenderer data={blog.contentBlocks} />
              )}
            </div>

            {/* ✅ Responsive CTA */}
            <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold">Want to stay updated?</h3>
                <p className="text-sm text-gray-300 mt-1">
                  Get product updates, dev tips & growth insights in your inbox.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <input
                  placeholder="Enter your email"
                  className="w-full sm:w-64 px-4 py-2.5 rounded-xl bg-black/20 border border-white/10 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition text-sm font-semibold">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="h-10" />
      </div>

      {/* ✅ Full Image Modal */}
      {isImageOpen && blog.image && (
        <div
          className="fixed inset-0 bg-black/80 z-[99999] flex items-center justify-center p-4"
          onClick={() => setIsImageOpen(false)}
        >
          <div
            className="relative max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsImageOpen(false)}
              className="absolute -top-4 -right-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full p-2 transition"
              title="Close"
            >
              <XMarkIcon className="h-6 w-6 text-white" />
            </button>

            <img
              src={blog.image}
              alt={blog.title}
              className="w-full max-h-[85vh] object-contain rounded-2xl border border-white/10 shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
