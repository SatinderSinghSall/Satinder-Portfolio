import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import AdminLayout from "../components/AdminLayout";

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
      summary: blog.summary,
      content: blog.content,
      image: blog.image,
      tags: blog.tags.join(", "),
      author: blog.author,
      status: blog.status,
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
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Manage Blog Posts</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3 mb-10">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border"
          />
          <input
            name="summary"
            value={form.summary}
            onChange={handleChange}
            placeholder="Summary"
            className="w-full p-2 border"
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Markdown Content"
            className="w-full p-2 border h-32"
          />
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full p-2 border"
          />
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
            className="w-full p-2 border"
          />
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Author Name"
            className="w-full p-2 border"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-2 border"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 text-white ${
              loading ? "bg-blue-400" : "bg-blue-600"
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

        {fetching ? (
          <p>Loading blog posts...</p>
        ) : (
          <ul className="space-y-6">
            {blogs.map((blog) => (
              <li key={blog._id} className="border p-4 rounded-md">
                <h3 className="text-xl font-bold">{blog.title}</h3>
                <p className="text-gray-500 text-sm mb-2">
                  By {blog.author} •{" "}
                  {new Date(blog.publishedAt).toLocaleDateString()}
                </p>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover mb-2 rounded"
                />
                <p className="text-sm italic mb-2">{blog.summary}</p>
                <div className="prose">
                  <ReactMarkdown>{blog.content}</ReactMarkdown>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-200 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-3 space-x-2">
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
    </AdminLayout>
  );
}
