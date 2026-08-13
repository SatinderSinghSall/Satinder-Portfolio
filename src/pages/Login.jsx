import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, ArrowLeft, Shield } from "lucide-react";

import SecurityAlertModal from "../components/SecurityAlertModal";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);

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
      const msg = "Email and password are required.";

      setError(msg);
      toast.error(msg);
      setShowSecurityModal(true);

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
        toast.success("Administrator authenticated!");
        navigate("/admin/dashboard");
      } else {
        const msg = "Unauthorized access. Administrator privileges required.";

        setError(msg);
        toast.error(msg);
        setShowSecurityModal(true);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Authentication failed";
      toast.error(msg);
      setError(msg);
      setShowSecurityModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-gray-100 flex flex-col items-center justify-center p-4">
      {/* Top Header Section */}
      <div className="flex flex-col items-center mb-6 text-center">
        <Shield className="text-blue-500 w-10 h-10 mb-3" strokeWidth={1.75} />
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
          Administrator Access
        </h1>
        <p className="text-gray-400 text-sm mb-3">
          Restricted system — authorized personnel only
        </p>
        <span className="text-[10px] font-bold tracking-widest uppercase text-amber-500 border border-amber-500/40 bg-amber-500/10 px-3 py-1 rounded-full">
          DEVELOPMENT ENVIRONMENT
        </span>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-[480px] bg-[#0d0d0d] border border-neutral-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
        {/* Back Button */}
        <div className="mb-6">
          <button
            type="button"
            disabled={loading}
            onClick={handleBack}
            className="inline-flex items-center gap-2 rounded-full border border-gray-800 bg-[#161616] px-4 py-2 text-sm font-medium text-gray-400 hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/5 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-400 disabled:hover:border-gray-800 disabled:hover:bg-[#161616] disabled:active:scale-100"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        </div>

        <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-400 text-sm text-center mb-4 bg-red-500/10 py-2 px-3 rounded-lg border border-red-500/20">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm mb-2 text-gray-300 font-medium">
              Email Address
            </label>
            <input
              type="email"
              autoFocus
              disabled={loading}
              placeholder="admin@example.com"
              className="w-full px-4 py-3 bg-[#181818] border border-gray-800 rounded-xl text-base text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-300 font-medium">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                disabled={loading}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-12 bg-[#181818] border border-gray-800 rounded-xl text-base text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                disabled={loading}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-500 hover:text-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-500"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff size={20} className="cursor-pointer" />
                ) : (
                  <Eye size={20} className="cursor-pointer" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl text-base font-semibold transition-all flex items-center justify-center gap-2 shadow-lg ${
              loading
                ? "bg-blue-600/50 text-blue-200 cursor-not-allowed opacity-75"
                : "bg-blue-600 hover:bg-blue-500 text-white active:scale-[0.98] cursor-pointer"
            }`}
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>
      </div>

      {/* Footer Text */}
      <p className="text-gray-500 text-xs text-center mt-6 max-w-md leading-relaxed">
        This system is monitored. Unauthorized access attempts may be logged and
        reviewed.
      </p>

      <SecurityAlertModal
        open={showSecurityModal}
        onClose={() => setShowSecurityModal(false)}
        message={error}
      />
    </div>
  );
}

export default Login;
