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
  X,
  Users,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Sidebar({ isOpen = false, onClose = () => {} }) {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      section: "Main",
      items: [
        {
          path: "/admin/dashboard",
          label: "Dashboard",
          icon: <LayoutDashboard size={20} />,
        },
      ],
    },
    {
      section: "Projects",
      items: [
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
      ],
    },
    {
      section: "Blogs",
      items: [
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
      ],
    },
    {
      section: "Media",
      items: [
        {
          path: "/admin/youtube/new",
          label: "Add YouTube",
          icon: <Youtube size={20} />,
        },
        {
          path: "/admin/youtube",
          label: "Manage YouTube",
          icon: <BookText size={20} />,
        },
      ],
    },
    {
      section: "Freelancing",
      items: [
        {
          path: "/admin/freelance-project/new",
          label: "Add Freelance",
          icon: <BadgePlus size={20} />,
        },
        {
          path: "/admin/freelance-projects",
          label: "Freelance Projects",
          icon: <FolderKanban size={20} />,
        },
      ],
    },
    {
      section: "Communication",
      items: [
        {
          path: "/admin/contact-messages",
          label: "Messages",
          icon: <Mail size={20} />,
        },
      ],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  // ✅ Close sidebar on mobile when clicking any link
  const handleNavClick = () => {
    onClose();
  };

  return (
    <>
      {/* ✅ Backdrop (Fixes the whiteish screen issue) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 h-screen w-64
          bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 
          border-r border-white/10 text-gray-100 shadow-xl flex flex-col
          z-50 transform transition-transform duration-300 ease-in-out
          
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          
          lg:translate-x-0 lg:z-30
        `}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold tracking-wide text-white">
              Admin Panel
            </h2>
            <p className="text-sm text-gray-400 mt-1">Control & Management</p>
          </div>

          {/* ✅ Close button (mobile only) */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {navItems.map((group) => (
            <div key={group.section}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                {group.section}
              </p>

              <div className="space-y-1">
                {group.items.map(({ path, label, icon }) => {
                  const isActive = location.pathname === path;

                  return (
                    <Link
                      key={path}
                      to={path}
                      onClick={handleNavClick}
                      className={`relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                        ${
                          isActive
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-0 h-full w-1 bg-blue-400 rounded-r-lg"></span>
                      )}

                      {icon}
                      <span className="font-medium">{label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-4 py-5 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 w-full px-4 py-3 
              rounded-xl bg-red-600 hover:bg-red-700 
              text-white font-semibold transition-all shadow-md"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
