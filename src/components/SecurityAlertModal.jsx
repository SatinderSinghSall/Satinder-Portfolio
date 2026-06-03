import { ShieldAlert } from "lucide-react";
import { useEffect } from "react";

export default function SecurityAlertModal({ open, onClose, message }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/70
        backdrop-blur-sm
        p-4 sm:p-6
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-2xl sm:rounded-3xl
          border border-red-500/20
          bg-[#0b0b0b]
          p-5 sm:p-8
          shadow-[0_0_60px_rgba(239,68,68,0.15)]
          max-h-[95vh]
          overflow-y-auto
        "
      >
        {/* Icon */}
        <div className="flex justify-center">
          <div
            className="
              rounded-2xl
              bg-red-500/10
              p-3 sm:p-4
            "
          >
            <ShieldAlert
              className="
                h-8 w-8
                sm:h-10 sm:w-10
                text-red-400
              "
            />
          </div>
        </div>

        {/* Heading */}
        <h3
          className="
            mt-4 sm:mt-5
            text-center
            text-xl sm:text-2xl
            font-bold
            text-white
            leading-tight
          "
        >
          Administrator Access
        </h3>

        {/* Subtitle */}
        <p
          className="
            mt-2
            text-center
            text-xs sm:text-sm
            text-red-300
            px-2
          "
        >
          Restricted system — authorized personnel only
        </p>

        {/* Badge */}
        <div className="mt-4 flex justify-center">
          <span
            className="
              rounded-full
              border border-amber-500/30
              bg-amber-500/10
              px-3 py-1
              text-[10px] sm:text-xs
              font-semibold
              text-amber-300
              text-center
              break-words
            "
          >
            PRODUCTION DEVELOPMENT ENVIRONMENT
          </span>
        </div>

        {/* Alert Box */}
        <div
          className="
            mt-5 sm:mt-6
            rounded-2xl
            border border-red-500/20
            bg-red-950/20
            p-4
          "
        >
          <p className="text-sm font-medium text-red-300">Access Denied</p>

          <p
            className="
              mt-2
              text-sm
              text-gray-300
              break-words
            "
          >
            {message}
          </p>
        </div>

        {/* Footer */}
        <p
          className="
            mt-5 sm:mt-6
            text-center
            text-[11px] sm:text-xs
            leading-relaxed
            text-gray-500
            px-2
          "
        >
          This system is monitored. Unauthorized access attempts may be logged
          and reviewed.
        </p>

        {/* Button */}
        <button
          onClick={onClose}
          className="
            mt-5 sm:mt-6
            w-full
            rounded-xl
            bg-red-600
            py-3 sm:py-3.5
            text-sm sm:text-base
            font-medium
            text-white
            transition
            hover:bg-red-700
            active:scale-[0.98]
            cursor-pointer
          "
        >
          Understood
        </button>
      </div>
    </div>
  );
}
