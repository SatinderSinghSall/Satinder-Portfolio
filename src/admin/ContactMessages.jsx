import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Mail, User, X } from "lucide-react";
import AdminLayout from "../components/AdminLayout";

const API = import.meta.env.VITE_API_URL || "/api";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
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

  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    setDeleteLoading(true);
    try {
      await axios.delete(`${API}/contact/${selectedId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowModal(false);
      fetchMessages();
    } catch (err) {
      console.error("Failed to delete message:", err);
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <AdminLayout>
      <div className={`max-w-6xl mx-auto p-6 ${showModal ? "blur-sm" : ""}`}>
        <h2 className="text-4xl font-bold mb-8 text-gray-800">
          📩 Contact Messages
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <p className="text-gray-500 text-lg animate-pulse">
              Loading messages...
            </p>
          </div>
        ) : messages.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            No messages found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow border border-gray-100 relative"
              >
                <div className="flex items-center mb-3">
                  <User className="w-5 h-5 text-indigo-500 mr-2" />
                  <span className="text-lg font-semibold text-gray-800">
                    {msg.name}
                  </span>
                </div>
                <div className="flex items-center mb-3 text-gray-600">
                  <Mail className="w-5 h-5 text-indigo-400 mr-2" />
                  <a href={`mailto:${msg.email}`} className="hover:underline">
                    {msg.email}
                  </a>
                </div>
                <p className="text-gray-700 mb-4 border-l-4 border-indigo-500 pl-3 italic">
                  "{msg.message}"
                </p>
                <button
                  onClick={() => confirmDelete(msg._id)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-600"
                  title="Delete message"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-96 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Confirm Delete
              </h3>
              <button onClick={() => setShowModal(false)}>
                <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this message? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className={`px-4 py-2 rounded-lg text-white ${
                  deleteLoading
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
