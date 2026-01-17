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
} from "@heroicons/react/24/outline";

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

  // ✅ Filters (Project.jsx style)
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState("latest");

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

  const fetchVideos = async () => {
    setFetching(true);
    try {
      const params = {};
      if (statusFilter !== "all") params.status = statusFilter;
      if (search.trim()) params.search = search.trim();
      if (sort) params.sort = sort;

      const res = await axios.get(`${API}/youtube`, { params });
      setVideos(res.data);
    } catch {
      toast.error("Failed to fetch videos");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, sort]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
              Total Videos: {videos.length}
            </span>

            <button
              onClick={fetchVideos}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border bg-white hover:bg-gray-50 transition"
            >
              <ArrowPathIcon className="h-5 w-5 text-gray-600" />
              Refresh
            </button>
          </div>
        </div>

        {/* ✅ Filters Bar (like Projects.jsx) */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-6 flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchVideos()}
              placeholder="Search videos by title, tags, author..."
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
          </select>

          <button
            onClick={fetchVideos}
            className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition"
          >
            Apply
          </button>
        </div>

        {/* FORM (UNCHANGED UI) */}
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
            className={`mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-white font-medium transition
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
          <div className="flex justify-center text-gray-600">
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
                        onClick={() => handleEdit(video)}
                        className="p-2 hover:bg-gray-100 rounded-md"
                        title="Edit"
                      >
                        <PencilSquareIcon className="h-5 w-5 text-indigo-600" />
                      </button>

                      <button
                        onClick={() => {
                          setDeletingId(video._id);
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
                  {deleting ? <Spinner text="Deleting..." /> : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
