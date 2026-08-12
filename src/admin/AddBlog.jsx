import { useMemo, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

import {
  DocumentTextIcon,
  PhotoIcon,
  TagIcon,
  UserIcon,
  StarIcon,
  GlobeAltIcon,
  AdjustmentsHorizontalIcon,
  EyeIcon,
  PencilSquareIcon,
  CheckCircleIcon,
  SparklesIcon,
  XMarkIcon,
  CalendarIcon,
  LinkIcon,
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
  const [editorMode, setEditorMode] = useState("edit"); // "edit" | "split" | "preview"
  const [isSlugTouched, setIsSlugTouched] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
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
      setForm((prev) => {
        const autoSlug = slugify(value);
        return {
          ...prev,
          title: value,
          slug: isSlugTouched ? prev.slug : autoSlug,
          metaTitle: prev.metaTitle === prev.title ? value : prev.metaTitle,
        };
      });
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = e.target.value.trim().replace(/^,/, "");
      if (!val) return;

      const currentTags = form.tags
        ? form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [];

      if (!currentTags.includes(val)) {
        const updated = [...currentTags, val].join(", ");
        setForm((prev) => ({ ...prev, tags: updated }));
      }
      e.target.value = "";
    }
  };

  const removeTag = (tagToRemove) => {
    const currentTags = form.tags
      ? form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];
    const updated = currentTags.filter((t) => t !== tagToRemove).join(", ");
    setForm((prev) => ({ ...prev, tags: updated }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      slug: "",
      summary: "",
      content: "",
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
    setIsSlugTouched(false);
    setActiveTab("content");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Blog title is required");
      setActiveTab("content");
      return;
    }

    if (!form.image.trim()) {
      toast.error("Cover image URL is required");
      setActiveTab("content");
      return;
    }

    if (!form.content.trim()) {
      toast.error("Markdown content is required");
      setActiveTab("content");
      return;
    }

    setLoading(true);

    const payload = {
      title: form.title,
      slug: form.slug,
      summary: form.summary,
      content: form.content,
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
      metaTitle: form.metaTitle || form.title,
      metaDescription: form.metaDescription || form.summary,
      scheduledAt: form.scheduledAt ? new Date(form.scheduledAt) : null,
    };

    try {
      await axios.post(`${API}/blogs`, payload, { headers });
      toast.success("Blog post created successfully!");
      resetForm();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add blog post");
    } finally {
      setLoading(false);
    }
  };

  const tagArray = form.tags
    ? form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-4">
        <form onSubmit={handleSubmit}>
          {/* STICKY TOP HEADER */}
          <div className="sticky top-4 z-20 mb-8 rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-md p-4 sm:p-6 shadow-sm transition-all duration-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-500/10">
                  <DocumentTextIcon className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                      New Article
                    </h1>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                      <SparklesIcon className="w-3 h-3 text-indigo-500" />
                      Markdown
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Draft, optimize, and publish content for your platform
                  </p>
                </div>
              </div>

              {/* ACTION BUTTONS & STATUS SELECT */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                >
                  <option value="draft">Save as Draft</option>
                  <option value="published">Publish Immediately</option>
                </select>

                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 md:flex-none inline-flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all duration-200 ${
                    loading
                      ? "bg-indigo-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 active:scale-[0.98]"
                  }`}
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <CheckCircleIcon className="w-4 h-4" />
                  )}
                  {loading ? "Publishing..." : "Save Article"}
                </button>
              </div>
            </div>
          </div>

          {/* MAIN GRID LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* NAVIGATION TABS & SIDE PANEL */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-white rounded-3xl border border-slate-200/80 p-3 shadow-sm space-y-1">
                {[
                  {
                    id: "content",
                    label: "Story Content",
                    icon: PencilSquareIcon,
                    desc: "Title & body text",
                  },
                  {
                    id: "seo",
                    label: "SEO & Search",
                    icon: GlobeAltIcon,
                    desc: "Meta tags & SERP preview",
                  },
                  {
                    id: "settings",
                    label: "Configuration",
                    icon: AdjustmentsHorizontalIcon,
                    desc: "Author, tags & schedule",
                  },
                ].map((t) => {
                  const Icon = t.icon;
                  const isActive = activeTab === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setActiveTab(t.id)}
                      className={`w-full flex items-center gap-3.5 p-3 rounded-2xl text-left transition-all duration-150 ${
                        isActive
                          ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-xl ${
                          isActive
                            ? "bg-slate-800 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{t.label}</p>
                        <p className="text-xs text-slate-400">{t.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* QUICK STATUS CARD */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Article Overview
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Auto Slug</span>
                    <span className="font-mono text-indigo-600 font-medium truncate max-w-[130px]">
                      {form.slug || "None"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Category</span>
                    <span className="font-medium text-slate-800">
                      {form.category || "General"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Featured</span>
                    <span
                      className={`font-semibold ${
                        form.featured ? "text-amber-600" : "text-slate-400"
                      }`}
                    >
                      {form.featured ? "Yes ⭐" : "No"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-slate-500">Visibility</span>
                    <span className="capitalize font-medium text-slate-800">
                      {form.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* TAB CONTENT AREA */}
            <div className="lg:col-span-9">
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
                {/* TAB 1: STORY CONTENT */}
                {activeTab === "content" && (
                  <div className="space-y-6">
                    {/* Title Input */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Blog Title <span className="text-rose-500">*</span>
                      </label>
                      <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="e.g. How We Scaled Our Infrastructure to 1M Users"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 px-4 py-3.5 text-base sm:text-lg font-semibold text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition"
                      />
                      {form.slug && (
                        <p className="text-xs text-slate-500 mt-2 flex items-center gap-1 font-mono">
                          <LinkIcon className="w-3 h-3 text-slate-400" />
                          Slug preview:{" "}
                          <span className="text-indigo-600 font-semibold">
                            {form.slug}
                          </span>
                        </p>
                      )}
                    </div>

                    {/* Summary Input */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Summary / Excerpt
                      </label>
                      <input
                        name="summary"
                        value={form.summary}
                        onChange={handleChange}
                        placeholder="A concise hook displayed in card feeds and listings..."
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition"
                      />
                    </div>

                    {/* Cover Image URL with Live Card */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Cover Image URL <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <PhotoIcon className="h-5 w-5 absolute left-4 top-3.5 text-slate-400" />
                        <input
                          name="image"
                          value={form.image}
                          onChange={handleChange}
                          placeholder="https://images.unsplash.com/photo-..."
                          className="w-full pl-11 rounded-2xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition"
                        />
                      </div>

                      {/* Image Preview Window */}
                      {form.image && (
                        <div className="mt-3 relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 group max-h-56">
                          <img
                            src={form.image}
                            alt="Cover Preview"
                            className="w-full h-56 object-cover opacity-90 transition group-hover:opacity-100"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                          <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium">
                            Live Image Preview
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Markdown Editor / Preview Toggles */}
                    <div className="pt-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                          Article Body (Markdown){" "}
                          <span className="text-rose-500">*</span>
                        </label>

                        <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200/60 text-xs">
                          {[
                            {
                              id: "edit",
                              label: "Editor",
                              icon: PencilSquareIcon,
                            },
                            {
                              id: "split",
                              label: "Split View",
                              icon: AdjustmentsHorizontalIcon,
                            },
                            { id: "preview", label: "Preview", icon: EyeIcon },
                          ].map((mode) => {
                            const Icon = mode.icon;
                            return (
                              <button
                                key={mode.id}
                                type="button"
                                onClick={() => setEditorMode(mode.id)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition ${
                                  editorMode === mode.id
                                    ? "bg-white text-slate-900 shadow-sm"
                                    : "text-slate-500 hover:text-slate-900"
                                }`}
                              >
                                <Icon className="w-3.5 h-3.5" />
                                {mode.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Editor Grid */}
                      <div
                        className={`grid gap-4 ${
                          editorMode === "split"
                            ? "grid-cols-1 lg:grid-cols-2"
                            : "grid-cols-1"
                        }`}
                      >
                        {(editorMode === "edit" || editorMode === "split") && (
                          <textarea
                            name="content"
                            value={form.content}
                            onChange={handleChange}
                            placeholder="Write your article markdown here... Use # Headings, **bold**, or code blocks."
                            rows={16}
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 p-4 text-sm font-mono text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition resize-y leading-relaxed"
                          />
                        )}

                        {(editorMode === "preview" ||
                          editorMode === "split") && (
                          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 overflow-y-auto max-h-[500px]">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
                              Rendered Content
                            </p>
                            <div className="prose prose-slate max-w-none text-sm leading-relaxed">
                              {form.content ? (
                                <ReactMarkdown
                                  remarkPlugins={[remarkGfm, remarkBreaks]}
                                >
                                  {form.content}
                                </ReactMarkdown>
                              ) : (
                                <p className="text-slate-400 italic">
                                  Start typing markdown to see live output...
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: SEO */}
                {activeTab === "seo" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                          Meta Title (SEO)
                        </label>
                        <input
                          name="metaTitle"
                          value={form.metaTitle}
                          onChange={handleChange}
                          placeholder="Optimized headline for search engines"
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                          Social OG Image URL
                        </label>
                        <input
                          name="ogImage"
                          value={form.ogImage}
                          onChange={handleChange}
                          placeholder="https://example.com/og-card.png"
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        URL Slug
                      </label>
                      <input
                        name="slug"
                        value={form.slug}
                        onChange={(e) => {
                          setIsSlugTouched(true);
                          setForm((prev) => ({
                            ...prev,
                            slug: slugify(e.target.value),
                          }));
                        }}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition font-mono"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                          Meta Description
                        </label>
                        <span
                          className={`text-xs ${
                            form.metaDescription.length > 160
                              ? "text-amber-600 font-bold"
                              : "text-slate-400"
                          }`}
                        >
                          {form.metaDescription.length} / 160
                        </span>
                      </div>
                      <textarea
                        name="metaDescription"
                        value={form.metaDescription}
                        onChange={handleChange}
                        placeholder="Brief summary that appears under your link on Google..."
                        rows={4}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 p-4 text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition resize-none"
                      />
                    </div>

                    {/* LIVE GOOGLE SERP CARD */}
                    <div className="pt-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                        Search Engine Result Card Preview
                      </p>
                      <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 space-y-1.5 shadow-inner">
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <GlobeAltIcon className="w-3.5 h-3.5 text-slate-400" />
                          https://yourdomain.com/blog/
                          {form.slug || "article-url-slug"}
                        </p>
                        <h3 className="text-base font-semibold text-blue-700 hover:underline cursor-pointer truncate">
                          {form.metaTitle ||
                            form.title ||
                            "Your Page Meta Title Appears Here"}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                          {form.metaDescription ||
                            form.summary ||
                            "Add a meta description to see how your article snippet will look on Google search results pages."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: SETTINGS */}
                {activeTab === "settings" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Author Name
                      </label>
                      <div className="relative">
                        <UserIcon className="h-5 w-5 absolute left-4 top-3.5 text-slate-400" />
                        <input
                          name="author"
                          value={form.author}
                          onChange={handleChange}
                          placeholder="e.g. Jane Doe"
                          className="w-full pl-11 rounded-2xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Category
                      </label>
                      <input
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        placeholder="General, Engineering, Tutorials..."
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition"
                      />
                    </div>

                    {/* INTERACTIVE TAG INPUT */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Tags (Press Enter or Comma)
                      </label>
                      <div className="relative">
                        <TagIcon className="h-5 w-5 absolute left-4 top-3.5 text-slate-400" />
                        <input
                          type="text"
                          onKeyDown={handleAddTag}
                          placeholder="Type tag and press Enter..."
                          className="w-full pl-11 rounded-2xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition"
                        />
                      </div>

                      {/* Tag Pills */}
                      {tagArray.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {tagArray.map((tag, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                            >
                              #{tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="text-slate-400 hover:text-rose-600 transition"
                              >
                                <XMarkIcon className="w-3.5 h-3.5" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* FEATURED TOGGLE CARD */}
                    <div className="md:col-span-2 pt-2">
                      <label className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50/40 hover:bg-slate-50 cursor-pointer transition">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-500/10">
                            <StarIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              Featured Article
                            </p>
                            <p className="text-xs text-slate-500">
                              Pin this post to main hero banners and highlighted
                              feeds
                            </p>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          name="featured"
                          checked={form.featured}
                          onChange={handleChange}
                          className="h-5 w-5 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 transition"
                        />
                      </label>
                    </div>

                    {/* SCHEDULE DATE */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Schedule Future Publish (Optional)
                      </label>
                      <div className="relative">
                        <CalendarIcon className="h-5 w-5 absolute left-4 top-3.5 text-slate-400" />
                        <input
                          type="datetime-local"
                          name="scheduledAt"
                          value={form.scheduledAt}
                          onChange={handleChange}
                          className="w-full pl-11 rounded-2xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
