import { Github, Linkedin, Twitter, Mail, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-black via-[#0f172a] to-black text-white px-6 pt-14 pb-8 backdrop-blur-sm border-t border-[#1e293b] shadow-inner shadow-[#0a0a0a]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-blue-500">
            Satinder.dev
          </h2>
          <p className="text-gray-300 mb-5 leading-relaxed">
            Building clean, modern, impactful web applications with a focus on
            performance and delightful user experience.
          </p>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Satinder Singh Sall. All rights
            reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl text-center font-semibold mb-5 text-gray-200">
            Quick Links
          </h3>
          <ul className="grid grid-cols-3 gap-x-6 gap-y-2 text-gray-400 font-medium text-center">
            {[
              { name: "Home", path: "/" },
              { name: "About Me", path: "/about" },
              { name: "Projects", path: "/projects" },
              { name: "Blog", path: "/blog" },
              { name: "Contact", path: "/contact" },
              { name: "Services", path: "/services" },
              { name: "YouTube", path: "/youtube" },
              { name: "Skills", path: "/skills" },
              { name: "Experience", path: "/experience" },
            ].map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className="group inline-block w-fit hover:text-blue-400 transition-colors duration-200 relative"
                >
                  {link.name}
                  <span className="block h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 mt-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-2xl font-semibold mb-5 text-gray-200">
            Connect with Me
          </h3>
          <div className="flex space-x-5">
            <a
              href="https://github.com/SatinderSinghSall"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition hover:scale-110 duration-300"
            >
              <Github size={30} />
            </a>
            <a
              href="https://www.linkedin.com/in/satinder-singh-sall-b62049204/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition hover:scale-110 duration-300"
            >
              <Linkedin size={30} />
            </a>
            <a
              href="https://www.youtube.com/@satindersinghsall.3841/featured"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition hover:scale-110 duration-300"
            >
              <Youtube size={30} />
            </a>
            <a
              href="https://x.com/SallSatinder"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition hover:scale-110 duration-300"
            >
              <Twitter size={30} />
            </a>
            <a
              href="mailto:satindersinghsall@gmail.com"
              className="hover:text-blue-400 transition hover:scale-110 duration-300"
            >
              <Mail size={30} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#1e293b] mt-12 pt-6 text-center text-gray-500 text-sm">
        Made with ❤️ by Satinder Singh Sall.
      </div>
    </footer>
  );
}
