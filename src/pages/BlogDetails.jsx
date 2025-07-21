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

  if (loading) return <p className="p-6">Loading blog post...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!blog) return <p className="p-6">Blog not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="mb-4 w-full object-cover rounded"
        />
      )}
      <p>{blog.content}</p>
    </div>
  );
}
