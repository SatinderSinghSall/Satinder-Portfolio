import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  ArrowLeftIcon,
  LinkIcon,
  ShareIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  TagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const API = import.meta.env.VITE_API_URL || "/api";

export default function ProjectDetail() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Image Preview Modal
  const [isImageOpen, setIsImageOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError("");

    axios
      .get(`${API}/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch((err) => {
        console.error("Failed to fetch project:", err);
        setError("Failed to load project.");
      })
      .finally(() => setLoading(false));
  }, [id]);

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
    const title = encodeURIComponent(project?.title || "Project");

    let shareUrl = "";
    if (platform === "twitter")
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
    if (platform === "linkedin")
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;

    if (shareUrl) window.open(shareUrl, "_blank");
  };

  const descriptionLines = useMemo(() => {
    if (!project?.description) return [];
    return project.description.split("\n").filter(Boolean);
  }, [project?.description]);

  // ✅ Close modal on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsImageOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ✅ Loading
  if (loading)
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
        <div className="text-center space-y-4 animate-pulse">
          <div className="w-14 h-14 rounded-full border-4 border-white/20 border-t-white animate-spin mx-auto" />
          <p className="text-lg text-gray-200 font-semibold">
            Loading project...
          </p>
        </div>
      </section>
    );

  // ❌ Error
  if (error)
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-red-300 text-lg px-6 text-center">
        {error}
      </section>
    );

  // ❌ Not Found
  if (!project)
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-gray-300 text-lg px-6 text-center">
        Project not found.
      </section>
    );

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] py-10 sm:py-14 px-4 sm:px-6 text-white overflow-hidden">
      {/* ✅ Premium background glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full bg-indigo-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[420px] h-[420px] rounded-full bg-fuchsia-500/20 blur-[120px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* ✅ Responsive Top Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Projects
          </Link>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-xs sm:text-sm transition active:scale-[0.98]"
            >
              <LinkIcon className="h-4 w-4" />
              Copy
            </button>

            <button
              onClick={() => shareTo("twitter")}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-xs sm:text-sm transition active:scale-[0.98]"
            >
              <ShareIcon className="h-4 w-4" />
              Tweet
            </button>

            <button
              onClick={() => shareTo("linkedin")}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-xs sm:text-sm transition active:scale-[0.98]"
            >
              <ShareIcon className="h-4 w-4" />
              LinkedIn
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          {/* Hero Image */}
          {project.image && (
            <button
              type="button"
              onClick={() => setIsImageOpen(true)}
              className="relative w-full text-left group"
              title="Click to view full image"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[200px] sm:h-[260px] md:h-[320px] object-cover"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* border shine */}
              <div className="absolute inset-0 ring-1 ring-white/10 group-hover:ring-white/20 transition" />

              {/* hint */}
              <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-[11px] sm:text-xs text-gray-200 backdrop-blur-md">
                Click to expand
              </div>
            </button>
          )}

          <div className="p-6 sm:p-8 md:p-10">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
              {project.title}
            </h1>

            {/* Meta Chips */}
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-200 border border-indigo-400/20">
                <TagIcon className="h-4 w-4" />
                {project.technologies?.length || 0} Technologies
              </span>

              {project.link && (
                <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-green-500/10 text-green-200 border border-green-400/20">
                  <GlobeAltIcon className="h-4 w-4" />
                  Live Available
                </span>
              )}

              {project.githubLink && (
                <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-gray-200 border border-white/10">
                  <CodeBracketIcon className="h-4 w-4" />
                  Open Source
                </span>
              )}
            </div>

            {/* Description */}
            {descriptionLines.length > 0 && (
              <div className="mt-6 space-y-4 text-gray-200/90 leading-relaxed">
                {descriptionLines.map((line, idx) => (
                  <p
                    key={idx}
                    className="text-[14px] sm:text-[15px] md:text-base leading-7 sm:leading-8"
                  >
                    {line}
                  </p>
                ))}
              </div>
            )}

            {/* Tech Stack */}
            {project.technologies?.length > 0 && (
              <div className="mt-8">
                <p className="text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
                  <TagIcon className="h-5 w-5 text-gray-300" />
                  Tech Stack
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/10 text-gray-100 hover:bg-white/15 hover:border-white/20 transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition text-sm font-semibold active:scale-[0.98] w-full sm:w-auto"
                >
                  <GlobeAltIcon className="h-5 w-5" />
                  Visit Live Project
                </a>
              )}

              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition text-sm font-semibold active:scale-[0.98] w-full sm:w-auto"
                >
                  <CodeBracketIcon className="h-5 w-5" />
                  View GitHub Code
                </a>
              )}
            </div>

            {/* CTA */}
            <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold">Want more projects?</h3>
                <p className="text-sm text-gray-300 mt-1">
                  Explore more builds, SaaS ideas, and real-world dev work.
                </p>
              </div>

              <Link
                to="/projects"
                className="w-full md:w-auto text-center px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition text-sm font-semibold"
              >
                Browse All Projects →
              </Link>
            </div>
          </div>
        </div>

        <div className="h-10" />
      </div>

      {/* ✅ Full Image Modal */}
      {isImageOpen && (
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
              src={project.image}
              alt={project.title}
              className="w-full max-h-[75vh] sm:max-h-[85vh] object-contain rounded-2xl border border-white/10 shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
