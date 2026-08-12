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
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { PlusIcon } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "/api";

export default function AddFreelanceProject() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  // Errors state for inline fields and top alert box
  const [errors, setErrors] = useState({});
  const [mainError, setMainError] = useState("");

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

    // Clear field-level error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImages = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
    if (errors.images) {
      setErrors((prev) => ({ ...prev, images: "" }));
    }
  };

  // Client-side form validation
  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Project title is required.";
    if (!form.clientName.trim())
      newErrors.clientName = "Client name is required.";
    if (!form.description.trim())
      newErrors.description = "Project description is required.";
    if (!form.technologies.trim())
      newErrors.technologies = "At least one technology is required.";

    if (form.projectUrl && !/^https?:\/\/.+/i.test(form.projectUrl)) {
      newErrors.projectUrl =
        "Please enter a valid URL starting with http:// or https://";
    }

    return newErrors;
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
    setMainError("");

    // Validate inputs before sending request
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setMainError(
        "Please fix the highlighted errors below before submitting.",
      );
      toast.error("Form validation failed. Check required fields.");
      return;
    }

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

      // Reset form after success
      setForm({
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
      setImages([]);
      setErrors({});
    } catch (err) {
      const serverMsg =
        err.response?.data?.message ||
        "Failed to add freelance project. Please try again.";
      setMainError(serverMsg);
      toast.error(serverMsg);
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

          {/* MAIN ERROR ALERT BOX WITH DISMISS BUTTON */}
          {mainError && (
            <div className="mb-8 rounded-2xl bg-red-50 border border-red-200 p-4 flex items-start justify-between gap-3 shadow-sm animate-fadeIn">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-red-100 text-red-600 rounded-lg shrink-0 mt-0.5">
                  <ExclamationTriangleIcon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-red-900">
                    Submission Failed
                  </h4>
                  <p className="text-xs text-red-700 mt-1 leading-relaxed">
                    {mainError}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMainError("")}
                className="text-red-400 hover:text-red-700 hover:bg-red-100 p-1 rounded-lg transition"
                aria-label="Dismiss error"
              >
                <XMarkIcon className="h-5 w-5 cursor-pointer" />
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Project Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Title <span className="text-red-500">*</span>
              </label>
              <Input
                icon={BriefcaseIcon}
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="E-commerce Website for US Client"
                hasError={!!errors.title}
              />
              <FieldError message={errors.title} />
            </div>

            {/* Client Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Client Name <span className="text-red-500">*</span>
                </label>
                <Input
                  icon={UserIcon}
                  name="clientName"
                  value={form.clientName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  hasError={!!errors.clientName}
                />
                <FieldError message={errors.clientName} />
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
                  hasError={!!errors.clientCompany}
                />
                <FieldError message={errors.clientCompany} />
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
                hasError={!!errors.projectUrl}
              />
              <FieldError message={errors.projectUrl} />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                rows={5}
                value={form.description}
                onChange={handleChange}
                placeholder="What you built, challenges, outcome…"
                className={`w-full rounded-2xl px-5 py-4 border outline-none transition bg-white/80 resize-none ${
                  errors.description
                    ? "border-red-400 focus:ring-4 focus:ring-red-100 focus:border-red-500 bg-red-50/20"
                    : "border-gray-300/60 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500"
                }`}
              />
              <FieldError message={errors.description} />
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Technologies Used <span className="text-red-500">*</span>
              </label>
              <Input
                icon={TagIcon}
                name="technologies"
                value={form.technologies}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
                hasError={!!errors.technologies}
              />
              <FieldError message={errors.technologies} />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Images
              </label>
              <label
                className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-2xl p-8 cursor-pointer transition bg-white/70 ${
                  errors.images
                    ? "border-red-400 bg-red-50/20"
                    : "border-gray-300 hover:border-indigo-400"
                }`}
              >
                <PhotoIcon className="h-10 w-10 text-indigo-500" />
                <span className="text-sm text-gray-600">
                  {images.length
                    ? `${images.length} image(s) selected`
                    : "Upload multiple project screenshots"}
                </span>
                <input type="file" multiple hidden onChange={handleImages} />
              </label>
              <FieldError message={errors.images} />
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
                  className="w-full rounded-2xl px-5 py-4 border border-gray-300/60 bg-white/80 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"
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
                  className="w-full rounded-2xl px-5 py-4 border border-gray-300/60 bg-white/80 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"
                >
                  <option value="completed">Completed</option>
                  <option value="ongoing">Ongoing</option>
                </select>
              </div>
            </div>

            {/* Featured */}
            <label className="flex items-center gap-3 text-sm font-medium text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              Mark as Featured Project
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-2xl py-4 font-semibold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                loading
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-500 to-indigo-600 hover:scale-[1.01] active:scale-95 shadow-indigo-500/25 hover:shadow-indigo-500/35"
              }`}
            >
              {loading ? (
                "Saving Project..."
              ) : (
                <>
                  <PlusIcon className="h-5 w-5 stroke-[2.5]" />
                  <span>Add Freelance Project</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

/* ---------- Reusable Inline Field Error Component ---------- */
function FieldError({ message }) {
  if (!message) return null;

  return (
    <p className="flex items-center gap-1.5 text-xs font-semibold text-red-600 mt-2 animate-fadeIn">
      <ExclamationCircleIcon className="h-4 w-4 shrink-0 text-red-500" />
      <span>{message}</span>
    </p>
  );
}

/* ---------- Reusable Input Component ---------- */
function Input({ icon: Icon, hasError, ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <Icon
          className={`h-5 w-5 absolute left-4 top-4 transition-colors ${
            hasError ? "text-red-400" : "text-gray-400"
          }`}
        />
      )}
      <input
        {...props}
        className={`w-full rounded-2xl px-5 py-4 pl-11 border outline-none transition bg-white/80 ${
          hasError
            ? "border-red-400 focus:ring-4 focus:ring-red-100 focus:border-red-500 bg-red-50/20 text-red-900"
            : "border-gray-300/60 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500"
        }`}
      />
    </div>
  );
}
