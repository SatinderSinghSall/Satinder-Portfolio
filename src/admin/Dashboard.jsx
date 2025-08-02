import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

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
    navigate("/login");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full min-h-screen bg-gray-50 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {loading ? (
          <p>Loading dashboard data...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-600 text-white p-6 rounded shadow-lg">
              <h2 className="text-xl mb-2">Total Projects</h2>
              <p className="text-3xl">{projectsCount}</p>
            </div>
            <div className="bg-green-600 text-white p-6 rounded shadow-lg">
              <h2 className="text-xl mb-2">Total Blogs</h2>
              <p className="text-3xl">{blogsCount}</p>
            </div>
            <div className="bg-yellow-600 text-white p-6 rounded shadow-lg">
              <h2 className="text-xl mb-2">Contact Messages</h2>
              <p className="text-3xl">{messagesCount}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
