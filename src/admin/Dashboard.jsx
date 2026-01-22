import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
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
  Search,
  RefreshCcw,
  Plus,
  ArrowUpRight,
  Menu,
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
  Array.from({ length: 10 }, () => ({
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
  const [refreshing, setRefreshing] = useState(false);

  // ✅ Mobile sidebar drawer state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const headers = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  const fetchData = async () => {
    setRefreshing(true);
    try {
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
      toast.error("Failed to load dashboard data");
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-x-hidden">
      {/* ✅ Sidebar (Drawer for mobile + fixed for desktop) */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 min-w-0 relative lg:ml-64">
        {/* Background blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-fuchsia-200/40 blur-3xl" />

        {/* Topbar */}
        <div className="sticky top-0 z-40 bg-white/75 backdrop-blur-xl border-b border-gray-200">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-5 space-y-4">
            {/* Row 1 */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Left: Title */}
              <div className="flex items-start gap-3">
                {/* ✅ Mobile Menu Button */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-xl border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
                >
                  <Menu className="w-5 h-5 text-gray-700" />
                </button>

                <div className="h-11 w-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                  <UserCircle className="w-6 h-6 text-indigo-600" />
                </div>

                <div className="min-w-0 pt-[2px]">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 leading-tight">
                    {getGreeting()}, Admin 👋
                  </h1>

                  <p className="text-sm text-gray-500 mt-1">
                    Track everything in one place — projects, blogs, messages &
                    YouTube.
                  </p>
                </div>
              </div>

              {/* Right: Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={fetchData}
                  disabled={refreshing}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border shadow-sm transition font-semibold
                    ${
                      refreshing
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                        : "bg-white hover:bg-gray-50 text-gray-800 border-gray-200"
                    }`}
                >
                  <RefreshCcw
                    className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                  />
                  {refreshing ? "Refreshing..." : "Refresh"}
                </button>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-sm transition"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              {/* Search */}
              <div className="relative w-full md:max-w-[520px]">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  placeholder="Search projects, blogs, videos..."
                  className="w-full pl-9 pr-4 sm:pr-14 py-2.5 rounded-xl border border-gray-200 bg-white shadow-sm outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <div className="absolute right-3 top-2.5 hidden sm:flex items-center gap-1 text-[11px] text-gray-400 border border-gray-200 bg-gray-50 px-2 py-1 rounded-lg">
                  <span className="font-semibold">⌘</span>
                  <span className="font-semibold">K</span>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm text-sm text-gray-600 w-fit">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span className="whitespace-nowrap">{dateTime}</span>
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                <span className="shrink-0 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs text-gray-600">
                  Projects:{" "}
                  <span className="font-semibold text-gray-900">
                    {counts.projects}
                  </span>
                </span>

                <span className="shrink-0 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs text-gray-600">
                  Blogs:{" "}
                  <span className="font-semibold text-gray-900">
                    {counts.blogs}
                  </span>
                </span>

                <span className="shrink-0 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs text-gray-600">
                  Messages:{" "}
                  <span className="font-semibold text-gray-900">
                    {counts.messages}
                  </span>
                </span>

                <span className="shrink-0 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs text-gray-600">
                  YouTube:{" "}
                  <span className="font-semibold text-gray-900">
                    {counts.youtube}
                  </span>
                </span>
              </div>

              <span className="hidden lg:inline text-xs text-gray-400 whitespace-nowrap">
                Updated live • Secure Admin Area
              </span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Quick Actions */}
          <div className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 font-semibold">
                Admin Analytics
              </span>
              <span className="hidden sm:inline">
                Monitor everything from one place ✨
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/admin/projects")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm transition"
              >
                <Plus className="w-4 h-4" />
                Add Project
                <ArrowUpRight className="w-4 h-4 opacity-90" />
              </button>

              <button
                onClick={() => navigate("/admin/blogs")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white font-semibold shadow-sm transition"
              >
                <Plus className="w-4 h-4" />
                Add Blog
                <ArrowUpRight className="w-4 h-4 opacity-90" />
              </button>

              <button
                onClick={() => navigate("/admin/youtube")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-sm transition"
              >
                <Plus className="w-4 h-4" />
                Add Video
                <ArrowUpRight className="w-4 h-4 opacity-90" />
              </button>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  icon={<FolderOpen className="w-5 h-5" />}
                  badge="Portfolio"
                  data={sparklineData.projects}
                />

                <MetricCard
                  title="Total Blogs"
                  count={counts.blogs}
                  icon={<FileText className="w-5 h-5" />}
                  badge="Content"
                  data={sparklineData.blogs}
                />

                <MetricCard
                  title="Contact Messages"
                  count={counts.messages}
                  icon={<Mail className="w-5 h-5" />}
                  badge="Inbox"
                  data={sparklineData.messages}
                />

                <MetricCard
                  title="YouTube Count"
                  count={counts.youtube}
                  icon={<Youtube className="w-5 h-5" />}
                  badge="Videos"
                  data={sparklineData.youtube}
                />

                {/* ✅ Responsive span */}
                <div className="sm:col-span-2 lg:col-span-4 xl:col-span-1">
                  <ServerStatusCard />
                </div>
              </>
            )}
          </div>

          {/* Weekly Overview */}
          <div className="mt-10 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
              <div>
                <h2 className="text-lg font-extrabold text-gray-900">
                  Weekly Overview
                </h2>
                <p className="text-sm text-gray-500">
                  Activity trend for the last 7 days.
                </p>
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-gray-100 border text-gray-700 font-semibold w-fit">
                Last 7 days
              </span>
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={weeklyOverview}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------- Components ------------------- */

function MetricCard({ title, count, icon, badge, data }) {
  return (
    <div className="group bg-white/80 backdrop-blur-xl border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {title}
          </p>
          <p className="mt-2 text-4xl font-black text-gray-900">{count}</p>

          <span className="inline-flex mt-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
            {badge}
          </span>
        </div>

        <div className="h-11 w-11 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center justify-center text-indigo-600 group-hover:scale-105 transition">
          {icon}
        </div>
      </div>

      <div className="mt-5 h-14">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="value"
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
    <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm animate-pulse">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-3 w-24 bg-gray-200 rounded" />
          <div className="h-8 w-20 bg-gray-300 rounded" />
          <div className="h-6 w-16 bg-gray-200 rounded-full" />
        </div>
        <div className="h-11 w-11 bg-gray-200 rounded-xl" />
      </div>

      <div className="mt-6 h-14 bg-gray-200 rounded-xl" />
    </div>
  );
}

function ServerStatusCard() {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-sm h-full flex flex-col justify-between border border-white/10">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="text-green-400 w-5 h-5" />
            <h2 className="font-bold">Server Status</h2>
          </div>
          <span className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
        </div>

        <p className="text-3xl font-black text-green-400 mb-3">ONLINE</p>

        <div className="space-y-1 text-sm text-gray-400">
          <p>
            Uptime: <span className="text-gray-200 font-semibold">99.98%</span>
          </p>
          <p>
            Latency: <span className="text-gray-200 font-semibold">42ms</span>
          </p>
          <p>
            Region:{" "}
            <span className="text-gray-200 font-semibold">Asia (IN)</span>
          </p>
        </div>
      </div>

      <div className="mt-5 h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full w-[98%] bg-green-500 rounded-full" />
      </div>
    </div>
  );
}

function ServerStatusSkeleton() {
  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-sm animate-pulse h-full border border-white/10">
      <div className="space-y-4">
        <div className="h-4 w-32 bg-gray-700 rounded" />
        <div className="h-8 w-24 bg-gray-600 rounded" />

        <div className="space-y-2">
          <div className="h-3 w-40 bg-gray-700 rounded" />
          <div className="h-3 w-32 bg-gray-700 rounded" />
          <div className="h-3 w-28 bg-gray-700 rounded" />
        </div>
      </div>

      <div className="mt-6 h-1.5 bg-gray-700 rounded-full" />
    </div>
  );
}
