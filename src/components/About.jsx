import { FaLinkedin, FaGithub, FaTwitter, FaYoutube } from "react-icons/fa";
import profileImage from "../assets/Satinder_Image.jpg";
import resumePDF from "../assets/Satinder_Resume.pdf";
import { FaDownload } from "react-icons/fa";

export default function About() {
  return (
    <>
      <div className="border-t border-[#1e293b] shadow-inner shadow-[#0a0a0a] min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col items-center justify-center px-8 py-12">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-12">
          {/* Left: About Text */}
          <div className="flex-1 text-left">
            <h2 className="text-4xl font-bold text-blue-500 mb-6">About Me</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              I'm a passionate and dedicated{" "}
              <strong>
                student of Computer Science (MCA) at KiiT University,
                Bhubaneswar, Odisha, India
              </strong>
              , with a strong foundation in web development, mobile app
              development (including Android & native mobile/tablet apps), cloud
              computing, and backend systems. I completed my{" "}
              <strong>
                bachelor’s in Computer Applications at REVA University,
                Bengaluru
              </strong>
              .
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              I specialize in modern web technologies like{" "}
              <strong>TypeScript, JavaScript, React, NodeJS, ExpressJS</strong>,
              and possess solid experience in database systems including{" "}
              <strong>SQL, MySQL, NoSQL, MongoDB</strong>. I build
              user-friendly, responsive apps with clean design and solid
              functionality— incorporating features such as login/signup
              systems, validation, authentication, and authorization.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              I'm experienced with backend APIs, RESTful services, and deploying
              applications via platforms like <strong>Render, Vercel</strong>{" "}
              and <strong>GitHub</strong>. From building simple applications to
              deploying complex, database-driven platforms — I thrive on
              crafting impactful solutions.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Outside tech, I’m an aviation enthusiast and a lifelong learner,
              always exploring new technologies and trends. I love collaborating
              with others to create innovative solutions.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Currently, I’m advancing my skills through{" "}
              <strong>Game Development </strong>
              and <strong>Mobile App Development</strong> (including Android and
              native mobile/tablet apps), eager to contribute to innovative
              teams and real-world projects.
            </p>
          </div>

          {/* Right: Image */}
          <div className="flex-1 flex flex-col items-center space-y-6">
            <div className="relative p-1 rounded-full bg-gradient-to-tr from-blue-500 via-purple-600 to-cyan-400 shadow-lg hover:shadow-blue-500/30 transition duration-500">
              <img
                src={profileImage}
                alt="Satinder Singh Sall"
                className="w-80 h-80 object-cover rounded-2xl shadow-xl border-4 border-black"
              />
            </div>

            <a
              href={resumePDF}
              download="Satinder_Resume.pdf"
              className="inline-block"
            >
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl shadow-md hover:from-blue-700 hover:to-blue-600 hover:shadow-lg transition-all duration-300 ease-in-out">
                <FaDownload className="text-lg" />
                Download My Resume
              </button>
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-12 flex space-x-6">
          {[
            {
              href: "https://www.linkedin.com/in/satinder-singh-sall-b62049204/",
              icon: <FaLinkedin />,
              label: "LinkedIn",
            },
            {
              href: "https://github.com/SatinderSinghSall",
              icon: <FaGithub />,
              label: "GitHub",
            },
            {
              href: "https://x.com/SallSatinder",
              icon: <FaTwitter />,
              label: "Twitter",
            },
            {
              href: "https://www.youtube.com/@satindersinghsall.3841/featured",
              icon: <FaYoutube />,
              label: "YouTube",
            },
          ].map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="group"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-blue-500 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:shadow-blue-500/40">
                <div className="text-blue-400 text-2xl group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
