import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
  ChevronDown,
  Briefcase,
  Layers,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export default function Sidebar({ isOpen = false, onClose = () => {} }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  // Accordion state
  const [openSections, setOpenSections] = useState({
    projects: false,
    blogs: false,
    media: false,
    freelance: false,
  });

  // Consolidated Nav Schema
  const navSchema = [
    {
      groupTitle: "MAIN NAVIGATION",
      items: [
        {
          id: "dashboard",
          type: "single",
          label: "Dashboard",
          path: "/admin/dashboard",
          icon: <LayoutDashboard size={22} />,
        },
      ],
    },
    {
      groupTitle: "CONTENT MANAGEMENT",
      items: [
        {
          id: "projects",
          type: "folder",
          label: "Projects",
          icon: <FolderKanban size={22} />,
          items: [
            {
              path: "/admin/add-project",
              label: "Add Project",
              icon: <BadgePlus size={18} />,
            },
            {
              path: "/admin/projects",
              label: "Manage Projects",
              icon: <Layers size={18} />,
            },
          ],
        },
        {
          id: "blogs",
          type: "folder",
          label: "Blogs",
          icon: <BookText size={22} />,
          items: [
            {
              path: "/admin/add-blog",
              label: "Add Blog",
              icon: <SquarePlus size={18} />,
            },
            {
              path: "/admin/blogs",
              label: "Manage Blogs",
              icon: <BookText size={18} />,
            },
          ],
        },
        {
          id: "media",
          type: "folder",
          label: "Media",
          icon: <Youtube size={22} />,
          items: [
            {
              path: "/admin/youtube/new",
              label: "Add YouTube",
              icon: <BadgePlus size={18} />,
            },
            {
              path: "/admin/youtube",
              label: "Manage Videos",
              icon: <Youtube size={18} />,
            },
          ],
        },
        {
          id: "freelance",
          type: "folder",
          label: "Freelancing",
          icon: <Briefcase size={22} />,
          items: [
            {
              path: "/admin/freelance-project/new",
              label: "Add Work",
              icon: <BadgePlus size={18} />,
            },
            {
              path: "/admin/freelance-projects",
              label: "Manage Work",
              icon: <FolderKanban size={18} />,
            },
          ],
        },
      ],
    },
    {
      groupTitle: "COMMUNICATION",
      items: [
        {
          id: "messages",
          type: "single",
          label: "Messages",
          path: "/admin/contact-messages",
          icon: <Mail size={22} />,
        },
      ],
    },
  ];

  // Auto expand child sub-menu if route matches
  useEffect(() => {
    navSchema.forEach((group) => {
      group.items.forEach((item) => {
        if (
          item.type === "folder" &&
          item.items.some((sub) => sub.path === location.pathname)
        ) {
          setOpenSections((prev) => ({ ...prev, [item.id]: true }));
        }
      });
    });
  }, [location.pathname]);

  const toggleSection = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Dark Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Main Big Sidebar Container */}
      <aside
        className={`
          fixed left-0 top-0 h-screen 
          w-72 sm:w-80 lg:w-72
          bg-white border-r border-slate-200/90 text-slate-800 shadow-xl lg:shadow-none flex flex-col
          z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:z-30
        `}
      >
        {/* Big Premium Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-600/30 text-white shrink-0">
              <ShieldCheck size={26} />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight leading-none mb-1">
                Admin Panel
              </h2>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                  Control & Management
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:bg-slate-200/60 hover:text-slate-800 transition active:scale-95"
            aria-label="Close Sidebar"
          >
            <X size={22} />
          </button>
        </div>

        {/* Scrollable Navigation Menu with Roomy Spacing */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6 custom-scrollbar">
          {navSchema.map((group) => (
            <div key={group.groupTitle} className="space-y-2.5">
              <p className="px-3 text-[11px] font-black uppercase tracking-wider text-slate-400">
                {group.groupTitle}
              </p>

              <div className="space-y-1.5">
                {group.items.map((item) => {
                  if (item.type === "single") {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.id}
                        to={item.path}
                        onClick={onClose}
                        className={`group relative flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-[15px] transition-all duration-200 ${
                          isActive
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
                            : "text-slate-600 hover:bg-slate-100/90 hover:text-slate-900"
                        }`}
                      >
                        <span className="transition-transform duration-200 group-hover:scale-110">
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </Link>
                    );
                  }

                  if (item.type === "folder") {
                    const isExpanded = openSections[item.id];
                    const isChildActive = item.items.some(
                      (sub) => sub.path === location.pathname,
                    );

                    return (
                      <div key={item.id} className="space-y-1.5">
                        {/* Parent Accordion Trigger */}
                        <button
                          onClick={() => toggleSection(item.id)}
                          className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-[15px] transition-all duration-200 ${
                            isChildActive
                              ? "bg-indigo-50/90 text-indigo-600"
                              : "text-slate-600 hover:bg-slate-100/90 hover:text-slate-900"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            {item.icon}
                            <span>{item.label}</span>
                          </div>
                          <ChevronDown
                            size={20}
                            className={`transition-transform duration-200 text-slate-400 ${
                              isExpanded ? "rotate-180 text-indigo-600" : ""
                            }`}
                          />
                        </button>

                        {/* Dropdown Items with Bold Left Guide Bar */}
                        {isExpanded && (
                          <div className="pl-4 ml-4 border-l-2 border-indigo-200/80 space-y-1.5 my-2">
                            {item.items.map((sub) => {
                              const isSubActive =
                                location.pathname === sub.path;
                              return (
                                <Link
                                  key={sub.path}
                                  to={sub.path}
                                  onClick={onClose}
                                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                                    isSubActive
                                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                                  }`}
                                >
                                  {sub.icon}
                                  <span>{sub.label}</span>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Big Prominent Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/80 space-y-3">
          {/* Active Admin Info Tag */}
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white border border-slate-200/80 text-xs font-bold text-slate-600 shadow-xs">
            <div className="flex items-center gap-2">
              <UserCheck size={16} className="text-indigo-600" />
              <span>Super Admin</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-[10px] font-extrabold uppercase">
              Online
            </span>
          </div>

          <button
            onClick={() => setLogoutModalOpen(true)}
            className="flex items-center justify-center gap-3 w-full px-4 py-3.5 rounded-2xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white font-extrabold text-sm transition-all shadow-xs border border-red-200/80 hover:border-red-600 active:scale-98 cursor-pointer"
          >
            <LogOut size={20} />
            Logout Account
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      <Dialog
        open={logoutModalOpen}
        onOpenChange={(open) => {
          if (!open) setLogoutModalOpen(false);
        }}
      >
        <DialogContent
          showCloseButton={false}
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="sm:max-w-md border border-slate-200 bg-white rounded-3xl shadow-2xl p-6"
        >
          <button
            type="button"
            aria-label="Close logout modal"
            onClick={() => setLogoutModalOpen(false)}
            className="absolute right-4 top-4 h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition"
          >
            <X size={16} />
          </button>

          <DialogHeader>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600 mb-3">
              <LogOut className="h-7 w-7" />
            </div>

            <DialogTitle className="text-center text-xl font-bold text-slate-900">
              Confirm Logout
            </DialogTitle>

            <DialogDescription className="text-center text-slate-500 text-sm mt-1">
              Are you sure you want to exit? You will need to sign back in to
              access the control panel.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setLogoutModalOpen(false)}
              className="w-full sm:flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-sm font-semibold transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleLogout}
              className="w-full sm:flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-md transition cursor-pointer"
            >
              Yes, Logout
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
