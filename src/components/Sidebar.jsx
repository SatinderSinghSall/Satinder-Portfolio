import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  BookText,
  Mail,
  LogOut,
  BadgePlus,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      path: "/admin/add-project",
      label: "Add a Project",
      icon: <BadgePlus size={18} />,
    },
    {
      path: "/admin/projects",
      label: "Manage Projects",
      icon: <FolderKanban size={18} />,
    },
    {
      path: "/admin/blogs",
      label: "Manage Blogs",
      icon: <BookText size={18} />,
    },
    {
      path: "/admin/contact-messages",
      label: "Contact Messages",
      icon: <Mail size={18} />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Admin logout successful!");
    navigate("/login");
  };

  return (
    <aside className="w-64 fixed top-16 left-0 h-[calc(100vh-4rem)] bg-[#0f172a] text-white shadow-lg z-50 flex flex-col justify-between">
      <div>
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold tracking-wide text-white">
            Admin Panel
          </h2>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map(({ path, label, icon }) => {
            const isActive = location.pathname === path;

            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold shadow-sm"
                    : "hover:bg-gray-800 text-gray-300"
                }`}
              >
                {icon}
                <span className="text-sm">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition duration-200 w-full"
        >
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
