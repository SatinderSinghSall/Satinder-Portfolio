import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

import {
  LogOut,
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
  BriefcaseBusiness,
  ChevronRight,
  Users,
} from "lucide-react";

import AdminLayout from "@/components/AdminLayout";

const API = import.meta.env.VITE_API_URL || "/api";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const formatDateTime = () => {
  const now = new Date();

  const datePart = now.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const timePart = now
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
    .toLowerCase();

  return `${datePart} at ${timePart}`;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [counts, setCounts] = useState({
    users: 0,
    projects: 0,
    blogs: 0,
    messages: 0,
    youtube: 0,
    freelance: 0,
  });

  const [loading, setLoading] = useState(true);
  const [dateTime, setDateTime] = useState(formatDateTime());
  const [refreshing, setRefreshing] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const headers = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const res = await axios.get(`${API}/dashboard`, { headers });

      const data = {
        users: res.data?.usersCount || 0,
        projects: res.data?.projectsCount || 0,
        blogs: res.data?.blogsCount || 0,
        messages: res.data?.messagesCount || 0,
        youtube: res.data?.youTubeCount || 0,
        freelance: res.data?.freelanceCount || 0,
      };

      setCounts(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard data");
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
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
    <AdminLayout>
      <div className="min-h-screen bg-gray-50/50 p-3 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto">
        {/* Header Banner Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-5 sm:space-y-6">
          {/* Row 1: Greeting & Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                <UserCircle className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
              </div>

              <div className="min-w-0 pt-0.5">
                <h1 className="text-lg sm:text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">
                  {getGreeting()}, Admin 👋
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Track everything in one place — users, projects, blogs,
                  messages & YouTube.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchData}
                disabled={refreshing}
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl border shadow-sm transition font-semibold text-xs cursor-pointer ${
                  refreshing
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                    : "bg-white hover:bg-gray-50 text-gray-800 border-gray-200"
                }`}
              >
                <RefreshCcw
                  className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`}
                />
                {refreshing ? "Refreshing..." : "Refresh"}
              </button>

              <button
                onClick={() => setLogoutModalOpen(true)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs shadow-sm transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Row 2: Search & Responsive Live Clock */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-2 border-t border-gray-100">
            <div className="relative w-full md:max-w-[480px]">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                placeholder="Search projects, blogs, users..."
                className="w-full pl-9 pr-14 py-2 text-xs rounded-xl border border-gray-200 bg-gray-50/50 shadow-inner outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 transition"
              />
              <div className="absolute right-2.5 top-2 hidden sm:flex items-center gap-1 text-[10px] text-gray-400 border border-gray-200 bg-white px-1.5 py-0.5 rounded font-mono">
                <span>⌘K</span>
              </div>
            </div>

            {/* 🚀 Fully Responsive Live Clock */}
            <div className="flex items-center justify-center sm:justify-start gap-2 bg-gray-50 px-3 sm:px-3.5 py-2 rounded-xl border border-gray-200 shadow-sm text-[11px] sm:text-xs font-mono text-gray-600 w-full sm:w-auto shrink-0">
              <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span className="truncate tracking-tight sm:tracking-normal">
                {dateTime}
              </span>
            </div>
          </div>

          {/* Row 3: Metrics Quick Badges */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 pt-2">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {/* 🚀 Added Users Quick Badge */}
              <span className="shrink-0 px-3 py-1 rounded-full bg-indigo-50/80 border border-indigo-100 text-xs text-indigo-800">
                Users:{" "}
                <span className="font-bold text-indigo-950">
                  {counts.users}
                </span>
              </span>

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
              <span className="shrink-0 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs text-gray-600">
                Freelance:{" "}
                <span className="font-semibold text-gray-900">
                  {counts.freelance}
                </span>
              </span>
            </div>

            <span className="hidden lg:inline text-[11px] text-gray-400 whitespace-nowrap">
              Updated live • Secure Admin Area
            </span>
          </div>
        </div>

        {/* Quick Action Navigation Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 font-semibold text-xs">
              Quick Actions
            </span>
            <span className="hidden sm:inline text-xs">
              Manage content and registered users ✨
            </span>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {/* 🚀 Users Action Button */}
            <button
              onClick={() => navigate("/admin/users")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs shadow-sm transition cursor-pointer"
            >
              <Users className="w-3.5 h-3.5" />
              Users
              <ArrowUpRight className="w-3.5 h-3.5 opacity-90" />
            </button>

            <button
              onClick={() => navigate("/admin/projects")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Project
              <ArrowUpRight className="w-3.5 h-3.5 opacity-90" />
            </button>

            <button
              onClick={() => navigate("/admin/blogs")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-900 hover:bg-black text-white font-semibold text-xs shadow-sm transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Blog
              <ArrowUpRight className="w-3.5 h-3.5 opacity-90" />
            </button>

            <button
              onClick={() => navigate("/admin/youtube")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs shadow-sm transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Video
              <ArrowUpRight className="w-3.5 h-3.5 opacity-90" />
            </button>

            <button
              onClick={() => navigate("/admin/freelance-projects")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Freelance
              <ArrowUpRight className="w-3.5 h-3.5 opacity-90" />
            </button>
          </div>
        </div>

        {/* Metrics Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5">
          {loading ? (
            <>
              <MetricCardSkeleton />
              <MetricCardSkeleton />
              <MetricCardSkeleton />
              <MetricCardSkeleton />
              <MetricCardSkeleton />
              <MetricCardSkeleton />
              <ServerStatusSkeleton />
            </>
          ) : (
            <>
              {/* 🚀 Users Metric Card */}
              <MetricCard
                title="Total Users"
                count={counts.users}
                icon={<Users className="w-5 h-5" />}
                badge="Accounts"
                link="/admin/users"
              />

              <MetricCard
                title="Total Projects"
                count={counts.projects}
                icon={<FolderOpen className="w-5 h-5" />}
                badge="Portfolio"
                link="/admin/projects"
              />

              <MetricCard
                title="Total Blogs"
                count={counts.blogs}
                icon={<FileText className="w-5 h-5" />}
                badge="Content"
                link="/admin/blogs"
              />

              <MetricCard
                title="Contact Messages"
                count={counts.messages}
                icon={<Mail className="w-5 h-5" />}
                badge="Inbox"
                link="/admin/contact-messages"
              />

              <MetricCard
                title="YouTube Count"
                count={counts.youtube}
                icon={<Youtube className="w-5 h-5" />}
                badge="Videos"
                link="/admin/youtube"
              />

              <MetricCard
                title="Freelance Count"
                count={counts.freelance}
                icon={<BriefcaseBusiness className="w-5 h-5" />}
                badge="Freelance Work"
                link="/admin/freelance-projects"
              />

              <ServerStatusCard />
            </>
          )}
        </div>

        {/* Dashboard Content Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* 🚀 Users Overview Card */}
          <OverviewCard
            title="User Management"
            description="Manage user accounts, monitor signups, roles, and access controls."
            icon={<Users className="w-5 h-5 text-indigo-600" />}
            onClick={() => navigate("/admin/users")}
            count={`${counts.users} Users`}
          />

          <OverviewCard
            title="Projects & Portfolio"
            description="Manage your featured projects, live URLs, and tech stacks."
            icon={<FolderOpen className="w-5 h-5 text-indigo-600" />}
            onClick={() => navigate("/admin/projects")}
            count={`${counts.projects} Items`}
          />

          <OverviewCard
            title="Blog & Articles"
            description="Publish new posts, update content, and track reading stats."
            icon={<FileText className="w-5 h-5 text-indigo-600" />}
            onClick={() => navigate("/admin/blogs")}
            count={`${counts.blogs} Posts`}
          />
        </div>

        {/* Logout Modal Dialog */}
        <Dialog
          open={logoutModalOpen}
          onOpenChange={(open) => {
            if (!open) return;
            setLogoutModalOpen(open);
          }}
        >
          <DialogContent
            showCloseButton={false}
            onPointerDownOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
            className="sm:max-w-md border-0 bg-white/95 backdrop-blur-2xl rounded-[2rem] shadow-[0_25px_80px_rgba(0,0,0,0.25)] overflow-hidden"
          >
            {/* Custom Close Button */}
            <button
              onClick={() => setLogoutModalOpen(false)}
              className="
              absolute right-5 top-5 z-50
              h-10 w-10
              rounded-2xl
              bg-white/80
              backdrop-blur-xl
              border border-gray-200
              shadow-md
              flex items-center justify-center
              text-gray-500
              hover:text-red-500
              hover:border-red-200
              hover:bg-red-50
              hover:rotate-90
              transition-all duration-300
              cursor-pointer
            "
            >
              <span className="text-xl font-semibold leading-none">×</span>
            </button>

            <DialogHeader className="relative z-10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg mb-5">
                <LogOut className="h-10 w-10 text-white" />
              </div>

              <DialogTitle className="text-center text-2xl font-black text-gray-900">
                Logout Confirmation
              </DialogTitle>

              <DialogDescription className="text-center text-gray-500 mt-2 leading-relaxed">
                Are you sure you want to logout from the admin dashboard? You’ll
                need to login again to access secure admin features.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setLogoutModalOpen(false)}
                className="w-full sm:flex-1 px-5 py-3 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 font-semibold transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="w-full sm:flex-1 px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 hover:opacity-90 text-white font-bold shadow-lg transition cursor-pointer"
              >
                Yes, Logout
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}

/* ------------------- Sub Components ------------------- */

function MetricCard({ title, count, icon, badge, link }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => link && navigate(link)}
      className="group bg-white/80 backdrop-blur-xl border border-gray-200/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {title}
          </p>
          <p className="mt-3 text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            {count}
          </p>
        </div>

        <div className="h-10 w-10 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center justify-center text-indigo-600 group-hover:scale-105 transition shrink-0">
          {icon}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="inline-flex text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
          {badge}
        </span>

        <span className="text-xs font-semibold text-gray-400 group-hover:text-indigo-600 flex items-center gap-1 transition">
          View details
          <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}

function OverviewCard({ title, description, icon, onClick, count }) {
  return (
    <div
      onClick={onClick}
      className="group bg-white/80 backdrop-blur-xl border border-gray-200/80 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between space-y-4"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
            {icon}
          </div>
          <span className="text-xs font-bold text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg">
            {count}
          </span>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition">
            {title}
          </h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center text-xs font-semibold text-indigo-600 pt-2">
        <span>Manage section</span>
        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
      </div>
    </div>
  );
}

function MetricCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200/80 p-5 rounded-2xl shadow-sm animate-pulse space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-3 w-24 bg-gray-200 rounded" />
          <div className="h-8 w-16 bg-gray-300 rounded" />
        </div>
        <div className="h-10 w-10 bg-gray-200 rounded-xl" />
      </div>

      <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
        <div className="h-5 w-16 bg-gray-200 rounded-full" />
        <div className="h-3 w-16 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

function ServerStatusCard() {
  return (
    <div className="bg-gray-900 text-white p-5 rounded-2xl shadow-sm h-full flex flex-col justify-between border border-white/10">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Activity className="text-emerald-400 w-4 h-4" />
            <h2 className="font-bold text-sm">Server Status</h2>
          </div>
          <span className="h-2.5 w-2.5 bg-emerald-500 rounded-full animate-pulse" />
        </div>

        <p className="text-2xl font-black text-emerald-400 mb-2">ONLINE</p>

        <div className="space-y-1 text-xs text-gray-400">
          <p>
            Uptime:{" "}
            <span className="text-gray-200 font-mono font-semibold">
              99.98%
            </span>
          </p>
          <p>
            Latency:{" "}
            <span className="text-gray-200 font-mono font-semibold">42ms</span>
          </p>
          <p>
            Region:{" "}
            <span className="text-gray-200 font-semibold">Asia (IN)</span>
          </p>
        </div>
      </div>

      <div className="mt-4 h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full w-[98%] bg-emerald-500 rounded-full" />
      </div>
    </div>
  );
}

function ServerStatusSkeleton() {
  return (
    <div className="bg-gray-900 p-5 rounded-2xl shadow-sm animate-pulse h-full border border-white/10">
      <div className="space-y-4">
        <div className="h-4 w-32 bg-gray-700 rounded" />
        <div className="h-7 w-20 bg-gray-600 rounded" />

        <div className="space-y-2">
          <div className="h-3 w-32 bg-gray-700 rounded" />
          <div className="h-3 w-28 bg-gray-700 rounded" />
        </div>
      </div>

      <div className="mt-4 h-1.5 bg-gray-700 rounded-full" />
    </div>
  );
}
