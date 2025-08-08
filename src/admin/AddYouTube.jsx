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
      <section className="min-h-screen bg-gray-50 text-black">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            ➕ Add YouTube Video
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <input
                type="text"
                name="title"
                placeholder="Title *"
                value={form.title}
                onChange={handleChange}
                className={`w-full p-3 rounded border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-red-400`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Video URL */}
            <div>
              <input
                type="url"
                name="videoUrl"
                placeholder="YouTube URL *"
                value={form.videoUrl}
                onChange={handleChange}
                className={`w-full p-3 rounded border ${
                  errors.videoUrl ? "border-red-500" : "border-gray-300"
                } bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-red-400`}
              />
              {errors.videoUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.videoUrl}</p>
              )}
            </div>

            {/* Thumbnail */}
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-3 rounded border border-gray-300 bg-white text-black"
              />
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="mt-3 w-40 h-24 object-cover rounded border"
                />
              )}
            </div>

            {/* Description */}
            <div>
              <textarea
                name="description"
                rows={5}
                placeholder="Video description *"
                value={form.description}
                onChange={handleChange}
                className={`w-full p-3 rounded border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-red-400`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Tags */}
            <div>
              <input
                type="text"
                name="tags"
                placeholder="Tags (comma-separated)"
                value={form.tags}
                onChange={handleChange}
                className="w-full p-3 rounded border border-gray-300 bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-red-400"
              />
            </div>

            {/* Status */}
            <div>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full p-3 rounded border border-gray-300 bg-white text-black focus:ring-2 focus:ring-red-400"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              } px-6 py-3 rounded-lg text-white font-semibold w-full shadow-md transition duration-200 flex items-center justify-center gap-2`}
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
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {loading ? "Adding..." : "Add a new Video"}
            </button>
          </form>
        </div>
      </section>
    </AdminLayout>
  );
}
