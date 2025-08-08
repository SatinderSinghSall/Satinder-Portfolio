import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "/api";

function SkeletonCard() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden animate-pulse">
      <div className="h-48 bg-gradient-to-r from-gray-700 to-gray-600" />
      <div className="p-6 space-y-4">
        <div className="h-6 w-3/4 bg-gradient-to-r from-gray-700 to-gray-600 rounded-md" />
        <div className="h-4 w-1/2 bg-gradient-to-r from-gray-700 to-gray-600 rounded-md" />
      </div>
    </div>
  );
}

export default function WatchMyYouTube() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/youtube?status=published`)
      .then((res) => setVideos(res.data))
      .catch((err) => console.error("Failed to fetch videos:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] py-16 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-5xl font-extrabold mb-4 leading-tight">
          Watch <span className="text-red-500">My YouTube</span>
        </h2>
        <p className="text-center text-gray-300 mb-12 text-lg max-w-3xl mx-auto">
          Explore curated content from my YouTube channel on web development,
          tech insights, mobile app development, Data Structures & Algorithems
          and tutorials.
        </p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : videos.length === 0 ? (
          <p className="text-center text-lg text-gray-400">No videos found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div
                key={video._id}
                className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:scale-[1.025] transition-all duration-300"
              >
                <Link to={`/youtube/${video._id}`}>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-red-400 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">
                      By {video.author || "Satinder"} •{" "}
                      {new Date(video.publishedAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-300 text-sm">
                      {video.description?.slice(0, 100)}...
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
