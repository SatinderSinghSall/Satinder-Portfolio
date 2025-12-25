import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Mail, MessageSquare, ShieldAlert } from "lucide-react";
import AdminLayout from "../components/AdminLayout";

const API = import.meta.env.VITE_API_URL || "/api";
const PAGE_SIZE = 6;

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleting, setDeleting] = useState(false);

  const token = localStorage.getItem("token");

  const totalPages = Math.ceil(messages.length / PAGE_SIZE);

  const paginatedMessages = messages.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const selectedMessage = messages.find((m) => m._id === selectedId);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/contact`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async () => {
    if (!selectedId) return;

    setDeleting(true);
    try {
      await axios.delete(`${API}/contact/${selectedId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowModal(false);
      setSelectedId(null);
      fetchMessages();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    setSelectedId(null);
  }, [currentPage]);

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contact Inbox</h1>
            <p className="text-gray-500 mt-1">
              Review and manage incoming messages
            </p>
          </div>
          <MessageSquare className="w-8 h-8 text-indigo-600" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {loading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <StatCard label="Total Messages" value={messages.length} />
              <StatCard
                label="Today"
                value={
                  messages.filter(
                    (m) =>
                      new Date(m.createdAt).toDateString() ===
                      new Date().toDateString()
                  ).length
                }
              />
              <StatCard label="Latest" value={messages[0]?.name || "—"} />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white border rounded-xl overflow-hidden">
            {loading ? (
              <InboxSkeleton />
            ) : messages.length === 0 ? (
              <p className="p-4 text-sm text-gray-500">No messages found</p>
            ) : (
              <>
                <InboxList
                  messages={paginatedMessages}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />

                {totalPages > 1 && (
                  <div className="flex items-center justify-between p-3 border-t text-sm">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                      className="px-3 py-1 border rounded disabled:opacity-40"
                    >
                      Prev
                    </button>

                    <span className="text-gray-500">
                      Page {currentPage} of {totalPages}
                    </span>

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                      className="px-3 py-1 border rounded disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="lg:col-span-2 bg-white border rounded-xl p-6">
            {loading ? (
              <PreviewSkeleton />
            ) : selectedMessage ? (
              <MessagePreview
                message={selectedMessage}
                onDelete={() => setShowModal(true)}
              />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>

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
                disabled={deleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg
             hover:bg-red-700 disabled:opacity-60
             disabled:cursor-not-allowed flex items-center gap-2"
              >
                {deleting && (
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function InboxList({ messages, selectedId, onSelect }) {
  return (
    <div className="divide-y">
      {messages.map((msg) => (
        <button
          key={msg._id}
          onClick={() => onSelect(msg._id)}
          className={`w-full text-left p-4 hover:bg-gray-50 transition
            ${selectedId === msg._id ? "bg-indigo-50" : ""}`}
        >
          <div className="flex justify-between items-center">
            <p className="font-medium text-gray-800 truncate">{msg.name}</p>
            <span className="text-xs text-gray-400">
              {new Date(msg.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-gray-500 truncate">{msg.message}</p>
        </button>
      ))}
    </div>
  );
}

function MessagePreview({ message, onDelete }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-start justify-between pb-4 border-b">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {message.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Received on {new Date(message.createdAt).toLocaleDateString()} at{" "}
            {new Date(message.createdAt).toLocaleTimeString()}
          </p>
        </div>

        <button
          onClick={onDelete}
          className="text-red-600 text-sm flex items-center gap-1 hover:underline"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>

      <div className="flex flex-wrap gap-6 py-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-indigo-600" />
          <a
            href={`mailto:${message.email}`}
            className="text-indigo-600 hover:underline"
          >
            {message.email}
          </a>
        </div>

        <div>
          <span className="text-gray-400">Message ID:</span>{" "}
          <span className="font-mono text-xs">{message._id}</span>
        </div>
      </div>

      <div className="flex-1 mt-2">
        <div className="bg-gray-50 border rounded-xl p-6">
          <p className="text-sm font-medium text-gray-500 mb-2">Message</p>

          <p className="text-gray-800 leading-relaxed whitespace-pre-line">
            {message.message}
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="pt-4 text-xs text-gray-400">
        Last updated: {new Date(message.createdAt).toLocaleString()}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
      <MessageSquare className="w-10 h-10 mb-3 opacity-40" />
      <p className="font-medium">No message selected</p>
      <p className="text-sm">Choose a message from the inbox</p>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white border rounded-xl p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

function InboxSkeleton() {
  return (
    <div className="divide-y animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="p-4 space-y-2">
          <div className="flex justify-between">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-3 w-12 bg-gray-200 rounded" />
          </div>
          <div className="h-3 w-full bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}

function PreviewSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-6 w-48 bg-gray-200 rounded" />
        <div className="h-4 w-64 bg-gray-200 rounded" />
      </div>

      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 rounded" />
        <div className="h-4 w-4/6 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

function StatCardSkeleton() {
  return (
    <div className="bg-white border rounded-xl p-4 animate-pulse space-y-2">
      <div className="h-3 w-24 bg-gray-200 rounded" />
      <div className="h-7 w-16 bg-gray-300 rounded" />
    </div>
  );
}
