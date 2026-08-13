import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import toast from "react-hot-toast";
import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  BookOpenIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  PlusIcon,
  DocumentTextIcon,
  PhotoIcon,
  TagIcon,
  UserIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  LinkIcon,
  FolderIcon,
  CheckIcon,
  GlobeAltIcon,
  CalendarIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const API = import.meta.env.VITE_API_URL || "/api";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Edit State
  const [editingId, setEditingId] = useState(null);
  const formRef = useRef(null);

  // Modal States
  const [viewingBlog, setViewingBlog] = useState(null);
  const [deletingBlog, setDeletingBlog] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // --- Complete Form State (Matches 100% of Mongoose Schema) ---
  const initialFormState = {
    title: "",
    slug: "",
    summary: "",
    content: "",
    image: "",
    ogImage: "",
    tags: "",
    category: "General",
    author: "Admin",
    status: "draft",
    featured: false,
    metaTitle: "",
    metaDescription: "",
    scheduledAt: "",
    publishedAt: "",
  };

  const [form, setForm] = useState(initialFormState);

  // --- Search & Filter State ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const token = localStorage.getItem("token");
  const headers = useMemo(
    () => ({ Authorization: `Bearer ${token}` }),
    [token],
  );

  const handleTitleChange = (e) => {
    const titleVal = e.target.value;
    setForm((prev) => ({
      ...prev,
      title: titleVal,
      slug: editingId
        ? prev.slug
        : titleVal
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, ""),
    }));
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/blogs`, { headers });
      let blogList = [];
      if (Array.isArray(res.data)) {
        blogList = res.data;
      } else if (Array.isArray(res.data.blogs)) {
        blogList = res.data.blogs;
      } else if (Array.isArray(res.data.data)) {
        blogList = res.data.data;
      }
      setBlogs(blogList);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Failed to load blogs");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleStartEdit = (blog) => {
    setEditingId(blog._id);
    setForm({
      title: blog.title || "",
      slug: blog.slug || "",
      summary: blog.summary || "",
      content: blog.content || "",
      image: blog.image || "",
      ogImage: blog.ogImage || "",
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || "",
      category: blog.category || "General",
      author: blog.author || "Admin",
      status: blog.status || "draft",
      featured: Boolean(blog.featured),
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
      scheduledAt: blog.scheduledAt
        ? new Date(blog.scheduledAt).toISOString().slice(0, 16)
        : "",
      publishedAt: blog.publishedAt
        ? new Date(blog.publishedAt).toISOString().slice(0, 16)
        : "",
    });
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(initialFormState);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Title and Content are required!");
      return;
    }

    setSubmitting(true);
    const payload = {
      ...form,
      tags: form.tags
        ? form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
      scheduledAt: form.scheduledAt ? new Date(form.scheduledAt) : null,
      publishedAt: form.publishedAt ? new Date(form.publishedAt) : null,
    };

    try {
      if (editingId) {
        await axios.put(`${API}/blogs/${editingId}`, payload, { headers });
        toast.success("Blog updated successfully!");
      } else {
        await axios.post(`${API}/blogs`, payload, { headers });
        toast.success("Blog created successfully!");
      }

      handleCancelEdit();
      fetchBlogs();
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error(err.response?.data?.message || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deletingBlog) return;
    setDeleting(true);
    try {
      await axios.delete(`${API}/blogs/${deletingBlog._id}`, { headers });
      toast.success("Blog deleted successfully!");
      setBlogs((prev) => prev.filter((b) => b._id !== deletingBlog._id));
      setDeletingBlog(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete blog");
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    if (deletingBlog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [deletingBlog]);

  const categories = useMemo(() => {
    if (!Array.isArray(blogs)) return ["All"];
    const cats = new Set(blogs.map((b) => b.category).filter(Boolean));
    return ["All", ...Array.from(cats)];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    if (!Array.isArray(blogs)) return [];

    return blogs
      .filter((blog) => {
        const matchesSearch =
          blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.tags?.some((t) =>
            t.toLowerCase().includes(searchTerm.toLowerCase()),
          );

        const matchesCategory =
          selectedCategory === "All" || blog.category === selectedCategory;

        const matchesStatus =
          selectedStatus === "All" || blog.status === selectedStatus;

        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "latest") {
          return (
            new Date(b.createdAt || Date.now()) -
            new Date(a.createdAt || Date.now())
          );
        }
        if (sortBy === "oldest") {
          return (
            new Date(a.createdAt || Date.now()) -
            new Date(b.createdAt || Date.now())
          );
        }
        if (sortBy === "title") {
          return (a.title || "").localeCompare(b.title || "");
        }
        return 0;
      });
  }, [blogs, searchTerm, selectedCategory, selectedStatus, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedStatus, sortBy]);

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage) || 1;
  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBlogs.slice(start, start + itemsPerPage);
  }, [filteredBlogs, currentPage, itemsPerPage]);

  // Lock body scroll when viewing modal
  useEffect(() => {
    if (viewingBlog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [viewingBlog]);

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* HEADER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-1 ring-red-500/10">
              <BookOpenIcon className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Manage Blogs CMS
              </h1>
              <p className="text-xs text-gray-500">
                Full-schema Mongoose model management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-500 bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-sm">
              Total Blogs:{" "}
              <strong className="text-gray-900">{filteredBlogs.length}</strong>
            </span>
            <button
              onClick={fetchBlogs}
              className="inline-flex items-center gap-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold px-3.5 py-2 rounded-xl transition shadow-sm cursor-pointer"
            >
              <ArrowPathIcon
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:flex-1">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3.5 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs by title, tags, author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition bg-gray-50/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-xs font-medium bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:border-red-500 transition text-gray-700"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  Category: {cat}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-xs font-medium bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:border-red-500 transition text-gray-700"
            >
              <option value="All">Status: All</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-xs font-medium bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:border-red-500 transition text-gray-700"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
        </div>

        {/* INLINE "ADD / EDIT BLOG" FORM */}
        <div
          ref={formRef}
          className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-800 tracking-wide uppercase flex items-center gap-2">
              {editingId ? (
                <>
                  <PencilSquareIcon className="w-4 h-4 text-purple-600" />
                  Edit Blog Details
                </>
              ) : (
                <>
                  <PlusIcon className="w-4 h-4 text-red-600" />
                  Add New Blog
                </>
              )}
            </h2>
            {editingId && (
              <button
                onClick={handleCancelEdit}
                className="text-xs font-semibold text-gray-500 hover:text-gray-700 underline"
              >
                Cancel Editing
              </button>
            )}
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* Title & Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <DocumentTextIcon className="w-5 h-5 absolute left-3.5 top-3 text-gray-400" />
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleTitleChange}
                  placeholder="Blog Title *"
                  required
                  className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white outline-none focus:border-red-500 transition"
                />
              </div>

              <div className="relative">
                <LinkIcon className="w-5 h-5 absolute left-3.5 top-3 text-gray-400" />
                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleFormChange}
                  placeholder="URL Slug (e.g. my-first-blog)"
                  className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white outline-none focus:border-red-500 transition"
                />
              </div>
            </div>

            {/* Images: Featured Image & OpenGraph Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <PhotoIcon className="w-5 h-5 absolute left-3.5 top-3 text-gray-400" />
                <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={handleFormChange}
                  placeholder="Cover Image URL (image)"
                  className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white outline-none focus:border-red-500 transition"
                />
              </div>

              <div className="relative">
                <GlobeAltIcon className="w-5 h-5 absolute left-3.5 top-3 text-gray-400" />
                <input
                  type="text"
                  name="ogImage"
                  value={form.ogImage}
                  onChange={handleFormChange}
                  placeholder="OpenGraph Image URL (ogImage)"
                  className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white outline-none focus:border-red-500 transition"
                />
              </div>
            </div>

            {/* Tags & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <TagIcon className="w-5 h-5 absolute left-3.5 top-3 text-gray-400" />
                <input
                  type="text"
                  name="tags"
                  value={form.tags}
                  onChange={handleFormChange}
                  placeholder="Tags (comma separated e.g. React, WebDev)"
                  className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white outline-none focus:border-red-500 transition"
                />
              </div>

              <div className="relative">
                <FolderIcon className="w-5 h-5 absolute left-3.5 top-3 text-gray-400" />
                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleFormChange}
                  placeholder="Category (e.g. General)"
                  className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white outline-none focus:border-red-500 transition"
                />
              </div>
            </div>

            {/* Summary */}
            <input
              type="text"
              name="summary"
              value={form.summary}
              maxLength={250}
              onChange={handleFormChange}
              placeholder="Summary / Excerpt (Max 250 characters)"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white outline-none focus:border-red-500 transition"
            />

            {/* Markdown Content */}
            <textarea
              name="content"
              value={form.content}
              onChange={handleFormChange}
              placeholder="Write your Pure Markdown content here... *"
              rows={4}
              required
              className="w-full p-4 text-sm rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white outline-none focus:border-red-500 transition resize-y font-mono"
            />

            {/* SEO SECTION */}
            <div className="p-4 bg-gray-50/60 rounded-2xl border border-gray-100 space-y-3">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                SEO Metadata Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="metaTitle"
                  value={form.metaTitle}
                  onChange={handleFormChange}
                  placeholder="Meta Title"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 bg-white outline-none focus:border-red-500 transition"
                />
                <input
                  type="text"
                  name="metaDescription"
                  value={form.metaDescription}
                  maxLength={160}
                  onChange={handleFormChange}
                  placeholder="Meta Description (Max 160 characters)"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 bg-white outline-none focus:border-red-500 transition"
                />
              </div>
            </div>

            {/* PUBLISHING & SCHEDULING */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                  Scheduled At
                </label>
                <input
                  type="datetime-local"
                  name="scheduledAt"
                  value={form.scheduledAt}
                  onChange={handleFormChange}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white outline-none focus:border-red-500 transition text-gray-700"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                  Published At
                </label>
                <input
                  type="datetime-local"
                  name="publishedAt"
                  value={form.publishedAt}
                  onChange={handleFormChange}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white outline-none focus:border-red-500 transition text-gray-700"
                />
              </div>
            </div>

            {/* Author, Status, Featured & Action Button */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center pt-2">
              <div className="relative sm:col-span-1">
                <UserIcon className="w-5 h-5 absolute left-3.5 top-3 text-gray-400" />
                <input
                  type="text"
                  name="author"
                  value={form.author}
                  onChange={handleFormChange}
                  placeholder="Author"
                  className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white outline-none focus:border-red-500 transition"
                />
              </div>

              <select
                name="status"
                value={form.status}
                onChange={handleFormChange}
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white outline-none focus:border-red-500 transition text-gray-700"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>

              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-medium px-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleFormChange}
                  className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
                />
                Mark Featured
              </label>

              <button
                type="submit"
                disabled={submitting}
                className={`inline-flex items-center justify-center gap-2 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition shadow-md disabled:opacity-50 cursor-pointer ${
                  editingId
                    ? "bg-purple-600 hover:bg-purple-700 shadow-purple-500/10"
                    : "bg-red-600 hover:bg-red-700 shadow-red-500/10"
                }`}
              >
                {editingId ? (
                  <>
                    <CheckIcon className="w-4 h-4" />
                    {submitting ? "Updating..." : "Update Blog"}
                  </>
                ) : (
                  <>
                    <PlusIcon className="w-4 h-4" />
                    {submitting ? "Adding..." : "Add Blog"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* BLOG GRID LIST */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border border-gray-200 p-4 space-y-4 animate-pulse"
              >
                <div className="h-48 bg-gray-200 rounded-2xl w-full" />
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : paginatedBlogs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-200/80 p-12 text-center space-y-3">
            <BookOpenIcon className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-base font-semibold text-gray-800">
              No blogs found
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Try adjusting your search filters or add a new blog post using the
              form above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={
                        blog.image ||
                        "https://images.unsplash.com/photo-1499750310107-5fef28a66643"
                      }
                      alt={blog.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1499750310107-5fef28a66643";
                      }}
                    />
                    {blog.featured && (
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                        <StarIcon className="w-3 h-3 fill-current" />
                        FEATURED
                      </span>
                    )}
                    <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full">
                      {blog.category || "General"}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-base font-bold text-gray-900 line-clamp-1">
                        {blog.title}
                      </h2>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => setViewingBlog(blog)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                          title="View Details"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleStartEdit(blog)}
                          className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition cursor-pointer"
                          title="Edit Blog"
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingBlog(blog)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                          title="Delete Blog"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <span className="text-gray-500">
                        {blog.author || "Admin"}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span
                        className={`uppercase tracking-wider text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          blog.status === "published"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {blog.status || "draft"}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="inline-flex items-center gap-1 text-gray-500 text-[11px]">
                        <ChartBarIcon className="w-3.5 h-3.5" />
                        {blog.views || 0} views
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2">
                      {blog.summary ||
                        blog.content?.substring(0, 100) ||
                        "No summary provided."}
                    </p>

                    {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {blog.tags.slice(0, 5).map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-600 text-[11px] font-medium px-2 py-0.5 rounded-md"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION CONTROLS */}
        {!loading && filteredBlogs.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500 font-medium">
              Showing{" "}
              <strong className="text-gray-800">
                {Math.min(
                  (currentPage - 1) * itemsPerPage + 1,
                  filteredBlogs.length,
                )}
              </strong>{" "}
              to{" "}
              <strong className="text-gray-800">
                {Math.min(currentPage * itemsPerPage, filteredBlogs.length)}
              </strong>{" "}
              of{" "}
              <strong className="text-gray-800">{filteredBlogs.length}</strong>{" "}
              blogs
            </p>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                      currentPage === pageNum
                        ? "bg-red-600 text-white shadow-sm"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                ),
              )}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* VIEW BLOG SCHEMA MODAL */}
      {viewingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full h-full max-h-[88vh] flex flex-col shadow-2xl border border-slate-200/80 overflow-hidden ring-1 ring-black/5">
            {/* 1. STICKY HEADER */}
            <div className="px-5 sm:px-8 py-4 sm:py-5 border-b border-slate-100 flex items-start sm:items-center justify-between bg-white shrink-0 gap-3">
              <div className="space-y-1 pr-2 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-extrabold text-red-600 tracking-wider uppercase bg-red-50/80 border border-red-200/60 px-2.5 py-0.5 rounded-full shrink-0">
                    Full Schema Inspector
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-100/80 px-2 py-0.5 rounded-md truncate max-w-[140px] sm:max-w-none">
                    ID: {viewingBlog._id || "N/A"}
                  </span>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug truncate">
                  {viewingBlog.title}
                </h3>
              </div>

              <button
                onClick={() => setViewingBlog(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer shrink-0"
              >
                <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
              </button>
            </div>

            {/* 2. INNER SCROLLABLE CONTENT BODY */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 sm:space-y-8 divide-y divide-slate-100 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
              {/* MEDIA PREVIEWS */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Media Previews
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Main Cover Image */}
                  <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80">
                    {viewingBlog.image ? (
                      <img
                        src={viewingBlog.image}
                        alt="Cover"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-slate-400 text-xs">
                        <PhotoIcon className="w-8 h-8 mb-1 opacity-50" />
                        No cover image
                      </div>
                    )}
                    <span className="absolute bottom-2.5 left-2.5 text-[10px] font-bold text-white bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                      Cover Image (image)
                    </span>
                  </div>

                  {/* OG Image */}
                  <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80">
                    {viewingBlog.ogImage ? (
                      <img
                        src={viewingBlog.ogImage}
                        alt="OpenGraph"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-slate-400 text-xs">
                        <GlobeAltIcon className="w-8 h-8 mb-1 opacity-50" />
                        No OG Image specified
                      </div>
                    )}
                    <span className="absolute bottom-2.5 left-2.5 text-[10px] font-bold text-white bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                      OpenGraph Image (ogImage)
                    </span>
                  </div>
                </div>
              </div>

              {/* METADATA GRID */}
              <div className="pt-6 space-y-2.5">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Schema Properties
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                      Author
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {viewingBlog.author || "Admin"}
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                      Status
                    </span>
                    <span
                      className={`text-xs font-bold capitalize ${
                        viewingBlog.status === "published"
                          ? "text-emerald-600"
                          : "text-amber-600"
                      }`}
                    >
                      ● {viewingBlog.status || "draft"}
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                      Category
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {viewingBlog.category || "General"}
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                      Featured
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        viewingBlog.featured
                          ? "text-amber-600"
                          : "text-slate-700"
                      }`}
                    >
                      {viewingBlog.featured ? "★ Featured" : "Standard"}
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                      Views
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {viewingBlog.views ?? 0}
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60 col-span-2 sm:col-span-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                      Slug
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-800 truncate block">
                      /{viewingBlog.slug || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* SEO OVERVIEW SECTION */}
              <div className="pt-6 space-y-2.5">
                <h4 className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                  SEO & Metadata Configuration
                </h4>
                <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-2 text-xs">
                  <div>
                    <strong className="text-indigo-950 font-bold block">
                      Meta Title:
                    </strong>
                    <span className="text-slate-700 font-medium">
                      {viewingBlog.metaTitle || viewingBlog.title || "Not set"}
                    </span>
                  </div>
                  <div>
                    <strong className="text-indigo-950 font-bold block">
                      Meta Description:
                    </strong>
                    <span className="text-slate-700 font-medium">
                      {viewingBlog.metaDescription || "Not set"}
                    </span>
                  </div>
                </div>
              </div>

              {/* SUMMARY */}
              <div className="pt-6 space-y-2.5">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Summary / Excerpt
                </h4>
                <div className="text-xs sm:text-sm text-slate-700 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/70 font-medium leading-relaxed">
                  {viewingBlog.summary || "No summary provided."}
                </div>
              </div>

              {/* HIGH VISIBILITY PURE MARKDOWN CONTENT BLOCK */}
              <div className="pt-6 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Pure Markdown Content
                  </h4>
                  <span className="text-[10px] font-mono text-emerald-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-700">
                    markdown
                  </span>
                </div>

                <div className="rounded-2xl bg-slate-950 border border-slate-800 p-5 shadow-inner overflow-hidden">
                  <div className="text-xs text-slate-100 font-mono whitespace-pre-wrap max-h-64 overflow-y-auto leading-relaxed select-text [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full">
                    {viewingBlog.content || "// No markdown content provided."}
                  </div>
                </div>
              </div>

              {/* TAGS */}
              <div className="pt-6 space-y-2.5">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Tags List
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(viewingBlog.tags) &&
                  viewingBlog.tags.length > 0 ? (
                    viewingBlog.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 border border-slate-200/70 text-xs font-semibold px-3 py-1 rounded-xl transition"
                      >
                        #{t}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">
                      No tags attached
                    </span>
                  )}
                </div>
              </div>

              {/* COMPLETE DATES & TIMESTAMPS */}
              <div className="pt-6 space-y-2.5">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Dates & Schedule Timestamps
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                      Scheduled At
                    </span>
                    <span className="text-xs font-semibold text-slate-800 truncate block">
                      {viewingBlog.scheduledAt
                        ? new Date(viewingBlog.scheduledAt).toLocaleString()
                        : "N/A"}
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                      Published At
                    </span>
                    <span className="text-xs font-semibold text-slate-800 truncate block">
                      {viewingBlog.publishedAt
                        ? new Date(viewingBlog.publishedAt).toLocaleString()
                        : "N/A"}
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                      Created At
                    </span>
                    <span className="text-xs font-semibold text-slate-800 truncate block">
                      {viewingBlog.createdAt
                        ? new Date(viewingBlog.createdAt).toLocaleString()
                        : "N/A"}
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                      Updated At
                    </span>
                    <span className="text-xs font-semibold text-slate-800 truncate block">
                      {viewingBlog.updatedAt
                        ? new Date(viewingBlog.updatedAt).toLocaleString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. STICKY FOOTER */}
            <div className="px-5 sm:px-8 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end shrink-0">
              <button
                onClick={() => setViewingBlog(null)}
                className="bg-slate-900 hover:bg-black text-white font-semibold text-xs px-6 py-2.5 rounded-xl transition shadow-xs active:scale-95 cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DANGEROUS DELETE MODAL */}
      {deletingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
          <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-rose-100/80 overflow-hidden transform transition-all scale-100">
            {/* GLOWING TOP ACCENT BAR */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 shadow-sm shadow-rose-500/50" />

            {/* HEADER SECTION WITH ICON & PREMIUM DANGER ZONE BADGE */}
            <div className="flex items-start gap-4 pt-1">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-50 to-red-100/60 text-rose-600 ring-4 ring-rose-50/80 shadow-sm">
                <ExclamationTriangleIcon className="w-6 h-6" />
              </div>

              <div className="space-y-1.5">
                {/* PREMIUM DANGER ZONE BADGE */}
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-black tracking-widest bg-rose-100/90 text-rose-700 border border-rose-200/60 uppercase shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
                  Danger Zone
                </div>

                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Delete Blog Post?
                </h3>
              </div>
            </div>

            {/* WARNING DESCRIPTION */}
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              You are about to permanently remove this blog post. This process{" "}
              <span className="text-rose-600 font-bold underline decoration-rose-300 underline-offset-2">
                cannot be undone
              </span>{" "}
              and will clear all associated data from your database.
            </p>

            {/* ITEM CARD HIGHLIGHT */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-rose-50/80 to-red-50/40 p-3.5 rounded-2xl border border-rose-200/60 text-xs font-bold text-slate-800 shadow-2xs">
              <div className="p-1.5 bg-white/80 rounded-xl shadow-2xs text-rose-500 shrink-0">
                <TrashIcon className="w-4 h-4" />
              </div>
              <span className="truncate">{deletingBlog.title}</span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingBlog(null)}
                disabled={deleting}
                className="px-5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 active:scale-95 rounded-xl transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200/50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 active:scale-95 rounded-xl shadow-lg shadow-rose-500/30 transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <TrashIcon className="w-4 h-4" />
                    Delete Permanently
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
