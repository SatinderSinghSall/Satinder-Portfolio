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
      <div className="max-w-3xl mx-auto mt-8">
        <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            ➕ Add a New Blog Post
          </h2>

          {error && (
            <p className="text-red-500 mb-4 bg-red-50 p-2 rounded">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              name="summary"
              value={form.summary}
              onChange={handleChange}
              placeholder="Summary"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Markdown Content"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none h-40"
            />
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="Tags (comma separated)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Author Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-3 text-white rounded-lg font-semibold transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Adding..." : "Add Blog Post"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
