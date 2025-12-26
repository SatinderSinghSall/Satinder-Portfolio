import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import AdminAuthLayout from "../components/AdminAuthLayout";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const API_URL =
        import.meta.env.MODE === "production"
          ? "https://satinder-portfolio-backend-codebase.onrender.com/api/auth/login"
          : "/api/auth/login";

      const res = await axios.post(API_URL, { email, password });
      localStorage.setItem("token", res.data.token);

      if (res.data.user.role === "admin") {
        toast.success("Administrator authenticated");
        navigate("/admin/dashboard");
      } else {
        setError("Unauthorized access. Administrator privileges required.");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Authentication failed";
      toast.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminAuthLayout>
      {/* Back Button */}
      <div className="mb-6">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 rounded-full border border-gray-800 bg-[#0f0f0f] px-3 py-1.5 text-sm font-medium text-gray-400 hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/5 active:scale-95 transition-all"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      </div>

      <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">
        Admin Login
      </h2>

      {error && (
        <p className="text-red-400 text-sm text-center mb-4">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm mb-1 text-gray-300">
            Email Address
          </label>
          <input
            type="email"
            autoFocus
            placeholder="admin@example.com"
            className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-300">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full px-4 py-2 pr-11 bg-[#1a1a1a] border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-blue-400 transition"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
          }`}
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Authenticating..." : "Login"}
        </button>
      </form>
    </AdminAuthLayout>
  );
}

export default Login;
