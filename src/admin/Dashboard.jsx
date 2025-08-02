import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FolderOpen, FileText, Mail } from "lucide-react";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL || "/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [projectsCount, setProjectsCount] = useState(0);
  const [blogsCount, setBlogsCount] = useState(0);
  const [messagesCount, setMessagesCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await axios.get(`${API}/dashboard`, { headers });
        setProjectsCount(res.data.projectsCount);
        setBlogsCount(res.data.blogsCount);
        setMessagesCount(res.data.messagesCount);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Admin logout successful!");
    navigate("/login");
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 flex-1 p-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
          >
            Logout
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow animate-pulse"
              >
                <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-gray-300 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Projects Card */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
              <div className="flex items-center gap-4">
                <FolderOpen className="w-12 h-12" />
                <div>
                  <h2 className="text-xl font-semibold">Total Projects</h2>
                  <p className="text-4xl font-bold mt-1">{projectsCount}</p>
                </div>
              </div>
            </div>

            {/* Blogs Card */}
            <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
              <div className="flex items-center gap-4">
                <FileText className="w-12 h-12" />
                <div>
                  <h2 className="text-xl font-semibold">Total Blogs</h2>
                  <p className="text-4xl font-bold mt-1">{blogsCount}</p>
                </div>
              </div>
            </div>

            {/* Messages Card */}
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
              <div className="flex items-center gap-4">
                <Mail className="w-12 h-12" />
                <div>
                  <h2 className="text-xl font-semibold">Contact Messages</h2>
                  <p className="text-4xl font-bold mt-1">{messagesCount}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
