import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FolderOpen, FileText, Mail, Youtube } from "lucide-react";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const API = import.meta.env.VITE_API_URL || "/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [projectsCount, setProjectsCount] = useState(0);
  const [blogsCount, setBlogsCount] = useState(0);
  const [messagesCount, setMessagesCount] = useState(0);
  const [youTubeCount, setYouTubeCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Mock data for sparklines (replace with API trend data later)
  const generateTrendData = (value) => {
    return Array.from({ length: 8 }, () => ({
      value: Math.max(0, value + Math.floor(Math.random() * 20 - 10)),
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await axios.get(`${API}/dashboard`, { headers });
        setProjectsCount(res.data.projectsCount);
        setBlogsCount(res.data.blogsCount);
        setMessagesCount(res.data.messagesCount);
        setYouTubeCount(res.data.youTubeCount);
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

  const statCards = [
    {
      title: "Total Projects",
      count: projectsCount,
      icon: <FolderOpen className="w-10 h-10" />,
      gradient: "from-blue-500 via-blue-600 to-blue-800",
      data: generateTrendData(projectsCount),
      strokeColor: "#93c5fd",
    },
    {
      title: "Total Blogs",
      count: blogsCount,
      icon: <FileText className="w-10 h-10" />,
      gradient: "from-green-500 via-green-600 to-green-800",
      data: generateTrendData(blogsCount),
      strokeColor: "#86efac",
    },
    {
      title: "Contact Messages",
      count: messagesCount,
      icon: <Mail className="w-10 h-10" />,
      gradient: "from-yellow-500 via-yellow-600 to-yellow-700",
      data: generateTrendData(messagesCount),
      strokeColor: "#fde68a",
    },
    {
      title: "YouTube Count",
      count: youTubeCount,
      icon: <Youtube className="w-10 h-10" />,
      gradient: "from-red-500 via-red-600 to-red-800",
      data: generateTrendData(youTubeCount),
      strokeColor: "#fca5a5",
    },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 flex-1 p-8 animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-5 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Logout
          </button>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white/30 backdrop-blur-md p-6 rounded-xl shadow animate-pulse"
              >
                <div className="h-6 bg-gray-300 rounded w-1/2 mb-4 shimmer"></div>
                <div className="h-10 bg-gray-300 rounded w-1/3 shimmer"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((card, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${card.gradient} text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform backdrop-blur-lg bg-opacity-80 border border-white/20`}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    {card.icon}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{card.title}</h2>
                    <p className="text-4xl font-bold mt-1">{card.count}</p>
                  </div>
                </div>
                {/* Sparkline Chart */}
                <div className="mt-4 h-14">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={card.data}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={card.strokeColor}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Animations */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .shimmer {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%);
            background-size: 400% 100%;
            animation: shimmer 1.4s ease infinite;
          }
          @keyframes shimmer {
            0% { background-position: -400px 0; }
            100% { background-position: 400px 0; }
          }
        `}
      </style>
    </div>
  );
}
