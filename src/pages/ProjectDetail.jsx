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
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

const API = import.meta.env.VITE_API_URL || "/api";
const SITE_URL = window.location.origin;

// Dynamic SEO Injector
function SEO({ title, description, keywords, image }) {
  useEffect(() => {
    document.title = title;

    const setMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywords);

    // Open Graph
    setMetaTag("property", "og:type", "article");
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:image", image);
    setMetaTag("property", "og:url", window.location.href);

    // Twitter Cards
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", image);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.href);
  }, [title, description, keywords, image]);

  return null;
}

export default function ProjectDetail() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImage, setCurrentImage] = useState(0);

  // Modals state
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const defaultImage =
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f";

  const nextImage = (e) => {
    e?.stopPropagation();
    if (!project?.images?.length) return;
    setCurrentImage((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    if (!project?.images?.length) return;
    setCurrentImage((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1,
    );
  };

  useEffect(() => {
    setLoading(true);
    setError("");

    axios
      .get(`${API}/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch((err) => {
        console.error("Failed to fetch project:", err);
        setError("Failed to load project details.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  const shareTo = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(
      project?.title || "Check out this project",
    );

    if (platform === "native") {
      if (navigator.share) {
        navigator
          .share({
            title: project?.title,
            text: project?.description?.slice(0, 100),
            url: window.location.href,
          })
          .catch(() => {});
        return;
      } else {
        handleCopyLink();
        return;
      }
    }

    let shareUrl = "";
    if (platform === "twitter")
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
    if (platform === "linkedin")
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    if (platform === "whatsapp")
      shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
    if (platform === "facebook")
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    if (platform === "reddit")
      shareUrl = `https://reddit.com/submit?url=${url}&title=${title}`;

    if (shareUrl) window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const descriptionLines = useMemo(() => {
    if (!project?.description) return [];
    return project.description.split("\n").filter(Boolean);
  }, [project?.description]);

  // Handle ESC key to close open modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsImageOpen(false);
        setIsShareModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Schema.org Structured Data
  const structuredData = useMemo(() => {
    if (!project) return null;
    return {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      name: project.title,
      description: project.description,
      codeRepository: project.githubLink || undefined,
      url: `${SITE_URL}/projects/${project._id}`,
      image: project.images?.[0] || defaultImage,
      programmingLanguage: project.technologies || [],
    };
  }, [project]);

  if (loading)
    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin mx-auto" />
          <p className="text-base text-slate-600 font-medium">
            Loading project details...
          </p>
        </div>
      </section>
    );

  if (error)
    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-50 text-rose-600 text-base px-6 text-center font-medium">
        {error}
      </section>
    );

  if (!project)
    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600 text-base px-6 text-center font-medium">
        Project not found.
      </section>
    );

  const imagesList = project.images?.length ? project.images : [defaultImage];

  return (
    <section className="relative min-h-screen bg-slate-50 py-10 sm:py-14 px-4 sm:px-6 text-slate-800 overflow-hidden">
      <SEO
        title={`${project.title} | Portfolio Case Study | By - Satinder Singh Sall`}
        description={
          project.description?.slice(0, 155) ||
          "View full project details, technologies used, live preview, and open-source code."
        }
        keywords={
          project.technologies?.join(", ") ||
          "software engineering, full stack, web dev"
        }
        image={imagesList[0]}
      />

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Decorative Blur Ambient Lights */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[450px] h-[450px] rounded-full bg-indigo-100/60 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full bg-blue-100/60 blur-[120px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Top Header Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Projects
          </Link>

          {/* Share Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Copy Button */}
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm transition active:scale-[0.98]"
              title="Copy Link"
            >
              {copied ? (
                <CheckIcon className="h-4 w-4 text-emerald-600" />
              ) : (
                <LinkIcon className="h-4 w-4 text-slate-500" />
              )}
              {copied ? "Copied!" : "Copy"}
            </button>

            {/* Main Rich Share Dialog Button */}
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition active:scale-[0.98]"
            >
              <ShareIcon className="h-4 w-4" />
              Share
            </button>

            <span className="h-4 w-[1px] bg-slate-300 hidden sm:inline-block mx-1" />

            {/* Quick Share Links */}
            <button
              onClick={() => shareTo("twitter")}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm transition active:scale-[0.98]"
            >
              X / Twitter
            </button>

            <button
              onClick={() => shareTo("linkedin")}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm transition active:scale-[0.98]"
            >
              LinkedIn
            </button>

            <button
              onClick={() => shareTo("whatsapp")}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm transition active:scale-[0.98]"
            >
              WhatsApp
            </button>
          </div>
        </div>

        {/* Main Project Card */}
        <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">
          {/* Main Showcase Image */}
          <div className="relative w-full bg-slate-100 group">
            <button
              type="button"
              onClick={() => setIsImageOpen(true)}
              className="w-full text-left relative block focus:outline-none"
              title="Click to view fullscreen"
            >
              <img
                src={imagesList[currentImage]}
                alt={project.title}
                onError={(e) => {
                  e.target.src = defaultImage;
                }}
                className="w-full h-[220px] sm:h-[300px] md:h-[380px] object-cover transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
            </button>

            {/* Navigation Arrows */}
            {imagesList.length > 1 && (
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 border border-slate-200 w-9 h-9 rounded-full flex items-center justify-center opacity-90 group-hover:opacity-100 shadow-md transition"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
            )}

            {imagesList.length > 1 && (
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 border border-slate-200 w-9 h-9 rounded-full flex items-center justify-center opacity-90 group-hover:opacity-100 shadow-md transition"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            )}

            {/* Pagination Dots */}
            {imagesList.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {imagesList.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImage(index);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      index === currentImage
                        ? "w-6 bg-white"
                        : "w-2 bg-white/60 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            )}

            <div className="pointer-events-none absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-slate-900/70 text-[11px] font-medium text-white backdrop-blur-md">
              Click to expand
            </div>
          </div>

          {/* Details Content Area */}
          <div className="p-6 sm:p-8 md:p-10">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              {project.title}
            </h1>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
                <TagIcon className="h-3.5 w-3.5" />
                {project.technologies?.length || 0} Technologies
              </span>

              {project.link && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <GlobeAltIcon className="h-3.5 w-3.5" />
                  Live Demo Available
                </span>
              )}

              {project.githubLink && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                  <CodeBracketIcon className="h-3.5 w-3.5" />
                  Open Source Code
                </span>
              )}
            </div>

            {descriptionLines.length > 0 && (
              <div className="mt-6 space-y-3 text-slate-600 leading-relaxed">
                {descriptionLines.map((line, idx) => (
                  <p key={idx} className="text-sm sm:text-base leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            )}

            {project.technologies?.length > 0 && (
              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <TagIcon className="h-4 w-4 text-slate-400" />
                  Technologies Used
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-700 hover:border-indigo-200 transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white transition text-xs font-semibold shadow-sm hover:shadow-md w-full sm:w-auto"
                >
                  <GlobeAltIcon className="h-4 w-4" />
                  Visit Live Application
                </a>
              )}

              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-800 transition text-xs font-semibold w-full sm:w-auto"
                >
                  <CodeBracketIcon className="h-4 w-4" />
                  View GitHub Repository
                </a>
              )}
            </div>

            <div className="mt-12 bg-slate-50 border border-slate-200/80 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Interested in more work?
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Explore full-stack apps, design ideas, and open-source
                  contributions.
                </p>
              </div>

              <Link
                to="/projects"
                className="w-full md:w-auto text-center px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-slate-300 shadow-sm transition text-xs font-semibold"
              >
                Browse All Projects →
              </Link>
            </div>
          </div>
        </div>

        <div className="h-10" />
      </div>

      {/* RICH SHARE DIALOG MODAL */}
      {isShareModalOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[99999] flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsShareModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                  <ShareIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Share Project
                  </h3>
                  <p className="text-xs text-slate-500">
                    Spread the word with your network
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsShareModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Project Card Preview */}
            <div className="mt-5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
              <img
                src={imagesList[0]}
                alt={project.title}
                className="w-14 h-14 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {project.title}
                </h4>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {project.description || "Check out this portfolio case study"}
                </p>
              </div>
            </div>

            {/* Social Share Grid */}
            <div className="mt-5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                Share via Platform
              </label>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                <button
                  onClick={() => shareTo("twitter")}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition group"
                >
                  <span className="text-sm font-bold group-hover:scale-110 transition">
                    𝕏
                  </span>
                  <span className="text-[10px] font-medium text-slate-600 mt-1">
                    Twitter
                  </span>
                </button>

                <button
                  onClick={() => shareTo("linkedin")}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-blue-50/50 hover:bg-blue-50 border border-blue-100 text-blue-700 transition group"
                >
                  <span className="text-xs font-bold group-hover:scale-110 transition">
                    in
                  </span>
                  <span className="text-[10px] font-medium text-blue-800 mt-1">
                    LinkedIn
                  </span>
                </button>

                <button
                  onClick={() => shareTo("whatsapp")}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 text-emerald-700 transition group"
                >
                  <span className="text-xs font-bold group-hover:scale-110 transition">
                    WA
                  </span>
                  <span className="text-[10px] font-medium text-emerald-800 mt-1">
                    WhatsApp
                  </span>
                </button>

                <button
                  onClick={() => shareTo("facebook")}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-sky-50/50 hover:bg-sky-50 border border-sky-100 text-sky-700 transition group"
                >
                  <span className="text-xs font-bold group-hover:scale-110 transition">
                    fb
                  </span>
                  <span className="text-[10px] font-medium text-sky-800 mt-1">
                    Facebook
                  </span>
                </button>

                <button
                  onClick={() => shareTo("reddit")}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-orange-50/50 hover:bg-orange-50 border border-orange-100 text-orange-700 transition group"
                >
                  <span className="text-xs font-bold group-hover:scale-110 transition">
                    re
                  </span>
                  <span className="text-[10px] font-medium text-orange-800 mt-1">
                    Reddit
                  </span>
                </button>
              </div>
            </div>

            {/* Quick Link Field */}
            <div className="mt-5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Copy Link Directly
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={window.location.href}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-600 focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="shrink-0 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition active:scale-95 flex items-center gap-1.5"
                >
                  {copied ? (
                    <>
                      <CheckIcon className="h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <LinkIcon className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN IMAGE MODAL */}
      {isImageOpen && (
        <div
          className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[99999] flex items-center justify-center p-4"
          onClick={() => setIsImageOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsImageOpen(false)}
              className="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition"
              title="Close"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            {imagesList.length > 1 && (
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-md transition z-10"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
            )}

            <img
              src={imagesList[currentImage]}
              alt={project.title}
              onError={(e) => {
                e.target.src = defaultImage;
              }}
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />

            {imagesList.length > 1 && (
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-md transition z-10"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            )}

            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white">
              {currentImage + 1} / {imagesList.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
