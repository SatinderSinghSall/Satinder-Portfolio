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
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  EyeIcon, // Eye icon added for modal trigger
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
  /* CORE STATES */
  const [projects, setProjects] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  /* INSPECTOR & LIGHTBOX MODAL STATES */
  const [viewModal, setViewModal] = useState(false);
  const [selectedProjectInspect, setSelectedProjectInspect] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null);

  /* DERIVED SELECTED PROJECT FOR DELETE MODAL */
  const selectedProject = useMemo(() => {
    return projects.find((p) => p._id === deletingId) || null;
  }, [projects, deletingId]);

  /* BODY SCROLL LOCK WHEN MODALS ARE OPEN */
  useEffect(() => {
    if (showDeleteModal || viewModal || expandedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showDeleteModal, viewModal, expandedImage]);

  /* FILTERS */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  /* PAGINATION STATES */
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);

  /* FORM */
  const [form, setForm] = useState({
    title: "",
    clientName: "",
    clientCompany: "",
    projectUrl: "",
    thumbnail: "",
    technologies: "",
    description: "",
    testimonial: "",
    clientRating: 5,
    status: "completed",
    featured: false,
  });

  const token = localStorage.getItem("token");

  const headers = useMemo(() => {
    return { Authorization: `Bearer ${token}` };
  }, [token]);

  /* FETCH WITH PAGINATION */
  const fetchProjects = async (overridePage) => {
    setFetching(true);
    const currentPage = overridePage ?? page;

    try {
      const params = {
        page: currentPage,
        limit: limit,
      };
      if (statusFilter !== "all") params.status = statusFilter;
      if (search.trim()) params.search = search.trim();

      const res = await axios.get(`${API}/freelance`, { params });

      if (res.data && Array.isArray(res.data.projects)) {
        setProjects(res.data.projects);
        setTotalPages(res.data.totalPages || 1);
        setTotalProjects(
          res.data.totalProjects || res.data.total || res.data.projects.length,
        );
      } else if (Array.isArray(res.data)) {
        const start = (currentPage - 1) * limit;
        const end = start + limit;
        setProjects(res.data.slice(start, end));
        setTotalPages(Math.ceil(res.data.length / limit) || 1);
        setTotalProjects(res.data.length);
      }
    } catch {
      toast.error("Failed to fetch projects");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, statusFilter, limit]);

  const handleApplyFilters = () => {
    setPage(1);
    fetchProjects(1);
  };

  /* FORM CHANGE */
  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  /* SUBMIT */
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
        clientCompany: "",
        projectUrl: "",
        thumbnail: "",
        technologies: "",
        description: "",
        testimonial: "",
        clientRating: 5,
        status: "completed",
        featured: false,
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
      title: p.title || "",
      clientName: p.clientName || "",
      clientCompany: p.clientCompany || "",
      projectUrl: p.projectUrl || "",
      thumbnail: p.images?.[0] || "",
      technologies: p.technologies?.join(", ") || "",
      description: p.description || "",
      testimonial: p.testimonial || "",
      clientRating: p.clientRating || 5,
      status: p.status || "completed",
      featured: p.featured || false,
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
              Total Projects: {totalProjects}
            </span>

            <button
              onClick={() => fetchProjects()}
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
              onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
              placeholder="Search projects or clients..."
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
            <option value="completed">Completed</option>
            <option value="ongoing">Ongoing</option>
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
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
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
            {editingId ? "Edit Project" : "Add New Project"}
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="relative">
              <BriefcaseIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Project Title *"
                required
                className="w-full pl-10 py-2.5 border rounded-md"
              />
            </div>

            <div className="relative">
              <UserIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                name="clientName"
                value={form.clientName}
                onChange={handleChange}
                placeholder="Client Name *"
                required
                className="w-full pl-10 py-2.5 border rounded-md"
              />
            </div>

            <div className="relative">
              <UserIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                name="clientCompany"
                value={form.clientCompany}
                onChange={handleChange}
                placeholder="Client Company (Optional)"
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
                placeholder="Thumbnail Image URL"
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
                placeholder="Rating (1-5)"
              />
            </div>

            <div className="flex items-center gap-4">
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="flex-1 py-2.5 border rounded-md px-3"
              >
                <option value="completed">Completed</option>
                <option value="ongoing">Ongoing</option>
              </select>

              <label className="flex items-center gap-2 cursor-pointer border px-4 py-2.5 rounded-md hover:bg-gray-50">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
                <span className="text-sm font-medium text-gray-700">
                  Featured
                </span>
              </label>
            </div>
          </div>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Project Description *"
            required
            className="w-full mt-4 p-3 border rounded-md h-28"
          />

          <textarea
            name="testimonial"
            value={form.testimonial}
            onChange={handleChange}
            placeholder="Client Testimonial"
            className="w-full mt-4 p-3 border rounded-md"
          />

          <button
            disabled={submitting}
            className={`mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-white font-medium transition cursor-pointer
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

        {/* LIST */}
        {fetching ? (
          <div className="flex justify-center text-gray-600 py-16">
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
          <>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {projects.map((p) => (
                <div
                  key={p._id}
                  className="bg-white border rounded-xl overflow-hidden hover:shadow-md transition"
                >
                  <div className="h-44 bg-gray-100 overflow-hidden relative group">
                    {p.images?.[0] ? (
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
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
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{p.title}</h3>
                          {p.featured && (
                            <span className="text-[10px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {p.clientName}{" "}
                          {p.clientCompany ? `(${p.clientCompany})` : ""} •{" "}
                          <span className="font-semibold text-indigo-600">
                            {p.status?.toUpperCase()}
                          </span>
                        </p>
                      </div>

                      {/* ACTION BUTTONS WITH EYE ICON */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setSelectedProjectInspect(p);
                            setViewModal(true);
                          }}
                          className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-md transition cursor-pointer"
                          title="Inspect Database Schema"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>

                        <button
                          onClick={() => handleEdit(p)}
                          className="p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                          title="Edit"
                        >
                          <PencilSquareIcon className="h-5 w-5 text-indigo-600" />
                        </button>

                        <button
                          onClick={() => {
                            setDeletingId(p._id);
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
                      {p.testimonial ||
                        p.description ||
                        "No description added."}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION CONTROLS */}
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
                              ? "bg-indigo-600 text-white"
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

        {/* FREELANCE PROJECT SCHEMA INSPECTOR MODAL */}
        {viewModal && selectedProjectInspect && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fade-in">
            <div className="bg-white rounded-3xl max-w-4xl w-full h-full max-h-[88vh] flex flex-col shadow-2xl border border-slate-200/80 overflow-hidden ring-1 ring-black/5">
              {/* STICKY HEADER */}
              <div className="px-5 sm:px-8 py-4 sm:py-5 border-b border-slate-100 flex items-start sm:items-center justify-between bg-white shrink-0 gap-3">
                <div className="space-y-1 pr-2 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-extrabold text-indigo-600 tracking-wider uppercase bg-indigo-50 border border-indigo-200/60 px-2.5 py-0.5 rounded-full shrink-0">
                      Freelance Project Schema Inspector
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100/80 px-2 py-0.5 rounded-md truncate max-w-[140px] sm:max-w-none">
                      ID: {selectedProjectInspect._id || "N/A"}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug truncate">
                    {selectedProjectInspect.title}
                  </h3>
                </div>

                <button
                  onClick={() => setViewModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer shrink-0"
                >
                  <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                </button>
              </div>

              {/* INNER SCROLLABLE BODY */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 sm:space-y-8 divide-y divide-slate-100 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                {/* SCHEMA PROPERTIES GRID */}
                <div className="space-y-2.5">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Schema Metadata & Ratings
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                        Client Name
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        {selectedProjectInspect.clientName || "N/A"}
                      </span>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                        Client Company
                      </span>
                      <span className="text-xs font-bold text-slate-800 truncate block">
                        {selectedProjectInspect.clientCompany || "N/A"}
                      </span>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                        Status
                      </span>
                      <span
                        className={`text-xs font-bold capitalize ${
                          selectedProjectInspect.status === "completed"
                            ? "text-emerald-600"
                            : "text-amber-600"
                        }`}
                      >
                        ● {selectedProjectInspect.status || "completed"}
                      </span>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                        Featured
                      </span>
                      <span
                        className={`text-xs font-bold ${selectedProjectInspect.featured ? "text-amber-600" : "text-slate-500"}`}
                      >
                        {selectedProjectInspect.featured ? "★ Yes" : "No"}
                      </span>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60 col-span-2 sm:col-span-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                        Client Rating
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <span>
                          {selectedProjectInspect.clientRating || 5} / 5
                        </span>
                        <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
                      </div>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                        Technologies Stack
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        {selectedProjectInspect.technologies?.length || 0}{" "}
                        Listed
                      </span>
                    </div>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="pt-6 space-y-2.5">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Project Description
                  </h4>
                  <div className="text-xs sm:text-sm text-slate-700 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/70 leading-relaxed whitespace-pre-wrap font-medium">
                    {selectedProjectInspect.description ||
                      "No description provided."}
                  </div>
                </div>

                {/* TESTIMONIAL */}
                {selectedProjectInspect.testimonial && (
                  <div className="pt-6 space-y-2.5">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Client Testimonial
                    </h4>
                    <div className="text-xs sm:text-sm italic text-slate-700 bg-indigo-50/40 p-4 rounded-2xl border border-indigo-100 leading-relaxed">
                      "{selectedProjectInspect.testimonial}"
                    </div>
                  </div>
                )}

                {/* TECHNOLOGIES LIST */}
                <div className="pt-6 space-y-2.5">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Technologies Array
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(selectedProjectInspect.technologies) &&
                    selectedProjectInspect.technologies.length > 0 ? (
                      selectedProjectInspect.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200/70 text-xs font-semibold px-3 py-1 rounded-xl transition"
                        >
                          {tech}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">
                        No technologies listed
                      </span>
                    )}
                  </div>
                </div>

                {/* IMAGES GALLERY WITH EXPAND TRIGGER */}
                <div className="pt-6 space-y-4">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Project Images ({selectedProjectInspect.images?.length || 0}
                    )
                  </h4>

                  {Array.isArray(selectedProjectInspect.images) &&
                  selectedProjectInspect.images.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedProjectInspect.images.map((img, idx) => (
                        <div
                          key={idx}
                          onClick={() => setExpandedImage(img)}
                          className="group relative h-40 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 cursor-pointer shadow-xs hover:shadow-md transition-all"
                        >
                          <img
                            src={img}
                            alt={`Project Image ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                            🔍 Click to expand
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">
                      No images attached.
                    </p>
                  )}

                  {/* PROJECT URL LINK */}
                  {selectedProjectInspect.projectUrl && (
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[11px] font-bold text-slate-600 block">
                        Project Live Link
                      </span>
                      <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
                        <a
                          href={selectedProjectInspect.projectUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-mono text-indigo-400 hover:text-indigo-300 truncate underline"
                        >
                          {selectedProjectInspect.projectUrl}
                        </a>
                        <a
                          href={selectedProjectInspect.projectUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-xl shrink-0 transition"
                        >
                          Visit Site ↗
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* TIMESTAMPS */}
                <div className="pt-6 space-y-2.5">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Timestamps
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                        Created At
                      </span>
                      <span className="text-xs font-semibold text-slate-800 truncate block">
                        {selectedProjectInspect.createdAt
                          ? new Date(
                              selectedProjectInspect.createdAt,
                            ).toLocaleString()
                          : "N/A"}
                      </span>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                        Updated At
                      </span>
                      <span className="text-xs font-semibold text-slate-800 truncate block">
                        {selectedProjectInspect.updatedAt
                          ? new Date(
                              selectedProjectInspect.updatedAt,
                            ).toLocaleString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* STICKY FOOTER */}
              <div className="px-5 sm:px-8 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end shrink-0">
                <button
                  onClick={() => setViewModal(false)}
                  className="bg-slate-900 hover:bg-black text-white font-semibold text-xs px-6 py-2.5 rounded-xl transition shadow-xs active:scale-95 cursor-pointer"
                >
                  Close Inspector
                </button>
              </div>
            </div>
          </div>
        )}

        {/* IMAGE EXPANSION / LIGHTBOX OVERLAY */}
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

        {/* DELETE MODAL - DANGER ZONE */}
        {showDeleteModal && (
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300 animate-fadeIn"
            onClick={() => setShowDeleteModal(false)}
          >
            <div
              className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-red-100 relative transform transition-all scale-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Accent Gradient Line */}
              <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-rose-500 to-red-600" />

              {/* Dismiss Button */}
              <button
                onClick={() => setShowDeleteModal(false)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>

              <div className="p-6 sm:p-8 text-center">
                {/* Layered Danger Icon Badge */}
                <div className="relative mx-auto mb-5 w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 bg-red-100 rounded-2xl rotate-6 scale-95 opacity-70" />
                  <div className="absolute inset-0 bg-red-200/50 rounded-2xl -rotate-3 scale-100" />
                  <div className="relative w-16 h-16 bg-gradient-to-b from-red-50 to-red-100/80 rounded-2xl border border-red-200/60 flex items-center justify-center text-red-600 shadow-inner">
                    <ExclamationTriangleIcon className="h-8 w-8 text-red-600 drop-shadow-sm" />
                  </div>
                </div>

                {/* Danger Zone Pill */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-red-50 text-red-600 border border-red-200/60 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  Danger Zone
                </span>

                {/* Title */}
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Delete Freelance Project?
                </h3>

                {/* Warning Body */}
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Are you sure you want to delete this project? This action is{" "}
                  <span className="font-semibold text-slate-900 underline decoration-red-300 decoration-2 underline-offset-2">
                    permanent
                  </span>{" "}
                  and cannot be undone.
                </p>

                {/* Project Context Preview Badge */}
                {selectedProject?.title && (
                  <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 truncate font-medium flex items-center justify-center gap-2">
                    <BriefcaseIcon className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="truncate">{selectedProject.title}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mt-7">
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 active:bg-slate-100 transition-all text-sm cursor-pointer shadow-sm"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
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
                        <TrashIcon className="h-4 w-4 stroke-[2.5]" />
                        Yes, Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
