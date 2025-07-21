import { useEffect, useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL || "/api";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", image: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const fetchBlogs = async () => {
    setFetching(true);
    try {
      const res = await axios.get(`${API}/blogs`);
      setBlogs(res.data);
    } catch (err) {
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
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    const headers = { Authorization: `Bearer ${token}` };

    try {
      if (editingId) {
        await axios.put(`${API}/blogs/${editingId}`, form, { headers });
      } else {
        await axios.post(`${API}/blogs`, form, { headers });
      }
      setForm({ title: "", content: "", image: "" });
      setEditingId(null);
      fetchBlogs();
    } catch (err) {
      setError("Failed to save blog post.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setForm({
      title: blog.title,
      content: blog.content,
      image: blog.image,
    });
    setEditingId(blog._id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    const headers = { Authorization: `Bearer ${token}` };
    try {
      await axios.delete(`${API}/blogs/${id}`, { headers });
      fetchBlogs();
    } catch (err) {
      console.error("Failed to delete blog", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Blog Posts</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3 mb-8">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border"
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Content"
          className="w-full p-2 border h-32"
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border"
        />
        <button
          type="submit"
          disabled={loading}
          className={`flex items-center gap-2 px-4 py-2 text-white ${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600"
          }`}
        >
          {loading && (
            <svg
              className="w-5 h-5 animate-spin"
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
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          )}
          {loading
            ? editingId
              ? "Updating..."
              : "Adding..."
            : editingId
            ? "Update Blog Post"
            : "Add Blog Post"}
        </button>
      </form>

      {fetching ? (
        <p>Loading blog posts...</p>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <li key={blog._id} className="mb-4 border-b pb-2">
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <img
                src={blog.image}
                alt=""
                className="w-48 h-32 object-cover my-2"
              />
              <p>{blog.content.slice(0, 100)}...</p>
              <div className="space-x-2 mt-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="text-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
