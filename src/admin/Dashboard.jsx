import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";

import {
  FolderOpen,
  FileText,
  Mail,
  Youtube,
  Activity,
  Clock,
  UserCircle,
} from "lucide-react";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const API = import.meta.env.VITE_API_URL || "/api";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const formatDateTime = () =>
  new Date().toLocaleString("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

const generateTrendDataOnce = (value) =>
  Array.from({ length: 8 }, () => ({
    value: Math.max(1, value + Math.floor(Math.random() * 10 - 5)),
  }));

const weeklyOverview = [
  { day: "Mon", value: 4 },
  { day: "Tue", value: 6 },
  { day: "Wed", value: 3 },
  { day: "Thu", value: 8 },
  { day: "Fri", value: 5 },
  { day: "Sat", value: 9 },
  { day: "Sun", value: 7 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [counts, setCounts] = useState({
    projects: 0,
    blogs: 0,
    messages: 0,
    youtube: 0,
  });

  const [sparklineData, setSparklineData] = useState(null);
  const [dateTime, setDateTime] = useState(formatDateTime());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await axios.get(`${API}/dashboard`, { headers });

        const data = {
          projects: res.data.projectsCount,
          blogs: res.data.blogsCount,
          messages: res.data.messagesCount,
          youtube: res.data.youTubeCount,
        };

        setCounts(data);

        setSparklineData({
          projects: generateTrendDataOnce(data.projects),
          blogs: generateTrendDataOnce(data.blogs),
          messages: generateTrendDataOnce(data.messages),
          youtube: generateTrendDataOnce(data.youtube),
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const timer = setInterval(() => setDateTime(formatDateTime()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 flex-1 p-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-2">
              <UserCircle className="w-8 h-8 text-indigo-600" />
              {getGreeting()}, Admin
            </h1>
            <p className="text-gray-500 mt-1">Here’s what’s happening today.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow text-sm text-gray-600">
              <Clock className="w-4 h-4 text-indigo-500" />
              {dateTime}
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {!sparklineData ? (
            <>
              <MetricCardSkeleton />
              <MetricCardSkeleton />
              <MetricCardSkeleton />
              <MetricCardSkeleton />
              <ServerStatusSkeleton />
            </>
          ) : (
            <>
              <MetricCard
                title="Total Projects"
                count={counts.projects}
                icon={<FolderOpen />}
                gradient="from-blue-500 to-blue-700"
                data={sparklineData.projects}
                stroke="#bfdbfe"
              />

              <MetricCard
                title="Total Blogs"
                count={counts.blogs}
                icon={<FileText />}
                gradient="from-green-500 to-green-700"
                data={sparklineData.blogs}
                stroke="#bbf7d0"
              />

              <MetricCard
                title="Contact Messages"
                count={counts.messages}
                icon={<Mail />}
                gradient="from-yellow-500 to-yellow-700"
                data={sparklineData.messages}
                stroke="#fde68a"
              />

              <MetricCard
                title="YouTube Count"
                count={counts.youtube}
                icon={<Youtube />}
                gradient="from-red-500 to-red-700"
                data={sparklineData.youtube}
                stroke="#fecaca"
              />

              <div className="sm:col-span-2 lg:col-span-1">
                <ServerStatusCard />
              </div>
            </>
          )}
        </div>

        <div className="mt-12 bg-white rounded-2xl p-6 shadow">
          <h2 className="text-xl font-bold mb-4">Weekly Overview</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyOverview}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, count, icon, gradient, data, stroke }) {
  return (
    <div
      className={`bg-gradient-to-br ${gradient} text-white p-6 rounded-2xl shadow-lg transition-transform hover:-translate-y-1`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm uppercase opacity-80">{title}</p>
          <p className="text-4xl font-bold">{count}</p>
        </div>
        <div className="bg-white/20 p-3 rounded-xl">{icon}</div>
      </div>

      <div className="mt-4 h-14">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={stroke}
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function MetricCardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg animate-pulse">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-3 w-24 bg-gray-200 rounded"></div>
          <div className="h-8 w-20 bg-gray-300 rounded"></div>
        </div>

        <div className="h-12 w-12 bg-gray-200 rounded-xl"></div>
      </div>

      <div className="mt-6 h-14 bg-gray-200 rounded-lg"></div>
    </div>
  );
}

function ServerStatusCard() {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="text-green-400" />
            <h2 className="font-semibold">Server Status</h2>
          </div>
          <span className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
        </div>

        <p className="text-3xl font-bold text-green-400 mb-3">ONLINE</p>

        <div className="space-y-1 text-sm text-gray-400">
          <p>
            Uptime: <span className="text-gray-200">99.98%</span>
          </p>
          <p>
            Latency: <span className="text-gray-200">42ms</span>
          </p>
          <p>
            Region: <span className="text-gray-200">Asia (IN)</span>
          </p>
        </div>
      </div>

      <div className="mt-4 h-1 bg-gray-700 rounded-full">
        <div className="h-full w-[98%] bg-green-500 rounded-full"></div>
      </div>
    </div>
  );
}

function ServerStatusSkeleton() {
  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg animate-pulse h-full">
      <div className="space-y-4">
        <div className="h-4 w-32 bg-gray-700 rounded"></div>
        <div className="h-8 w-24 bg-gray-600 rounded"></div>

        <div className="space-y-2">
          <div className="h-3 w-40 bg-gray-700 rounded"></div>
          <div className="h-3 w-32 bg-gray-700 rounded"></div>
          <div className="h-3 w-28 bg-gray-700 rounded"></div>
        </div>
      </div>

      <div className="mt-6 h-1 bg-gray-700 rounded-full"></div>
    </div>
  );
}
