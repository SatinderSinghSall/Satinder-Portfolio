import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout"; // ✅ import layout

const API = import.meta.env.VITE_API_URL || "/api";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/contact`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await axios.delete(`${API}/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMessages();
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Contact Messages</h2>

        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          <ul className="space-y-4">
            {messages.map((msg) => (
              <li
                key={msg._id}
                className="border p-4 rounded shadow-sm bg-white"
              >
                <div className="mb-2">
                  <span className="font-semibold">Name:</span> {msg.name}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Email:</span> {msg.email}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Message:</span> {msg.message}
                </div>
                <button
                  onClick={() => handleDelete(msg._id)}
                  className="text-red-500 mt-2 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminLayout>
  );
}
