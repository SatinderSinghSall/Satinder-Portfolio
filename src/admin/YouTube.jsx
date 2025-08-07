import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL || "/api";

export default function ManageYouTube() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    videoUrl: "",
    thumbnail: "",
    description: "",
    tags: "",
    author: "Admin",
    status: "draft",
  });

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/youtube`);
      setVideos(res.data);
    } catch (err) {
      toast.error("Failed to fetch videos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()),
    };

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    try {
      if (editingId) {
        await axios.put(`${API}/youtube/${editingId}`, payload, config);
        toast.success("Video updated!");
      } else {
        await axios.post(`${API}/youtube`, payload, config);
        toast.success("Video added!");
      }

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
    } catch (err) {
      console.error("Submit error:", err);
      toast.error(err.response?.data?.message || "Failed to submit.");
    }
  };

  const handleEdit = (video) => {
    setForm({
      title: video.title,
      videoUrl: video.videoUrl,
      thumbnail: video.thumbnail,
      description: video.description,
      tags: video.tags.join(", "),
      author: video.author,
      status: video.status,
    });
    setEditingId(video._id);
  };

  const handleDelete = (id) => {
    setDeletingId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      setDeleting(true);
      await axios.delete(`${API}/youtube/${deletingId}`, { headers });
      toast.success("Video deleted!");
      fetchVideos();
      setShowDeleteModal(false);
    } catch (err) {
      toast.error("Failed to delete video.");
      console.error(err);
    } finally {
      setDeleting(false);
      setDeletingId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
          Manage YouTube Videos
        </h2>

        {/* Add/Edit Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 mb-10 space-y-5"
        >
          <h3 className="text-2xl font-bold mb-2">
            {editingId ? "Edit" : "Add"} Video
          </h3>

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 rounded border border-gray-300"
            required
          />

          <input
            type="url"
            name="videoUrl"
            placeholder="YouTube Embed URL"
            value={form.videoUrl}
            onChange={handleChange}
            className="w-full p-3 rounded border border-gray-300"
            required
          />

          <input
            type="url"
            name="thumbnail"
            placeholder="Thumbnail URL"
            value={form.thumbnail}
            onChange={handleChange}
            className="w-full p-3 rounded border border-gray-300"
          />

          <textarea
            name="description"
            rows={4}
            placeholder="Video description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 rounded border border-gray-300"
          />

          <input
            type="text"
            name="tags"
            placeholder="Tags (comma-separated)"
            value={form.tags}
            onChange={handleChange}
            className="w-full p-3 rounded border border-gray-300"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-3 rounded border border-gray-300"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded"
          >
            {editingId ? "Update" : "Add"} Video
          </button>
        </form>

        {/* Video List */}
        {loading ? (
          <p className="text-center text-gray-600">Loading videos...</p>
        ) : videos.length === 0 ? (
          <p className="text-center text-gray-500">No videos found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video) => (
              <div
                key={video._id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <img
                  src={video.thumbnail || "/placeholder.png"}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {video.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-1">
                    By {video.author}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    {video.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {video.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        video.status === "published"
                          ? "bg-green-200 text-green-700"
                          : "bg-yellow-200 text-yellow-700"
                      }`}
                    >
                      {video.status}
                    </span>
                    <div className="flex gap-4">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => window.open(video.videoUrl, "_blank")}
                      >
                        View
                      </button>
                      <button
                        className="text-yellow-500 hover:underline"
                        onClick={() => handleEdit(video)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleDelete(video._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center">
              <h3 className="text-lg font-bold mb-2">Confirm Delete</h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete this video?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  onClick={confirmDelete}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
