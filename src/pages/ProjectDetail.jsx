import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaGithub } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "/api";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch((err) => console.error("Failed to fetch project:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]">
        <div className="text-center space-y-4 animate-pulse">
          <div className="w-16 h-16 rounded-full border-4 border-t-4 border-white border-t-transparent animate-spin mx-auto"></div>
          <p className="text-xl text-gray-200 font-semibold">
            Loading Project...
          </p>
        </div>
      </div>
    );

  if (!project)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]">
        <div className="text-center space-y-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.63-1.14 1.054-2.013L13.054 4.987c-.526-.87-1.582-.87-2.108 0L3.028 17.987c-.576.873.002 2.013 1.054 2.013z"
            />
          </svg>
          <p className="text-xl text-gray-200 font-semibold">
            Project Not Found
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

        <img
          src={project.image}
          alt={project.title}
          className="w-full rounded-xl mb-4"
        />

        <p className="mb-6 text-gray-300">{project.description}</p>

        <div className="flex flex-wrap gap-3 mb-8">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="relative inline-block px-5 py-2 text-sm font-semibold rounded-full 
                 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
                 text-white shadow-lg backdrop-blur-md
                 hover:scale-105 hover:shadow-2xl transition-all duration-300
                 before:absolute before:inset-0 before:rounded-full before:bg-white/10 before:blur-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-pink-500 transition"
          >
            🚀 Visit Live Project
          </a>
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl font-semibold hover:from-gray-600 hover:to-gray-800 transition"
          >
            <FaGithub className="text-2xl" />
            View GitHub Code
          </a>
        </div>
      </div>
    </div>
  );
}
