import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
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
  ClockIcon,
  CheckIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const API = import.meta.env.VITE_API_URL || "/api";

function calculateReadingTime(text = "") {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  // Modal States
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`${API}/blogs/${id}`)
      .then((res) => {
        const blogData = res.data?.data || res.data?.blog || res.data;
        setBlog(blogData);
      })
      .catch((err) => {
        console.error("Error fetching blog post:", err);
        setError(
          "Failed to load blog post. It may have been removed or moved.",
        );
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Close Modals on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsImageOpen(false);
        setIsShareOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const readingTime = useMemo(() => {
    return calculateReadingTime(blog?.content || "");
  }, [blog?.content]);

  // Normalizes line breaks for Markdown
  const formattedMarkdown = useMemo(() => {
    if (!blog?.content) return "";

    return blog.content
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/\n/g, "  \n");
  }, [blog?.content]);

  // Copy Link Action
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Article link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  // Social Share Generator Links
  const currentUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(
    blog?.title || "Check out this article!",
  );

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${shareTitle}%20${currentUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentUrl}&text=${shareTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
  };

  if (loading)
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-3xl space-y-6 animate-pulse">
          <div className="h-6 w-32 bg-slate-200 rounded-lg" />
          <div className="h-10 w-3/4 bg-slate-200 rounded-xl" />
          <div className="h-64 w-full bg-slate-200 rounded-2xl" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-slate-200 rounded-md" />
            <div className="h-4 w-5/6 bg-slate-200 rounded-md" />
            <div className="h-4 w-2/3 bg-slate-200 rounded-md" />
          </div>
        </div>
      </main>
    );

  if (error || !blog)
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-8 max-w-md w-full text-center shadow-sm space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
            <XMarkIcon className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Article Not Found
          </h2>
          <p className="text-sm text-slate-600">
            {error || "The article you are looking for does not exist."}
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Articles
          </Link>
        </div>
      </main>
    );

  const metaTitle = `${blog.title} | By - Satinder Singh Sall`;
  const metaDescription =
    blog.summary ||
    blog.content?.slice(0, 160) ||
    "Read technical insights and tutorials by Satinder Singh Sall.";
  const canonicalUrl = `https://satinder-portfolio.vercel.app/blog/${id}`;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 antialiased">
      {/* Dynamic SEO Meta & Social OpenGraph Tags */}
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        {blog.image && <meta property="og:image" content={blog.image} />}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        {blog.image && <meta name="twitter:image" content={blog.image} />}

        {/* Article Schema Microdata */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            description: metaDescription,
            image: blog.image ? [blog.image] : [],
            datePublished: blog.publishedAt || new Date().toISOString(),
            author: {
              "@type": "Person",
              name: blog.author || "Satinder Singh Sall",
            },
          })}
        </script>
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation & Share Button Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition cursor-pointer"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span>Back to Articles</span>
          </button>

          {/* Trigger Share Modal */}
          <button
            onClick={() => setIsShareOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold hover:bg-indigo-100 transition cursor-pointer shadow-xs"
          >
            <ShareIcon className="h-3.5 w-3.5" />
            <span>Share Article</span>
          </button>
        </div>

        {/* Main Article Content Card */}
        <article className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">
          {/* Article Banner Image */}
          {blog.image && (
            <button
              type="button"
              onClick={() => setIsImageOpen(true)}
              className="relative w-full text-left group overflow-hidden bg-slate-100 focus:outline-none"
              title="Click to expand image"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-[240px] sm:h-[360px] md:h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-white/90 border border-slate-200/80 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-md">
                Click to expand
              </div>
            </button>
          )}

          <div className="p-6 sm:p-10 md:p-12 space-y-8">
            {/* Title & Summary */}
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {blog.title}
              </h1>

              {blog.summary && (
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                  {blog.summary}
                </p>
              )}

              {/* Author / Date / Reading Time Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                    <UserCircleIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {blog.author || "Satinder Singh Sall"}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <time
                        dateTime={blog.publishedAt}
                        className="flex items-center gap-1"
                      >
                        <CalendarDaysIcon className="h-3.5 w-3.5 text-slate-400" />
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
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <ClockIcon className="h-3.5 w-3.5 text-slate-400" />
                        {readingTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                      blog.status === "published"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {blog.status ? blog.status.toUpperCase() : "PUBLISHED"}
                  </span>

                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full border bg-slate-50 text-slate-600 border-slate-200">
                    {blog.editorType === "markdown" ? "Markdown" : "Rich Text"}
                  </span>
                </div>
              </div>

              {/* Tags */}
              {blog.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {blog.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/60 text-slate-600"
                    >
                      <TagIcon className="h-3.5 w-3.5 text-slate-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Content Body */}
            <div className="pt-6 border-t border-slate-100">
              {blog.editorType === "markdown" ? (
                <div className="prose prose-slate max-w-none leading-relaxed text-slate-700 text-base">
                  <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                    {formattedMarkdown}
                  </ReactMarkdown>
                </div>
              ) : (
                <EditorBlocksRenderer data={blog.contentBlocks} />
              )}
            </div>

            {/* Footer Sign-off Banner */}
            <div className="mt-12 bg-indigo-50/60 border border-indigo-100 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  Enjoyed this article?
                </h3>
                <p className="text-sm text-slate-600">
                  Spread the knowledge across your favorite social networks and
                  professional platforms.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => setIsShareOpen(true)}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition shadow-sm active:scale-95 cursor-pointer"
                >
                  <ShareIcon className="h-4 w-4" />
                  Share Article
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Modern Share Modal Dialog */}
      {isShareOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[99999] flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsShareOpen(false)}
        >
          <div
            className="relative bg-white border border-slate-200/90 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between pr-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Share this Story
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Spread insights across your developer networks.
                </p>
              </div>
              <button
                onClick={() => setIsShareOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Article Preview Card */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
              {blog?.image ? (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-12 h-12 rounded-lg object-cover shrink-0"
                />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                  <DocumentTextIcon className="h-6 w-6" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {blog?.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  {blog?.summary || "Technical insights by Satinder Singh Sall"}
                </p>
              </div>
            </div>

            {/* Social Share Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {/* WhatsApp */}
              <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 text-slate-600 hover:text-emerald-700 hover:border-emerald-200 transition text-[11px] font-medium"
              >
                <div className="p-2 rounded-full bg-emerald-100 text-emerald-600">
                  <ShareIcon className="h-4 w-4" />
                </div>
                WhatsApp
              </a>

              {/* Twitter / X */}
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 text-slate-600 hover:text-sky-600 hover:border-sky-200 transition text-[11px] font-medium"
              >
                <div className="p-2 rounded-full bg-sky-100 text-sky-600">
                  <ShareIcon className="h-4 w-4" />
                </div>
                X (Twitter)
              </a>

              {/* LinkedIn */}
              <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 text-slate-600 hover:text-blue-700 hover:border-blue-200 transition text-[11px] font-medium"
              >
                <div className="p-2 rounded-full bg-blue-100 text-blue-700">
                  <ShareIcon className="h-4 w-4" />
                </div>
                LinkedIn
              </a>

              {/* Facebook */}
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200/80 text-slate-600 hover:text-indigo-700 hover:border-indigo-200 transition text-[11px] font-medium"
              >
                <div className="p-2 rounded-full bg-indigo-100 text-indigo-700">
                  <ShareIcon className="h-4 w-4" />
                </div>
                Facebook
              </a>
            </div>

            {/* Direct Copy Bar */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <div className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 truncate font-mono">
                {window.location.href}
              </div>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition shrink-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <CheckIcon className="h-3.5 w-3.5 text-emerald-300" />
                    Copied
                  </>
                ) : (
                  <>
                    <LinkIcon className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Image Preview Modal */}
      {isImageOpen && blog.image && (
        <div
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[99999] flex items-center justify-center p-4"
          onClick={() => setIsImageOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsImageOpen(false)}
              className="absolute -top-4 -right-4 bg-white text-slate-700 hover:text-slate-900 rounded-full p-2 shadow-md transition cursor-pointer"
              title="Close"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            <img
              src={blog.image}
              alt={blog.title}
              className="w-full max-h-[85vh] object-contain rounded-2xl border border-slate-200 shadow-2xl bg-white"
            />
          </div>
        </div>
      )}
    </main>
  );
}
