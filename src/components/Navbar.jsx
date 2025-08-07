import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `text-lg transition duration-200 ${
      pathname === path ? "text-blue-400 font-semibold" : "hover:text-blue-400"
    }`;

  return (
    <nav className="bg-black text-white p-4 flex items-center justify-between shadow-md sticky top-0 z-50 border-b border-gray-800">
      <h1 className="font-bold text-xl sm:text-2xl">
        Satinder Portfolio<span className="text-blue-500">.dev</span>
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8 text-lg">
        <Link to="/" className={linkClass("/")}>
          Home
        </Link>
        <Link to="/services" className={linkClass("/services")}>
          Services
        </Link>
        <Link to="/projects" className={linkClass("/projects")}>
          Projects
        </Link>
        <Link to="/blog" className={linkClass("/blog")}>
          Blog
        </Link>
        <Link to="/youtube" className={linkClass("/youtube")}>
          Watch My YouTube
        </Link>
        <Link to="/contact" className={linkClass("/contact")}>
          Contact
        </Link>
        <Link to="/login" className={linkClass("/login")}>
          Admin Login
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-95 text-white flex flex-col items-center justify-center space-y-6 transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: 99 }}
      >
        <button
          className="absolute top-5 right-5"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          <X size={30} />
        </button>

        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className={linkClass("/")}
        >
          Home
        </Link>
        <Link
          to="/services"
          onClick={() => setIsOpen(false)}
          className={linkClass("/services")}
        >
          Services
        </Link>
        <Link
          to="/projects"
          onClick={() => setIsOpen(false)}
          className={linkClass("/projects")}
        >
          Projects
        </Link>
        <Link
          to="/blog"
          onClick={() => setIsOpen(false)}
          className={linkClass("/blog")}
        >
          Blog
        </Link>
        <Link
          to="/youtube"
          onClick={() => setIsOpen(false)}
          className={linkClass("/youtube")}
        >
          Watch My YouTube
        </Link>
        <Link
          to="/contact"
          onClick={() => setIsOpen(false)}
          className={linkClass("/contact")}
        >
          Contact
        </Link>
        <Link
          to="/login"
          onClick={() => setIsOpen(false)}
          className={linkClass("/login")}
        >
          Admin Login
        </Link>
      </div>
    </nav>
  );
}
