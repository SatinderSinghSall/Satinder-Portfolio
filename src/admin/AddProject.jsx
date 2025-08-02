import { useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL || "/api";

export default function AddProject() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: [],
    githubLink: "",
    link: "",
    imageFile: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    if (e.target.name === "technologies") {
      setForm({
        ...form,
        technologies: e.target.value.split(",").map((t) => t.trim()),
      });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.title ||
      !form.description ||
      !form.githubLink ||
      !form.technologies.length ||
      !form.imageFile ||
      !form.link
    ) {
      toast.error("All fields are required.");
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("link", form.link);
      formData.append("githubLink", form.githubLink);
      formData.append("technologies", form.technologies.join(","));
      if (form.imageFile) formData.append("image", form.imageFile);

      await axios.post(`${API}/projects`, formData, { headers });

      setForm({
        title: "",
        description: "",
        link: "",
        githubLink: "",
        technologies: [],
        imageFile: null,
      });

      toast.success("Project added successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to save project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">
          ➕ Add New Project
        </h2>

        {error && (
          <div className="mb-6 flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 p-4 rounded-lg text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Project Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter your project title"
              className="w-full px-4 py-3 border rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your project in detail"
              className="w-full px-4 py-3 border rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition"
              rows="4"
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Technologies{" "}
              <span className="text-gray-400 text-xs">(comma separated)</span>
            </label>
            <input
              name="technologies"
              value={form.technologies.join(", ")}
              onChange={handleChange}
              placeholder="e.g., React, Node.js, Tailwind"
              className="w-full px-4 py-3 border rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition"
            />
          </div>

          {/* GitHub Link */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              GitHub Repository
            </label>
            <input
              name="githubLink"
              value={form.githubLink}
              onChange={handleChange}
              placeholder="https://github.com/your-repo"
              className="w-full px-4 py-3 border rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition"
            />
          </div>

          {/* Project Link */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Live Project Link
            </label>
            <input
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="https://your-project-demo.com"
              className="w-full px-4 py-3 border rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Project Image
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) =>
                  setForm({ ...form, imageFile: e.target.files[0] })
                }
                className="w-full text-gray-500 border rounded-xl p-3 cursor-pointer focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 px-6 py-4 text-white font-semibold rounded-xl shadow-md transition-all duration-300 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:scale-95"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="w-6 h-6 animate-spin"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Adding...
              </>
            ) : (
              "Add Project"
            )}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
