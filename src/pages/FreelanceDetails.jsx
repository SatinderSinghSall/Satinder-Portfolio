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
  BriefcaseIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const API = import.meta.env.VITE_API_URL || "/api";

/* ================= Image Carousel ================= */
function ImageCarousel({ images = [] }) {
  const [index, setIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="aspect-video rounded-2xl border border-white/10 bg-black/40 flex items-center justify-center text-gray-400">
        No images available
      </div>
    );
  }

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-black">
      <img
        src={images[index]}
        alt={`Project screenshot ${index + 1}`}
        className="w-full h-full object-cover"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 border border-white/10 hover:bg-black/60 transition"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>

          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 border border-white/10 hover:bg-black/60 transition"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full transition ${
                  i === index ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function FreelanceDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= Fetch ================= */
  useEffect(() => {
    setLoading(true);
    setError("");

    axios
      .get(`${API}/freelance/${id}`)
      .then((res) => setProject(res.data))
      .catch((err) => {
        console.error("Failed to fetch project:", err);
        setError("Failed to load project.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const createdDate = useMemo(() => {
    if (!project?.createdAt) return null;
    try {
      return new Date(project.createdAt).toLocaleDateString();
    } catch {
      return null;
    }
  }, [project?.createdAt]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  /* ================= Loading ================= */
  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 text-white">
        <div className="text-center space-y-4 animate-pulse">
          <div className="w-14 h-14 rounded-full border-4 border-white/20 border-t-white animate-spin mx-auto" />
          <p className="text-lg text-gray-200 font-semibold">
            Loading project...
          </p>
        </div>
      </section>
    );
  }

  /* ================= Error ================= */
  if (error || !project) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
        <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 text-center text-white">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-red-500/10 border border-red-400/20 flex items-center justify-center">
            <BriefcaseIcon className="h-7 w-7 text-red-300" />
          </div>

          <h2 className="text-2xl font-bold mt-5">
            {error ? "Something went wrong" : "Project Not Found"}
          </h2>

          <p className="text-sm text-gray-300 mt-2">
            {error ||
              "Sorry, we couldn’t find this project. It may have been removed."}
          </p>

          <div className="mt-6">
            <Link
              to="/freelance-projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition text-sm font-semibold"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Projects
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] py-10 sm:py-14 px-4 sm:px-6 text-white overflow-hidden">
      {/* Glow */}
      <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-indigo-500/20 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-[420px] h-[420px] bg-fuchsia-500/20 blur-[120px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Top Bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
          <Link
            to="/freelance-projects"
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Projects
          </Link>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-xs sm:text-sm transition"
            >
              <LinkIcon className="h-4 w-4" />
              Copy Link
            </button>

            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 border border-indigo-500/30 text-xs sm:text-sm transition"
              >
                <BriefcaseIcon className="h-4 w-4" />
                Visit Project
              </a>
            )}
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          {/* Images */}
          <div className="p-4 sm:p-6">
            <ImageCarousel images={project.images || []} />
          </div>

          {/* Content */}
          <div className="px-6 pb-8 sm:px-10 sm:pb-10">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
              {project.title}
            </h1>

            {/* Meta Chips */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10">
                <UserCircleIcon className="h-4 w-4" />
                {project.clientName}
              </span>

              <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20">
                <CalendarDaysIcon className="h-4 w-4" />
                {createdDate || "—"}
              </span>

              <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-400/20">
                <StarIcon className="h-4 w-4" />
                {project.clientRating || "N/A"} / 5
              </span>

              <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-green-500/10 border border-green-400/20">
                {project.status.toUpperCase()}
              </span>
            </div>

            {/* Description */}
            {project.description && (
              <div className="mt-6 text-gray-200/90 leading-relaxed whitespace-pre-line">
                {project.description}
              </div>
            )}

            {/* Technologies */}
            {project.technologies?.length > 0 && (
              <div className="mt-8">
                <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <TagIcon className="h-5 w-5" />
                  Technologies
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs bg-white/10 border border-white/10"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonial */}
            {project.testimonial && (
              <div className="mt-10 bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold">Client Testimonial</h3>
                <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                  “{project.testimonial}”
                </p>
              </div>
            )}

            {/* CTA Footer */}
            <div className="mt-10 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold">Want similar work?</h3>
                <p className="text-sm text-gray-300 mt-1">
                  Explore more freelance projects from my portfolio.
                </p>
              </div>

              <Link
                to="/freelance-projects"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition text-sm font-semibold"
              >
                Browse All Projects →
              </Link>
            </div>
          </div>
        </div>

        <div className="h-10" />
      </div>
    </section>
  );
}
