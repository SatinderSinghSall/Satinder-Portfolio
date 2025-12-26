import { ShieldCheck } from "lucide-react";

function AdminAuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#050505] to-black flex flex-col items-center justify-center px-6">
      <div className="mb-10 text-center">
        <div className="flex justify-center mb-4 text-blue-500">
          <ShieldCheck size={48} strokeWidth={1.5} />
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-wide">
          Administrator Access
        </h1>

        <p className="text-sm text-gray-400 mt-2">
          Restricted system — authorized personnel only
        </p>

        {import.meta.env.MODE !== "production" && (
          <div className="mt-3 inline-block rounded-full bg-yellow-500/10 px-3 py-1">
            <p className="text-xs font-medium text-yellow-400">
              Development Environment
            </p>
          </div>
        )}
      </div>

      <div className="w-full max-w-md bg-[#0f0f0f] border border-gray-800 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] p-10 text-white">
        {children}
      </div>

      <p className="mt-8 text-xs text-gray-500 text-center max-w-sm leading-relaxed">
        This system is monitored. Unauthorized access attempts may be logged and
        reviewed.
      </p>
    </div>
  );
}

export default AdminAuthLayout;
