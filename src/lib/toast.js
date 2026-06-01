import toast from "react-hot-toast";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

export const showAuthError = (message) => {
  toast.custom(
    (t) => (
      <div
        className={`
          max-w-md rounded-2xl border border-red-500/30
          bg-[#111111] px-5 py-4 flex items-start gap-4
          shadow-[0_0_40px_rgba(239,68,68,0.15)]
          ${t.visible ? "animate-in slide-in-from-top-4" : ""}
        `}
      >
        <AlertTriangle className="h-5 w-5 text-red-400 mt-1" />

        <div>
          <p className="font-semibold text-red-300">Authentication Failed</p>

          <p className="text-sm text-gray-300 mt-1">{message}</p>
        </div>
      </div>
    ),
    {
      duration: 4000,
      position: "top-center",
    },
  );
};

export const showAuthSuccess = (message) => {
  toast.custom(
    () => (
      <div
        className="
          max-w-md rounded-2xl border border-emerald-500/30
          bg-[#111111] px-5 py-4 flex items-start gap-4
          shadow-[0_0_40px_rgba(16,185,129,0.15)]
        "
      >
        <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-1" />

        <div>
          <p className="font-semibold text-emerald-300">
            Authentication Successful
          </p>

          <p className="text-sm text-gray-300 mt-1">{message}</p>
        </div>
      </div>
    ),
    {
      duration: 3000,
      position: "top-center",
    },
  );
};
