import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import toast from "react-hot-toast";
import {
  Edit,
  Trash2,
  Plus,
  FolderKanban,
  Github,
  ExternalLink,
  AlertTriangle,
  Loader2,
  TagIcon,
  Search,
  RefreshCcw,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL || "/api";

const Spinner = ({ text }) => (
  <div className="flex items-center gap-2">
    <Loader2 className="w-5 h-5 animate-spin" />
    <span>{text}</span>
  </div>
);

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: [],
    githubLink: "",
    link: "",
    image: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const token = localStorage.getItem("token");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ✅ NEW: Search + Filter + Sort
  const [search, setSearch] = useState("");
  const [techFilter, setTechFilter] = useState("all");
  const [sort, setSort] = useState("latest"); // latest | oldest

  const headers = useMemo(() => {
    return { Authorization: `Bearer ${token}` };
  }, [token]);

  const fetchProjects = async () => {
    setFetching(true);
    try {
      const res = await axios.get(`${API}/projects`);
      setProjects(res.data || []);
    } catch {
      toast.error("Failed to fetch projects");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

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

    if (
      !form.title ||
      !form.description ||
      !form.githubLink ||
      !form.technologies.length ||
      !form.link
    ) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("link", form.link);
      formData.append("githubLink", form.githubLink);
      formData.append("technologies", form.technologies.join(","));
      if (form.imageFile) formData.append("image", form.imageFile);

      editingId
        ? await axios.put(`${API}/projects/${editingId}`, formData, { headers })
        : await axios.post(`${API}/projects`, formData, { headers });

      toast.success(editingId ? "Project updated" : "Project added");

      setForm({
        title: "",
        description: "",
        link: "",
        githubLink: "",
        technologies: [],
        imageFile: null,
      });

      setEditingId(null);
      fetchProjects();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast.error("Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title,
      description: project.description,
      link: project.link,
      image: project.image,
      technologies: project.technologies,
      githubLink: project.githubLink,
    });
    setEditingId(project._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async () => {
    if (!selectedProjectId) return;
    setDeleteLoading(true);

    try {
      await axios.delete(`${API}/projects/${selectedProjectId}`, { headers });
      toast.success("Project deleted");
      fetchProjects();
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleteLoading(false);
      setIsDeleteModalOpen(false);
      setSelectedProjectId(null);
    }
  };

  // ✅ NEW: Unique Technologies for filter dropdown
  const uniqueTechnologies = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => {
      (p.technologies || []).forEach((t) => set.add(t));
    });
    return Array.from(set).sort();
  }, [projects]);

  // ✅ NEW: Filter + Search + Sort (Frontend)
  const filteredProjects = useMemo(() => {
    let list = [...projects];

    // search by title/description/tech
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter((p) => {
        const title = (p.title || "").toLowerCase();
        const desc = (p.description || "").toLowerCase();
        const techs = (p.technologies || []).join(" ").toLowerCase();
        return title.includes(q) || desc.includes(q) || techs.includes(q);
      });
    }

    // tech filter
    if (techFilter !== "all") {
      list = list.filter((p) => (p.technologies || []).includes(techFilter));
    }

    // sort by createdAt (if exists) else keep order
    if (sort === "latest") {
      list.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
      );
    }
    if (sort === "oldest") {
      list.sort(
        (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0),
      );
    }

    return list;
  }, [projects, search, techFilter, sort]);

  return (
    <AdminLayout>
      <div className="w-full max-w-[1400px] mx-auto px-6 pb-16">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <FolderKanban className="w-7 h-7 text-indigo-600" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Project Management CMS
              </h2>
              <p className="text-sm text-gray-500">
                Manage your portfolio projects.
              </p>
            </div>
          </div>

          {/* ✅ NEW: Refresh Button */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              Total Projects: {projects.length}
            </span>

            <button
              onClick={fetchProjects}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border bg-white hover:bg-gray-50"
            >
              <RefreshCcw className="w-5 h-5 text-gray-600" />
              Refresh
            </button>
          </div>
        </div>

        {/* ✅ NEW: Search + Filter + Sort */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-6 flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects by title, description, technologies..."
              className="w-full pl-10 pr-3 py-2.5 border rounded-md"
            />
          </div>

          <select
            value={techFilter}
            onChange={(e) => setTechFilter(e.target.value)}
            className="px-3 py-2.5 border rounded-md"
          >
            <option value="all">All Tech</option>
            {uniqueTechnologies.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
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
            onClick={fetchProjects}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium"
          >
            Apply
          </button>
        </div>

        {/* ✅ FORM (UNCHANGED UI) */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border rounded-xl p-6 shadow-sm mb-10"
        >
          <h3 className="font-semibold text-gray-700 mb-4">
            {editingId ? "Edit Project" : "Add New Project"}
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Project Title */}
            <div className="relative">
              <FolderKanban className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Project Title"
                className="w-full pl-10 pr-3 py-2.5 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* GitHub Link */}
            <div className="relative">
              <Github className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                name="githubLink"
                value={form.githubLink}
                onChange={handleChange}
                placeholder="GitHub Repository URL"
                className="w-full pl-10 pr-3 py-2.5 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Live Link */}
            <div className="relative">
              <ExternalLink className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                name="link"
                value={form.link}
                onChange={handleChange}
                placeholder="Live Project URL"
                className="w-full pl-10 pr-3 py-2.5 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Technologies */}
            <div className="relative lg:col-span-2">
              <TagIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                name="technologies"
                value={form.technologies.join(", ")}
                onChange={handleChange}
                placeholder="Technologies (comma separated)"
                className="w-full pl-10 pr-3 py-2.5 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Description */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Project description"
            className="w-full mt-4 p-3 border rounded-md h-32 focus:ring-2 focus:ring-indigo-500"
          />

          {/* Image Upload */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Project Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({ ...form, imageFile: e.target.files[0] })
              }
              className="block w-full text-sm text-gray-600
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:bg-gray-100 file:text-gray-700
                hover:file:bg-gray-200"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-6 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md text-white font-medium transition
                ${
                  loading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }
              `}
          >
            {loading ? (
              <Spinner
                text={editingId ? "Updating project..." : "Adding project..."}
              />
            ) : (
              <>
                <Plus className="w-5 h-5" />
                {editingId ? "Update Project" : "Add Project"}
              </>
            )}
          </button>
        </form>

        {/* ✅ Cards Section */}
        {fetching ? (
          <div className="flex justify-center gap-2 text-gray-600">
            <Spinner text="Loading projects..." />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white border rounded-xl">
            <p className="text-gray-700 font-semibold">No projects found</p>
            <p className="text-sm text-gray-500 mt-1">
              Try changing filters or add a new project ✨
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {filteredProjects.map((proj) => (
              <div
                key={proj._id}
                className="bg-white border rounded-xl overflow-hidden hover:shadow-md transition"
              >
                {/* Image */}
                <div className="h-44 bg-gray-100 overflow-hidden">
                  {proj.image ? (
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {proj.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {proj.description}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(proj)}
                        className="p-2 hover:bg-gray-100 rounded-md"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5 text-indigo-600" />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedProjectId(proj._id);
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-2 hover:bg-red-50 rounded-md"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {proj.technologies?.length > 0 ? (
                      proj.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs bg-gray-100 px-2 py-1 rounded-full border"
                        >
                          {tech}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">
                        No technologies
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex justify-between items-center mt-5">
                    <div className="flex gap-4 text-gray-500">
                      {proj.githubLink && (
                        <a href={proj.githubLink} target="_blank">
                          <Github className="w-5 h-5 hover:text-gray-800" />
                        </a>
                      )}
                      {proj.link && (
                        <a href={proj.link} target="_blank">
                          <ExternalLink className="w-5 h-5 hover:text-gray-800" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="flex items-center gap-2 font-semibold text-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Delete Project
              </h3>
              <p className="text-sm text-gray-600 my-4">
                This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className={`px-4 py-2 rounded text-white flex items-center gap-2 ${
                    deleteLoading ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {deleteLoading ? <Spinner text="Deleting..." /> : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
