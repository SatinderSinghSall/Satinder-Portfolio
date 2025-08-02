import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import { Edit, Trash2, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL || "/api";

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
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchProjects = async () => {
    setFetching(true);
    try {
      const res = await axios.get(`${API}/projects`);
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects", err);
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
    setError("");

    if (
      !form.title ||
      !form.description ||
      !form.githubLink ||
      !form.technologies.length ||
      (!form.image && !form.imageFile) ||
      !form.link
    ) {
      setError("All fields are required.");
      toast.error("All fields are required.");
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

      if (editingId) {
        await axios.put(`${API}/projects/${editingId}`, formData, { headers });
        toast.success("Project updated successfully!");
      } else {
        await axios.post(`${API}/projects`, formData, { headers });
        toast.success("Project added successfully!");
      }

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
    } catch (err) {
      console.error(err);
      setError("Failed to save project.");
      toast.error("Failed to save project.");
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
  };

  const handleDelete = async () => {
    if (!selectedProjectId) return;
    setDeleteLoading(true);
    const headers = { Authorization: `Bearer ${token}` };
    try {
      await axios.delete(`${API}/projects/${selectedProjectId}`, { headers });
      toast.success("Project deleted successfully!");
      fetchProjects();
    } catch (err) {
      console.error("Failed to delete project", err);
      toast.error("Failed to delete project.");
    } finally {
      setDeleteLoading(false);
      setIsDeleteModalOpen(false);
      setSelectedProjectId(null);
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-6">Manage Projects</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Form Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <PlusCircle className="w-5 h-5" />
          {editingId ? "Edit Project" : "Add New Project"}
        </h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Project Title"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="githubLink"
            value={form.githubLink}
            onChange={handleChange}
            placeholder="GitHub Link"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="Project Link"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="technologies"
            value={form.technologies.join(", ")}
            onChange={handleChange}
            placeholder="Technologies (comma separated)"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 col-span-2"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 col-span-2"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setForm({ ...form, imageFile: e.target.files[0] })}
            className="col-span-2"
          />
          <button
            type="submit"
            disabled={loading}
            className={`col-span-2 flex justify-center items-center gap-2 px-6 py-3 text-white rounded-lg font-semibold transition ${
              loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading
              ? editingId
                ? "Updating..."
                : "Adding..."
              : editingId
              ? "Update Project"
              : "Add Project"}
          </button>
        </form>
      </div>

      {/* Project List */}
      <div className="grid gap-6 md:grid-cols-2">
        {fetching ? (
          <p>Loading projects...</p>
        ) : (
          projects.map((proj) => (
            <div
              key={proj._id}
              className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold mb-2">{proj.title}</h3>
                <p className="text-gray-600 mb-3">{proj.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {proj.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={proj.githubLink}
                  target="_blank"
                  className="text-blue-500 hover:underline mr-4"
                >
                  GitHub
                </a>
                <a
                  href={proj.link}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  Visit
                </a>
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleEdit(proj)}
                  className="flex items-center gap-1 text-yellow-500 hover:text-yellow-600"
                >
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedProjectId(proj._id);
                    setIsDeleteModalOpen(true);
                  }}
                  className="flex items-center gap-1 text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this project? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className={`px-4 py-2 rounded-lg text-white flex items-center justify-center gap-2 ${
                  deleteLoading ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {deleteLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                      ></path>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
