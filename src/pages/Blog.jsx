import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const API = import.meta.env.VITE_API_URL || "/api";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(`${API}/blogs`).then((res) => setBlogs(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Blog</h2>
      {blogs.map((blog) => (
        <div key={blog._id} className="mb-4 border-b pb-3">
          <Link
            to={`/blog/${blog._id}`}
            className="text-xl text-blue-600 font-semibold"
          >
            {blog.title}
          </Link>
          <p>{blog.content.slice(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
}
