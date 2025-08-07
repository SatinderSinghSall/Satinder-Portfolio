import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  BookText,
  Mail,
  LogOut,
  BadgePlus,
  SquarePlus,
  DiamondPlus,
  Youtube,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

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
    <aside className="w-65 fixed top-16 left-0 h-[calc(100vh-4rem)] bg-[#0f172a]/90 backdrop-blur-lg text-gray-100 shadow-xl rounded-r-2xl flex flex-col justify-between transition-all duration-300">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-700 sticky top-0 bg-[#0f172a]/90 backdrop-blur-lg z-10">
          <h2 className="text-2xl font-extrabold text-white tracking-wide">
            Admin Panel
          </h2>
        </div>

        {/* Nav Links */}
        <nav className="p-4 flex flex-col gap-2">
          {navItems.map(({ path, label, icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                      : "text-gray-400 hover:bg-gray-800/70 hover:text-white"
                  }`}
              >
                {icon}
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700 bg-[#0f172a]/90 backdrop-blur-lg">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-200 shadow-md"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
