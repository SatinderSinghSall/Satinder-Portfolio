import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import {
  ArrowTopRightOnSquareIcon,
  BookOpenIcon,
  SparklesIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

import {
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
  FaGithub,
} from "react-icons/fa6";

export default function PoetryPromoModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const checkTrigger = () => {
      const dismissedUntil = localStorage.getItem(
        "satinder-poetry-modal-dismissed",
      );

      const triggerTime = localStorage.getItem("satinder-poetry-modal-trigger");

      if (!triggerTime) return;

      if (dismissedUntil && Date.now() < Number(dismissedUntil)) {
        return;
      }

      const alreadyOpened = localStorage.getItem(
        "satinder-poetry-modal-opened",
      );

      if (alreadyOpened === triggerTime) return;

      localStorage.setItem("satinder-poetry-modal-opened", triggerTime);

      setTimeout(() => {
        setOpen(true);
      }, 5000);
    };

    checkTrigger();

    const interval = setInterval(checkTrigger, 1000);

    return () => clearInterval(interval);
  }, []);

  // BODY SCROLL LOCK
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

    localStorage.setItem(
      "satinder-poetry-modal-dismissed",
      nextShow.toString(),
    );

    localStorage.removeItem("satinder-poetry-modal-trigger");

    setOpen(false);
  };

  const poetryFeatures = [
    "Original emotional poetry",
    "Beautiful immersive reading experience",
    "Thoughtful newsletters & reflections",
    "Modern literary design",
  ];

  const socials = [
    {
      name: "Instagram",

      href: "https://www.instagram.com/satindersinghsall",

      icon: <FaInstagram />,
    },

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

              bg-[#020617]/70

              backdrop-blur-md
            "
          />

          {/* MODAL WRAPPER */}
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 12,
              scale: 0.97,
            }}
            transition={{
              duration: 0.32,
            }}
            className="
              fixed inset-0 z-[9999]

              overflow-y-auto

              px-3 py-6

              sm:px-5 sm:py-10

              lg:px-8 lg:py-16
            "
          >
            <div
              className="
                min-h-full

                flex items-center justify-center
              "
            >
              {/* MODAL */}
              <div
                className="
                  relative

                  w-full
                  max-w-6xl

                  overflow-hidden

                  rounded-[30px]

                  border border-white/10

                  bg-white

                  shadow-[0_30px_120px_rgba(0,0,0,0.35)]

                  lg:rounded-[34px]
                "
              >
                {/* CLOSE BUTTON */}
                <button
                  onClick={closeModal}
                  className="
                    absolute right-4 top-4 z-50

                    flex h-11 w-11 items-center justify-center

                    rounded-full

                    bg-black/20
                    backdrop-blur-xl

                    text-white

                    shadow-[0_8px_30px_rgba(0,0,0,0.25)]

                    border border-white/10

                    transition-all duration-300

                    hover:scale-105
                    hover:bg-black/30

                    active:scale-95
                "
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>

                {/* GRID */}
                <div
                  className="
                    grid grid-cols-1

                    lg:grid-cols-[1.1fr_0.9fr]
                  "
                >
                  {/* LEFT SIDE */}
                  <div
                    className="
                      relative

                      overflow-hidden

                      bg-gradient-to-br
                      from-[#020617]
                      via-[#0f172a]
                      to-[#111827]

                      px-5 py-7

                      sm:px-8 sm:py-10

                      lg:px-12 lg:py-14
                    "
                  >
                    {/* GLOW */}
                    <div
                      className="
                        absolute -top-24 -left-20

                        h-72 w-72

                        rounded-full

                        bg-indigo-500/10

                        blur-3xl
                      "
                    />

                    <div
                      className="
                        absolute bottom-0 right-0

                        h-72 w-72

                        rounded-full

                        bg-fuchsia-500/10

                        blur-3xl
                      "
                    />

                    <div className="relative z-10">
                      {/* BADGE */}
                      <div
                        className="
                          inline-flex items-center gap-2

                          rounded-full

                          border border-white/10

                          bg-white/5

                          px-4 py-2

                          text-[11px]
                          font-semibold

                          tracking-[0.22em]

                          text-white/80
                        "
                      >
                        <SparklesIcon className="h-4 w-4" />
                        SATINDER POETRY
                      </div>

                      {/* HEADING */}
                      <h2
                        className="
                          mt-7

                          max-w-xl

                          font-serif

                          text-4xl
                          leading-tight

                          text-white

                          sm:text-5xl

                          lg:text-5xl

                          xl:text-6xl
                        "
                      >
                        Poetry that
                        <br />
                        lingers after
                        <br />
                        the page ends.
                      </h2>

                      {/* DESCRIPTION */}
                      <p
                        className="
                          mt-7

                          max-w-xl

                          text-[15px]
                          leading-8

                          text-slate-300

                          sm:text-base
                        "
                      >
                        Explore an immersive poetry platform crafted with
                        emotion, storytelling, and modern design — a quiet
                        digital space for thoughtful readers.
                      </p>

                      {/* FEATURES */}
                      <div
                        className="
                          mt-10

                          grid gap-4
                        "
                      >
                        {poetryFeatures.map((feature) => (
                          <div
                            key={feature}
                            className="
                              flex items-center gap-3

                              text-sm

                              text-white/90
                            "
                          >
                            <div
                              className="
                                flex h-8 w-8 items-center justify-center

                                rounded-full

                                bg-white/10
                              "
                            >
                              <BookOpenIcon className="h-4 w-4" />
                            </div>

                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div
                    className="
                      bg-white

                      px-5 py-7

                      sm:px-8 sm:py-10

                      lg:px-10 lg:py-12
                    "
                  >
                    {/* TITLE */}
                    <div>
                      <p
                        className="
                          text-xs
                          font-semibold

                          tracking-[0.25em]

                          text-slate-400
                        "
                      >
                        DISCOVER THE EXPERIENCE
                      </p>

                      <h3
                        className="
                          mt-4

                          text-3xl
                          font-black
                          leading-tight

                          tracking-tight

                          text-slate-900

                          sm:text-4xl
                        "
                      >
                        Welcome to a
                        <span className="mt-1 block">
                          quieter digital world ✨
                        </span>
                      </h3>

                      <p
                        className="
                          mt-5

                          text-sm
                          leading-7

                          text-slate-500
                        "
                      >
                        Satinder Poetry blends elegant design, emotional
                        writing, and immersive storytelling into a modern
                        literary experience.
                      </p>
                    </div>

                    {/* WEBSITE CARD */}
                    <div
                      className="
                        mt-8

                        rounded-[28px]

                        border border-slate-200

                        bg-slate-50

                        p-5 sm:p-6
                      "
                    >
                      <div className="flex items-start gap-4">
                        {/* ICON */}
                        <div
                          className="
                            flex h-14 w-14 shrink-0 items-center justify-center

                            rounded-2xl

                            bg-white

                            shadow-sm
                          "
                        >
                          <BookOpenIcon className="h-7 w-7 text-slate-900" />
                        </div>

                        {/* CONTENT */}
                        <div className="min-w-0 flex-1">
                          <h4
                            className="
                              text-xl
                              font-bold

                              text-slate-900
                            "
                          >
                            Satinder Poetry
                          </h4>

                          <p
                            className="
                              mt-3

                              text-sm
                              leading-7

                              text-slate-600
                            "
                          >
                            Read original poems, thoughtful reflections, and
                            immersive writings in a beautifully designed poetry
                            platform.
                          </p>

                          {/* CTA */}
                          <a
                            href="https://satinderpoetry.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              localStorage.setItem(
                                "satinder-poetry-modal-dismissed",
                                (Date.now() + 24 * 60 * 60 * 1000).toString(),
                              );
                            }}
                            className="
                              mt-6

                              inline-flex items-center gap-3

                              rounded-2xl

                              bg-slate-900

                              px-5 py-3.5

                              text-sm
                              font-semibold

                              text-white

                              transition-all duration-300

                              hover:scale-[1.02]
                              hover:bg-black
                            "
                          >
                            Visit Poetry Website
                            <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* SEPARATOR */}
                    <div
                      className="
                        my-8

                        h-px w-full

                        bg-gradient-to-r
                        from-transparent
                        via-slate-300
                        to-transparent
                      "
                    />

                    {/* SOCIALS */}
                    <div>
                      <h3
                        className="
                          text-xs
                          font-bold
                          uppercase

                          tracking-[0.22em]

                          text-slate-500
                        "
                      >
                        Follow The Journey
                      </h3>

                      <div
                        className="
                          mt-5

                          grid gap-3

                          sm:grid-cols-2
                        "
                      >
                        {socials.map((item, index) => (
                          <a
                            key={index}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              group

                              flex items-center justify-between

                              rounded-2xl

                              border border-slate-200

                              bg-slate-50

                              px-4 py-4

                              transition-all duration-300

                              hover:border-slate-300
                              hover:bg-slate-100
                            "
                          >
                            {/* LEFT */}
                            <div className="flex items-center gap-3">
                              <div
                                className="
                                  flex h-11 w-11 items-center justify-center

                                  rounded-xl

                                  border border-slate-200

                                  bg-white

                                  text-slate-700

                                  shadow-sm
                                "
                              >
                                {item.icon}
                              </div>

                              <div>
                                <h4
                                  className="
                                    text-sm
                                    font-semibold

                                    text-slate-900
                                  "
                                >
                                  {item.name}
                                </h4>

                                <p
                                  className="
                                    text-xs

                                    text-slate-500
                                  "
                                >
                                  Visit Profile
                                </p>
                              </div>
                            </div>

                            <ArrowTopRightOnSquareIcon
                              className="
                                h-5 w-5

                                text-slate-500

                                transition-all duration-300

                                group-hover:-translate-y-1
                                group-hover:translate-x-1
                                group-hover:text-slate-900
                              "
                            />
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* FOOTER */}
                    <div
                      className="
                        mt-8

                        text-center

                        text-xs

                        tracking-wide

                        text-slate-400
                      "
                    >
                      Crafted with emotion, storytelling & design.
                    </div>
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
