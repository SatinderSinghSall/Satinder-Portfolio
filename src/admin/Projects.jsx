import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

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
      !form.technologies.length
    ) {
      setError("All fields except project link are required.");
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
      } else {
        await axios.post(`${API}/projects`, formData, { headers });
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

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const headers = { Authorization: `Bearer ${token}` };
    try {
      await axios.delete(`${API}/projects/${id}`, { headers });
      fetchProjects();
    } catch (err) {
      console.error("Failed to delete project", err);
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Manage Projects</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3 mb-8">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border"
        />
        <input
          name="technologies"
          value={form.technologies.join(", ")}
          onChange={handleChange}
          placeholder="Technologies (comma separated)"
          className="w-full p-2 border"
        />
        <input
          name="githubLink"
          value={form.githubLink}
          onChange={handleChange}
          placeholder="GitHub Link"
          className="w-full p-2 border"
        />
        <input
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="Project Link"
          className="w-full p-2 border"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setForm({ ...form, imageFile: e.target.files[0] })}
        />
        <button
          type="submit"
          disabled={loading}
          className={`flex items-center gap-2 px-4 py-2 text-white ${
            loading ? "bg-blue-400" : "bg-blue-600"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="w-5 h-5 animate-spin"
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
              {editingId ? "Updating..." : "Adding..."}
            </>
          ) : editingId ? (
            "Update Project"
          ) : (
            "Add Project"
          )}
        </button>
      </form>

      {fetching ? (
        <p>Loading projects...</p>
      ) : (
        <ul>
          {projects.map((proj) => (
            <li key={proj._id} className="mb-4 border-b pb-2">
              <h3 className="text-xl font-semibold">{proj.title}</h3>
              <p>{proj.description}</p>
              <ul className="flex gap-2 flex-wrap">
                {proj.technologies.map((tech, idx) => (
                  <li key={idx} className="text-sm bg-gray-200 rounded px-2">
                    {tech}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500">
                <a
                  href={proj.githubLink}
                  target="_blank"
                  className="text-blue-500"
                >
                  GitHub
                </a>
              </p>
              <a href={proj.link} target="_blank" className="text-blue-500">
                Visit
              </a>
              <div className="space-x-2 mt-2">
                <button
                  onClick={() => handleEdit(proj)}
                  className="text-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(proj._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </AdminLayout>
  );
}
