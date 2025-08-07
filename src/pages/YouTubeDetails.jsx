import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "/api";

export default function YouTubeDetails() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/youtube/${id}`)
      .then((res) => setVideo(res.data))
      .catch((err) => console.error("Failed to fetch video:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center text-white">
        <p>Loading video...</p>
      </section>
    );
  }

  if (!video) {
    return (
      <section className="min-h-screen flex items-center justify-center text-white">
        <p>Video not found.</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] py-16 px-6 text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
          <iframe
            className="w-full h-full"
            src={video.videoUrl}
            title={video.title}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold">{video.title}</h1>

        <p className="text-gray-400 text-sm">
          By {video.author || "Satinder Singh Sall"} •{" "}
          {new Date(video.publishedAt).toLocaleDateString()}
        </p>

        <p className="text-lg text-gray-200 leading-relaxed">
          {video.description}
        </p>

        {video.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4">
            {video.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-white/10 text-white px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
