import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="space-y-4">
        <Link to="/admin/projects" className="text-blue-600 underline block">
          Manage Projects
        </Link>

        <Link to="/admin/blogs" className="text-blue-600 underline block">
          Manage Blogs
        </Link>

        <Link
          to="/admin/contact-messages"
          className="text-blue-600 underline block"
        >
          View Contact Messages
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded mt-4 hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
