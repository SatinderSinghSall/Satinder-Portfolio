import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  BookText,
  Mail,
  LogOut,
  BadgePlus,
  SquarePlus,
  Youtube,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      path: "/admin/add-project",
      label: "Add Project",
      icon: <BadgePlus size={20} />,
    },
    {
      path: "/admin/projects",
      label: "Manage Projects",
      icon: <FolderKanban size={20} />,
    },
    {
      path: "/admin/add-blog",
      label: "Add Blog",
      icon: <SquarePlus size={20} />,
    },
    {
      path: "/admin/blogs",
      label: "Manage Blogs",
      icon: <BookText size={20} />,
    },
    {
      path: "/admin/youtube/new",
      label: "Add a YouTube",
      icon: <Youtube size={20} />,
    },
    {
      path: "/admin/youtube",
      label: "Manage YouTube",
      icon: <BookText size={20} />,
    },
    {
      path: "/admin/contact-messages",
      label: "Messages",
      icon: <Mail size={20} />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <aside
      className={`group fixed top-0 left-0 h-screen transition-all duration-300 
      ${collapsed ? "w-20" : "w-64"} 
      bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 
      border-r border-white/10 text-gray-100 shadow-xl flex flex-col justify-between`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {!collapsed && (
          <h2 className="text-xl font-bold tracking-wide">Admin Panel</h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-3 flex flex-col gap-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600">
        {navItems.map(({ path, label, icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
            >
              <span className="transition-transform group-hover:scale-110">
                {icon}
              </span>
              {!collapsed && <span>{label}</span>}
              {collapsed && (
                <span className="absolute left-full ml-3 px-2 py-1 rounded-md bg-gray-800 text-sm opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-lg transition-all">
                  {label}
                </span>
              )}
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-1 bg-blue-400 rounded-r-lg animate-pulse"></span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className={`flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-200 shadow-md ${
            collapsed ? "w-12 h-12 p-0" : "w-full"
          }`}
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
