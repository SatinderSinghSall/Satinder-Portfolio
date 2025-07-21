import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/projects`)
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Failed to fetch projects:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] py-16 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-5xl font-extrabold mb-4 leading-tight">
          Creative <span className="text-blue-500">Projects</span>
        </h2>
        <p className="text-center text-gray-300 mb-12 text-lg max-w-3xl mx-auto">
          A collection of my finest work, blending clean design with impactful
          functionality.
        </p>

        {loading ? (
          <p className="text-center text-lg text-gray-400 animate-pulse">
            Loading Projects...
          </p>
        ) : projects.length === 0 ? (
          <p className="text-center text-lg text-gray-400">
            No projects available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <div
                key={project._id}
                className="relative group overflow-hidden rounded-3xl shadow-xl bg-white/5 backdrop-blur-md border border-white/10 hover:shadow-2xl transition-all duration-300 hover:scale-[1.025]"
              >
                <div className="overflow-hidden rounded-t-3xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 flex flex-col h-full justify-between">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    {project.description.length > 120
                      ? project.description.slice(0, 120) + "..."
                      : project.description}
                  </p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto w-full inline-block text-center font-semibold py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-pink-500 transition-all text-white shadow-md"
                  >
                    🚀 Visit Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
