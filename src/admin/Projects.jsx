import { useEffect, useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL || "/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.description || !form.link || !form.image) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    const headers = { Authorization: `Bearer ${token}` };

    try {
      if (editingId) {
        await axios.put(`${API}/projects/${editingId}`, form, { headers });
      } else {
        await axios.post(`${API}/projects`, form, { headers });
      }
      setForm({ title: "", description: "", link: "", image: "" });
      setEditingId(null);
      fetchProjects();
    } catch (err) {
      setError("Failed to save project.");
      console.error(err);
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
    <div className="p-6">
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
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
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
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border"
        />
        <button
          type="submit"
          disabled={loading}
          className={`flex items-center gap-2 px-4 py-2 text-white ${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600"
          }`}
        >
          {loading && (
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
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          )}
          {loading
            ? editingId
              ? "Updating..."
              : "Adding..."
            : editingId
            ? "Update Project"
            : "Add Project"}
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
    </div>
  );
}
