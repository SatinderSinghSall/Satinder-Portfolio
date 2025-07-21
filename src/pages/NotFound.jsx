import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-7xl font-bold text-blue-500 mb-4">404</h1>
      <p className="text-2xl font-semibold mb-2">Page Not Found</p>
      <p className="text-gray-400 mb-6">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
