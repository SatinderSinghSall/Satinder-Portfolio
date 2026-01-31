import { useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import toast from "react-hot-toast";
import {
  BriefcaseIcon,
  UserIcon,
  BuildingOfficeIcon,
  LinkIcon,
  PhotoIcon,
  StarIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

const API = import.meta.env.VITE_API_URL || "/api";

export default function AddFreelanceProject() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const [form, setForm] = useState({
    title: "",
    clientName: "",
    clientCompany: "",
    projectUrl: "",
    description: "",
    technologies: "",
    testimonial: "",
    clientRating: 5,
    status: "completed",
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImages = (e) => {
    setImages([...e.target.files]);
  };

  const uploadImages = async () => {
    const uploaded = [];

    for (let img of images) {
      const fd = new FormData();
      fd.append("image", img);

      const res = await axios.post(`${API}/upload`, fd, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      uploaded.push(res.data.url);
    }

    return uploaded;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrls = images.length ? await uploadImages() : [];

      await axios.post(
        `${API}/freelance`,
        {
          ...form,
          images: imageUrls,
          technologies: form.technologies
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      toast.success("Freelance project added successfully 🚀");
    } catch (err) {
      toast.error("Failed to add freelance project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto py-2">
        <div className="rounded-3xl border border-gray-200/60 bg-gradient-to-br from-white via-white to-indigo-50/40 backdrop-blur-xl p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
          {/* HEADER */}
          <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <BriefcaseIcon className="h-5 w-5" />
            </span>
            Add Freelance Project
          </h1>

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Project Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Title
              </label>
              <Input
                icon={BriefcaseIcon}
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="E-commerce Website for US Client"
              />
            </div>

            {/* Client Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Client Name
                </label>
                <Input
                  icon={UserIcon}
                  name="clientName"
                  value={form.clientName}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Client Company
                </label>
                <Input
                  icon={BuildingOfficeIcon}
                  name="clientCompany"
                  value={form.clientCompany}
                  onChange={handleChange}
                  placeholder="ABC Corp"
                />
              </div>
            </div>

            {/* Project URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project URL
              </label>
              <Input
                icon={LinkIcon}
                name="projectUrl"
                value={form.projectUrl}
                onChange={handleChange}
                placeholder="https://clientsite.com"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Description
              </label>
              <textarea
                name="description"
                rows={5}
                value={form.description}
                onChange={handleChange}
                placeholder="What you built, challenges, outcome…"
                className="w-full rounded-2xl px-5 py-4 border border-gray-300/60 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition bg-white/80 resize-none"
              />
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Technologies Used
              </label>
              <Input
                icon={TagIcon}
                name="technologies"
                value={form.technologies}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Images
              </label>
              <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-2xl p-8 cursor-pointer hover:border-indigo-400 transition bg-white/70">
                <PhotoIcon className="h-10 w-10 text-indigo-500" />
                <span className="text-sm text-gray-600">
                  {images.length
                    ? `${images.length} image(s) selected`
                    : "Upload multiple project screenshots"}
                </span>
                <input type="file" multiple hidden onChange={handleImages} />
              </label>
            </div>

            {/* Testimonial */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Client Testimonial
              </label>
              <textarea
                name="testimonial"
                rows={4}
                value={form.testimonial}
                onChange={handleChange}
                placeholder="What the client said about your work…"
                className="w-full rounded-2xl px-5 py-4 border border-gray-300/60 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition bg-white/80 resize-none"
              />
            </div>

            {/* Rating + Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <StarIcon className="h-5 w-5 text-yellow-500" />
                  Client Rating
                </label>
                <select
                  name="clientRating"
                  value={form.clientRating}
                  onChange={handleChange}
                  className="w-full rounded-2xl px-5 py-4 border border-gray-300/60 bg-white/80"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} Star{r > 1 && "s"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-2xl px-5 py-4 border border-gray-300/60 bg-white/80"
                >
                  <option value="completed">Completed</option>
                  <option value="ongoing">Ongoing</option>
                </select>
              </div>
            </div>

            {/* Featured */}
            <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
              />
              Mark as Featured Project
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-2xl py-4 font-semibold text-white shadow-lg transition-all duration-300 flex items-center justify-center
              ${
                loading
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-500 to-indigo-600 hover:scale-[1.01] active:scale-95"
              }`}
            >
              {loading ? "Saving Project..." : "Add Freelance Project"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

/* ---------- Small reusable input ---------- */
function Input({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      {Icon && <Icon className="h-5 w-5 absolute left-4 top-4 text-gray-400" />}
      <input
        {...props}
        className="w-full rounded-2xl px-5 py-4 pl-11 border border-gray-300/60 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition bg-white/80"
      />
    </div>
  );
}
