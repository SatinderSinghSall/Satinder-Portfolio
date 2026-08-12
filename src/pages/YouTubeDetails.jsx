import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import toast from "react-hot-toast";

import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  TagIcon,
  LinkIcon,
  PlayCircleIcon,
  SparklesIcon,
  ShareIcon,
  XMarkIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

import { FaYoutube } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "/api";

function getEmbedUrl(url = "") {
  // Supports watch?v=, youtu.be/, shorts/, or direct embed URLs
  const match = url.match(/(?:watch\?v=|youtu\.be\/|shorts\/)([a-zA-Z0-9_-]+)/);
  return match
    ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`
    : url;
}

function getYouTubeId(url = "") {
  const match = url.match(/(?:watch\?v=|youtu\.be\/|shorts\/)([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

export default function YouTubeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Modal State
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError("");

    axios
      .get(`${API}/youtube/${id}`)
      .then((res) => setVideo(res.data))
      .catch((err) => {
        console.error("Failed to fetch video:", err);
        setError("Failed to load video.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Close Modal on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsShareOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const publishedDate = useMemo(() => {
    if (!video?.publishedAt) return null;
    try {
      return new Date(video.publishedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return null;
    }
  }, [video?.publishedAt]);

  const youtubeVideoId = useMemo(() => {
    return getYouTubeId(video?.videoUrl);
  }, [video?.videoUrl]);

  const thumbnailUrl = useMemo(() => {
    if (video?.thumbnail) return video.thumbnail;
    if (youtubeVideoId)
      return `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`;
    return "";
  }, [video?.thumbnail, youtubeVideoId]);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  // Copy Link Action
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  // Social Share Links
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(
    video?.title || "Check out this video!",
  );

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  // Structured Data for Google (VideoObject Schema)
  const schemaData = useMemo(() => {
    if (!video) return null;
    return {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: video.title,
      description: video.description || video.title,
      thumbnailUrl: [thumbnailUrl],
      uploadDate: video.publishedAt || new Date().toISOString(),
      embedUrl: getEmbedUrl(video.videoUrl),
      contentUrl: video.videoUrl,
    };
  }, [video, thumbnailUrl]);

  // Loading State
  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-50 px-4 text-slate-800">
        <div className="text-center space-y-4 animate-pulse">
          <div className="relative w-16 h-16 mx-auto">
            <div className="w-16 h-16 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
            <SparklesIcon className="w-6 h-6 text-indigo-600 absolute inset-0 m-auto" />
          </div>
          <p className="text-lg text-slate-600 font-medium tracking-wide">
            Preparing playback...
          </p>
        </div>
      </section>
    );
  }

  // Error / Not Found State
  if (error || !video) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <Helmet>
          <title>Video Not Found | Portfolio by Satinder Singh Sall</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl shadow-xl p-8 text-center text-slate-800">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
            <PlayCircleIcon className="h-8 w-8 text-red-500" />
          </div>

          <h2 className="text-2xl font-bold mt-6 text-slate-900">
            {error ? "Something went wrong" : "Video Not Found"}
          </h2>

          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            {error ||
              "Sorry, we couldn't find the video you were looking for. It may have been removed or the link is invalid."}
          </p>

          <div className="mt-8">
            <button
              onClick={() => navigate("/youtube")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 transition text-sm font-semibold text-slate-700 shadow-sm active:scale-95 cursor-pointer"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Video Hub
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Dynamic SEO & Social Sharing Metadata */}
      <Helmet>
        <title>
          {`${video.title} | Portfolio Videos by Satinder Singh Sall`}
        </title>
        <meta
          name="description"
          content={video.description?.substring(0, 160) || video.title}
        />
        {video.tags && <meta name="keywords" content={video.tags.join(", ")} />}
        <link rel="canonical" href={currentUrl} />

        {/* Open Graph / Facebook / LinkedIn */}
        <meta property="og:type" content="video.other" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={video.title} />
        <meta
          property="og:description"
          content={video.description?.substring(0, 200) || video.title}
        />
        {thumbnailUrl && <meta property="og:image" content={thumbnailUrl} />}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={video.title} />
        <meta
          name="twitter:description"
          content={video.description?.substring(0, 200) || video.title}
        />
        {thumbnailUrl && <meta name="twitter:image" content={thumbnailUrl} />}

        {/* Structured Data */}
        {schemaData && (
          <script type="application/ld+json">
            {JSON.stringify(schemaData)}
          </script>
        )}
      </Helmet>

      <section className="relative min-h-screen bg-slate-50/50 py-8 sm:py-12 px-4 sm:px-6 text-slate-800 overflow-hidden selection:bg-indigo-500 selection:text-white">
        {/* Background Radial Glow Effect */}
        <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[140px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[140px]" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Top Bar Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition group cursor-pointer"
            >
              <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsShareOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 transition active:scale-95 shadow-sm cursor-pointer"
              >
                <ShareIcon className="h-4 w-4 text-indigo-600" />
                Share
              </button>

              <a
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 border border-red-600 text-white text-xs sm:text-sm font-semibold transition active:scale-95 shadow-md shadow-red-600/15"
              >
                <FaYoutube className="text-base" />
                Watch on YouTube
              </a>
            </div>
          </div>

          {/* Main Content Glass Container */}
          <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden">
            {/* Embedded Video Player */}
            <div className="p-3 sm:p-5">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-black">
                <iframe
                  className="w-full h-full"
                  src={getEmbedUrl(video.videoUrl)}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Video Metadata & Description */}
            <div className="p-6 sm:p-10 pt-2 sm:pt-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {video.title}
              </h1>

              {/* Meta Chips */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                  <UserCircleIcon className="h-4 w-4 text-indigo-600" />
                  {video.author || "Admin"}
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                  <CalendarDaysIcon className="h-4 w-4 text-indigo-600" />
                  {publishedDate || "Recently added"}
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border ${
                    video.status === "published"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      video.status === "published"
                        ? "bg-emerald-500"
                        : "bg-amber-500"
                    }`}
                  />
                  {video.status === "published" ? "Published" : "Draft"}
                </span>
              </div>

              {/* Description Box */}
              {video.description && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Description
                  </h3>
                  <div className="text-slate-600 leading-relaxed text-sm sm:text-base whitespace-pre-line font-normal">
                    {video.description}
                  </div>
                </div>
              )}

              {/* Tags Section */}
              {video.tags?.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <TagIcon className="h-4 w-4 text-indigo-600" />
                    Topics & Tags
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {video.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-indigo-50 border border-indigo-100 text-indigo-700 hover:bg-indigo-100/70 transition cursor-default"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Premium Footer CTA Banner */}
              <div className="mt-10 bg-gradient-to-r from-indigo-50/80 via-purple-50/50 to-slate-50/30 border border-indigo-100 rounded-2xl p-5 sm:p-8 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 text-center sm:text-left">
                {/* Text Content */}
                <div className="space-y-1.5 w-full sm:w-auto">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2">
                    <SparklesIcon className="w-5 h-5 text-indigo-600 shrink-0" />
                    Enjoyed this tutorial?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto sm:mx-0 leading-relaxed">
                    Discover more full-stack projects, code walkthroughs, and
                    technical breakdowns in the video gallery.
                  </p>
                </div>

                {/* Responsive Actions */}
                <div className="flex flex-col xs:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
                  <button
                    onClick={() => setIsShareOpen(true)}
                    className="w-full xs:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition active:scale-95 cursor-pointer shadow-sm"
                  >
                    <ShareIcon className="h-4 w-4 text-indigo-600 shrink-0" />
                    Share
                  </button>

                  <Link
                    to="/youtube"
                    className="w-full xs:w-auto text-center whitespace-nowrap px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 border border-indigo-600 text-white font-semibold text-xs sm:text-sm transition active:scale-95 shadow-md shadow-indigo-600/20"
                  >
                    Browse All Videos →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Share Modal Dialog */}
      {isShareOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[99999] flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsShareOpen(false)}
        >
          <div
            className="relative bg-white border border-slate-200 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-5 text-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between pr-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Share Video
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Spread this project & tutorial across your networks.
                </p>
              </div>
              <button
                onClick={() => setIsShareOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Video Preview Card */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              {thumbnailUrl ? (
                <img
                  src={thumbnailUrl}
                  alt={video.title}
                  className="w-14 h-10 rounded-lg object-cover shrink-0 border border-slate-200"
                />
              ) : (
                <div className="w-14 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                  <PlayCircleIcon className="h-6 w-6" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {video.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  {video.description ||
                    "Video tutorial and technical breakdown."}
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
                className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 text-slate-700 hover:text-emerald-700 transition text-[11px] font-medium"
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
                className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-200 text-slate-700 hover:text-sky-700 transition text-[11px] font-medium"
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
                className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-slate-700 hover:text-blue-700 transition text-[11px] font-medium"
              >
                <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                  <ShareIcon className="h-4 w-4" />
                </div>
                LinkedIn
              </a>

              {/* Facebook */}
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-slate-700 hover:text-indigo-700 transition text-[11px] font-medium"
              >
                <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
                  <ShareIcon className="h-4 w-4" />
                </div>
                Facebook
              </a>
            </div>

            {/* Direct Copy Link Input Bar */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <div className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 truncate font-mono">
                {currentUrl}
              </div>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition shrink-0 cursor-pointer shadow-md shadow-indigo-600/15 active:scale-95"
              >
                {copied ? (
                  <>
                    <CheckIcon className="h-3.5 w-3.5 text-white" />
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
    </>
  );
}
