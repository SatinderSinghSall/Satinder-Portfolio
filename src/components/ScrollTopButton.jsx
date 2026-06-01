import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-6 right-6 z-[999]
        group
        flex items-center justify-center
        h-14 w-14
        rounded-2xl
        border border-white/[0.08]
        bg-[green]/80
        backdrop-blur-2xl
        text-white
        shadow-[0_10px_40px_rgba(0,0,0,0.45)]
        transition-all duration-500
        hover:scale-110
        hover:border-cyan-400/30
        hover:shadow-[0_10px_50px_rgba(34,211,238,0.18)]
        ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0 pointer-events-none"
        }
        cursor-pointer
      `}
    >
      {/* glow */}
      <div
        className="
          absolute inset-0 rounded-2xl
          bg-gradient-to-br
          from-cyan-400/[0.08]
          to-blue-500/[0.04]
          opacity-0
          transition-opacity duration-300
          group-hover:opacity-100
        "
      />

      <ArrowUp
        size={20}
        className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1"
      />
    </button>
  );
}
