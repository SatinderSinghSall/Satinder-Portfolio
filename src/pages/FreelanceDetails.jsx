import { useParams, Link } from "react-router-dom";
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
  BriefcaseIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShareIcon,
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

const API = import.meta.env.VITE_API_URL || "/api";

/* ================= Image Carousel ================= */
function ImageCarousel({ images = [], title = "" }) {
  const [index, setIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="aspect-video rounded-2xl border border-slate-200 bg-slate-100 flex flex-col items-center justify-center text-slate-400 p-6">
        <BriefcaseIcon className="h-10 w-10 mb-2 opacity-50" />
        <p className="text-sm font-medium">
          No project preview images available
        </p>
      </div>
    );
  }

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm bg-slate-900 group">
      <img
        src={images[index]}
        alt={`${title} screenshot ${index + 1}`}
        className="w-full h-full object-cover transition-all duration-300"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-800 backdrop-blur-md shadow-md border border-slate-200/50 transition-all opacity-90 group-hover:opacity-100 active:scale-95"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>

          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-800 backdrop-blur-md shadow-md border border-slate-200/50 transition-all opacity-90 group-hover:opacity-100 active:scale-95"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-md">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index
                    ? "w-6 bg-white"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ================= Share Dialog Modal ================= */
function ShareModal({ isOpen, onClose, project }) {
  const [copied, setCopied] = useState(false);
  if (!isOpen || !project) return null;

  const shareUrl = window.location.href;
  const shareTitle = `Check out "${project.title}" - Freelance Project by Satinder Singh Sall`;
  const shareText = project.description
    ? `${project.title}: ${project.description.slice(0, 120)}...`
    : shareTitle;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      }
    } else {
      handleCopy();
    }
  };

  const socialLinks = [
    {
      name: "X / Twitter",
      color: "bg-slate-900 hover:bg-slate-800 text-white",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareTitle,
      )}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "LinkedIn",
      color: "bg-[#0A66C2] hover:bg-[#08519c] text-white",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl,
      )}`,
    },
    {
      name: "WhatsApp",
      color: "bg-[#25D366] hover:bg-[#20bd5a] text-white",
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${shareTitle} - ${shareUrl}`,
      )}`,
    },
    {
      name: "Email",
      color: "bg-indigo-600 hover:bg-indigo-700 text-white",
      url: `mailto:?subject=${encodeURIComponent(
        shareTitle,
      )}&body=${encodeURIComponent(`${shareText}\n\nView full project: ${shareUrl}`)}`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-5 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <ShareIcon className="h-5 w-5 text-indigo-600" />
            <span>Share Project</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Social Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 p-3 rounded-xl font-semibold text-xs transition shadow-sm ${item.color}`}
            >
              <span>{item.name}</span>
              <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>

        {/* Native Mobile Share option */}
        {navigator.share && (
          <button
            onClick={shareNative}
            className="w-full py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition"
          >
            <ShareIcon className="h-4 w-4" />
            <span>More Sharing Options</span>
          </button>
        )}

        {/* Copy Link Input */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <label className="text-xs font-semibold text-slate-500">
            Direct Link
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-600 focus:outline-none select-all"
            />
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition shadow-sm active:scale-95"
            >
              {copied ? (
                <>
                  <CheckIcon className="h-4 w-4 text-emerald-300" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <LinkIcon className="h-4 w-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FreelanceDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isShareOpen, setIsShareOpen] = useState(false);

  /* ================= Fetch ================= */
  useEffect(() => {
    setLoading(true);
    setError("");

    axios
      .get(`${API}/freelance/${id}`)
      .then((res) => {
        const payload = res.data?.data || res.data;
        setProject(payload);
      })
      .catch((err) => {
        console.error("Failed to fetch project:", err);
        setError("Failed to load project details.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const createdDate = useMemo(() => {
    if (!project?.createdAt) return null;
    try {
      return new Date(project.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return null;
    }
  }, [project?.createdAt]);

  /* ================= Loading State ================= */
  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-50 px-4 text-slate-800">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-600">
            Loading project details...
          </p>
        </div>
      </section>
    );
  }

  /* ================= Error State ================= */
  if (error || !project) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-2xl shadow-sm p-8 text-center text-slate-800 space-y-4">
          <div className="mx-auto w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
            <BriefcaseIcon className="h-6 w-6" />
          </div>

          <h1 className="text-xl font-bold text-slate-900">
            {error ? "Unable to Load Project" : "Project Not Found"}
          </h1>

          <p className="text-sm text-slate-500">
            {error ||
              "Sorry, we couldn’t find this project. It may have been updated or removed."}
          </p>

          <div className="pt-2">
            <Link
              to="/freelance-projects"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition text-xs font-semibold shadow-sm"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              <span>Back to Freelance Portfolio</span>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const pageTitle = `${project.title} | Freelance Project | By Satinder Singh Sall`;
  const metaDescription =
    project.description?.slice(0, 160) ||
    "Detailed breakdown of client freelance work delivered to startups and founders.";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 antialiased py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
      {/* Dynamic SEO Meta Tags */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link
          rel="canonical"
          href={`https://satinder-portfolio.vercel.app/freelance/${id}`}
        />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://satinder-portfolio.vercel.app/freelance/${id}`}
        />
        {project.images?.[0] && (
          <meta property="og:image" content={project.images[0]} />
        )}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        {project.images?.[0] && (
          <meta name="twitter:image" content={project.images[0]} />
        )}
      </Helmet>

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        project={project}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* TOP BAR / NAVIGATION */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            to="/freelance-projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-indigo-600 transition"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span>Back to All Freelance Projects</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsShareOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold shadow-sm transition active:scale-95"
            >
              <ShareIcon className="h-4 w-4 text-slate-500" />
              <span>Share</span>
            </button>

            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition active:scale-95"
              >
                <span>Live Project</span>
                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        {/* MAIN CARD CONTAINER */}
        <article className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
          {/* Images Section */}
          <div className="p-4 sm:p-6 bg-slate-50/50 border-b border-slate-100">
            <ImageCarousel
              images={project.images || []}
              title={project.title}
            />
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Header / Title */}
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                {project.title}
              </h1>

              {/* Meta Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                  <UserCircleIcon className="h-4 w-4 text-slate-500" />
                  <span>{project.clientName || "Client Confidential"}</span>
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                  <CalendarDaysIcon className="h-4 w-4 text-indigo-500" />
                  <span>{createdDate || "Completed Project"}</span>
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60">
                  <StarIcon className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span>
                    {project.clientRating
                      ? `${project.clientRating.toFixed(1)} / 5 Rating`
                      : "Client Rated"}
                  </span>
                </span>

                {project.status && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="uppercase tracking-wider text-[10px]">
                      {project.status}
                    </span>
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            {project.description && (
              <div className="space-y-3">
                <h2 className="text-sm uppercase tracking-wider font-bold text-slate-400">
                  Project Overview
                </h2>
                <p className="text-slate-700 text-base leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>
            )}

            {/* Technologies */}
            {project.technologies?.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-sm uppercase tracking-wider font-bold text-slate-400 flex items-center gap-2">
                  <TagIcon className="h-4 w-4" />
                  <span>Technologies & Stack Used</span>
                </h2>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/60"
                    >
                      #{tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonial Quote */}
            {project.testimonial && (
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6 relative overflow-hidden space-y-3">
                <ChatBubbleBottomCenterTextIcon className="h-8 w-8 text-indigo-200 absolute top-4 right-4" />
                <h2 className="text-xs uppercase tracking-wider font-bold text-indigo-600">
                  Client Feedback
                </h2>
                <blockquote className="text-sm sm:text-base italic text-slate-700 leading-relaxed relative z-10">
                  “{project.testimonial}”
                </blockquote>
                <p className="text-xs font-bold text-slate-900 pt-1">
                  — {project.clientName || "Client"}
                </p>
              </div>
            )}

            {/* Footer CTA */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-base font-bold">Have a project in mind?</h3>
                <p className="text-xs text-slate-400">
                  Explore similar freelance work or get in touch for custom
                  development.
                </p>
              </div>

              <Link
                to="/freelance-projects"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold text-center transition shadow-sm active:scale-95"
              >
                Browse All Work
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
