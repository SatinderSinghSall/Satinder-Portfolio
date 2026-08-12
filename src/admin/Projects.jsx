import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import toast from "react-hot-toast";
import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  FolderIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  PlusIcon,
  DocumentTextIcon,
  PhotoIcon,
  TagIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  LinkIcon,
  CheckIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  HashtagIcon,
  HeartIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const API = import.meta.env.VITE_API_URL || "/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Edit State
  const [editingId, setEditingId] = useState(null);
  const formRef = useRef(null);

  // Modal States
  const [viewingProject, setViewingProject] = useState(null);
  const [deletingProject, setDeletingProject] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // --- Form State (Mapped exactly to Mongoose Schema) ---
  const initialFormState = {
    title: "",
    description: "",
    technologies: "", // Comma-separated in UI -> Array on Submit
    githubLink: "",
    link: "",
    images: "", // Comma-separated URLs in UI -> Array on Submit
    featured: false,
    priority: 0,
    order: 0,
  };

  const [form, setForm] = useState(initialFormState);

  // --- Search & Filter State ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFeatured, setSelectedFeatured] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const token = localStorage.getItem("token");
  const headers = useMemo(
    () => ({ Authorization: `Bearer ${token}` }),
    [token],
  );

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/projects`, { headers });
      let projectList = [];
      if (Array.isArray(res.data)) {
        projectList = res.data;
      } else if (Array.isArray(res.data.projects)) {
        projectList = res.data.projects;
      } else if (Array.isArray(res.data.data)) {
        projectList = res.data.data;
      }
      setProjects(projectList);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Failed to load projects");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleStartEdit = (project) => {
    setEditingId(project._id);
    setForm({
      title: project.title || "",
      description: project.description || "",
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : project.technologies || "",
      githubLink: project.githubLink || "",
      link: project.link || "",
      images: Array.isArray(project.images)
        ? project.images.join(", ")
        : project.images || "",
      featured: Boolean(project.featured),
      priority: project.priority || 0,
      order: project.order || 0,
    });
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(initialFormState);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.githubLink.trim() ||
      !form.technologies.trim()
    ) {
      toast.error("Title, Technologies, and GitHub Link are required!");
      return;
    }

    setSubmitting(true);
    const payload = {
      ...form,
      priority: Number(form.priority) || 0,
      order: Number(form.order) || 0,
      technologies: form.technologies
        ? form.technologies
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
      images: form.images
        ? form.images
            .split(",")
            .map((img) => img.trim())
            .filter(Boolean)
        : [],
    };

    try {
      if (editingId) {
        await axios.put(`${API}/projects/${editingId}`, payload, { headers });
        toast.success("Project updated successfully!");
      } else {
        await axios.post(`${API}/projects`, payload, { headers });
        toast.success("Project created successfully!");
      }

      handleCancelEdit();
      fetchProjects();
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error(err.response?.data?.message || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deletingProject) return;
    setDeleting(true);
    try {
      await axios.delete(`${API}/projects/${deletingProject._id}`, { headers });
      toast.success("Project deleted successfully!");
      setProjects((prev) => prev.filter((p) => p._id !== deletingProject._id));
      setDeletingProject(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete project");
    } finally {
      setDeleting(false);
    }
  };

  const filteredProjects = useMemo(() => {
    if (!Array.isArray(projects)) return [];

    return projects
      .filter((project) => {
        const matchesSearch =
          project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.technologies?.some((t) =>
            t.toLowerCase().includes(searchTerm.toLowerCase()),
          );

        const matchesFeatured =
          selectedFeatured === "All" ||
          (selectedFeatured === "Featured" && project.featured) ||
          (selectedFeatured === "Normal" && !project.featured);

        return matchesSearch && matchesFeatured;
      })
      .sort((a, b) => {
        if (sortBy === "latest") {
          return (
            new Date(b.createdAt || Date.now()) -
            new Date(a.createdAt || Date.now())
          );
        }
        if (sortBy === "oldest") {
          return (
            new Date(a.createdAt || Date.now()) -
            new Date(b.createdAt || Date.now())
          );
        }
        if (sortBy === "title") {
          return (a.title || "").localeCompare(b.title || "");
        }
        if (sortBy === "priority") {
          return (b.priority || 0) - (a.priority || 0);
        }
        if (sortBy === "order") {
          return (a.order || 0) - (b.order || 0);
        }
        return 0;
      });
  }, [projects, searchTerm, selectedFeatured, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedFeatured, sortBy]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage) || 1;
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, currentPage, itemsPerPage]);

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* HEADER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-500/10">
              <FolderIcon className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Manage Projects CMS
              </h1>
              <p className="text-xs text-gray-500">
                Custom Portfolio Project Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-500 bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-sm">
              Total Projects:{" "}
              <strong className="text-gray-900">
                {filteredProjects.length}
              </strong>
            </span>
            <button
              onClick={fetchProjects}
              className="inline-flex items-center gap-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold px-3.5 py-2 rounded-xl transition shadow-sm"
            >
              <ArrowPathIcon
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:flex-1">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3.5 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects by title, description, technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition bg-gray-50/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={selectedFeatured}
              onChange={(e) => setSelectedFeatured(e.target.value)}
              className="px-3 py-2 text-xs font-medium bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:border-indigo-500 transition text-gray-700"
            >
              <option value="All">Featured: All</option>
              <option value="Featured">Featured Only</option>
              <option value="Normal">Non-Featured</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-xs font-medium bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:border-indigo-500 transition text-gray-700"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priority">High Priority First</option>
              <option value="order">Display Order Asc</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
        </div>

        {/* INLINE "ADD / EDIT PROJECT" FORM */}
        <div
          ref={formRef}
          className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-800 tracking-wide uppercase flex items-center gap-2">
              {editingId ? (
                <>
                  <PencilSquareIcon className="w-4 h-4 text-purple-600" />
                  Edit Project Details
                </>
              ) : (
                <>
                  <PlusIcon className="w-4 h-4 text-indigo-600" />
                  Add New Project
                </>
              )}
            </h2>
            {editingId && (
              <button
                onClick={handleCancelEdit}
                className="text-xs font-semibold text-gray-500 hover:text-gray-700 underline"
              >
                Cancel Editing
              </button>
            )}
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* Title */}
            <div className="relative">
              <DocumentTextIcon className="w-5 h-5 absolute left-3.5 top-3 text-gray-400" />
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleFormChange}
                placeholder="Project Title *"
                required
                className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white outline-none focus:border-indigo-500 transition"
              />
            </div>

            {/* Links: GitHub Link & Live Demo Link */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <CodeBracketIcon className="w-5 h-5 absolute left-3.5 top-3 text-gray-400" />
                <input
                  type="text"
                  name="githubLink"
                  value={form.githubLink}
                  onChange={handleFormChange}
                  placeholder="GitHub Link (https://...) *"
                  required
                  className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div className="relative">
                <GlobeAltIcon className="w-5 h-5 absolute left-3.5 top-3 text-gray-400" />
                <input
                  type="text"
                  name="link"
                  value={form.link}
                  onChange={handleFormChange}
                  placeholder="Live Project Link (https://...)"
                  className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            {/* Technologies & Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <TagIcon className="w-5 h-5 absolute left-3.5 top-3 text-gray-400" />
                <input
                  type="text"
                  name="technologies"
                  value={form.technologies}
                  onChange={handleFormChange}
                  placeholder="Technologies (comma separated e.g. React, Node.js, MongoDB) *"
                  required
                  className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div className="relative">
                <PhotoIcon className="w-5 h-5 absolute left-3.5 top-3 text-gray-400" />
                <input
                  type="text"
                  name="images"
                  value={form.images}
                  onChange={handleFormChange}
                  placeholder="Image URLs (comma separated for multiple)"
                  className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            {/* Description */}
            <textarea
              name="description"
              value={form.description}
              onChange={handleFormChange}
              placeholder="Project Description..."
              rows={4}
              className="w-full p-4 text-sm rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white outline-none focus:border-indigo-500 transition resize-y font-sans"
            />

            {/* Ordering, Priority, Featured & Action */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end pt-2">
              {/* Priority Input */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Priority
                </label>
                <div className="relative">
                  <HashtagIcon className="w-5 h-5 absolute left-3.5 top-2.5 text-gray-400" />
                  <input
                    type="number"
                    name="priority"
                    value={form.priority}
                    onChange={handleFormChange}
                    placeholder="e.g. 1"
                    className="w-full pl-11 pr-4 py-2 text-sm rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              {/* Display Order Input */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Display Order
                </label>
                <div className="relative">
                  <HashtagIcon className="w-5 h-5 absolute left-3.5 top-2.5 text-gray-400" />
                  <input
                    type="number"
                    name="order"
                    value={form.order}
                    onChange={handleFormChange}
                    placeholder="e.g. 1"
                    className="w-full pl-11 pr-4 py-2 text-sm rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center h-10">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 font-medium">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleFormChange}
                    className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                  />
                  Mark Featured
                </label>
              </div>
              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full inline-flex items-center justify-center gap-2 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition shadow-md disabled:opacity-50 ${
                    editingId
                      ? "bg-purple-600 hover:bg-purple-700 shadow-purple-500/10"
                      : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/10"
                  }`}
                >
                  {editingId ? (
                    <>
                      <CheckIcon className="w-4 h-4" />
                      {submitting ? "Updating..." : "Update Project"}
                    </>
                  ) : (
                    <>
                      <PlusIcon className="w-4 h-4" />
                      {submitting ? "Adding..." : "Add Project"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* PROJECT GRID LIST */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border border-gray-200 p-4 space-y-4 animate-pulse"
              >
                <div className="h-48 bg-gray-200 rounded-2xl w-full" />
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : paginatedProjects.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-200/80 p-12 text-center space-y-3">
            <FolderIcon className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-base font-semibold text-gray-800">
              No projects found
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Try adjusting your search filters or add a new project using the
              form above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedProjects.map((project) => {
              const mainImage =
                Array.isArray(project.images) && project.images.length > 0
                  ? project.images[0]
                  : "https://images.unsplash.com/photo-1460925895917-afdab827c52f";

              return (
                <div
                  key={project._id}
                  className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                      <img
                        src={mainImage}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1460925895917-afdab827c52f";
                        }}
                      />
                      {project.featured && (
                        <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                          <StarIcon className="w-3 h-3 fill-current" />
                          FEATURED
                        </span>
                      )}
                      <div className="absolute bottom-3 right-3 flex gap-2">
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-black/70 backdrop-blur-md hover:bg-black text-white p-2 rounded-full transition"
                            title="GitHub Repo"
                          >
                            <CodeBracketIcon className="w-4 h-4" />
                          </a>
                        )}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-black/70 backdrop-blur-md hover:bg-black text-white p-2 rounded-full transition"
                            title="Live Demo"
                          >
                            <GlobeAltIcon className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="text-base font-bold text-gray-900 line-clamp-1">
                          {project.title}
                        </h2>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => setViewingProject(project)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="View Details"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleStartEdit(project)}
                            className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition"
                            title="Edit Project"
                          >
                            <PencilSquareIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingProject(project)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete Project"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-semibold text-gray-500">
                        <span className="inline-flex items-center gap-1">
                          <ChartBarIcon className="w-3.5 h-3.5" />
                          {project.views || 0} views
                        </span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1 text-red-500">
                          <HeartIcon className="w-3.5 h-3.5 fill-current" />
                          {project.likes || 0} likes
                        </span>
                        <span>•</span>
                        <span>Priority: {project.priority || 0}</span>
                      </div>

                      <p className="text-xs text-gray-600 line-clamp-2">
                        {project.description || "No description provided."}
                      </p>

                      {Array.isArray(project.technologies) &&
                        project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {project.technologies
                              .slice(0, 5)
                              .map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="bg-indigo-50 text-indigo-600 text-[11px] font-medium px-2 py-0.5 rounded-md"
                                >
                                  {tech}
                                </span>
                              ))}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* PAGINATION CONTROLS */}
        {!loading && filteredProjects.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500 font-medium">
              Showing{" "}
              <strong className="text-gray-800">
                {Math.min(
                  (currentPage - 1) * itemsPerPage + 1,
                  filteredProjects.length,
                )}
              </strong>{" "}
              to{" "}
              <strong className="text-gray-800">
                {Math.min(currentPage * itemsPerPage, filteredProjects.length)}
              </strong>{" "}
              of{" "}
              <strong className="text-gray-800">
                {filteredProjects.length}
              </strong>{" "}
              projects
            </p>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                      currentPage === pageNum
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                ),
              )}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* VIEW PROJECT MODAL */}
      {viewingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 p-6 space-y-6">
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 tracking-wider uppercase bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                  Schema Inspector
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-1">
                  {viewingProject.title}
                </h3>
              </div>
              <button
                onClick={() => setViewingProject(null)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Images Carousel/Grid */}
            {Array.isArray(viewingProject.images) &&
              viewingProject.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 bg-gray-50 rounded-2xl border border-gray-100">
                  {viewingProject.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Project ${idx}`}
                      className="w-full h-32 object-cover rounded-xl border border-gray-200"
                    />
                  ))}
                </div>
              )}

            {/* External Links */}
            <div className="flex items-center gap-3">
              {viewingProject.githubLink && (
                <a
                  href={viewingProject.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-gray-900 px-3.5 py-2 rounded-xl hover:bg-black transition"
                >
                  <CodeBracketIcon className="w-4 h-4" /> GitHub Repository
                </a>
              )}
              {viewingProject.link && (
                <a
                  href={viewingProject.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-indigo-600 px-3.5 py-2 rounded-xl hover:bg-indigo-700 transition"
                >
                  <GlobeAltIcon className="w-4 h-4" /> Live Project Link
                </a>
              )}
            </div>

            {/* Modal Content Sections */}
            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-gray-700 uppercase tracking-wide mb-1">
                  Description
                </h4>
                <div className="text-gray-800 bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs whitespace-pre-wrap max-h-40 overflow-y-auto">
                  {viewingProject.description || "N/A"}
                </div>
              </div>

              {/* Schema Details Table */}
              <div className="grid grid-cols-2 gap-3 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                <div>
                  <span className="text-gray-400 block font-medium">
                    Featured
                  </span>
                  <span className="text-gray-800 font-semibold">
                    {viewingProject.featured ? "Yes" : "No"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">
                    Priority
                  </span>
                  <span className="text-gray-800 font-semibold">
                    {viewingProject.priority ?? 0}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Order</span>
                  <span className="text-gray-800 font-semibold">
                    {viewingProject.order ?? 0}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">
                    Views / Likes
                  </span>
                  <span className="text-gray-800 font-semibold">
                    {viewingProject.views ?? 0} Views /{" "}
                    {viewingProject.likes ?? 0} Likes
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setViewingProject(null)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-5 py-2 rounded-xl text-xs transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <ExclamationTriangleIcon className="w-8 h-8 shrink-0" />
              <h3 className="text-base font-bold text-gray-900">
                Confirm Delete Project
              </h3>
            </div>
            <p className="text-xs text-gray-600">
              Are you sure you want to delete{" "}
              <strong className="text-gray-900">
                "{deletingProject.title}"
              </strong>
              ? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeletingProject(null)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-xl text-xs transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-xl text-xs transition shadow-md shadow-red-500/20 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
