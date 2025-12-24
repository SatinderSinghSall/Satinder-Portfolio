import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Mail, User, MessageSquare, ShieldAlert } from "lucide-react";
import AdminLayout from "../components/AdminLayout";

const API = import.meta.env.VITE_API_URL || "/api";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async () => {
    await axios.delete(`${API}/contact/${selectedId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setShowModal(false);
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Contact Messages
            </h1>
            <p className="text-gray-500 mt-1">
              Manage and review user inquiries
            </p>
          </div>
          <MessageSquare className="w-8 h-8 text-indigo-600" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Total Messages" value={messages.length} />
          <StatCard label="Unread" value="—" />
          <StatCard label="Today" value="—" />
        </div>

        {/* Messages */}
        {loading ? (
          <p className="text-center text-gray-500">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition relative"
              >
                <div className="p-5 space-y-4">
                  {/* User */}
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-50">
                      <User className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{msg.name}</p>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-sm text-gray-500 hover:underline flex items-center gap-1"
                      >
                        <Mail className="w-4 h-4" />
                        {msg.email}
                      </a>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="border-l-4 border-indigo-500 pl-4 text-gray-700 italic">
                    {msg.message}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setSelectedId(msg._id);
                        setShowModal(true);
                      }}
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 space-y-4">
            <div className="flex items-center gap-3">
              <ShieldAlert className="text-red-500" />
              <h3 className="text-lg font-semibold">Delete Message</h3>
            </div>
            <p className="text-gray-600">
              This action is permanent. Are you sure?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={deleteMessage}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}
