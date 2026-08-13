import { useEffect, useState } from "react";
import { Menu, ShieldCheck } from "lucide-react";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Stop scrolling when sidebar is open (mobile)
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-screen bg-gray-50/50 overflow-x-hidden">
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 lg:ml-72 transition-all duration-300">
        {/* Mobile Top Navigation Bar */}
        <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200/80 px-4 py-2.5 lg:hidden flex items-center justify-between shadow-xs relative">
          {/* Menu Trigger Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar menu"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 bg-gray-50/80 hover:bg-white hover:border-indigo-200 hover:text-indigo-600 text-gray-700 shadow-xs transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <Menu className="w-4 h-4 text-gray-600" />
            <span className="font-semibold text-xs tracking-wide">Menu</span>
          </button>

          {/* Centered Admin Portal Text */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 pointer-events-none">
            <span className="font-extrabold text-xs sm:text-sm text-gray-900 tracking-wider uppercase bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent">
              Admin Portal
            </span>
          </div>

          {/* Admin Panel Brand & Badge */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-indigo-50/80 border border-indigo-100/80 px-2.5 py-1 rounded-xl">
              <div className="relative flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              </div>
              <span className="font-bold text-xs text-indigo-950 tracking-tight">
                Admin Panel
              </span>
            </div>
          </div>
        </div>

        {/* Page Main Content */}
        <main className="min-h-[calc(100vh-57px)] lg:min-h-screen p-3 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
