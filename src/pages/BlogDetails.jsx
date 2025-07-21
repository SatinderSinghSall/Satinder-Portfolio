import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL || "/api";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(`${API}/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog post.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white text-lg animate-pulse">
        Loading blog post...
      </section>
    );

  if (error)
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-red-500 text-lg">
        {error}
      </section>
    );

  if (!blog)
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-gray-300 text-lg">
        Blog not found.
      </section>
    );

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] py-16 px-6 text-white">
      <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-xl p-8">
        <h1 className="text-4xl font-extrabold mb-6 leading-tight text-center">
          {blog.title}
        </h1>

        {blog.image && (
          <div className="overflow-hidden rounded-2xl mb-6">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}

        <div className="prose prose-invert text-gray-300 max-w-none leading-relaxed space-y-4">
          {blog.content.split("\n").map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
