import { ArrowLeft, Rocket, Mail, User, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function AiProjects() {
  return (
    <section className="relative min-h-screen bg-[#020617] text-white overflow-hidden flex items-center justify-center">
      {/* 🌈 TOP LIGHT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_60%)]" />

      {/* 🌊 BOTTOM CURVE */}
      <div
        className="absolute bottom-0 left-0 w-full h-[40%] 
        bg-gradient-to-r from-purple-600/40 via-blue-500/30 to-pink-500/40 
        rounded-t-[100%] blur-2xl opacity-70"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        {/* 🔥 TOP SECTION */}
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-3 sm:mb-4">
            AI / ML Projects
          </h1>

          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base md:text-lg">
            I’m currently working on some exciting AI-powered products. Stay
            tuned — something amazing is coming soon.
          </p>
        </div>

        {/* 🔥 MAIN PANEL */}
        <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-2xl p-5 sm:p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
          {/* 🔹 LEFT SIDE */}
          <div className="flex flex-col gap-5 text-center md:text-left">
            {/* ICON + LOGO INLINE */}
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="p-3 sm:p-4 rounded-full bg-purple-500/10 border border-purple-500/20">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide">
                AI <span className="text-purple-400">LABS</span>
              </h1>
            </div>

            {/* BIG TITLE */}
            <h2
              className="
                font-bold leading-tight
                text-2xl sm:text-3xl md:text-4xl lg:text-5xl
              "
            >
              Coming{" "}
              <span className="text-blue-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                Soon
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                text-gray-400
                text-sm sm:text-base md:text-lg
                max-w-md mx-auto md:mx-0
                leading-relaxed
              "
            >
              I'm building real-world AI applications using deep learning, NLP,
              and computer vision. These will be available very soon.
            </p>

            {/* CTA */}
            <Link to="/contact">
              <button
                className="
                  mt-2 inline-flex items-center gap-2
                  bg-gradient-to-r from-purple-600 to-blue-600
                  px-5 py-2.5 sm:px-6 sm:py-3
                  text-sm sm:text-base
                  rounded-xl font-medium
                  hover:scale-105 transition-all duration-300
                  shadow-lg shadow-purple-500/20
                "
              >
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
                Get in Touch
              </button>
            </Link>
          </div>

          {/* 🔹 RIGHT SIDE (FORM) */}
          <div className="bg-white/[0.04] border border-white/10 backdrop-blur-xl rounded-xl p-5 sm:p-6">
            <h3 className="text-base sm:text-lg font-medium mb-5 sm:mb-6 text-center md:text-left">
              Notify Me
            </h3>

            <div className="space-y-4">
              {/* NAME */}
              <div className="flex items-center gap-3 border-b border-white/10 pb-2">
                <User className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Your Name"
                  className="bg-transparent outline-none w-full text-sm sm:text-base placeholder:text-gray-500"
                />
              </div>

              {/* EMAIL */}
              <div className="flex items-center gap-3 border-b border-white/10 pb-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-transparent outline-none w-full text-sm sm:text-base placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* BUTTON */}
            <button
              className="
                mt-6 w-full
                bg-blue-600 hover:bg-blue-500
                py-2.5 sm:py-3
                rounded-xl text-sm sm:text-base font-medium
                transition-all
              "
            >
              Notify Me
            </button>

            {/* BACK */}
            <Link
              to="/"
              className="mt-4 flex items-center justify-center md:justify-start gap-2 text-gray-400 hover:text-white text-xs sm:text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
