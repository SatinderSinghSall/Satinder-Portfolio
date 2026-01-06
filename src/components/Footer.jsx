import { Github, Linkedin, Twitter, Mail, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },

    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Skills", path: "/skills" },

    { name: "Experience", path: "/experience" },
    { name: "YouTube", path: "/youtube" },
    { name: "Contact", path: "/contact" },
  ];

  const socials = [
    { href: "https://github.com/SatinderSinghSall", icon: Github },
    {
      href: "https://www.linkedin.com/in/satinder-singh-sall-b62049204/",
      icon: Linkedin,
    },
    {
      href: "https://www.youtube.com/@satindersinghsall.3841/featured",
      icon: Youtube,
    },
    { href: "https://x.com/SallSatinder", icon: Twitter },
    { href: "mailto:satindersinghsall@gmail.com", icon: Mail },
  ];

  return (
    <footer
      className="
        relative
        border-t border-[#1e293b]
        bg-[#020617]
        px-6 pt-20 pb-10
        text-white
        shadow-[0_-20px_60px_rgba(0,0,0,0.6)]
      "
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="max-w-sm">
          <h2 className="text-2xl font-semibold tracking-tight">
            Satinder.dev
          </h2>

          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            Designing and building scalable, production-ready digital products
            with a strong focus on performance, clarity, and long-term value.
          </p>

          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-gray-400 leading-relaxed">
              Product mindset · Clean architecture · Reliable delivery
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wide mb-6">
            Quick links
          </h3>

          <ul className="grid grid-cols-3 gap-x-6 gap-y-4 text-sm text-gray-400">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className="hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wide mb-6">
            Connect
          </h3>

          <div className="flex items-center gap-4">
            {socials.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    h-11 w-11
                    flex items-center justify-center
                    rounded-xl
                    border border-white/10
                    bg-white/5
                    text-gray-400
                    hover:text-blue-400
                    hover:bg-white/10
                    transition
                  "
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>

          <p className="mt-6 text-xs text-gray-500 leading-relaxed">
            Open to collaborations, product work, and meaningful conversations.
          </p>
        </div>
      </div>

      <div className="mt-16 border-t border-[#1e293b] pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Satinder Singh Sall · All rights reserved
      </div>
    </footer>
  );
}
