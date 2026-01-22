import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Trash2,
  Mail,
  MessageSquare,
  ShieldAlert,
  Search,
  RefreshCcw,
  ChevronLeft,
  ChevronRight,
  Inbox,
  CalendarDays,
  UserCircle2,
} from "lucide-react";
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

  // ✅ SaaS extras
  const [query, setQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const token = localStorage.getItem("token");

  const filteredMessages = useMemo(() => {
    if (!query.trim()) return messages;
    const q = query.toLowerCase();
    return messages.filter(
      (m) =>
        m.name?.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q) ||
        m.message?.toLowerCase().includes(q),
    );
  }, [messages, query]);

  const totalPages = Math.ceil(filteredMessages.length / PAGE_SIZE);

  const paginatedMessages = filteredMessages.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const selectedMessage = messages.find((m) => m._id === selectedId);

  const fetchMessages = async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      const res = await axios.get(`${API}/contact`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data || []);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSelectedId(null);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const todayCount = useMemo(() => {
    return messages.filter(
      (m) => new Date(m.createdAt).toDateString() === new Date().toDateString(),
    ).length;
  }, [messages]);

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* SaaS Header */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-xl shadow-sm">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-fuchsia-200/40 blur-3xl pointer-events-none" />

          <div className="p-6 sm:p-7 flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full border bg-gray-50">
                    <Inbox className="w-3.5 h-3.5" />
                    Inbox
                  </span>
                  <span className="hidden sm:inline">/</span>
                  <span className="hidden sm:inline">Contact Messages</span>
                </div>

                <h1 className="mt-2 text-2xl sm:text-3xl font-black text-gray-900">
                  Contact Inbox
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Review and manage incoming messages like a SaaS support panel.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchMessages}
                  disabled={refreshing}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border shadow-sm font-semibold transition
                    ${
                      refreshing
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        : "bg-white hover:bg-gray-50 text-gray-800 border-gray-200"
                    }`}
                >
                  <RefreshCcw
                    className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                  />
                  {refreshing ? "Refreshing..." : "Refresh"}
                </button>

                <div className="hidden sm:flex items-center gap-2 px-3 py-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold">
                  <MessageSquare className="w-4 h-4" />
                  Support Inbox
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, email or message..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white shadow-sm outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <CalendarDays className="w-4 h-4 text-indigo-500" />
                <span className="whitespace-nowrap">
                  Today:{" "}
                  <span className="font-semibold text-gray-900">
                    {todayCount}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {loading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <StatCard
                icon={<Inbox className="w-4 h-4 text-indigo-600" />}
                label="Total Messages"
                value={messages.length}
              />
              <StatCard
                icon={<CalendarDays className="w-4 h-4 text-emerald-600" />}
                label="Today"
                value={todayCount}
              />
              <StatCard
                icon={<UserCircle2 className="w-4 h-4 text-fuchsia-600" />}
                label="Latest"
                value={messages[0]?.name || "—"}
              />
            </>
          )}
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inbox */}
          <div className="lg:col-span-1 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <p className="font-bold text-gray-900">Inbox</p>
              <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 border text-gray-700 font-semibold">
                {filteredMessages.length} items
              </span>
            </div>

            {loading ? (
              <InboxSkeleton />
            ) : filteredMessages.length === 0 ? (
              <p className="p-4 text-sm text-gray-500">No messages found</p>
            ) : (
              <>
                <InboxList
                  messages={paginatedMessages}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />

                {totalPages > 1 && (
                  <div className="flex items-center justify-between p-3 border-t border-gray-200 text-sm">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Prev
                    </button>

                    <span className="text-gray-500 font-medium">
                      Page {currentPage} of {totalPages}
                    </span>

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Preview */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-sm">
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 border border-gray-200 shadow-xl">
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
                className="px-4 py-2 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={deleteMessage}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 text-white rounded-xl
                hover:bg-red-700 disabled:opacity-60
                disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
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

/* ------------------- Components ------------------- */

function InboxList({ messages, selectedId, onSelect }) {
  return (
    <div className="divide-y divide-gray-100">
      {messages.map((msg) => {
        const isActive = selectedId === msg._id;

        return (
          <button
            key={msg._id}
            onClick={() => onSelect(msg._id)}
            className={`w-full text-left p-4 transition flex gap-3 items-start
              ${isActive ? "bg-indigo-50" : "hover:bg-gray-50"}`}
          >
            {/* Avatar */}
            <div className="h-10 w-10 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-indigo-600 shrink-0">
              <Mail className="w-5 h-5" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-gray-900 truncate">
                  {msg.name}
                </p>
                <span className="text-xs text-gray-400 shrink-0">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-sm text-gray-500 truncate mt-1">
                {msg.message}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function MessagePreview({ message, onDelete }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-start justify-between pb-4 border-b border-gray-200">
        <div className="min-w-0">
          <h2 className="text-2xl font-black text-gray-900 truncate">
            {message.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Received on {new Date(message.createdAt).toLocaleDateString()} at{" "}
            {new Date(message.createdAt).toLocaleTimeString()}
          </p>
        </div>

        <button
          onClick={onDelete}
          className="text-red-600 text-sm flex items-center gap-1 hover:underline font-semibold"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>

      <div className="flex flex-wrap gap-4 py-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-indigo-600" />
          <a
            href={`mailto:${message.email}`}
            className="text-indigo-600 hover:underline font-semibold"
          >
            {message.email}
          </a>
        </div>

        <div className="text-xs">
          <span className="text-gray-400">Message ID:</span>{" "}
          <span className="font-mono text-gray-700">{message._id}</span>
        </div>
      </div>

      <div className="flex-1 mt-2">
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
            Message
          </p>

          <p className="text-gray-800 leading-relaxed whitespace-pre-line">
            {message.message}
          </p>
        </div>
      </div>

      <div className="pt-4 text-xs text-gray-400">
        Last updated: {new Date(message.createdAt).toLocaleString()}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-12">
      <div className="h-14 w-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-4">
        <MessageSquare className="w-7 h-7 text-indigo-600" />
      </div>
      <p className="font-semibold text-gray-900">No message selected</p>
      <p className="text-sm text-gray-500 mt-1">
        Choose a message from the inbox to preview it.
      </p>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 font-semibold">{label}</p>
        <div className="h-9 w-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <p className="text-2xl font-black text-gray-900 mt-2">{value}</p>
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
    <div className="bg-white border rounded-2xl p-4 animate-pulse space-y-2">
      <div className="h-3 w-24 bg-gray-200 rounded" />
      <div className="h-7 w-16 bg-gray-300 rounded" />
    </div>
  );
}
