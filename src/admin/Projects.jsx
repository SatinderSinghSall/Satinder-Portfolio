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
  const token = localStorage.getItem("token");

  const fetchProjects = async () => {
    const res = await axios.get(`${API}/projects`);
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = { Authorization: `Bearer ${token}` };

    if (editingId) {
      await axios.put(`${API}/projects/${editingId}`, form, { headers });
    } else {
      await axios.post(`${API}/projects`, form, { headers });
    }
    setForm({ title: "", description: "", link: "", image: "" });
    setEditingId(null);
    fetchProjects();
  };

  const handleEdit = (project) => {
    setForm(project);
    setEditingId(project._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProjects();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Projects</h2>

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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          {editingId ? "Update" : "Add"} Project
        </button>
      </form>

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
    </div>
  );
}
