import { useEffect, useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL || "/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(`${API}/projects`).then((res) => setProjects(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="border p-4 rounded shadow">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-40 object-cover mb-2"
            />
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p>{project.description}</p>
            <a
              href={project.link}
              target="_blank"
              className="text-blue-600 mt-2 inline-block"
            >
              Visit
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
