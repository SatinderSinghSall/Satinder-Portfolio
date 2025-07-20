import { useEffect, useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL || "/api";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", image: "" });
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("token");

  const fetchBlogs = async () => {
    const res = await axios.get(`${API}/blogs`);
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = { Authorization: `Bearer ${token}` };

    if (editingId) {
      await axios.put(`/api/blogs/${editingId}`, form, { headers });
    } else {
      await axios.post("/api/blogs", form, { headers });
    }

    setForm({ title: "", content: "", image: "" });
    setEditingId(null);
    fetchBlogs();
  };

  const handleEdit = (blog) => {
    setForm(blog);
    setEditingId(blog._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBlogs();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Blog Posts</h2>

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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          {editingId ? "Update" : "Add"} Blog Post
        </button>
      </form>

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
    </div>
  );
}
