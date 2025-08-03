import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "/api";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/blogs`)
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Failed to fetch blogs:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] py-16 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-5xl font-extrabold mb-4 leading-tight">
          Latest <span className="text-blue-500">Blog Posts</span>
        </h2>
        <p className="text-center text-gray-300 mb-12 text-lg max-w-3xl mx-auto">
          Explore insightful articles on design, development, and everything in
          between.
        </p>

        {loading ? (
          <p className="text-center text-lg text-gray-400 animate-pulse">
            Loading Blogs...
          </p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-lg text-gray-400">
            No blog posts found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:scale-[1.025] transition-all duration-300 hover:shadow-2xl"
              >
                <div className="p-6 flex flex-col h-full justify-between">
                  <Link
                    to={`/blog/${blog._id}`}
                    className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors"
                  >
                    {blog.title}
                    <p className="text-sm text-gray-400 mb-2">
                      By {blog.author || "Admin"} •{" "}
                      {new Date(blog.publishedAt).toLocaleDateString()}
                    </p>
                  </Link>
                  <p className="text-gray-300 text-sm mb-4">
                    {blog.content.length > 150
                      ? blog.content.slice(0, 150) + "..."
                      : blog.content}
                  </p>
                  <Link
                    to={`/blog/${blog._id}`}
                    className="mt-auto w-full inline-block text-center font-semibold py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-pink-500 transition-all text-white shadow-md"
                  >
                    📖 Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
