import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { PlayCircleIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";

import { FaYoutube } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "/api";

/* LOADER */
function VideoSkeleton() {
  return (
    <div
      className="
        overflow-hidden

        rounded-[32px]

        border border-red-100
        bg-white

        animate-pulse

        shadow-[0_10px_40px_rgba(15,23,42,0.04)]
      "
    >
      <div className="h-[220px] w-full bg-slate-200" />

      <div className="p-6">
        <div className="h-7 w-3/4 rounded-xl bg-slate-200" />

        <div className="mt-5 space-y-3">
          <div className="h-4 rounded-full bg-slate-200" />
          <div className="h-4 rounded-full bg-slate-200" />
          <div className="h-4 w-2/3 rounded-full bg-slate-200" />
        </div>

        <div className="mt-6 flex gap-2">
          <div className="h-8 w-20 rounded-full bg-slate-200" />
          <div className="h-8 w-20 rounded-full bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

/* VIDEO CARD */
function VideoCard({ video }) {
  return (
    <Link to={`/youtube/${video._id}`} className="block group">
      <div
        className="
          relative overflow-hidden

          rounded-[32px]

          border border-red-100/80

          bg-white/90

          backdrop-blur-2xl

          shadow-[0_10px_40px_rgba(15,23,42,0.06)]

          transition-all duration-500

          hover:-translate-y-2
          hover:border-red-200
          hover:shadow-[0_20px_70px_rgba(239,68,68,0.12)]
        "
      >
        {/* Hover Glow */}
        <div
          className="
            absolute inset-0

            opacity-0
            group-hover:opacity-100

            transition duration-500

            bg-gradient-to-br
            from-red-500/[0.04]
            to-orange-500/[0.04]
          "
        />

        {/* Thumbnail */}
        <div className="relative overflow-hidden">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="
              h-[220px] sm:h-[240px]
              w-full
              object-cover

              transition-transform duration-700

              group-hover:scale-105
            "
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Play Button */}
          <div
            className="
              absolute inset-0

              flex items-center justify-center
            "
          >
            <div
              className="
                flex h-20 w-20
                items-center justify-center

                rounded-full

                bg-white/20
                backdrop-blur-xl

                border border-white/20

                shadow-2xl

                transition-all duration-300

                group-hover:scale-110
                group-hover:bg-red-500
              "
            >
              <PlayCircleIcon className="h-10 w-10 text-white" />
            </div>
          </div>

          {/* YouTube Badge */}
          <div
            className="
              absolute top-4 left-4

              inline-flex items-center gap-2

              rounded-full

              bg-white/90

              px-4 py-2

              text-[11px]
              font-black

              text-red-600

              shadow-xl
            "
          >
            <FaYoutube className="text-red-500 text-sm" />
            YOUTUBE
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7">
          {/* Title */}
          <h3
            className="
              text-2xl
              font-black
              leading-tight
              tracking-tight

              text-slate-900

              transition-colors duration-300

              group-hover:text-red-600

              line-clamp-2
            "
          >
            {video.title}
          </h3>

          {/* Meta */}
          <p
            className="
              mt-3

              text-sm
              font-medium

              text-slate-500
            "
          >
            {video.author || "Satinder"} •{" "}
            {video.publishedAt
              ? new Date(video.publishedAt).toLocaleDateString()
              : "Recently"}
          </p>

          {/* Desc */}
          {video.description && (
            <p
              className="
                mt-4

                line-clamp-3

                text-sm sm:text-[15px]
                leading-relaxed

                text-slate-600
              "
            >
              {video.description}
            </p>
          )}

          {/* Tags */}
          {video.tags?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {video.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="
                    rounded-full

                    border border-red-100
                    bg-red-50

                    px-3 py-1.5

                    text-[11px]
                    font-semibold

                    text-red-700
                  "
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div
            className="
              mt-8

              flex items-center
              justify-between
            "
          >
            <div
              className="
                inline-flex items-center gap-2

                text-sm
                font-bold

                text-red-600
              "
            >
              Watch Video
              <ArrowUpRightIcon className="h-4 w-4" />
            </div>

            <div
              className="
                flex h-11 w-11
                items-center justify-center

                rounded-2xl

                bg-red-50

                text-red-600

                transition-all duration-300

                group-hover:bg-red-500
                group-hover:text-white
                group-hover:scale-110
              "
            >
              <ArrowUpRightIcon className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function FeatureYouTube() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${API}/youtube?status=published`);

        const sorted = [...(res.data || [])].sort(
          (a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0),
        );

        setVideos(sorted);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <section
      className="
        relative overflow-hidden

        bg-gradient-to-b
        from-white
        via-[#fff7f7]
        to-[#fff1f1]

        py-20 sm:py-28
      "
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#fee2e220_1px,transparent_1px),linear-gradient(to_bottom,#fee2e220_1px,transparent_1px)] bg-[size:70px_70px]" />

      {/* Glow */}
      <div className="absolute top-0 left-0 h-[450px] w-[450px] rounded-full bg-red-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div
          className="
            flex flex-col gap-8
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          {/* LEFT */}
          <div className="max-w-3xl">
            {/* Badge */}
            <div
              className="
                inline-flex items-center gap-2

                rounded-full

                border border-red-200
                bg-white/80

                px-4 py-2

                text-sm
                font-semibold

                text-red-600

                backdrop-blur-xl

                shadow-sm
              "
            >
              <FaYoutube className="text-red-500" />
              Featured Videos
            </div>

            {/* Title */}
            <h2
              className="
                mt-6

                text-4xl
                sm:text-5xl
                lg:text-7xl

                font-black
                tracking-tight
                leading-none

                text-slate-900
              "
            >
              Watch My{" "}
              <span
                className="
                  bg-gradient-to-r
                  from-red-500
                  via-orange-500
                  to-red-600

                  bg-clip-text
                  text-transparent
                "
              >
                YouTube
              </span>
            </h2>

            {/* Desc */}
            <p
              className="
                mt-6

                max-w-2xl

                text-base
                sm:text-lg

                leading-relaxed

                text-slate-600
              "
            >
              Tutorials, tech insights, web development, mobile apps, DSA, and
              modern engineering content crafted for developers.
            </p>
          </div>

          {/* CTA */}
          <Link
            to="/youtube"
            className="
              group

              inline-flex items-center
              justify-center gap-3

              rounded-2xl

              bg-red-500

              px-7 py-4

              text-sm
              font-bold
              text-white

              transition-all duration-300

              hover:scale-[1.02]
              hover:bg-red-600

              shadow-[0_10px_30px_rgba(239,68,68,0.25)]
            "
          >
            View All Videos
            <ArrowUpRightIcon
              className="
                h-5 w-5

                transition-transform duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </Link>
        </div>

        {/* MOBILE */}
        {!loading && (
          <div
            className="
              mt-14

              grid grid-cols-1 gap-6

              md:hidden
            "
          >
            {videos.slice(0, 3).map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        )}

        {/* DESKTOP */}
        {!loading && (
          <div
            className="
              mt-14

              hidden md:grid

              md:grid-cols-2
              xl:grid-cols-3

              gap-6 lg:gap-8
            "
          >
            {videos.slice(0, 6).map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        )}

        {/* LOADER */}
        {loading && (
          <div
            className="
              mt-14

              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3

              gap-6 lg:gap-8
            "
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <VideoSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 sm:mt-20 flex justify-center">
          <Link
            to="/youtube"
            className="
              group

              inline-flex items-center gap-3

              rounded-2xl

              border border-red-200
              bg-white

              px-7 py-4

              text-sm sm:text-base
              font-bold

              text-red-600

              shadow-lg

              transition-all duration-300

              hover:border-red-300
              hover:bg-red-50
            "
          >
            Explore Complete YouTube Library
            <ArrowUpRightIcon
              className="
                h-5 w-5

                transition-transform duration-300

                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
