import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import AdminLayout from "../components/AdminLayout";
import toast from "react-hot-toast";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  DocumentTextIcon,
  TagIcon,
  UserIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

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

  const Spinner = ({ size = "5" }) => (
    <svg
      className={`animate-spin h-${size} w-${size} text-white`}
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
  );

  const fetchBlogs = async () => {
    setFetching(true);
    try {
      const res = await axios.get(`${API}/blogs`);
      setBlogs(res.data);
    } catch (err) {
      toast.error("Failed to fetch blogs");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.content || !form.image) {
      toast.error("Title, Content, and Image are required");
      return;
    }

    setLoading(true);
    const headers = { Authorization: `Bearer ${token}` };

    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()),
    };

    try {
      editingId
        ? await axios.put(`${API}/blogs/${editingId}`, payload, { headers })
        : await axios.post(`${API}/blogs`, payload, { headers });

      toast.success("Blog saved successfully");
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
    } catch {
      toast.error("Failed to save blog");
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    setDeleting(true);
    const headers = { Authorization: `Bearer ${token}` };

    try {
      await axios.delete(`${API}/blogs/${deletingId}`, { headers });
      toast.success("Blog deleted");
      fetchBlogs();
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
      setDeletingId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <DocumentTextIcon className="h-7 w-7 text-indigo-600" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Blog Management
              </h2>
              <p className="text-sm text-gray-500">
                Create and manage blog content
              </p>
            </div>
          </div>
          <span className="text-sm text-gray-500">
            Total Posts: {blogs.length}
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-10"
        >
          <h3 className="font-semibold text-gray-700 mb-4">
            {editingId ? "Edit Blog Post" : "Create New Blog"}
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="relative">
              <DocumentTextIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Blog Title"
                className="w-full pl-10 pr-3 py-2.5 border rounded-md"
              />
            </div>

            <input
              name="summary"
              value={form.summary}
              onChange={handleChange}
              placeholder="Summary"
              className="w-full px-3 py-2.5 border rounded-md"
            />

            <div className="relative">
              <PhotoIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full pl-10 pr-3 py-2.5 border rounded-md"
              />
            </div>

            <div className="relative">
              <TagIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="Tags (comma separated)"
                className="w-full pl-10 pr-3 py-2.5 border rounded-md"
              />
            </div>
          </div>

          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Markdown Content"
            className="w-full mt-4 p-3 border rounded-md h-40"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="relative">
              <UserIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Author Name"
                className="w-full pl-10 pr-3 py-2.5 border rounded-md"
              />
            </div>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border rounded-md"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-5 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-white font-medium transition
            ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }
          `}
          >
            {loading ? (
              <>
                <Spinner />
                {editingId ? "Updating blog..." : "Creating blog..."}
              </>
            ) : (
              <>
                <PlusIcon className="h-5 w-5" />
                {editingId ? "Update Blog" : "Create Blog"}
              </>
            )}
          </button>
        </form>

        {fetching ? (
          <p className="text-center text-gray-500">Loading blogs...</p>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white border rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {blog.author} • {blog.status.toUpperCase()}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="p-2 hover:bg-gray-100 rounded-md"
                    >
                      <PencilSquareIcon className="h-5 w-5 text-indigo-600" />
                    </button>
                    <button
                      onClick={() => {
                        setDeletingId(blog._id);
                        setShowDeleteModal(true);
                      }}
                      className="p-2 hover:bg-red-50 rounded-md"
                    >
                      <TrashIcon className="h-5 w-5 text-red-600" />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {blog.summary}
                </p>

                <div className="prose text-xs mt-2 max-h-24 overflow-hidden">
                  <ReactMarkdown>{blog.content}</ReactMarkdown>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="font-semibold text-lg mb-2">Confirm Delete</h3>
              <p className="text-sm text-gray-600 mb-4">
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleting}
                  className={`px-4 py-2 rounded-md text-white flex items-center gap-2 transition
                    ${
                      deleting
                        ? "bg-red-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }
                  `}
                >
                  {deleting ? (
                    <>
                      <Spinner />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
