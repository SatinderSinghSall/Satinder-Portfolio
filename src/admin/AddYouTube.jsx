import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import toast from "react-hot-toast";
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { MdAddCircle } from "react-icons/md";

const API = import.meta.env.VITE_API_URL || "/api";

export default function AddYouTube() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [mainError, setMainError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    videoUrl: "",
    thumbnail: "",
    description: "",
    tags: "",
    author: "Admin",
    status: "draft",
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setErrors((prev) => ({ ...prev, thumbnail: "" }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // Clear main error banner when user begins correcting fields
    if (mainError) setMainError("");
  };

  const validateForm = () => {
    let newErrors = {};

    // Title Validation
    if (!form.title.trim()) {
      newErrors.title = "Video title is required.";
    }

    // Video URL Validation
    if (!form.videoUrl.trim()) {
      newErrors.videoUrl = "YouTube URL is required.";
    } else if (
      !/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(form.videoUrl)
    ) {
      newErrors.videoUrl =
        "Please enter a valid YouTube URL (e.g. youtube.com or youtu.be).";
    }

    // Thumbnail / File Validation
    if (!file && !form.thumbnail.trim()) {
      newErrors.thumbnail = "Thumbnail image is required.";
    }

    // Description Validation
    if (!form.description.trim()) {
      newErrors.description = "Description is required.";
    }

    // Tags Validation
    if (!form.tags.trim()) {
      newErrors.tags = "At least one tag is required.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setMainError(
        "Please fix all highlighted errors below before submitting.",
      );
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setMainError("");
    setLoading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    let thumbnailUrl = form.thumbnail;

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.post(`${API}/youtube/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        thumbnailUrl = res.data.url;
      } catch (err) {
        const uploadMsg =
          err.response?.data?.message || "Thumbnail upload failed.";
        setMainError(uploadMsg);
        toast.error(uploadMsg);
        setLoading(false);
        return;
      }
    }

    const payload = {
      ...form,
      thumbnail: thumbnailUrl,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      await axios.post(`${API}/youtube`, payload, config);
      toast.success("Video added successfully!");

      setTimeout(() => {
        navigate("/admin/youtube");
      }, 500);
    } catch (err) {
      const serverMsg =
        err.response?.data?.message ||
        "Failed to submit video. Please try again.";
      setMainError(serverMsg);
      toast.error(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto py-2">
        <div className="rounded-3xl border border-gray-200/60 bg-gradient-to-br from-white via-white to-red-50/40 backdrop-blur-xl p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.498 6.186a2.958 2.958 0 0 0-2.08-2.08C19.583 3.5 12 3.5 12 3.5s-7.583 0-9.418.606a2.958 2.958 0 0 0-2.08 2.08C0 8.02 0 12 0 12s0 3.98.502 5.814a2.958 2.958 0 0 0 2.08 2.08C4.417 20.5 12 20.5 12 20.5s7.583 0 9.418-.606a2.958 2.958 0 0 0 2.08-2.08C24 15.98 24 12 24 12s0-3.98-.502-5.814ZM9.75 15.568V8.432L15.818 12 9.75 15.568Z" />
              </svg>
            </span>
            Add YouTube Video
          </h1>

          {/* MAIN TOP ERROR BANNER WITH DISMISS BUTTON */}
          {mainError && (
            <div className="mb-6 flex items-center justify-between p-4 rounded-2xl bg-red-50 border border-red-200/80 text-red-800 text-sm animate-fadeIn shadow-sm">
              <div className="flex items-center gap-3">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-600 shrink-0" />
                <span className="font-semibold">{mainError}</span>
              </div>
              <button
                type="button"
                onClick={() => setMainError("")}
                className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100/60 rounded-lg transition cursor-pointer"
                aria-label="Dismiss error"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Video Title <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="How I edit YouTube videos"
                className={`w-full rounded-2xl px-5 py-4 border ${
                  errors.title
                    ? "border-red-500 ring-2 ring-red-100"
                    : "border-gray-300/60"
                } focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none transition bg-white/80`}
              />
              {errors.title && (
                <p className="flex items-center gap-1.5 text-red-500 text-xs font-semibold mt-2">
                  <ExclamationCircleIcon className="w-4 h-4 shrink-0" />
                  {errors.title}
                </p>
              )}
            </div>

            {/* YouTube URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                YouTube URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="videoUrl"
                value={form.videoUrl}
                onChange={handleChange}
                placeholder="https://youtube.com/watch?v=..."
                className={`w-full rounded-2xl px-5 py-4 border ${
                  errors.videoUrl
                    ? "border-red-500 ring-2 ring-red-100"
                    : "border-gray-300/60"
                } focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none transition bg-white/80`}
              />
              {errors.videoUrl && (
                <p className="flex items-center gap-1.5 text-red-500 text-xs font-semibold mt-2">
                  <ExclamationCircleIcon className="w-4 h-4 shrink-0" />
                  {errors.videoUrl}
                </p>
              )}
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Thumbnail Image <span className="text-red-500">*</span>
              </label>

              <label
                className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed ${
                  errors.thumbnail
                    ? "border-red-400 bg-red-50/20"
                    : "border-gray-300 hover:border-red-400"
                } rounded-2xl p-8 cursor-pointer transition bg-white/70`}
              >
                <svg
                  className="w-10 h-10 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16V4m10 12V4M3 16h18"
                  />
                </svg>
                <span className="text-sm text-gray-600 font-medium">
                  {file ? file.name : "Click to upload thumbnail"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </label>

              {errors.thumbnail && (
                <p className="flex items-center gap-1.5 text-red-500 text-xs font-semibold mt-2">
                  <ExclamationCircleIcon className="w-4 h-4 shrink-0" />
                  {errors.thumbnail}
                </p>
              )}

              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="mt-4 w-48 h-28 object-cover rounded-xl border border-gray-200 shadow-sm"
                />
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                rows={5}
                value={form.description}
                onChange={handleChange}
                placeholder="What is this video about?"
                className={`w-full rounded-2xl px-5 py-4 border ${
                  errors.description
                    ? "border-red-500 ring-2 ring-red-100"
                    : "border-gray-300/60"
                } focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none transition bg-white/80 resize-none`}
              />
              {errors.description && (
                <p className="flex items-center gap-1.5 text-red-500 text-xs font-semibold mt-2">
                  <ExclamationCircleIcon className="w-4 h-4 shrink-0" />
                  {errors.description}
                </p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tags{" "}
                <span className="text-xs text-gray-400 font-normal">
                  (comma separated)
                </span>
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="youtube, react, content"
                className={`w-full rounded-2xl px-5 py-4 border ${
                  errors.tags
                    ? "border-red-500 ring-2 ring-red-100"
                    : "border-gray-300/60"
                } focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none transition bg-white/80`}
              />
              {errors.tags && (
                <p className="flex items-center gap-1.5 text-red-500 text-xs font-semibold mt-2">
                  <ExclamationCircleIcon className="w-4 h-4 shrink-0" />
                  {errors.tags}
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-2xl px-5 py-4 border border-gray-300/60 focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none transition bg-white/80 cursor-pointer"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-2xl py-4 font-semibold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer
              ${
                loading
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-500 to-red-600 hover:scale-[1.01] active:scale-95 shadow-red-500/20"
              }`}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              )}
              <MdAddCircle size={25} />
              {loading ? "Adding Video..." : "Add Video"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
