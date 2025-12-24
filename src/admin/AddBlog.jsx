import { useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL || "/api";

export default function AddBlog() {
  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    image: "",
    tags: "",
    author: "",
    status: "draft",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.content || !form.image) {
      setError("Title, Content, and Image are required.");
      toast.error("Title, Content, and Image are required.");
      return;
    }

    setLoading(true);
    const headers = { Authorization: `Bearer ${token}` };
    const payload = {
      ...form,
      tags: form.tags.split(",").map((tag) => tag.trim()),
    };

    try {
      await axios.post(`${API}/blogs`, payload, { headers });

      setForm({
        title: "",
        summary: "",
        content: "",
        image: "",
        tags: "",
        author: "",
        status: "draft",
      });

      toast.success("Blog added successfully!");
    } catch (err) {
      toast.error("Failed to add the blog.");
      setError("Failed to save blog post.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto px-4">
        <div className="rounded-3xl border border-gray-200/60 bg-gradient-to-br from-white via-white to-blue-50/40 backdrop-blur-xl p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 4.5c.414 0 .75.336.75.75v6h6a.75.75 0 010 1.5h-6v6a.75.75 0 01-1.5 0v-6h-6a.75.75 0 010-1.5h6v-6c0-.414.336-.75.75-.75z" />
              </svg>
            </span>
            Add New Blog Post
          </h2>

          {error && (
            <div className="mb-6 flex items-center gap-3 text-red-600 bg-red-50 border border-red-200 px-5 py-4 rounded-2xl text-sm">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Blog Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="How I built my SaaS with React"
                className="w-full rounded-2xl border border-gray-300/60 px-5 py-4
                         focus:ring-4 focus:ring-blue-200 focus:border-blue-500
                         outline-none transition bg-white/80"
              />
            </div>

            {/* Summary */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Summary
              </label>
              <input
                name="summary"
                value={form.summary}
                onChange={handleChange}
                placeholder="Short description shown in listings"
                className="w-full rounded-2xl border border-gray-300/60 px-5 py-4
                         focus:ring-4 focus:ring-blue-200 focus:border-blue-500
                         outline-none transition bg-white/80"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Content (Markdown)
              </label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Write your blog content here..."
                rows={6}
                className="w-full rounded-2xl border border-gray-300/60 px-5 py-4
                         focus:ring-4 focus:ring-blue-200 focus:border-blue-500
                         outline-none transition bg-white/80 resize-none"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cover Image URL
              </label>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://image-url.com/banner.png"
                className="w-full rounded-2xl border border-gray-300/60 px-5 py-4
                         focus:ring-4 focus:ring-blue-200 focus:border-blue-500
                         outline-none transition bg-white/80"
              />
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
                placeholder="react, saas, startup"
                className="w-full rounded-2xl border border-gray-300/60 px-5 py-4
                         focus:ring-4 focus:ring-blue-200 focus:border-blue-500
                         outline-none transition bg-white/80"
              />
            </div>

            {/* Author + Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Author
                </label>
                <input
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  placeholder="Author name"
                  className="w-full rounded-2xl border border-gray-300/60 px-5 py-4
                           focus:ring-4 focus:ring-blue-200 focus:border-blue-500
                           outline-none transition bg-white/80"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-300/60 px-5 py-4
                           focus:ring-4 focus:ring-blue-200 focus:border-blue-500
                           outline-none transition bg-white/80"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-2xl py-4 font-semibold text-white shadow-lg
              transition-all duration-300 flex justify-center items-center
              ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.01] active:scale-95"
              }`}
            >
              {loading ? "Adding Blog..." : "Add Blog Post"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
