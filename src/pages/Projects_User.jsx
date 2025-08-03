import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "/api";

function SkeletonProjectCard() {
  return (
    <div className="relative group overflow-hidden rounded-3xl shadow-xl bg-white/5 backdrop-blur-md border border-white/10 animate-pulse">
      <div className="overflow-hidden rounded-t-3xl">
        <div className="w-full h-56 bg-gradient-to-r from-gray-700 to-gray-600" />
      </div>
      <div className="p-6 flex flex-col gap-4">
        <div className="h-8 w-3/4 bg-gradient-to-r from-gray-700 to-gray-600 rounded-md" />
        <div className="space-y-2 flex-1">
          <div className="h-3 w-full bg-gradient-to-r from-gray-700 to-gray-600 rounded-md" />
          <div className="h-3 w-full bg-gradient-to-r from-gray-700 to-gray-600 rounded-md" />
          <div className="h-3 w-5/6 bg-gradient-to-r from-gray-700 to-gray-600 rounded-md" />
        </div>
        <div className="mt-auto">
          <div className="h-10 w-full rounded-xl bg-gradient-to-r from-gray-700 to-gray-600" />
        </div>
      </div>
    </div>
  );
}

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

  const skeletonCount = 6;

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <SkeletonProjectCard key={i} />
            ))}
          </div>
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
                <div className="p-6 flex flex-col gap-4">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    {project.description.length > 120
                      ? project.description.slice(0, 120) + "..."
                      : project.description}
                  </p>
                  <Link
                    to={`/projects/${project._id}`}
                    className="mt-auto w-full inline-block text-center font-semibold py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-pink-500 transition-all text-white shadow-md"
                  >
                    🚀 View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
