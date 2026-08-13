import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import toast from "react-hot-toast";
import {
  VideoCameraIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  PhotoIcon,
  TagIcon,
  UserIcon,
  LinkIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/outline";

const API = import.meta.env.VITE_API_URL || "/api";

const Spinner = ({ text }) => (
  <div className="flex items-center gap-2">
    <svg
      className="animate-spin h-5 w-5"
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
    <span>{text}</span>
  </div>
);

export default function ManageYouTube() {
  const [videos, setVideos] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState("latest");

  // ✅ Pagination State
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [totalVideos, setTotalVideos] = useState(0);

  const [form, setForm] = useState({
    title: "",
    videoUrl: "",
    thumbnail: "",
    description: "",
    tags: "",
    author: "Admin",
    status: "draft",
  });

  const token = localStorage.getItem("token");

  const headers = useMemo(() => {
    return {
      Authorization: `Bearer ${token}`,
    };
  }, [token]);

  const fetchVideos = async (overridePage) => {
    setFetching(true);
    const currentPage = overridePage ?? page;

    try {
      const params = {
        page: currentPage,
        limit: limit,
      };
      if (statusFilter !== "all") params.status = statusFilter;
      if (search.trim()) params.search = search.trim();
      if (sort) params.sort = sort;

      const res = await axios.get(`${API}/youtube`, { params });

      // Support both paginated API response structures and array responses
      if (res.data && Array.isArray(res.data.videos)) {
        setVideos(res.data.videos);
        setTotalPages(res.data.totalPages || 1);
        setTotalVideos(
          res.data.totalVideos || res.data.total || res.data.videos.length,
        );
      } else if (Array.isArray(res.data)) {
        // Client-side pagination fallback if backend returns flat array
        const start = (currentPage - 1) * limit;
        const end = start + limit;
        setVideos(res.data.slice(start, end));
        setTotalPages(Math.ceil(res.data.length / limit) || 1);
        setTotalVideos(res.data.length);
      }
    } catch {
      toast.error("Failed to fetch videos");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, statusFilter, sort, limit]);

  const handleApplyFilters = () => {
    setPage(1);
    fetchVideos(1);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleView = (video) => {
    setSelectedVideo(video);
    setViewModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...form,
      tags: form.tags
        ? form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
    };

    try {
      editingId
        ? await axios.put(`${API}/youtube/${editingId}`, payload, { headers })
        : await axios.post(`${API}/youtube`, payload, { headers });

      toast.success(editingId ? "Video updated" : "Video added");

      setForm({
        title: "",
        videoUrl: "",
        thumbnail: "",
        description: "",
        tags: "",
        author: "Admin",
        status: "draft",
      });

      setEditingId(null);
      fetchVideos();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast.error("Failed to save video");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (video) => {
    setForm({
      title: video.title,
      videoUrl: video.videoUrl,
      thumbnail: video.thumbnail,
      description: video.description,
      tags: video.tags?.join(", ") || "",
      author: video.author,
      status: video.status,
    });
    setEditingId(video._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    setDeleting(true);

    try {
      await axios.delete(`${API}/youtube/${deletingId}`, { headers });
      toast.success("Video deleted");
      fetchVideos();
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
      setDeletingId(null);
      setShowDeleteModal(false);
    }
  };

  useEffect(() => {
    if (showDeleteModal || viewModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showDeleteModal, viewModal]);

  return (
    <AdminLayout>
      <div className="w-full max-w-[1400px] mx-auto px-6 pb-16">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <VideoCameraIcon className="h-8 w-8 text-red-600" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                YouTube Management CMS
              </h2>
              <p className="text-sm text-gray-500">Manage video content.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              Total Videos: {totalVideos}
            </span>

            <button
              onClick={() => fetchVideos()}
              disabled={fetching}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-md border font-medium transition cursor-pointer
            ${
              fetching
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-50 text-gray-700"
            }`}
            >
              <ArrowPathIcon
                className={`h-5 w-5 ${
                  fetching ? "animate-spin text-red-600" : "text-gray-600"
                }`}
              />
              {fetching ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-6 flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
              placeholder="Search videos by title, tags, author..."
              className="w-full pl-10 pr-3 py-2.5 border rounded-md"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2.5 border rounded-md"
          >
            <option value="all">All</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2.5 border rounded-md"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>

          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="px-3 py-2.5 border rounded-md"
            title="Items per page"
          >
            <option value={4}>4 per page</option>
            <option value={6}>6 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>

          <button
            onClick={handleApplyFilters}
            disabled={fetching}
            className={`px-4 py-2.5 rounded-md font-medium text-white transition inline-flex items-center justify-center gap-2 cursor-pointer
          ${
            fetching
              ? "bg-red-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
          >
            {fetching ? <Spinner text="Applying..." /> : "Apply"}
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border rounded-xl p-6 shadow-sm mb-10"
        >
          <h3 className="font-semibold text-gray-700 mb-4">
            {editingId ? "Edit Video" : "Add New Video"}
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="relative">
              <VideoCameraIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Video Title"
                className="w-full pl-10 py-2.5 border rounded-md"
              />
            </div>

            <div className="relative">
              <LinkIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                name="videoUrl"
                value={form.videoUrl}
                onChange={handleChange}
                placeholder="YouTube Embed URL"
                className="w-full pl-10 py-2.5 border rounded-md"
              />
            </div>

            <div className="relative">
              <PhotoIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                name="thumbnail"
                value={form.thumbnail}
                onChange={handleChange}
                placeholder="Thumbnail URL"
                className="w-full pl-10 py-2.5 border rounded-md"
              />
            </div>

            <div className="relative">
              <TagIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="Tags (comma separated)"
                className="w-full pl-10 py-2.5 border rounded-md"
              />
            </div>
          </div>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Video description"
            className="w-full mt-4 p-3 border rounded-md h-32"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="relative">
              <UserIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Author"
                className="w-full pl-10 py-2.5 border rounded-md"
              />
            </div>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full py-2.5 border rounded-md"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <button
            disabled={submitting}
            className={`mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-white font-medium transition cursor-pointer
              ${
                submitting
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }
            `}
          >
            {submitting ? (
              <Spinner
                text={editingId ? "Updating video..." : "Adding video..."}
              />
            ) : (
              <>
                <PlusIcon className="h-5 w-5" />
                {editingId ? "Update Video" : "Add Video"}
              </>
            )}
          </button>
        </form>

        {/* LIST */}
        {fetching ? (
          <div className="flex justify-center text-gray-600 py-16">
            <Spinner text="Loading videos..." />
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-16 bg-white border rounded-xl">
            <p className="text-gray-700 font-semibold">No videos found</p>
            <p className="text-sm text-gray-500 mt-1">
              Add your first YouTube video ✨
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="bg-white border rounded-xl overflow-hidden hover:shadow-md transition"
                >
                  {/* Thumbnail */}
                  <div className="h-44 bg-gray-100 overflow-hidden">
                    {video.thumbnail ? (
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-400">
                        No Thumbnail
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-800 text-lg truncate">
                          {video.title}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1">
                          {video.author || "Admin"} •{" "}
                          {video.status === "published" ? (
                            <span className="text-green-600 font-semibold">
                              PUBLISHED
                            </span>
                          ) : (
                            <span className="text-yellow-600 font-semibold">
                              DRAFT
                            </span>
                          )}
                        </p>

                        {video.videoUrl && (
                          <a
                            href={video.videoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs mt-2 px-2 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition"
                          >
                            <LinkIcon className="h-4 w-4" />
                            Open Video
                          </a>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(video)}
                          className="p-2 hover:bg-blue-50 rounded-md cursor-pointer"
                          title="View Video"
                        >
                          <EyeIcon className="h-5 w-5 text-blue-600" />
                        </button>

                        <button
                          onClick={() => handleEdit(video)}
                          className="p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                          title="Edit"
                        >
                          <PencilSquareIcon className="h-5 w-5 text-indigo-600" />
                        </button>

                        <button
                          onClick={() => {
                            setDeletingId(video._id);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 hover:bg-red-50 rounded-md cursor-pointer"
                          title="Delete"
                        >
                          <TrashIcon className="h-5 w-5 text-red-600" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                      {video.description || "No description added yet."}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {video.tags?.length > 0 ? (
                        video.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-gray-100 px-2 py-1 rounded-full border"
                          >
                            #{tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-400">No tags</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ✅ PAGINATION CONTROLS */}
            {totalPages > 1 && (
              <div className="bg-white border rounded-xl p-4 shadow-sm mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-sm text-gray-600">
                  Page <span className="font-semibold">{page}</span> of{" "}
                  <span className="font-semibold">{totalPages}</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1 || fetching}
                    className="inline-flex items-center gap-1 px-3 py-2 border rounded-md text-sm font-medium transition text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                    Previous
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (p) => (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          disabled={fetching}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                            page === p
                              ? "bg-red-600 text-white"
                              : "bg-white text-gray-700 border hover:bg-gray-50"
                          }`}
                        >
                          {p}
                        </button>
                      ),
                    )}
                  </div>

                  <button
                    onClick={() =>
                      setPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={page === totalPages || fetching}
                    className="inline-flex items-center gap-1 px-3 py-2 border rounded-md text-sm font-medium transition text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRightIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Delete Modal - Premium Danger Zone */}
        {showDeleteModal && (
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300 animate-fadeIn"
            onClick={() => setShowDeleteModal(false)}
          >
            <div
              className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-red-100/80 relative transform transition-all scale-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Accent Glowing Line */}
              <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-rose-500 to-red-600" />

              {/* Close Button */}
              <button
                onClick={() => setShowDeleteModal(false)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>

              <div className="p-6 sm:p-8 text-center">
                {/* Pulsing Danger Icon */}
                <div className="relative mx-auto mb-5 w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 bg-red-100 rounded-2xl rotate-6 scale-95 opacity-70" />
                  <div className="absolute inset-0 bg-red-200/50 rounded-2xl -rotate-3 scale-100" />
                  <div className="relative w-16 h-16 bg-gradient-to-b from-red-50 to-red-100/80 rounded-2xl border border-red-200/60 flex items-center justify-center text-red-600 shadow-inner">
                    <ExclamationTriangleIcon className="h-8 w-8 text-red-600 drop-shadow-sm" />
                  </div>
                </div>

                {/* Danger Zone Badge */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-red-50 text-red-600 border border-red-200/60 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  Danger Zone
                </span>

                {/* Title */}
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Delete YouTube Video?
                </h3>

                {/* Description & Highlight Box */}
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Are you sure you want to delete this video? This action is{" "}
                  <span className="font-semibold text-slate-900 underline decoration-red-300 decoration-2 underline-offset-2">
                    permanent
                  </span>{" "}
                  and cannot be undone.
                </p>

                {/* Context Preview Pill (Optional item info card) */}
                {selectedVideo?.title && (
                  <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 truncate font-medium flex items-center justify-center gap-2">
                    <VideoCameraIcon className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="truncate">{selectedVideo.title}</span>
                  </div>
                )}

                {/* Footer Buttons */}
                <div className="flex items-center gap-3 mt-7">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 active:bg-slate-100 transition-all text-sm cursor-pointer shadow-sm"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={confirmDelete}
                    disabled={deleting}
                    className={`flex-1 px-4 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 text-sm shadow-md shadow-red-500/20 transition-all cursor-pointer ${
                      deleting
                        ? "bg-red-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 hover:shadow-lg hover:shadow-red-500/30 active:scale-[0.98]"
                    }`}
                  >
                    {deleting ? (
                      <Spinner text="Deleting..." />
                    ) : (
                      <>
                        <TrashIcon className="h-4.5 w-4.5" />
                        Yes, Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* YOUTUBE SCHEMA & VIDEO INSPECTOR MODAL */}
        {/* YOUTUBE SCHEMA & VIDEO INSPECTOR MODAL */}
        {viewModal && selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fade-in">
            <div className="bg-white rounded-3xl max-w-4xl w-full h-full max-h-[88vh] flex flex-col shadow-2xl border border-slate-200/80 overflow-hidden ring-1 ring-black/5">
              {/* 1. STICKY HEADER */}
              <div className="px-5 sm:px-8 py-4 sm:py-5 border-b border-slate-100 flex items-start sm:items-center justify-between bg-white shrink-0 gap-3">
                <div className="space-y-1 pr-2 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-extrabold text-red-600 tracking-wider uppercase bg-red-50/80 border border-red-200/60 px-2.5 py-0.5 rounded-full shrink-0">
                      YouTube Schema Inspector
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100/80 px-2 py-0.5 rounded-md truncate max-w-[140px] sm:max-w-none">
                      ID: {selectedVideo._id || "N/A"}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug truncate">
                    {selectedVideo.title}
                  </h3>
                </div>

                <button
                  onClick={() => setViewModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer shrink-0"
                >
                  <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                </button>
              </div>

              {/* 2. INNER SCROLLABLE BODY */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 sm:space-y-8 divide-y divide-slate-100 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                {/* EMBEDDED PLAYER / PREVIEW */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Video Player / Preview
                  </h4>
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-sm relative">
                    {selectedVideo.videoUrl ? (
                      <iframe
                        src={(() => {
                          const url = selectedVideo.videoUrl;
                          if (url.includes("embed/")) return url;
                          if (url.includes("watch?v="))
                            return url
                              .replace("watch?v=", "embed/")
                              .split("&")[0];
                          if (url.includes("youtu.be/"))
                            return url.replace(
                              "youtu.be/",
                              "www.youtube.com/embed/",
                            );
                          return url;
                        })()}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={selectedVideo.title}
                      />
                    ) : selectedVideo.thumbnail ? (
                      <img
                        src={selectedVideo.thumbnail}
                        alt={selectedVideo.title}
                        className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition"
                        onClick={() =>
                          setExpandedImage(selectedVideo.thumbnail)
                        }
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-slate-400 text-xs">
                        <VideoCameraIcon className="w-10 h-10 mb-2 opacity-40" />
                        No Video Player or Thumbnail available
                      </div>
                    )}
                  </div>
                </div>

                {/* SCHEMA PROPERTIES GRID */}
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
                        {selectedVideo.author || "Satinder"}
                      </span>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                        Status
                      </span>
                      <span
                        className={`text-xs font-bold capitalize ${
                          selectedVideo.status === "published"
                            ? "text-emerald-600"
                            : "text-amber-600"
                        }`}
                      >
                        ● {selectedVideo.status || "draft"}
                      </span>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60 col-span-2 sm:col-span-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                        Total Tags
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        {selectedVideo.tags?.length || 0} Tag(s)
                      </span>
                    </div>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="pt-6 space-y-2.5">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Description
                  </h4>
                  <div className="text-xs sm:text-sm text-slate-700 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/70 leading-relaxed whitespace-pre-wrap font-medium">
                    {selectedVideo.description || "No description provided."}
                  </div>
                </div>

                {/* TAGS LIST */}
                <div className="pt-6 space-y-2.5">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Tags Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(selectedVideo.tags) &&
                    selectedVideo.tags.length > 0 ? (
                      selectedVideo.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 border border-slate-200/70 text-xs font-semibold px-3 py-1 rounded-xl transition"
                        >
                          #{t}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">
                        No tags assigned
                      </span>
                    )}
                  </div>
                </div>

                {/* THUMBNAIL PREVIEW WITH EXPAND TRIGGER & RAW URL */}
                <div className="pt-6 space-y-4">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Media Links & Assets
                  </h4>

                  {selectedVideo.thumbnail && (
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-600 block">
                        Thumbnail Image{" "}
                        <span className="text-slate-400 font-normal">
                          (Click to enlarge)
                        </span>
                      </span>
                      <div
                        onClick={() =>
                          setExpandedImage(selectedVideo.thumbnail)
                        }
                        className="group relative h-40 w-full sm:w-72 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 cursor-pointer shadow-xs hover:shadow-md transition-all"
                      >
                        <img
                          src={selectedVideo.thumbnail}
                          alt="Thumbnail Preview"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                          🔍 Click to expand
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-600 block">
                      Video URL
                    </span>
                    <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
                      <a
                        href={selectedVideo.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono text-blue-400 hover:text-blue-300 truncate underline"
                      >
                        {selectedVideo.videoUrl}
                      </a>
                      <a
                        href={selectedVideo.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] font-bold text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-xl shrink-0 transition"
                      >
                        Open Link ↗
                      </a>
                    </div>
                  </div>
                </div>

                {/* TIMESTAMPS */}
                <div className="pt-6 space-y-2.5">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Timestamps
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                        Published At
                      </span>
                      <span className="text-xs font-semibold text-slate-800 truncate block">
                        {selectedVideo.publishedAt
                          ? new Date(selectedVideo.publishedAt).toLocaleString()
                          : "N/A"}
                      </span>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                        Created At
                      </span>
                      <span className="text-xs font-semibold text-slate-800 truncate block">
                        {selectedVideo.createdAt
                          ? new Date(selectedVideo.createdAt).toLocaleString()
                          : "N/A"}
                      </span>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                        Updated At
                      </span>
                      <span className="text-xs font-semibold text-slate-800 truncate block">
                        {selectedVideo.updatedAt
                          ? new Date(selectedVideo.updatedAt).toLocaleString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. STICKY FOOTER */}
              <div className="px-5 sm:px-8 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end shrink-0">
                <button
                  onClick={() => setViewModal(false)}
                  className="bg-slate-900 hover:bg-black text-white font-semibold text-xs px-6 py-2.5 rounded-xl transition shadow-xs active:scale-95 cursor-pointer"
                >
                  Close Inspector
                </button>
              </div>
            </div>

            {/* --- IMAGE EXPANSION / LIGHTBOX OVERLAY --- */}
            {expandedImage && (
              <div
                className="fixed inset-0 z-60 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8 animate-fade-in cursor-zoom-out"
                onClick={() => setExpandedImage(null)}
              >
                <button
                  onClick={() => setExpandedImage(null)}
                  className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition cursor-pointer"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
                <img
                  src={expandedImage}
                  alt="Expanded Preview"
                  className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl border border-white/10 cursor-default"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
