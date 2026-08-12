import { useState, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import toast from "react-hot-toast";
import {
  FolderPlusIcon,
  PhotoIcon,
  XMarkIcon,
  CodeBracketIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  SparklesIcon,
  PlusIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

const API = import.meta.env.VITE_API_URL || "/api";

export default function AddProject() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: "",
    githubLink: "",
    link: "",
    featured: false,
    priority: 0,
    imageFiles: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear inline error on field edit
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Convert comma-separated string to array for live badge preview
  const techBadges = useMemo(() => {
    if (!form.technologies) return [];
    return form.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }, [form.technologies]);

  // Image upload handling
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setForm((prev) => ({
      ...prev,
      imageFiles: [...prev.imageFiles, ...files],
    }));

    if (errors.imageFiles) {
      setErrors((prev) => ({ ...prev, imageFiles: "" }));
    }
  };

  const removeImage = (indexToRemove) => {
    setForm((prev) => ({
      ...prev,
      imageFiles: prev.imageFiles.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  // Form submission validation
  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Project Title is required.";
    }

    if (!form.githubLink.trim()) {
      newErrors.githubLink = "GitHub Repository URL is required.";
    } else if (
      !form.githubLink.startsWith("http://") &&
      !form.githubLink.startsWith("https://")
    ) {
      newErrors.githubLink =
        "Please enter a valid URL (starting with http:// or https://).";
    }

    if (
      form.link.trim() &&
      !form.link.startsWith("http://") &&
      !form.link.startsWith("https://")
    ) {
      newErrors.link =
        "Please enter a valid URL (starting with http:// or https://).";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!techBadges.length) {
      newErrors.technologies =
        "Please provide at least one technology keyword.";
    }

    if (!form.imageFiles.length) {
      newErrors.imageFiles =
        "Please attach at least one screenshot or cover image.";
    }

    setErrors(newErrors);
    return newErrors;
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      const topMsg =
        "Please review highlighted fields and complete required entries.";
      setError(topMsg);
      toast.error(topMsg);
      return;
    }

    setLoading(true);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    try {
      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("description", form.description.trim());
      formData.append("link", form.link.trim());
      formData.append("githubLink", form.githubLink.trim());
      formData.append("technologies", techBadges.join(","));
      formData.append("featured", form.featured);
      formData.append("priority", form.priority);

      form.imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      await axios.post(`${API}/projects`, formData, { headers });

      // Reset form
      setForm({
        title: "",
        description: "",
        link: "",
        githubLink: "",
        technologies: "",
        featured: false,
        priority: 0,
        imageFiles: [],
      });

      setErrors({});
      toast.success("Project added successfully!");
    } catch (err) {
      console.error(err);
      const apiMsg = err.response?.data?.message || "Failed to create project.";
      setError(apiMsg);
      toast.error(apiMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <FolderPlusIcon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Add New Project
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Showcase a new application or open-source repository on your
                portfolio.
              </p>
            </div>
          </div>

          {/* Form Error Banner */}
          {error && (
            <div className="flex items-start justify-between gap-3 bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl text-xs sm:text-sm font-medium transition animate-in fade-in">
              <div className="flex items-center gap-3">
                <ExclamationTriangleIcon className="h-5 w-5 shrink-0 text-rose-500" />
                <span>{error}</span>
              </div>
              <button
                type="button"
                onClick={() => setError("")}
                className="text-rose-400 hover:text-rose-600 transition cursor-pointer"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Title & Github Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-2 block">
                  Project Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. AI Content Studio"
                  className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 transition bg-slate-50/50 ${
                    errors.title
                      ? "border-rose-400 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/20"
                      : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
                  }`}
                />
                {errors.title && (
                  <p className="flex items-center gap-1.5 text-xs text-rose-500 mt-1.5 font-medium">
                    <ExclamationCircleIcon className="h-4 w-4 shrink-0" />
                    <span>{errors.title}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 mb-2 block">
                  GitHub Repository URL <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  name="githubLink"
                  value={form.githubLink}
                  onChange={handleChange}
                  placeholder="https://github.com/user/repo"
                  className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 transition bg-slate-50/50 ${
                    errors.githubLink
                      ? "border-rose-400 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/20"
                      : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
                  }`}
                />
                {errors.githubLink && (
                  <p className="flex items-center gap-1.5 text-xs text-rose-500 mt-1.5 font-medium">
                    <ExclamationCircleIcon className="h-4 w-4 shrink-0" />
                    <span>{errors.githubLink}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Live Link & Priority Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 mb-2 block">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  placeholder="https://my-app.vercel.app"
                  className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 transition bg-slate-50/50 ${
                    errors.link
                      ? "border-rose-400 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/20"
                      : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
                  }`}
                />
                {errors.link && (
                  <p className="flex items-center gap-1.5 text-xs text-rose-500 mt-1.5 font-medium">
                    <ExclamationCircleIcon className="h-4 w-4 shrink-0" />
                    <span>{errors.link}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 mb-2 block">
                  Sorting Priority
                </label>
                <input
                  type="number"
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition bg-slate-50/50"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-2 block">
                Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="description"
                rows="4"
                value={form.description}
                onChange={handleChange}
                placeholder="Detail key architectural decisions, problem statement, and technical highlights..."
                className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 transition bg-slate-50/50 resize-none ${
                  errors.description
                    ? "border-rose-400 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/20"
                    : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
                }`}
              />
              {errors.description && (
                <p className="flex items-center gap-1.5 text-xs text-rose-500 mt-1.5 font-medium">
                  <ExclamationCircleIcon className="h-4 w-4 shrink-0" />
                  <span>{errors.description}</span>
                </p>
              )}
            </div>

            {/* Tech Stack Input & Badges */}
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-2 block">
                Technologies Used <span className="text-rose-500">*</span>{" "}
                <span className="font-normal text-slate-400">
                  (Comma separated)
                </span>
              </label>
              <input
                type="text"
                name="technologies"
                value={form.technologies}
                onChange={handleChange}
                placeholder="React, TypeScript, Node.js, Tailwind CSS"
                className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 transition bg-slate-50/50 ${
                  errors.technologies
                    ? "border-rose-400 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/20"
                    : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
                }`}
              />
              {errors.technologies && (
                <p className="flex items-center gap-1.5 text-xs text-rose-500 mt-1.5 font-medium">
                  <ExclamationCircleIcon className="h-4 w-4 shrink-0" />
                  <span>{errors.technologies}</span>
                </p>
              )}

              {/* Dynamic Tech Badge Previews */}
              {techBadges.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {techBadges.map((tech, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium"
                    >
                      <CodeBracketIcon className="h-3.5 w-3.5 text-indigo-500" />
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Featured Checkbox Toggle */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60">
                  <SparklesIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    Feature on Homepage
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Display this project in top featured sections.
                  </p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            {/* Image File Uploader & Thumbnails */}
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-2 block">
                Project Screenshots / Cover{" "}
                <span className="text-rose-500">*</span>
              </label>

              <label
                className={`group flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-2xl p-6 transition cursor-pointer ${
                  errors.imageFiles
                    ? "border-rose-400 bg-rose-50/20 hover:bg-rose-50/30"
                    : "border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/30"
                }`}
              >
                <div className="p-3 rounded-full bg-indigo-50 text-indigo-600 group-hover:scale-110 transition">
                  <PhotoIcon className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <span className="text-xs font-semibold text-indigo-600">
                    Click to upload images
                  </span>
                  <span className="text-xs text-slate-500">
                    {" "}
                    or drag and drop
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1">
                    PNG, JPG, WebP up to 10MB each
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {errors.imageFiles && (
                <p className="flex items-center gap-1.5 text-xs text-rose-500 mt-1.5 font-medium">
                  <ExclamationCircleIcon className="h-4 w-4 shrink-0" />
                  <span>{errors.imageFiles}</span>
                </p>
              )}

              {/* Selected Images Grid Preview */}
              {form.imageFiles.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                  {form.imageFiles.map((file, idx) => {
                    const previewUrl = URL.createObjectURL(file);
                    return (
                      <div
                        key={idx}
                        className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100"
                      >
                        <img
                          src={previewUrl}
                          alt={`Preview ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1.5 right-1.5 p-1 rounded-full bg-slate-900/70 text-white hover:bg-rose-600 transition"
                          title="Remove image"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Submit Action Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="submit"
                disabled={loading}
                className={`w-full sm:w-auto min-w-[200px] inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white text-sm shadow-sm transition active:scale-95 ${
                  loading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                }`}
              >
                {loading ? (
                  <>
                    <ArrowPathIcon className="h-5 w-5 animate-spin" />
                    <span>Saving Project...</span>
                  </>
                ) : (
                  <>
                    <PlusIcon className="h-5 w-5 stroke-[2.5]" />
                    <span>Publish Project</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
