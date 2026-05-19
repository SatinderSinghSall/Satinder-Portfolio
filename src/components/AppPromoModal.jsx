import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import {
  ArrowTopRightOnSquareIcon,
  CheckBadgeIcon,
  ClockIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

import { FaGithub, FaLinkedinIn, FaXTwitter, FaYoutube } from "react-icons/fa6";

export default function AppPromoModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissedUntil = localStorage.getItem("satinder-app-modal-dismissed");

    if (!dismissedUntil || Date.now() > Number(dismissedUntil)) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  // Body Scroll Lock:
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

  const closeModal = () => {
    const nextShow = Date.now() + 10 * 60 * 1000;

    localStorage.setItem("satinder-app-modal-dismissed", nextShow.toString());

    setOpen(false);
  };

  const apps = [
    {
      id: 1,

      name: "FinTrack: Expense & Budget",

      description: "Track expenses, budgets, analytics and financial insights.",

      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",

      link: "https://play.google.com/store/apps/details?id=com.satinder_singh_sall.mobileapp&hl=en_IN",

      status: "Closed Testing",

      statusColor: "text-amber-700",

      statusBg: "bg-amber-100",

      icon: ClockIcon,
    },

    {
      id: 2,

      name: "Course Calculator",

      description: "Calculate CGPA, percentages and semester grades instantly.",

      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",

      link: "https://play.google.com/store/apps/details?id=com.satinder.coursecalculator&hl=en_IN",

      status: "Live on Play Store",

      statusColor: "text-emerald-700",

      statusBg: "bg-emerald-100",

      icon: CheckBadgeIcon,
    },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",

      href: "https://www.linkedin.com/in/satinder-singh-sall-b62049204/",

      icon: <FaLinkedinIn />,
    },

    {
      name: "GitHub",

      href: "https://github.com/SatinderSinghSall",

      icon: <FaGithub />,
    },

    {
      name: "X / Twitter",

      href: "https://x.com/SallSatinder",

      icon: <FaXTwitter />,
    },

    {
      name: "YouTube",

      href: "https://www.youtube.com/@satindersinghsall.3841/featured",

      icon: <FaYoutube />,
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="
              fixed inset-0 z-[9998]

              bg-black/45

              backdrop-blur-sm
            "
          />

          {/* MODAL WRAPPER */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 10,
              scale: 0.97,
            }}
            transition={{
              duration: 0.28,
            }}
            className="
              fixed inset-0 z-[9999]

              flex items-center justify-center

              p-3 sm:p-5
            "
          >
            {/* MODAL */}
            <div
              className="
                relative

                w-full max-w-3xl

                rounded-[28px]

                border border-zinc-200

                bg-white

                shadow-[0_25px_90px_rgba(0,0,0,0.15)]

                overflow-hidden
              "
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={closeModal}
                className="
                  absolute right-4 top-4 z-50

                  flex h-10 w-10 items-center justify-center

                  rounded-full

                  bg-zinc-100

                  text-zinc-600

                  transition-all duration-300

                  hover:bg-zinc-200
                "
              >
                <XMarkIcon className="h-5 w-5" />
              </button>

              {/* SCROLLABLE CONTENT */}
              <div
                className="
                  max-h-[90vh]

                  overflow-y-auto

                  px-4 py-5

                  sm:px-6 sm:py-6

                  md:px-8 md:py-8
                "
              >
                {/* HEADER */}
                <div className="text-center">
                  <h2
                    className="
                      pr-10

                      text-2xl font-black tracking-tight

                      text-zinc-900

                      sm:text-4xl
                    "
                  >
                    Mobile App Showcase
                  </h2>

                  <p
                    className="
                      mx-auto mt-3

                      max-w-2xl

                      text-sm leading-relaxed

                      text-zinc-500

                      sm:text-base
                    "
                  >
                    Explore my Android applications available on Google Play
                    Store.
                  </p>
                </div>

                {/* APP CARDS */}
                <div className="mt-6 space-y-4 sm:mt-8">
                  {apps.map((app) => {
                    const StatusIcon = app.icon;

                    return (
                      <a
                        key={app.id}
                        href={app.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          group

                          block

                          rounded-[24px]

                          border border-zinc-200

                          bg-white

                          p-4

                          transition-all duration-300

                          hover:-translate-y-1
                          hover:shadow-xl
                        "
                      >
                        <div
                          className="
                            flex flex-col gap-4

                            sm:flex-row
                          "
                        >
                          {/* IMAGE */}
                          <div
                            className="
                              h-40 w-full

                              overflow-hidden

                              rounded-2xl

                              bg-zinc-100

                              sm:h-24
                              sm:w-24
                              sm:flex-shrink-0
                            "
                          >
                            <img
                              src={app.image}
                              alt={app.name}
                              className="
                                h-full w-full object-cover
                              "
                            />
                          </div>

                          {/* CONTENT */}
                          <div className="min-w-0 flex-1">
                            {/* TOP */}
                            <div
                              className="
                                flex flex-col gap-3

                                sm:flex-row
                                sm:items-start
                                sm:justify-between
                              "
                            >
                              <div className="min-w-0">
                                <h3
                                  className="
                                    text-xl font-bold leading-tight

                                    text-zinc-900
                                  "
                                >
                                  {app.name}
                                </h3>

                                <p
                                  className="
                                    mt-2

                                    text-sm leading-relaxed

                                    text-zinc-500
                                  "
                                >
                                  {app.description}
                                </p>
                              </div>

                              {/* STATUS */}
                              <div
                                className={`
                                  inline-flex w-fit items-center gap-2

                                  rounded-full

                                  px-3 py-2

                                  text-xs font-semibold

                                  ${app.statusBg}
                                  ${app.statusColor}

                                  sm:flex-shrink-0
                                `}
                              >
                                <StatusIcon className="h-4 w-4" />

                                <span>{app.status}</span>
                              </div>
                            </div>

                            {/* BOTTOM */}
                            <div
                              className="
                                mt-4

                                flex items-center justify-between
                              "
                            >
                              <div
                                className="
                                  text-sm font-semibold

                                  text-zinc-800
                                "
                              >
                                Google Play Store
                              </div>

                              <div
                                className="
                                  flex h-11 w-11 items-center justify-center

                                  rounded-full

                                  bg-zinc-100

                                  text-zinc-700

                                  transition-all duration-300

                                  group-hover:bg-zinc-900
                                  group-hover:text-white
                                "
                              >
                                <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>

                {/* PROFILE BUTTON */}
                <a
                  href="https://play.google.com/store/apps/developer?id=Satinder+Singh+Sall&hl=en_IN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-6

                    inline-flex w-full items-center justify-center gap-3

                    rounded-2xl

                    bg-zinc-900

                    px-5 py-4

                    text-sm font-semibold text-white

                    transition-all duration-300

                    hover:bg-black
                  "
                >
                  <span>Google Play Profile</span>

                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                </a>

                {/* SEPARATOR */}
                <div
                  className="
                    my-8

                    h-px w-full

                    bg-gradient-to-r
                    from-transparent
                    via-zinc-300
                    to-transparent
                  "
                />

                {/* SOCIALS */}
                <div>
                  <h3
                    className="
                      text-xs font-bold uppercase tracking-[0.25em]

                      text-zinc-500
                    "
                  >
                    Developer Social Links
                  </h3>

                  <div
                    className="
                      mt-4

                      grid gap-3

                      sm:grid-cols-2
                    "
                  >
                    {socialLinks.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          group

                          flex items-center justify-between

                          rounded-2xl

                          border border-zinc-200

                          bg-zinc-50

                          px-4 py-4

                          transition-all duration-300

                          hover:border-zinc-300
                          hover:bg-zinc-100
                        "
                      >
                        {/* LEFT */}
                        <div className="flex items-center gap-3">
                          {/* ICON */}
                          <div
                            className="
                              flex h-11 w-11 items-center justify-center

                              rounded-xl

                              border border-zinc-200

                              bg-white

                              text-zinc-700

                              shadow-sm
                            "
                          >
                            {item.icon}
                          </div>

                          {/* TEXT */}
                          <div>
                            <h4
                              className="
                                text-sm font-semibold

                                text-zinc-900
                              "
                            >
                              {item.name}
                            </h4>

                            <p
                              className="
                                text-xs

                                text-zinc-500
                              "
                            >
                              Visit Profile
                            </p>
                          </div>
                        </div>

                        {/* ARROW */}
                        <ArrowTopRightOnSquareIcon
                          className="
                            h-5 w-5

                            text-zinc-500

                            transition-all duration-300

                            group-hover:-translate-y-1
                            group-hover:translate-x-1
                            group-hover:text-zinc-900
                          "
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
