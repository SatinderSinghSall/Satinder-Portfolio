import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import aboutImage from "../assets/images/about-image1.png";

export default function AboutMeCTA() {
  return (
    <section className="mt-12 relative px-6 py-28 overflow-hidden bg-[#ece3d2] border-y border-stone-900/10">
      {/* Background texture */}
      <div
        className="
          absolute inset-0 opacity-[0.04]

          bg-[radial-gradient(circle,#000_1px,transparent_1px)]
          bg-[size:12px_12px]

          pointer-events-none
        "
      />

      <div className="mx-auto max-w-[1240px] relative z-10">
        {/* Top Heading */}
        <div className="text-center mb-16">
          <p className="font-mono text-[11px] tracking-[0.35em] uppercase text-amber-800">
            ◆ Editorial Feature
          </p>

          <h2 className="mt-5 leading-[0.9] tracking-[-0.05em] font-bold">
            <span className="block text-[48px] sm:text-[72px] md:text-[96px] text-stone-900">
              About the
            </span>

            <span
              className="block text-[56px] sm:text-[88px] md:text-[118px]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 700,
                color: "#b45309",
              }}
            >
              Author
            </span>
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-3 border border-stone-900/20 bg-[#f5eee2] px-4 py-2 mb-7">
              <div className="w-2 h-2 rounded-full bg-amber-700 animate-pulse" />

              <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-stone-700">
                The Long Story
              </span>
            </div>

            <h3 className="text-[42px] sm:text-[58px] md:text-[72px] leading-[0.92] tracking-[-0.05em] font-bold text-stone-900">
              Beyond the{" "}
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 700,
                  color: "#b45309",
                }}
              >
                poetry
              </span>
            </h3>

            <p className="mt-8 text-[17px] leading-[1.9] text-stone-700 max-w-2xl">
              Satinder Poetry began quietly — somewhere between airport windows,
              unfinished thoughts, rain-soaked evenings, stories, reflections,
              and the need to turn emotions into words.
            </p>

            <p className="mt-5 text-[16px] leading-[1.9] text-stone-600 max-w-2xl">
              Discover the person behind this space, the journey through
              storytelling, aviation, technology, memories, and the moments that
              shaped these verses.
            </p>

            {/* BUTTON */}
            <div className="mt-10">
              <Link
                to="https://satinderpoetry.com/about-me"
                target="_blank"
                className="
                  group
                  relative
                  inline-flex
                  items-center
                  gap-4

                  overflow-hidden

                  border-2
                  border-stone-900

                  bg-[#f6efe2]

                  px-7
                  py-4

                  font-mono
                  text-[12px]
                  tracking-[0.2em]
                  uppercase

                  text-stone-900

                  transition-all
                  duration-300

                  shadow-[5px_5px_0px_0px_rgba(28,24,20,0.18)]

                  hover:translate-x-[2px]
                  hover:translate-y-[2px]

                  hover:shadow-[2px_2px_0px_0px_rgba(28,24,20,0.12)]
                "
              >
                {/* Texture */}
                <div
                  className="
                    absolute inset-0 opacity-[0.05]

                    bg-[radial-gradient(circle,#000_1px,transparent_1px)]
                    bg-[size:10px_10px]

                    pointer-events-none
                  "
                />

                <span className="relative z-10">Enter the Story</span>

                <ArrowRight
                  className="
                    relative z-10

                    w-4 h-4

                    transition-transform
                    duration-300

                    group-hover:translate-x-1
                    group-hover:-translate-y-[1px]
                  "
                />
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            {/* Decorative background */}
            <div
              className="
                absolute
                -top-5
                -left-5

                w-full
                h-full

                border-2
                border-stone-900/20

                bg-[#dfd3bf]
              "
            />

            {/* Main image */}
            <div
              className="
                relative
                overflow-hidden

                border-2
                border-stone-900

                bg-[#d8ccb7]

                shadow-[8px_8px_0px_0px_rgba(28,24,20,0.12)]
              "
            >
              {/* Halftone overlay */}
              <div
                className="
                  absolute inset-0 z-10 opacity-[0.18]

                  bg-[radial-gradient(circle,#000_1px,transparent_1px)]
                  bg-[size:10px_10px]

                  pointer-events-none
                "
              />

              <img
                src={aboutImage}
                alt="Satinder Singh Sall"
                className="w-full h-[520px] object-cover"
              />

              {/* Bottom editorial label */}
              <div
                className="
                  absolute bottom-4 left-4 right-4 z-20

                  flex items-center justify-between

                  border border-stone-900

                  bg-[#f6efe2]

                  px-4 py-3
                "
              >
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-stone-700">
                  Satinder Poetry
                </span>

                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-amber-800">
                  Vol. 01
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
