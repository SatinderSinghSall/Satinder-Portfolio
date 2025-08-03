import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import AdminLayout from "../components/AdminLayout";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL || "/api";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    image: "",
    tags: "",
    author: "",
    status: "draft",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const token = localStorage.getItem("token");

  const fetchBlogs = async () => {
    setFetching(true);
    try {
      const res = await axios.get(`${API}/blogs`);
      setBlogs(res.data);
    } catch (err) {
      toast.error("Failed to fetch blogs.");
      console.error("Failed to fetch blogs", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.content || !form.image) {
      toast.error("Title, Content, and Image are required.");
      setError("Title, Content, and Image are required.");
      return;
    }

    setLoading(true);
    const headers = { Authorization: `Bearer ${token}` };
    const payload = {
      ...form,
      tags: form.tags.split(",").map((tag) => tag.trim()),
    };

    try {
      if (editingId) {
        await axios.put(`${API}/blogs/${editingId}`, payload, { headers });
      } else {
        await axios.post(`${API}/blogs`, payload, { headers });
      }
      setForm({
        title: "",
        summary: "",
        content: "",
        image: "",
        tags: "",
        author: "",
        status: "draft",
      });
      setEditingId(null);
      fetchBlogs();
      toast.success("Blog saved successfully!");
    } catch (err) {
      toast.error("Failed to save blog post.");
      setError("Failed to save blog post.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id) => {
    setDeletingId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    setDeleting(true);
    const headers = { Authorization: `Bearer ${token}` };
    try {
      await axios.delete(`${API}/blogs/${deletingId}`, { headers });
      fetchBlogs();
      toast.success("Blog deleted successfully!");
      setShowDeleteModal(false);
      setDeletingId(null);
    } catch (err) {
      toast.error("Failed to delete blog.");
      console.error("Failed to delete blog", err);
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = (blog) => {
    setForm({
      title: blog.title,
      summary: blog.summary,
      content: blog.content,
      image: blog.image,
      tags: blog.tags.join(", "),
      author: blog.author,
      status: blog.status,
    });
    setEditingId(blog._id);
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold mb-8 text-gray-800">
          Manage Blog Posts
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Blog Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 mb-10 bg-white shadow-lg rounded-xl p-6 border border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Blog Title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="summary"
              value={form.summary}
              onChange={handleChange}
              placeholder="Summary"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="Tags (comma separated)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Markdown Content"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Author Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-semibold rounded-lg transition-all ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105"
            }`}
          >
            {loading
              ? editingId
                ? "Updating..."
                : "Adding..."
              : editingId
              ? "Update Blog Post"
              : "Add Blog Post"}
          </button>
        </form>

        {/* Blog List */}
        {fetching ? (
          <p className="text-center text-gray-600">Loading blog posts...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-xl"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    By {blog.author} •{" "}
                    {new Date(blog.publishedAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 mb-2">{blog.summary}</p>
                  <div className="prose max-h-24 overflow-hidden text-gray-700 text-sm">
                    <ReactMarkdown>{blog.content}</ReactMarkdown>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-end gap-4 mt-4">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="text-yellow-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(blog._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-96 text-center relative">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Confirm Delete
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this blog post?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className={`px-4 py-2 rounded-lg text-white transition ${
                    deleting
                      ? "bg-red-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
