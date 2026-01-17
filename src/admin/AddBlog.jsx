import { useMemo, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

import EditorJSInput from "../components/EditorJSInput";

import {
  DocumentTextIcon,
  PhotoIcon,
  TagIcon,
  UserIcon,
  StarIcon,
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

export default function AddBlog() {
  const [activeTab, setActiveTab] = useState("content");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    summary: "",

    // ✅ NEW: choose editor
    editorType: "editorjs", // "markdown" | "editorjs"

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

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const headers = useMemo(() => {
    return { Authorization: `Bearer ${token}` };
  }, [token]);

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

    setActiveTab("content");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!form.image.trim()) {
      toast.error("Cover image URL is required");
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
      await axios.post(`${API}/blogs`, payload, { headers });
      toast.success("Blog added successfully!");
      resetForm();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <div className="rounded-3xl border border-gray-200/60 bg-gradient-to-br from-white via-white to-blue-50/40 backdrop-blur-xl p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <DocumentTextIcon className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Add New Blog Post
              </h2>
              <p className="text-sm text-gray-500">
                Create a blog using Markdown or Notion Editor (EditorJS)
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-7">
            {["content", "seo", "settings"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setActiveTab(t)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
                  activeTab === t
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white hover:bg-gray-50 text-gray-700"
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* CONTENT TAB */}
            {activeTab === "content" && (
              <>
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
                  {form.slug && (
                    <p className="text-xs text-gray-500 mt-2">
                      Slug preview:{" "}
                      <span className="font-semibold">{form.slug}</span>
                    </p>
                  )}
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

                {/* Cover Image */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cover Image URL
                  </label>
                  <PhotoIcon className="h-5 w-5 absolute left-4 top-[52px] text-gray-400" />
                  <input
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="https://image-url.com/banner.png"
                    className="w-full pl-11 rounded-2xl border border-gray-300/60 px-5 py-4
                             focus:ring-4 focus:ring-blue-200 focus:border-blue-500
                             outline-none transition bg-white/80"
                  />
                </div>

                {/* Tags */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tags{" "}
                    <span className="text-xs text-gray-400">
                      (comma separated)
                    </span>
                  </label>
                  <TagIcon className="h-5 w-5 absolute left-4 top-[52px] text-gray-400" />
                  <input
                    name="tags"
                    value={form.tags}
                    onChange={handleChange}
                    placeholder="react, saas, startup"
                    className="w-full pl-11 rounded-2xl border border-gray-300/60 px-5 py-4
                             focus:ring-4 focus:ring-blue-200 focus:border-blue-500
                             outline-none transition bg-white/80"
                  />
                </div>

                {/* ✅ Editor Switch */}
                <div className="flex items-center gap-3 pt-2">
                  <p className="text-sm font-semibold text-gray-700">
                    Choose Editor:
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({ ...prev, editorType: "editorjs" }))
                    }
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
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
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
                      form.editorType === "markdown"
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    Markdown
                  </button>
                </div>

                {/* Editor Area */}
                <div className="pt-2">
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
                        placeholder="Write your blog content here..."
                        rows={7}
                        className="w-full rounded-2xl border border-gray-300/60 px-5 py-4
                                 focus:ring-4 focus:ring-blue-200 focus:border-blue-500
                                 outline-none transition bg-white/80 resize-none"
                      />

                      <div className="mt-4 border rounded-2xl p-5 bg-gray-50">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Meta Title (SEO)
                  </label>
                  <input
                    name="metaTitle"
                    value={form.metaTitle}
                    onChange={handleChange}
                    placeholder="SEO title..."
                    className="w-full rounded-2xl border border-gray-300/60 px-5 py-4
                             focus:ring-4 focus:ring-blue-200 focus:border-blue-500
                             outline-none transition bg-white/80"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    OG Image URL (optional)
                  </label>
                  <input
                    name="ogImage"
                    value={form.ogImage}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full rounded-2xl border border-gray-300/60 px-5 py-4
                             focus:ring-4 focus:ring-blue-200 focus:border-blue-500
                             outline-none transition bg-white/80"
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    name="metaDescription"
                    value={form.metaDescription}
                    onChange={handleChange}
                    placeholder="Max ~160 chars recommended"
                    rows={4}
                    className="w-full rounded-2xl border border-gray-300/60 px-5 py-4
                             focus:ring-4 focus:ring-blue-200 focus:border-blue-500
                             outline-none transition bg-white/80 resize-none"
                  />
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === "settings" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Author
                  </label>
                  <UserIcon className="h-5 w-5 absolute left-4 top-[52px] text-gray-400" />
                  <input
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    placeholder="Author name"
                    className="w-full pl-11 rounded-2xl border border-gray-300/60 px-5 py-4
                             focus:ring-4 focus:ring-blue-200 focus:border-blue-500
                             outline-none transition bg-white/80"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="General"
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

                <label className="flex items-center gap-3 px-4 py-4 rounded-2xl border bg-white/80">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />
                  <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <StarIcon className="h-5 w-5 text-yellow-500" />
                    Featured Post
                  </span>
                </label>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Schedule Publish (optional)
                  </label>
                  <input
                    type="datetime-local"
                    name="scheduledAt"
                    value={form.scheduledAt}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-300/60 px-5 py-4
                             focus:ring-4 focus:ring-blue-200 focus:border-blue-500
                             outline-none transition bg-white/80"
                  />
                </div>
              </div>
            )}

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
