import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL =
        import.meta.env.MODE === "production"
          ? "https://satinder-portfolio-backend-codebase.onrender.com/api/auth/login"
          : "/api/auth/login";

      const res = await axios.post(API_URL, { email, password });

      localStorage.setItem("token", res.data.token);

      // Check for admin role
      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        setError("Access denied: Admins only");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white py-2" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
