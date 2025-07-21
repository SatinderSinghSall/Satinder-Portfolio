import { useNavigate } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";

export default function CallToAction() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-6 py-24 text-white">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl p-10 md:p-16 max-w-3xl w-full text-center transition-transform transform hover:scale-[1.02] duration-300">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent animate-pulse mb-6">
          Let’s Build Something Great Together
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-8">
          I’m always excited to collaborate, innovate, and solve real-world
          problems. Whether you have a project, idea, or just want to say hello
          — let's connect!
        </p>
        <button
          onClick={() => navigate("/contact")}
          className="inline-flex items-center gap-3 px-8 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-lg hover:shadow-blue-700/50"
        >
          <FaPaperPlane className="text-white" />
          Contact Me
        </button>
      </div>
    </div>
  );
}
