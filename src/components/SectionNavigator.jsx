import { useEffect, useRef, useState } from "react";

import {
  House,
  User,
  Layers3,
  BriefcaseBusiness,
  Smartphone,
  Youtube,
  Wrench,
  Code2,
  MessageCircle,
  ArrowUp,
} from "lucide-react";

const sections = [
  {
    id: "about",
    label: "About",
    icon: User,
  },
  {
    id: "projects",
    label: "Projects",
    icon: Layers3,
  },
  {
    id: "apps",
    label: "Mobile Apps",
    icon: Smartphone,
  },
  {
    id: "youtube",
    label: "YouTube",
    icon: Youtube,
  },
  {
    id: "services",
    label: "Services",
    icon: Wrench,
  },
  {
    id: "experience",
    label: "Experience",
    icon: BriefcaseBusiness,
  },
  {
    id: "skills",
    label: "Skills",
    icon: Code2,
  },
  {
    id: "contact",
    label: "Contact",
    icon: MessageCircle,
  },
];

export default function SectionNavigator() {
  const [activeSection, setActiveSection] = useState("hero");
  const [visible, setVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  const mobileNavRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 250);

      const current = sections.find((section) => {
        const el = document.getElementById(section.id);

        if (!el) return false;

        const rect = el.getBoundingClientRect();

        return rect.top <= 220 && rect.bottom >= 220;
      });

      if (current) {
        setActiveSection(current.id);
      }

      // Footer detection
      const footer = document.querySelector("footer");

      if (footer) {
        const rect = footer.getBoundingClientRect();

        setFooterVisible(rect.top < window.innerHeight - 120);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Auto-center active mobile nav item
  useEffect(() => {
    if (!mobileNavRef.current) return;

    const activeButton = mobileNavRef.current.querySelector(".active-nav");

    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeSection]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* ================= DESKTOP NAV ================= */}
      <div
        className={`
          fixed right-6 top-1/2 -translate-y-1/2 z-50
          hidden xl:flex flex-col items-center gap-4
          transition-all duration-500
          ${
            visible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-10 pointer-events-none"
          }
        `}
      >
        {/* Line */}
        <div className="absolute top-0 bottom-0 w-[1px] bg-white/10" />

        {sections.map((section) => {
          const Icon = section.icon;

          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group relative flex items-center justify-end"
            >
              {/* Label */}
              <div
                className={`
                  absolute right-14 whitespace-nowrap
                  px-4 py-2 rounded-xl
                  border border-white/10
                  bg-[#07111f]/80 backdrop-blur-2xl
                  text-sm font-medium
                  shadow-2xl
                  transition-all duration-300
                  ${
                    isActive
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"
                  }
                `}
              >
                <span className={isActive ? "text-cyan-300" : "text-slate-300"}>
                  {section.label}
                </span>
              </div>

              {/* Icon */}
              <div
                className={`
                  relative z-10
                  w-12 h-12 rounded-2xl
                  border backdrop-blur-2xl
                  flex items-center justify-center
                  transition-all duration-300
                  shadow-lg
                  ${
                    isActive
                      ? "bg-cyan-500/20 border-cyan-400/40 text-cyan-300 scale-110 shadow-cyan-500/20"
                      : "bg-[#07111f]/70 border-white/10 text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/[0.05]"
                  }
                `}
              >
                {isActive && (
                  <div className="absolute inset-0 rounded-2xl bg-cyan-400/20 blur-xl animate-pulse" />
                )}

                <Icon size={18} className="relative z-10" />
              </div>
            </button>
          );
        })}
      </div>

      {/* ================= MOBILE / TABLET NAV ================= */}
      <div
        className={`
          xl:hidden
          fixed left-0 right-0 z-50
          px-4
          transition-all duration-500
          ${footerVisible ? "bottom-32" : "bottom-4"}

          ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 pointer-events-none"
          }
        `}
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent blur-3xl pointer-events-none" />

        {/* Dock */}
        <div
          ref={mobileNavRef}
          className="
            relative
            flex items-center gap-3
            overflow-x-auto
            no-scrollbar
            px-3 py-3
            rounded-[28px]
            border border-white/10
            bg-[#07111f]/80
            backdrop-blur-3xl
            shadow-[0_20px_80px_rgba(0,0,0,0.45)]
            scroll-smooth
          "
        >
          {sections.map((section) => {
            const Icon = section.icon;

            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`
                  ${isActive ? "active-nav" : ""}

                  relative
                  flex-shrink-0
                  flex items-center justify-center
                  h-12 rounded-2xl
                  border transition-all duration-300
                  overflow-hidden

                  ${
                    isActive
                      ? "px-4 gap-2 bg-cyan-500/20 border-cyan-400/30 text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.25)]"
                      : "w-12 bg-white/[0.03] border-white/5 text-slate-400"
                  }
                `}
              >
                {/* Glow */}
                {isActive && (
                  <div className="absolute inset-0 rounded-2xl bg-cyan-400/10 blur-xl animate-pulse" />
                )}

                <div className="relative z-10 flex items-center gap-2">
                  <Icon size={16} />

                  {/* ONLY ACTIVE ITEM SHOWS LABEL */}
                  {isActive && (
                    <span className="text-sm font-medium whitespace-nowrap">
                      {section.label}
                    </span>
                  )}
                </div>
              </button>
            );
          })}

          {/* Scroll To Top */}
          <button
            onClick={scrollToTop}
            className="
              flex-shrink-0
              w-12 h-12
              rounded-2xl
              bg-green-600
              hover:bg-green-500
              text-white
              flex items-center justify-center
              shadow-[0_0_30px_rgba(34,197,94,0.35)]
              transition-all duration-300
            "
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
