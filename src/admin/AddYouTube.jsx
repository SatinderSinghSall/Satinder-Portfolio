import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL || "/api";

export default function AddYouTube() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
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
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.videoUrl.trim()) {
      newErrors.videoUrl = "Video URL is required.";
    } else if (
      !/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(form.videoUrl)
    ) {
      newErrors.videoUrl = "Please enter a valid YouTube URL.";
    }
    if (!form.description.trim())
      newErrors.description = "Description is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Please fix the errors before submitting.");
      return;
    }

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
      } catch {
        toast.error("Thumbnail upload failed.");
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
      toast.error(err.response?.data?.message || "Failed to submit.");
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

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Video Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="How I edit YouTube videos"
                className={`w-full rounded-2xl px-5 py-4 border ${
                  errors.title ? "border-red-500" : "border-gray-300/60"
                } focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none transition bg-white/80`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* YouTube URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                YouTube URL
              </label>
              <input
                type="url"
                name="videoUrl"
                value={form.videoUrl}
                onChange={handleChange}
                placeholder="https://youtube.com/watch?v=..."
                className={`w-full rounded-2xl px-5 py-4 border ${
                  errors.videoUrl ? "border-red-500" : "border-gray-300/60"
                } focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none transition bg-white/80`}
              />
              {errors.videoUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.videoUrl}</p>
              )}
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Thumbnail Image
              </label>

              <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-2xl p-8 cursor-pointer hover:border-red-400 transition bg-white/70">
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
                <span className="text-sm text-gray-600">
                  {file ? file.name : "Click to upload thumbnail"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </label>

              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="mt-4 w-48 h-28 object-cover rounded-xl border"
                />
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows={5}
                value={form.description}
                onChange={handleChange}
                placeholder="What is this video about?"
                className={`w-full rounded-2xl px-5 py-4 border ${
                  errors.description ? "border-red-500" : "border-gray-300/60"
                } focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none transition bg-white/80 resize-none`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tags{" "}
                <span className="text-xs text-gray-400">(comma separated)</span>
              </label>
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="youtube, react, content"
                className="w-full rounded-2xl px-5 py-4 border border-gray-300/60 focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none transition bg-white/80"
              />
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
                className="w-full rounded-2xl px-5 py-4 border border-gray-300/60 focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none transition bg-white/80"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-2xl py-4 font-semibold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2
              ${
                loading
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-500 to-red-600 hover:scale-[1.01] active:scale-95"
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
              {loading ? "Adding Video..." : "Add Video"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
