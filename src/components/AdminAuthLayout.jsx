import { ShieldCheck } from "lucide-react";

function AdminAuthLayout({ children }) {
  const isProd = import.meta.env.MODE === "production";

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#050505] to-black flex flex-col items-center justify-center px-6">
      <div className="mb-8 text-center space-y-3">
        <div className="flex justify-center text-blue-500">
          <ShieldCheck size={44} strokeWidth={1.5} />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-wide">
            Administrator Access
          </h1>

          <p className="text-sm text-gray-400">
            Restricted system — authorized personnel only
          </p>

          <div className="flex justify-center">
            <span
              className={`rounded-full px-3 py-0.5 text-[11px] font-medium tracking-wide border
              ${
                isProd
                  ? "border-green-500/30 text-green-400 bg-green-500/5"
                  : "border-yellow-500/30 text-yellow-400 bg-yellow-500/5"
              }`}
            >
              {isProd ? "PRODUCTION ENVIRONMENT" : "DEVELOPMENT ENVIRONMENT"}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md bg-[#0f0f0f] border border-gray-800 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] p-10 text-white">
        {children}
      </div>

      <p className="mt-6 text-xs text-gray-500 text-center max-w-sm leading-relaxed">
        This system is monitored. Unauthorized access attempts may be logged and
        reviewed.
      </p>
    </div>
  );
}

export default AdminAuthLayout;
