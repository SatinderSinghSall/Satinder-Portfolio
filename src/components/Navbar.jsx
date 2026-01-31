import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `nav-link font-mono text-sm tracking-wider uppercase relative transition-colors duration-200 
     ${
       pathname === path
         ? "text-green-400 active-link"
         : "text-gray-400 hover:text-green-400"
     }`;

  return (
    <nav className="sticky top-0 z-50">
      {/* Terminal style top bar */}
      <div className="bg-[#111] flex items-center px-4 py-1 space-x-2 border-b border-gray-800">
        <span className="w-3 h-3 rounded-full bg-red-500"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
        <span className="w-3 h-3 rounded-full bg-green-500"></span>
      </div>

      {/* Navbar container */}
      <div className="bg-[#0a0a0a] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <h1 className="font-mono text-lg font-semibold text-green-400">
            <span className="text-gray-500">~/portfolio</span>
            <span className="text-green-400"> $</span> SatinderPortfolio.dev
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className={linkClass("/")}>
              Home
            </Link>
            <Link
              to="/freelance-projects"
              className={linkClass("/freelance-projects")}
            >
              Freelancing
            </Link>
            <Link to="/services" className={linkClass("/services")}>
              Services
            </Link>
            <Link to="/projects" className={linkClass("/projects")}>
              Projects
            </Link>
            <Link to="/blog" className={linkClass("/blog")}>
              Blogs
            </Link>
            <Link to="/youtube" className={linkClass("/youtube")}>
              YouTube
            </Link>
            <Link to="/contact" className={linkClass("/contact")}>
              Contact
            </Link>
            <Link to="/login" className={linkClass("/login")}>
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-400 hover:text-green-400 transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[#0a0a0a] text-white flex flex-col items-center justify-center space-y-6 transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: 99 }}
      >
        <button
          className="absolute top-5 right-5 text-gray-400 hover:text-green-400 transition"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          <X size={28} />
        </button>

        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className={linkClass("/")}
        >
          Home
        </Link>
        <Link
          to="/freelance-projects"
          onClick={() => setIsOpen(false)}
          className={linkClass("/freelance-projects")}
        >
          Freelancing
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
          Blogs
        </Link>
        <Link
          to="/youtube"
          onClick={() => setIsOpen(false)}
          className={linkClass("/youtube")}
        >
          YouTube
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
          Admin
        </Link>
      </div>

      {/* Custom Styles */}
      <style>
        {`
          .nav-link::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -2px;
            width: 0%;
            height: 2px;
            background-color: #22c55e;
            transition: width 0.3s ease;
          }
          .nav-link:hover::after {
            width: 100%;
          }
          .active-link {
            text-shadow: 0 0 8px rgba(34, 197, 94, 0.8);
          }
        `}
      </style>
    </nav>
  );
}
