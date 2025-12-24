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
      <div className="max-w-3xl mx-auto rounded-3xl bg-gradient-to-br from-white via-white to-blue-50/40 backdrop-blur-xl p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-200/60">
        <h2 className="text-3xl font-bold mb-10 text-gray-900 flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 4.5c.414 0 .75.336.75.75v6h6a.75.75 0 010 1.5h-6v6a.75.75 0 01-1.5 0v-6h-6a.75.75 0 010-1.5h6v-6c0-.414.336-.75.75-.75z" />
            </svg>
          </span>
          Add New Project
        </h2>

        {error && (
          <div className="mb-6 flex items-center gap-3 text-red-600 bg-red-50 border border-red-200 px-5 py-4 rounded-2xl text-sm">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Shared input styles */}
          {[
            {
              label: "Project Title",
              name: "title",
              placeholder: "Awesome SaaS App",
            },
            {
              label: "GitHub Repository",
              name: "githubLink",
              placeholder: "https://github.com/...",
            },
            {
              label: "Live Project Link",
              name: "link",
              placeholder: "https://project-demo.com",
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                {field.label}
              </label>
              <input
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full rounded-2xl border border-gray-300/60 px-5 py-4 text-gray-900 
                     focus:ring-4 focus:ring-blue-200 focus:border-blue-500 
                     transition-all outline-none bg-white/80"
              />
            </div>
          ))}

          {/* Description */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={form.description}
              onChange={handleChange}
              placeholder="What problem does this project solve?"
              className="w-full rounded-2xl border border-gray-300/60 px-5 py-4
                   focus:ring-4 focus:ring-blue-200 focus:border-blue-500
                   transition-all outline-none bg-white/80 resize-none"
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Technologies{" "}
              <span className="text-xs text-gray-400">(comma separated)</span>
            </label>
            <input
              name="technologies"
              value={form.technologies.join(", ")}
              onChange={handleChange}
              placeholder="React, Node.js, Tailwind"
              className="w-full rounded-2xl border border-gray-300/60 px-5 py-4
                   focus:ring-4 focus:ring-blue-200 focus:border-blue-500
                   transition-all outline-none bg-white/80"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Project Image
            </label>

            <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-2xl p-8 cursor-pointer hover:border-blue-400 transition bg-white/70">
              <svg
                className="w-10 h-10 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16V4m10 12V4M3 16h18"
                />
              </svg>
              <span className="text-sm text-gray-600">
                {form.imageFile ? form.imageFile.name : "Click to upload image"}
              </span>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) =>
                  setForm({ ...form, imageFile: e.target.files[0] })
                }
              />
            </label>
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className={`w-full rounded-2xl py-4 font-semibold text-white shadow-lg
        transition-all duration-300 flex justify-center items-center gap-2
        ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.01] active:scale-95"
        }`}
          >
            {loading ? "Adding Project..." : "Add Project"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
