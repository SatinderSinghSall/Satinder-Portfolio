import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  TagIcon,
  LinkIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";

import { FaYoutube } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "/api";

function getEmbedUrl(url = "") {
  // supports: watch?v=xxxx OR youtu.be/xxxx OR already embed url
  const match = url.match(/(?:watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

export default function YouTubeDetails() {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const publishedDate = useMemo(() => {
    if (!video?.publishedAt) return null;
    try {
      return new Date(video.publishedAt).toLocaleDateString();
    } catch {
      return null;
    }
  }, [video?.publishedAt]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  // ✅ Loading
  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 text-white">
        <div className="text-center space-y-4 animate-pulse">
          <div className="w-14 h-14 rounded-full border-4 border-white/20 border-t-white animate-spin mx-auto" />
          <p className="text-lg text-gray-200 font-semibold">
            Loading video...
          </p>
        </div>
      </section>
    );
  }

  // ❌ Error / Not Found
  if (error || !video) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
        <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 text-center text-white">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-red-500/10 border border-red-400/20 flex items-center justify-center">
            <PlayCircleIcon className="h-7 w-7 text-red-300" />
          </div>

          <h2 className="text-2xl font-bold mt-5">
            {error ? "Something went wrong" : "Video Not Found"}
          </h2>

          <p className="text-sm text-gray-300 mt-2 leading-relaxed">
            {error ||
              "Sorry, we couldn’t find the video you’re looking for. It may have been removed or the link is broken."}
          </p>

          <div className="mt-6">
            <Link
              to="/youtube"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition text-sm font-semibold"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Videos
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] py-10 sm:py-14 px-4 sm:px-6 text-white overflow-hidden">
      {/* Premium background glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full bg-indigo-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[420px] h-[420px] rounded-full bg-fuchsia-500/20 blur-[120px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Top Bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
          <Link
            to="/youtube"
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Videos
          </Link>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-xs sm:text-sm transition active:scale-[0.98]"
            >
              <LinkIcon className="h-4 w-4" />
              Copy Link
            </button>

            <a
              href={video.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 border border-red-500/30 text-xs sm:text-sm transition active:scale-[0.98]"
            >
              <FaYoutube className="text-base" />
              Watch on YouTube
            </a>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          {/* Video Player */}
          <div className="p-4 sm:p-6">
            <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-black">
              <iframe
                className="w-full h-full"
                src={getEmbedUrl(video.videoUrl)}
                title={video.title}
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-8 sm:px-10 sm:pb-10">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
              {video.title}
            </h1>

            {/* Meta Chips */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-gray-200 border border-white/10">
                <UserCircleIcon className="h-4 w-4" />
                {video.author || "Admin"}
              </span>

              <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-200 border border-indigo-400/20">
                <CalendarDaysIcon className="h-4 w-4" />
                {publishedDate || "Not published"}
              </span>

              <span
                className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full border
                ${
                  video.status === "published"
                    ? "bg-green-500/10 text-green-200 border-green-400/20"
                    : "bg-yellow-500/10 text-yellow-200 border-yellow-400/20"
                }`}
              >
                {video.status === "published" ? "PUBLISHED" : "DRAFT"}
              </span>
            </div>

            {/* Description */}
            {video.description && (
              <div className="mt-6 text-gray-200/90 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {video.description}
              </div>
            )}

            {/* Tags */}
            {video.tags?.length > 0 && (
              <div className="mt-8">
                <p className="text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
                  <TagIcon className="h-5 w-5 text-gray-300" />
                  Tags
                </p>

                <div className="flex flex-wrap gap-2">
                  {video.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/10 text-gray-100 hover:bg-white/15 hover:border-white/20 transition"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Footer */}
            <div className="mt-10 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold">Enjoyed this video?</h3>
                <p className="text-sm text-gray-300 mt-1">
                  Explore more YouTube content and tutorials from my library.
                </p>
              </div>

              <Link
                to="/youtube"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition text-sm font-semibold"
              >
                Browse All Videos →
              </Link>
            </div>
          </div>
        </div>

        <div className="h-10" />
      </div>
    </section>
  );
}
