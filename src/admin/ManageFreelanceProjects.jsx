import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import toast from "react-hot-toast";
import {
  BriefcaseIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  PhotoIcon,
  TagIcon,
  UserIcon,
  LinkIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const API = import.meta.env.VITE_API_URL || "/api";

/* SAME SPINNER */
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

export default function ManageFreelanceProjects() {
  /* CORE STATES — SAME AS YOUTUBE */
  const [projects, setProjects] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  /* FILTERS */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  /* FORM — EXACT SAME PATTERN */
  const [form, setForm] = useState({
    title: "",
    clientName: "",
    projectUrl: "",
    thumbnail: "",
    technologies: "",
    description: "",
    testimonial: "",
    clientRating: 5,
    status: "completed",
  });

  const token = localStorage.getItem("token");

  const headers = useMemo(() => {
    return { Authorization: `Bearer ${token}` };
  }, [token]);

  /* FETCH */
  const fetchProjects = async () => {
    setFetching(true);
    try {
      const params = {};
      if (statusFilter !== "all") params.status = statusFilter;
      if (search.trim()) params.search = search.trim();

      const res = await axios.get(`${API}/freelance`, { params });
      setProjects(res.data);
    } catch {
      toast.error("Failed to fetch projects");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line
  }, [statusFilter]);

  /* FORM CHANGE */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* SUBMIT — SAME ADD / UPDATE LOGIC */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...form,
      technologies: form.technologies
        ? form.technologies
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
      images: form.thumbnail ? [form.thumbnail] : [],
    };

    try {
      editingId
        ? await axios.put(`${API}/freelance/${editingId}`, payload, { headers })
        : await axios.post(`${API}/freelance`, payload, { headers });

      toast.success(editingId ? "Project updated" : "Project added");

      setForm({
        title: "",
        clientName: "",
        projectUrl: "",
        thumbnail: "",
        technologies: "",
        description: "",
        testimonial: "",
        clientRating: 5,
        status: "completed",
      });

      setEditingId(null);
      fetchProjects();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast.error("Failed to save project");
    } finally {
      setSubmitting(false);
    }
  };

  /* EDIT */
  const handleEdit = (p) => {
    setForm({
      title: p.title,
      clientName: p.clientName,
      projectUrl: p.projectUrl || "",
      thumbnail: p.images?.[0] || "",
      technologies: p.technologies?.join(", ") || "",
      description: p.description || "",
      testimonial: p.testimonial || "",
      clientRating: p.clientRating || 5,
      status: p.status,
    });
    setEditingId(p._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* DELETE */
  const confirmDelete = async () => {
    if (!deletingId) return;
    setDeleting(true);

    try {
      await axios.delete(`${API}/freelance/${deletingId}`, { headers });
      toast.success("Project deleted");
      fetchProjects();
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
            <BriefcaseIcon className="h-8 w-8 text-indigo-600" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Freelance Projects CMS
              </h2>
              <p className="text-sm text-gray-500">
                Manage client freelance work.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              Total Projects: {projects.length}
            </span>

            <button
              onClick={fetchProjects}
              disabled={fetching}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-md border font-medium transition
              ${
                fetching
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-50 text-gray-700"
              }`}
            >
              <ArrowPathIcon
                className={`h-5 w-5 ${
                  fetching ? "animate-spin text-indigo-600" : "text-gray-600"
                }`}
              />
              {fetching ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-6 flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchProjects()}
              placeholder="Search projects or clients..."
              className="w-full pl-10 pr-3 py-2.5 border rounded-md"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 border rounded-md"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="ongoing">Ongoing</option>
          </select>

          <button
            onClick={fetchProjects}
            disabled={fetching}
            className={`px-4 py-2.5 rounded-md font-medium text-white transition
            ${
              fetching
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {fetching ? <Spinner text="Applying..." /> : "Apply"}
          </button>
        </div>

        {/* FORM — EXACT MATCH */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border rounded-xl p-6 shadow-sm mb-10"
        >
          <h3 className="font-semibold text-gray-700 mb-4">
            {editingId ? "Edit Project" : "Add New Project"}
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="relative">
              <BriefcaseIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Project Title"
                className="w-full pl-10 py-2.5 border rounded-md"
              />
            </div>

            <div className="relative">
              <UserIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                name="clientName"
                value={form.clientName}
                onChange={handleChange}
                placeholder="Client Name"
                className="w-full pl-10 py-2.5 border rounded-md"
              />
            </div>

            <div className="relative">
              <LinkIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                name="projectUrl"
                value={form.projectUrl}
                onChange={handleChange}
                placeholder="Project URL"
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
                name="technologies"
                value={form.technologies}
                onChange={handleChange}
                placeholder="Technologies (comma separated)"
                className="w-full pl-10 py-2.5 border rounded-md"
              />
            </div>

            <div className="relative">
              <StarIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="number"
                min="1"
                max="5"
                name="clientRating"
                value={form.clientRating}
                onChange={handleChange}
                className="w-full pl-10 py-2.5 border rounded-md"
              />
            </div>
          </div>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Project Description"
            className="w-full mt-4 p-3 border rounded-md h-28"
          />

          <textarea
            name="testimonial"
            value={form.testimonial}
            onChange={handleChange}
            placeholder="Client Testimonial"
            className="w-full mt-4 p-3 border rounded-md"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full mt-4 py-2.5 border rounded-md"
          >
            <option value="completed">Completed</option>
            <option value="ongoing">Ongoing</option>
          </select>

          <button
            disabled={submitting}
            className={`mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-white font-medium transition
              ${
                submitting
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
          >
            {submitting ? (
              <Spinner
                text={editingId ? "Updating project..." : "Adding project..."}
              />
            ) : (
              <>
                <PlusIcon className="h-5 w-5" />
                {editingId ? "Update Project" : "Add Project"}
              </>
            )}
          </button>
        </form>

        {/* LIST — SAME CARD STYLE */}
        {/* LIST */}
        {fetching ? (
          <div className="flex justify-center text-gray-600">
            <Spinner text="Loading projects..." />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 bg-white border rounded-xl">
            <BriefcaseIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <p className="text-gray-800 font-semibold text-lg">
              No freelance projects found
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Add your first freelance project ✨
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {projects.map((p) => (
              <div
                key={p._id}
                className="bg-white border rounded-xl overflow-hidden hover:shadow-md transition"
              >
                <div className="h-44 bg-gray-100 overflow-hidden">
                  {p.images?.[0] ? (
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-full h-full object-cover hover:scale-105 transition"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{p.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {p.clientName} •{" "}
                        <span className="font-semibold text-indigo-600">
                          {p.status.toUpperCase()}
                        </span>
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="p-2 hover:bg-gray-100 rounded-md"
                      >
                        <PencilSquareIcon className="h-5 w-5 text-indigo-600" />
                      </button>

                      <button
                        onClick={() => {
                          setDeletingId(p._id);
                          setShowDeleteModal(true);
                        }}
                        className="p-2 hover:bg-red-50 rounded-md"
                      >
                        <TrashIcon className="h-5 w-5 text-red-600" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                    {p.testimonial || "No testimonial added."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* DELETE MODAL */}
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
                  className={`px-4 py-2 rounded-md text-white
                    ${
                      deleting
                        ? "bg-red-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
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
