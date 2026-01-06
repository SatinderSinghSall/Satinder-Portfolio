import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaYoutube,
  FaDownload,
} from "react-icons/fa";
import profileImage from "../assets/Satinder_Image.jpg";
import resumePDF from "../assets/Satinder_Resume.pdf";

export default function About() {
  return (
    <section className="border-t border-[#1e293b] bg-[#020617] text-white px-6 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            About
          </h1>

          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            I build scalable, production-ready digital products with a focus on
            performance, maintainability, and real-world usability.
          </p>

          <div className="mt-10 space-y-6 text-gray-400 text-lg leading-relaxed">
            <p>
              I’m currently pursuing a{" "}
              <span className="text-gray-200 font-medium">
                Master’s in Computer Applications (MCA)
              </span>{" "}
              at{" "}
              <span className="text-gray-200 font-medium">
                KiiT University, Bhubaneswar
              </span>
              , with a strong foundation in full-stack development, cloud
              platforms, and backend systems. I completed my bachelor’s degree
              at{" "}
              <span className="text-gray-200 font-medium">
                REVA University, Bengaluru
              </span>
              .
            </p>

            <p>
              My core expertise includes{" "}
              <span className="text-gray-200 font-medium">
                TypeScript, JavaScript, React, Node.js, Express
              </span>{" "}
              and modern database systems such as{" "}
              <span className="text-gray-200 font-medium">
                MySQL, MongoDB, SQL, and NoSQL
              </span>
              . I focus on building clean, secure applications with proper
              authentication, authorization, and API design.
            </p>

            <p>
              I’ve worked with deployment platforms like{" "}
              <span className="text-gray-200 font-medium">
                Vercel, Render, and GitHub
              </span>
              , and use{" "}
              <span className="text-gray-200 font-medium">Docker</span> and{" "}
              <span className="text-gray-200 font-medium">CI/CD pipelines</span>{" "}
              to deliver reliable, production-ready systems.
            </p>

            <p>
              Currently, I’m expanding into{" "}
              <span className="text-gray-200 font-medium">
                Game Development
              </span>{" "}
              and{" "}
              <span className="text-gray-200 font-medium">
                Mobile App Development
              </span>
              , with a long-term focus on building impactful, scalable products.
            </p>
          </div>

          <a
            href={resumePDF}
            download="Satinder_Resume.pdf"
            className="
              inline-flex items-center gap-3
              mt-12 px-8 py-3
              rounded-xl text-sm font-medium
              bg-blue-600 text-white
              hover:bg-blue-500 transition
            "
          >
            <FaDownload />
            Download resume
          </a>
        </div>

        <div className="flex flex-col items-start lg:items-end">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <img
              src={profileImage}
              alt="Satinder Singh Sall"
              className="w-72 h-72 md:w-80 md:h-80 object-cover rounded-xl"
            />
          </div>

          <div className="mt-8 w-full max-w-sm rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-sm font-semibold text-gray-200 mb-4">
              Focus Areas
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Full-stack web applications</li>
              <li>• Cloud deployment & DevOps</li>
              <li>• Performance optimization</li>
              <li>• Game & mobile development</li>
            </ul>
          </div>

          <div className="mt-8 flex gap-4">
            {[
              {
                href: "https://www.linkedin.com/in/satinder-singh-sall-b62049204/",
                icon: <FaLinkedin />,
              },
              {
                href: "https://github.com/SatinderSinghSall",
                icon: <FaGithub />,
              },
              {
                href: "https://x.com/SallSatinder",
                icon: <FaTwitter />,
              },
              {
                href: "https://www.youtube.com/@satindersinghsall.3841/featured",
                icon: <FaYoutube />,
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  h-11 w-11 flex items-center justify-center
                  rounded-xl border border-white/10 bg-white/5
                  text-blue-400 text-lg
                  hover:bg-blue-600 hover:text-white
                  transition
                "
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
