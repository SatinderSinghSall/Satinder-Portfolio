import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ Stop scrolling when sidebar is open (mobile)
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-x-hidden">
      {/* ✅ Sidebar with drawer support */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* ✅ Main Content */}
      <div className="flex-1 min-w-0 lg:ml-64">
        {/* ✅ Mobile Top Bar */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
          >
            <Menu className="w-5 h-5" />
            <span className="font-semibold text-gray-700">Menu</span>
          </button>
        </div>

        <main className="min-h-screen p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
