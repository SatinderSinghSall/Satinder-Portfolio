import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import toast from "react-hot-toast";
import {
  UsersIcon,
  ShieldCheckIcon,
  UserIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  XMarkIcon,
  ClipboardDocumentIcon,
  KeyIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/* SPINNER */
const Spinner = ({ text = "Loading..." }) => (
  <div className="flex items-center gap-2">
    <svg
      className="animate-spin h-5 w-5 text-indigo-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
    <span className="text-sm font-medium text-slate-600">{text}</span>
  </div>
);

export default function Users() {
  /* STATES */
  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  /* MODAL STATES */
  const [inspectUser, setInspectUser] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [deleteUserTarget, setDeleteUserTarget] = useState(null);

  /* FORM STATES */
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  /* PAGINATION STATES */
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);

  const token = localStorage.getItem("token");

  const headers = useMemo(() => {
    return { Authorization: `Bearer ${token}` };
  }, [token]);

  /* FETCH USERS */
  const fetchUsers = async () => {
    setFetching(true);
    try {
      const res = await axios.get(`${API}/users`, { headers });
      const data = Array.isArray(res.data) ? res.data : res.data.users || [];
      setUsers(data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load users");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* CREATE USER HANDLER */
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axios.post(`${API}/users`, formData, { headers });
      toast.success(res.data.message || "User created successfully!");
      setIsAddOpen(false);
      setFormData({ email: "", password: "", role: "user" });
      fetchUsers();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create user");
    } finally {
      setSubmitting(false);
    }
  };

  /* UPDATE USER HANDLER */
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const updatePayload = {
        email: formData.email,
        role: formData.role,
      };
      // Only attach password if supplied
      if (formData.password.trim()) {
        updatePayload.password = formData.password;
      }

      const res = await axios.put(
        `${API}/users/${editUser._id}`,
        updatePayload,
        { headers },
      );
      toast.success(res.data.message || "User updated successfully!");
      setEditUser(null);
      setFormData({ email: "", password: "", role: "user" });
      fetchUsers();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update user");
    } finally {
      setSubmitting(false);
    }
  };

  /* DELETE USER HANDLER */
  const handleDeleteUser = async () => {
    if (!deleteUserTarget) return;
    setSubmitting(true);
    try {
      const res = await axios.delete(`${API}/users/${deleteUserTarget._id}`, {
        headers,
      });
      toast.success(res.data.message || "User deleted successfully!");
      setDeleteUserTarget(null);
      fetchUsers();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete user");
    } finally {
      setSubmitting(false);
    }
  };

  /* OPEN EDIT MODAL SETUP */
  const openEditModal = (u) => {
    setEditUser(u);
    setFormData({
      email: u.email || "",
      password: "", // Left blank intentionally for updates
      role: u.role || "user",
    });
  };

  /* FILTERING LOGIC */
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.email?.toLowerCase().includes(search.toLowerCase()) ||
        u._id?.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === "all" || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  /* PAGINATION LOGIC */
  const totalPages = Math.ceil(filteredUsers.length / limit) || 1;
  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredUsers.slice(start, start + limit);
  }, [filteredUsers, page, limit]);

  return (
    <AdminLayout>
      <div className="w-full max-w-[1400px] mx-auto px-6 pb-16">
        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-2xl text-indigo-600">
              <UsersIcon className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                User Management
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                View system accounts and administrator roles from{" "}
                <span className="font-mono text-slate-700">users</span>{" "}
                collection.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200/80 px-3 py-1.5 rounded-xl">
              Total Users:{" "}
              <strong className="text-slate-800">{filteredUsers.length}</strong>
            </span>

            <button
              onClick={() => {
                setFormData({ email: "", password: "", role: "user" });
                setIsAddOpen(true);
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition cursor-pointer shadow-sm"
            >
              <PlusIcon className="h-4 w-4" />
              Add User
            </button>

            <button
              onClick={fetchUsers}
              disabled={fetching}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
                fetching
                  ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                  : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs"
              }`}
            >
              <ArrowPathIcon
                className={`h-4 w-4 ${fetching ? "animate-spin text-indigo-600" : "text-slate-500"}`}
              />
              {fetching ? "Syncing..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs mb-6 flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3.5 top-2.5 text-slate-400" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by Email address or ObjectId..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setPage(1);
              }}
              className="px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin Only</option>
              <option value="user">User Only</option>
            </select>

            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
              className="px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value={5}>5 per page</option>
              <option value={8}>8 per page</option>
              <option value={15}>15 per page</option>
            </select>
          </div>
        </div>

        {/* USERS TABLE */}
        {fetching ? (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-16 flex justify-center items-center">
            <Spinner text="Fetching collection data..." />
          </div>
        ) : paginatedUsers.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200/80 rounded-2xl">
            <UsersIcon className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-800 font-bold text-base">No Users Found</p>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search query or role filter.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">
                    <th className="py-3.5 px-5">Object ID</th>
                    <th className="py-3.5 px-5">Email Address</th>
                    <th className="py-3.5 px-5">System Role</th>
                    <th className="py-3.5 px-5">Created At</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {paginatedUsers.map((u) => (
                    <tr key={u._id} className="hover:bg-slate-50/60 transition">
                      {/* ID */}
                      <td className="py-4 px-5 font-mono text-slate-500 font-medium">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(u._id);
                            toast.success("Copied ID!");
                          }}
                          className="hover:text-indigo-600 transition flex items-center gap-1.5 group cursor-pointer"
                          title="Click to copy ID"
                        >
                          <span className="truncate max-w-[130px]">
                            {u._id}
                          </span>
                          <ClipboardDocumentIcon className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                        </button>
                      </td>

                      {/* EMAIL */}
                      <td className="py-4 px-5 font-bold text-slate-800">
                        {u.email}
                      </td>

                      {/* ROLE BADGE */}
                      <td className="py-4 px-5">
                        {u.role === "admin" ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full">
                            <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-600" />
                            Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 border border-slate-200/80 px-2.5 py-0.5 rounded-full">
                            <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                            User
                          </span>
                        )}
                      </td>

                      {/* CREATED AT */}
                      <td className="py-4 px-5 text-slate-500 font-medium font-mono text-[11px]">
                        {u.createdAt
                          ? new Date(u.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>

                      {/* ACTIONS */}
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* VIEW/INSPECT BUTTON */}
                          <button
                            onClick={() => setInspectUser(u)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition cursor-pointer border border-slate-200/60"
                            title="Inspect User"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>

                          {/* EDIT BUTTON */}
                          <button
                            onClick={() => openEditModal(u)}
                            className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition cursor-pointer border border-slate-200/60"
                            title="Edit User"
                          >
                            <PencilSquareIcon className="w-4 h-4" />
                          </button>

                          {/* DELETE BUTTON */}
                          <button
                            onClick={() => setDeleteUserTarget(u)}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer border border-slate-200/60"
                            title="Delete User"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION FOOTER */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  Page <strong className="text-slate-800">{page}</strong> of{" "}
                  <strong className="text-slate-800">{totalPages}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronLeftIcon className="w-4 h-4 text-slate-600" />
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronRightIcon className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 1️⃣ ADD USER MODAL */}
        {isAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden relative">
              <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600" />

              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                    <PlusIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      Add New User
                    </h3>
                    <p className="text-xs text-slate-400">
                      Create a system account
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={handleCreateUser}
                className="p-6 space-y-4 text-xs"
              >
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="user@domain.com"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    System Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-semibold text-slate-700"
                  >
                    <option value="user font-normal">User</option>
                    <option value="admin font-normal">Admin</option>
                  </select>
                </div>

                <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAddOpen(false)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-bold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? "Saving..." : "Create User"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 2️⃣ EDIT USER MODAL */}
        {editUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden relative">
              <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-purple-500 to-indigo-600" />

              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                    <PencilSquareIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      Edit User
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      ID: {editUser._id}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setEditUser(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={handleUpdateUser}
                className="p-6 space-y-4 text-xs"
              >
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    New Password{" "}
                    <span className="text-[10px] text-slate-400 font-normal">
                      (leave empty to keep current)
                    </span>
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    System Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-semibold text-slate-700"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setEditUser(null)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-bold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold transition cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? "Updating..." : "Update User"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 3️⃣ DELETE USER CONFIRMATION MODAL */}
        {deleteUserTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl border border-slate-100 overflow-hidden relative p-6 text-center">
              <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-center text-rose-600 mx-auto mb-4">
                <TrashIcon className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-black text-slate-900 mb-1">
                Delete User Account?
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Are you sure you want to delete{" "}
                <strong className="text-slate-800">
                  {deleteUserTarget.email}
                </strong>
                ? This action cannot be undone.
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteUserTarget(null)}
                  className="w-1/2 py-2.5 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-bold text-xs transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteUser}
                  disabled={submitting}
                  className="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs transition cursor-pointer disabled:opacity-50"
                >
                  {submitting ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4️⃣ USER INSPECTOR MODAL */}
        {inspectUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden relative">
              <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600" />

              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                    <UserIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      User Schema Inspector
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      ID: {inspectUser._id}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setInspectUser(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-extrabold text-slate-400 uppercase text-[10px]">
                      Email
                    </span>
                    <span className="font-mono text-[9px] text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded font-bold">
                      String
                    </span>
                  </div>
                  <span className="font-bold text-slate-800 text-sm">
                    {inspectUser.email}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-extrabold text-slate-400 uppercase text-[10px]">
                      Role
                    </span>
                    <span className="font-mono text-[9px] text-purple-600 bg-purple-50 px-1.5 py-0.2 rounded font-bold">
                      String
                    </span>
                  </div>
                  <span className="font-bold text-slate-800 capitalize text-sm">
                    {inspectUser.role}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-extrabold text-slate-400 uppercase text-[10px] flex items-center gap-1">
                      <KeyIcon className="w-3 h-3 text-amber-500" />
                      Password Hash
                    </span>
                    <span className="font-mono text-[9px] text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded font-bold">
                      Bcrypt String
                    </span>
                  </div>
                  <span className="font-mono text-slate-500 text-[11px] truncate block">
                    {inspectUser.password ||
                      "••••••••••••••••••••••••••••••••••••••••"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60">
                    <span className="font-extrabold text-slate-400 uppercase text-[9px] block mb-1">
                      createdAt
                    </span>
                    <span className="font-mono font-semibold text-slate-700 text-[11px]">
                      {inspectUser.createdAt
                        ? new Date(inspectUser.createdAt).toUTCString()
                        : "N/A"}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60">
                    <span className="font-extrabold text-slate-400 uppercase text-[9px] block mb-1">
                      updatedAt
                    </span>
                    <span className="font-mono font-semibold text-slate-700 text-[11px]">
                      {inspectUser.updatedAt
                        ? new Date(inspectUser.updatedAt).toUTCString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      JSON.stringify(inspectUser, null, 2),
                    );
                    toast.success("Document JSON copied!");
                  }}
                  className="text-xs font-bold text-slate-600 hover:text-indigo-600 transition cursor-pointer"
                >
                  📋 Copy JSON
                </button>

                <button
                  onClick={() => setInspectUser(null)}
                  className="bg-slate-900 hover:bg-black text-white font-bold text-xs px-5 py-2 rounded-xl transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
