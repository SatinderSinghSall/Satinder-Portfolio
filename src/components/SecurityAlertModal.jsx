// components/SecurityAlertModal.jsx
import { ShieldAlert } from "lucide-react";

export default function SecurityAlertModal({ open, onClose, message }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        className="
          w-full max-w-md
          rounded-3xl
          border border-red-500/20
          bg-[#0b0b0b]
          p-8
          shadow-[0_0_60px_rgba(239,68,68,0.15)]
        "
      >
        <div className="flex justify-center">
          <div className="rounded-2xl bg-red-500/10 p-4">
            <ShieldAlert className="h-10 w-10 text-red-400" />
          </div>
        </div>

        <h3 className="mt-5 text-center text-2xl font-bold text-white">
          Administrator Access
        </h3>

        <p className="mt-2 text-center text-sm text-red-300">
          Restricted system — authorized personnel only
        </p>

        <div className="mt-4 flex justify-center">
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
            PRODUCTION DEVELOPMENT ENVIRONMENT
          </span>
        </div>

        <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-950/20 p-4">
          <p className="text-sm font-medium text-red-300">Access Denied</p>

          <p className="mt-2 text-sm text-gray-300">{message}</p>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          This system is monitored. Unauthorized access attempts may be logged
          and reviewed.
        </p>

        <button
          onClick={onClose}
          className="
            mt-6
            w-full
            rounded-xl
            bg-red-600
            py-3
            font-medium
            text-white
            hover:bg-red-700
            transition
            cursor-pointer
          "
        >
          Understood
        </button>
      </div>
    </div>
  );
}
