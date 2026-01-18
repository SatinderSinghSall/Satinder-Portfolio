import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

import AdminLayout from "../components/AdminLayout";
import toast from "react-hot-toast";
import EditorJSInput from "../components/EditorJSInput";

import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  DocumentTextIcon,
  TagIcon,
  UserIcon,
  PhotoIcon,
  StarIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";

const API = import.meta.env.VITE_API_URL || "/api";

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState("content");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    summary: "",

    // ✅ NEW: choose editor
    editorType: "markdown", // "markdown" | "editorjs"

    // markdown
    content: "",

    // editorjs
    contentBlocks: {
      time: Date.now(),
      blocks: [],
      version: "2.28.2",
    },

    image: "",
    ogImage: "",
    tags: "",
    category: "General",
    author: "",
    status: "draft",
    featured: false,
    metaTitle: "",
    metaDescription: "",
    scheduledAt: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // SaaS filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState("latest");

  const token = localStorage.getItem("token");

  const headers = useMemo(() => {
    return { Authorization: `Bearer ${token}` };
  }, [token]);

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
      const params = {};
      if (statusFilter !== "all") params.status = statusFilter;
      if (search.trim()) params.search = search.trim();
      if (sort) params.sort = sort;

      const res = await axios.get(`${API}/blogs`, { params });
      setBlogs(res.data);
    } catch {
      toast.error("Failed to fetch blogs");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, sort]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "title") {
      setForm((prev) => ({
        ...prev,
        title: value,
        slug: slugify(value),
        metaTitle: prev.metaTitle || value,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      slug: "",
      summary: "",

      editorType: "editorjs",

      content: "",
      contentBlocks: {
        time: Date.now(),
        blocks: [],
        version: "2.28.2",
      },

      image: "",
      ogImage: "",
      tags: "",
      category: "General",
      author: "",
      status: "draft",
      featured: false,
      metaTitle: "",
      metaDescription: "",
      scheduledAt: "",
    });

    setEditingId(null);
    setActiveTab("content");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title) {
      toast.error("Title is required");
      return;
    }

    // validate based on editor type
    if (form.editorType === "markdown") {
      if (!form.content.trim()) {
        toast.error("Markdown content is required");
        return;
      }
    }

    if (form.editorType === "editorjs") {
      const hasBlocks = form.contentBlocks?.blocks?.length > 0;
      if (!hasBlocks) {
        toast.error("EditorJS content is required");
        return;
      }
    }

    setLoading(true);

    const payload = {
      title: form.title,
      summary: form.summary,

      editorType: form.editorType,

      content: form.content,
      contentBlocks: form.contentBlocks,

      image: form.image,
      ogImage: form.ogImage,
      tags: form.tags
        ? form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
      category: form.category,
      author: form.author,
      status: form.status,
      featured: form.featured,
      metaTitle: form.metaTitle,
      metaDescription: form.metaDescription,
      scheduledAt: form.scheduledAt ? new Date(form.scheduledAt) : null,
    };

    try {
      if (editingId) {
        await axios.put(`${API}/blogs/${editingId}`, payload, { headers });
        toast.success("Blog updated successfully");
      } else {
        await axios.post(`${API}/blogs`, payload, { headers });
        toast.success("Blog created successfully");
      }

      resetForm();
      fetchBlogs();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast.error("Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setForm({
      title: blog.title || "",
      slug: blog.slug || slugify(blog.title || ""),
      summary: blog.summary || "",

      editorType: blog.editorType || "editorjs",

      content: blog.content || "",
      contentBlocks: blog.contentBlocks || {
        time: Date.now(),
        blocks: [],
        version: "2.28.2",
      },

      image: blog.image || "",
      ogImage: blog.ogImage || "",
      tags: blog.tags?.join(", ") || "",
      category: blog.category || "General",
      author: blog.author || "",
      status: blog.status || "draft",
      featured: !!blog.featured,
      metaTitle: blog.metaTitle || blog.title || "",
      metaDescription: blog.metaDescription || "",
      scheduledAt: blog.scheduledAt
        ? new Date(blog.scheduledAt).toISOString().slice(0, 16)
        : "",
    });

    setEditingId(blog._id);
    setActiveTab("content");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDuplicate = async (blog) => {
    try {
      const payload = {
        title: `${blog.title} (Copy)`,
        summary: blog.summary,

        editorType: blog.editorType || "editorjs",

        content: blog.content || "",
        contentBlocks: blog.contentBlocks || {
          time: Date.now(),
          blocks: [],
          version: "2.28.2",
        },

        image: blog.image,
        ogImage: blog.ogImage,
        tags: blog.tags,
        category: blog.category,
        author: blog.author,
        status: "draft",
        featured: false,
        metaTitle: blog.metaTitle,
        metaDescription: blog.metaDescription,
      };

      await axios.post(`${API}/blogs`, payload, { headers });
      toast.success("Duplicated as draft");
      fetchBlogs();
    } catch {
      toast.error("Duplicate failed");
    }
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    setDeleting(true);

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

  const togglePublish = async (blog) => {
    try {
      await axios.put(
        `${API}/blogs/${blog._id}`,
        { status: blog.status === "published" ? "draft" : "published" },
        { headers },
      );
      toast.success("Status updated");
      fetchBlogs();
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-[1400px] mx-auto px-6 pb-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <DocumentTextIcon className="h-8 w-8 text-indigo-600" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Blog Management CMS
              </h2>
              <p className="text-sm text-gray-500">
                Create and manage blog content.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              Total Posts: {blogs.length}
            </span>
            <button
              onClick={fetchBlogs}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border bg-white hover:bg-gray-50"
            >
              <ArrowPathIcon className="h-5 w-5 text-gray-600" />
              Refresh
            </button>
          </div>
        </div>

        {/* SaaS Filters */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-6 flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchBlogs()}
              placeholder="Search blogs by title, summary, tags..."
              className="w-full pl-10 pr-3 py-2.5 border rounded-md"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 border rounded-md"
          >
            <option value="all">All</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2.5 border rounded-md"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="popular">Popular</option>
          </select>

          <button
            onClick={fetchBlogs}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium"
          >
            Apply
          </button>
        </div>

        {/* SaaS Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-10"
        >
          <div className="flex items-center justify-between gap-3 mb-4">
            <h3 className="font-semibold text-gray-800">
              {editingId ? "Edit Blog Post" : "Create New Blog Post"}
            </h3>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-sm px-3 py-2 rounded-md border hover:bg-gray-50"
              >
                Cancel Editing
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-5">
            {["content", "seo", "settings"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setActiveTab(t)}
                className={`px-4 py-2 rounded-md text-sm font-medium border transition ${
                  activeTab === t
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white hover:bg-gray-50 text-gray-700"
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          {/* CONTENT TAB */}
          {activeTab === "content" && (
            <>
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
                  {form.slug && (
                    <p className="text-xs text-gray-500 mt-1">
                      Slug preview:{" "}
                      <span className="font-medium">{form.slug}</span>
                    </p>
                  )}
                </div>

                <input
                  name="summary"
                  value={form.summary}
                  onChange={handleChange}
                  placeholder="Summary / Excerpt (max ~250 chars)"
                  className="w-full px-3 py-2.5 border rounded-md"
                />

                <div className="relative">
                  <PhotoIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                  <input
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="Cover Image URL"
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

              {/* ✅ Editor Switch */}
              <div className="mt-5 flex items-center gap-3">
                <p className="text-sm font-semibold text-gray-700">
                  Choose Editor:
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, editorType: "editorjs" }))
                  }
                  className={`px-4 py-2 rounded-md text-sm font-semibold border transition ${
                    form.editorType === "editorjs"
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  Notion (EditorJS)
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, editorType: "markdown" }))
                  }
                  className={`px-4 py-2 rounded-md text-sm font-semibold border transition ${
                    form.editorType === "markdown"
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  Markdown
                </button>
              </div>

              {/* ✅ Editor Area */}
              <div className="mt-4">
                {form.editorType === "editorjs" ? (
                  <>
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Blog Content (Notion Style)
                    </p>
                    <EditorJSInput
                      value={form.contentBlocks}
                      onChange={(data) =>
                        setForm((prev) => ({
                          ...prev,
                          contentBlocks: data,
                        }))
                      }
                    />
                  </>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Blog Content (Markdown)
                    </p>

                    <textarea
                      name="content"
                      value={form.content}
                      onChange={handleChange}
                      placeholder="Write Markdown here..."
                      className="w-full p-3 border rounded-md h-44"
                    />

                    <div className="mt-4 border rounded-md p-4 bg-gray-50">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Live Preview
                      </p>

                      <div className="prose max-w-none text-sm">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm, remarkBreaks]}
                        >
                          {form.content || "*Start writing...*"}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {/* SEO TAB */}
          {activeTab === "seo" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <input
                name="metaTitle"
                value={form.metaTitle}
                onChange={handleChange}
                placeholder="Meta Title (SEO)"
                className="w-full px-3 py-2.5 border rounded-md"
              />
              <input
                name="ogImage"
                value={form.ogImage}
                onChange={handleChange}
                placeholder="OG Image URL (optional)"
                className="w-full px-3 py-2.5 border rounded-md"
              />
              <textarea
                name="metaDescription"
                value={form.metaDescription}
                onChange={handleChange}
                placeholder="Meta Description (max 160 chars)"
                className="w-full lg:col-span-2 px-3 py-2.5 border rounded-md h-28"
              />
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === "settings" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category (e.g. Product, Tech, Updates)"
                className="w-full px-3 py-2.5 border rounded-md"
              />

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border rounded-md"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>

              <label className="flex items-center gap-3 px-3 py-2.5 border rounded-md bg-gray-50">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                />
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <StarIcon className="h-5 w-5 text-yellow-500" />
                  Featured Post
                </span>
              </label>

              <div className="md:col-span-2">
                <label className="text-sm text-gray-600 block mb-1">
                  Schedule Publish (optional)
                </label>
                <input
                  type="datetime-local"
                  name="scheduledAt"
                  value={form.scheduledAt}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border rounded-md"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`mt-6 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-white font-medium transition
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
                {editingId ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>
                <PlusIcon className="h-5 w-5" />
                {editingId ? "Update Blog" : "Create Blog"}
              </>
            )}
          </button>
        </form>

        {/* Blog Cards */}
        {fetching ? (
          <p className="text-center text-gray-500">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16 bg-white border rounded-xl">
            <p className="text-gray-700 font-semibold">No blogs found</p>
            <p className="text-sm text-gray-500 mt-1">
              Create your first SaaS-style blog post ✨
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white border rounded-xl overflow-hidden hover:shadow-md transition"
              >
                {/* Cover */}
                <div className="h-44 bg-gray-100 overflow-hidden">
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      No Cover Image
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {blog.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {blog.author || "Admin"} • {blog.category || "General"}{" "}
                        •{" "}
                        {blog.status === "published" ? (
                          <span className="text-green-600 font-semibold">
                            PUBLISHED
                          </span>
                        ) : (
                          <span className="text-yellow-600 font-semibold">
                            DRAFT
                          </span>
                        )}
                      </p>

                      <span className="inline-flex items-center gap-1 text-xs mt-2 px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {blog.editorType === "markdown"
                          ? "Markdown"
                          : "Notion Editor"}
                      </span>

                      {blog.featured && (
                        <span className="inline-flex items-center gap-1 text-xs mt-2 ml-2 px-2 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
                          <StarIcon className="h-4 w-4" />
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDuplicate(blog)}
                        className="p-2 hover:bg-gray-100 rounded-md"
                        title="Duplicate"
                      >
                        <ClipboardDocumentIcon className="h-5 w-5 text-gray-700" />
                      </button>

                      <button
                        onClick={() => togglePublish(blog)}
                        className="px-3 py-2 text-xs font-semibold rounded-md border hover:bg-gray-50"
                        title="Toggle Publish"
                      >
                        {blog.status === "published" ? "Unpublish" : "Publish"}
                      </button>

                      <button
                        onClick={() => handleEdit(blog)}
                        className="p-2 hover:bg-gray-100 rounded-md"
                        title="Edit"
                      >
                        <PencilSquareIcon className="h-5 w-5 text-indigo-600" />
                      </button>

                      <button
                        onClick={() => {
                          setDeletingId(blog._id);
                          setShowDeleteModal(true);
                        }}
                        className="p-2 hover:bg-red-50 rounded-md"
                        title="Delete"
                      >
                        <TrashIcon className="h-5 w-5 text-red-600" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                    {blog.summary || "No summary added yet."}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {blog.tags?.length > 0 ? (
                      blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 px-2 py-1 rounded-full border"
                        >
                          #{tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">
                        No tags added
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-[420px] shadow-xl">
              <h3 className="font-semibold text-lg mb-2">Confirm Delete</h3>
              <p className="text-sm text-gray-600 mb-4">
                This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-md"
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
