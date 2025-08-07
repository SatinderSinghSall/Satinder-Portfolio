import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

const API = import.meta.env.VITE_API_URL || "/api";

export default function AddEditYouTube() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const [form, setForm] = useState({
    title: "",
    videoUrl: "",
    thumbnail: "",
    description: "",
    tags: "",
    author: "Admin",
    status: "draft",
  });

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`${API}/youtube/${id}`)
        .then((res) => {
          const data = res.data;
          setForm({
            ...data,
            tags: data.tags?.join(", ") || "",
          });
        })
        .catch((err) => {
          console.error("Failed to fetch video for edit", err);
          alert("Failed to load video data.");
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    let thumbnailUrl = form.thumbnail;

    // Upload image to backend if a file is selected
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.post(`${API}/youtube/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        thumbnailUrl = res.data.url;
      } catch (err) {
        console.error("Thumbnail upload failed", err);
        alert("Thumbnail upload failed.");
        return;
      }
    }

    const payload = {
      ...form,
      thumbnail: thumbnailUrl,
      tags: form.tags.split(",").map((t) => t.trim()),
    };

    try {
      if (isEdit) {
        await axios.put(`${API}/youtube/${id}`, payload, config);
        alert("Video updated!");
      } else {
        await axios.post(`${API}/youtube`, payload, config);
        alert("Video added!");
      }
      navigate("/admin/youtube");
    } catch (err) {
      console.error("Submit error:", err);
      alert(err.response?.data?.message || "Failed to submit.");
    }
  };

  return (
    <AdminLayout>
      <section className="min-h-screen py-12 px-6 bg-white text-black">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
          <h1 className="text-3xl font-bold mb-6">
            {isEdit ? "Edit" : "Add"} YouTube Video
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 rounded border border-gray-300 bg-white text-black placeholder-gray-500"
              required
            />

            <input
              type="url"
              name="videoUrl"
              placeholder="YouTube Embed URL"
              value={form.videoUrl}
              onChange={handleChange}
              className="w-full p-3 rounded border border-gray-300 bg-white text-black placeholder-gray-500"
              required
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-3 rounded border border-gray-300 bg-white text-black"
            />

            <textarea
              name="description"
              rows={5}
              placeholder="Video description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-3 rounded border border-gray-300 bg-white text-black placeholder-gray-500"
            />

            <input
              type="text"
              name="tags"
              placeholder="Tags (comma-separated)"
              value={form.tags}
              onChange={handleChange}
              className="w-full p-3 rounded border border-gray-300 bg-white text-black placeholder-gray-500"
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-3 rounded border border-gray-300 bg-white text-black"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>

            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded text-white"
            >
              {isEdit ? "Update" : "Add"} Video
            </button>
          </form>
        </div>
      </section>
    </AdminLayout>
  );
}
