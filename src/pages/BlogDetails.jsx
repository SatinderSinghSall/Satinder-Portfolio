import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL || "/api";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`${API}/blogs/${id}`).then((res) => setBlog(res.data));
  }, [id]);

  if (!blog) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
      {blog.image && <img src={blog.image} alt="" className="mb-4" />}
      <p>{blog.content}</p>
    </div>
  );
}
