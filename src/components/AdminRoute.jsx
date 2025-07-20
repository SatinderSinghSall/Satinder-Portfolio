import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token || !token.includes(".")) {
    // No token or invalid format
    return <Navigate to="/login" replace />;
  }

  try {
    // Decode JWT payload
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));

    if (payload.role !== "admin") {
      // Not an admin
      return <Navigate to="/login" replace />;
    }

    return children; // ✅ Allow access
  } catch (err) {
    console.error("Token decode error:", err);
    return <Navigate to="/login" replace />;
  }
}

export default AdminRoute;
