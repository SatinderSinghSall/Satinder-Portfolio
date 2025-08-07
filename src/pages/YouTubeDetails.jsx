import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiError } from "react-icons/bi";
import { FaYoutube } from "react-icons/fa";

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
      <section className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium">Loading video...</p>
      </section>
    );
  }

  if (!video) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] px-6">
        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl shadow-2xl text-white text-center max-w-md w-full animate-fade-in">
          <BiError className="text-5xl mx-auto mb-4 text-red-400" />
          <h2 className="text-2xl font-bold mb-2">Video Not Found</h2>
          <p className="text-gray-300 mb-6">
            Sorry, we couldn’t find the video you’re looking for. It might have
            been removed or the link is broken.
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium py-2 px-4 rounded-full"
          >
            Go back home
          </Link>
        </div>
      </section>
    );
  }

  function getEmbedUrl(url) {
    const match = url.match(/(?:watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] py-16 px-6 text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
          <iframe
            className="w-full h-full"
            src={getEmbedUrl(video.videoUrl)}
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

        <div className="pt-6">
          <a
            href={video.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold py-2 px-4 rounded-full"
          >
            <FaYoutube className="text-xl" />
            Watch on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
