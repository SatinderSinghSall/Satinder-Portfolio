import { Link } from "react-router-dom";
import { ArrowLeft, Home, Sparkles, Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f8fafc] px-6 py-24">
      {/* Premium Gradient Blobs */}
      <div className="absolute top-[-120px] left-[-100px] w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-3xl" />

      <div className="absolute bottom-[-150px] right-[-120px] w-[500px] h-[500px] bg-cyan-100/50 rounded-full blur-3xl" />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#dbeafe22_1px,transparent_1px),linear-gradient(to_bottom,#dbeafe22_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Floating Glow Ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[700px] border border-blue-100 rounded-full opacity-40 animate-spin-slow" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ================= TOP MAIN HEADING ================= */}
        <div className="mb-24 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-slate-900">
            Page Not Found
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500 bg-clip-text text-transparent">
              {" "}
              - 404
            </span>
          </h1>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* LEFT CONTENT */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
              <Sparkles size={16} className="text-blue-600" />

              <span className="text-sm font-semibold text-slate-700">
                Oops! Wrong Route
              </span>
            </div>

            {/* Heading */}
            <h2 className="mt-8 text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-slate-900">
              This Page
              <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500 bg-clip-text text-transparent">
                Vanished.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-8 text-lg sm:text-xl leading-relaxed text-slate-600 max-w-2xl">
              Looks like the page you’re trying to visit has either been moved,
              deleted, or never existed in the first place.
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              {/* Primary */}
              <Link
                to="/"
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-slate-900 text-white font-semibold shadow-xl hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300"
              >
                <Home size={18} />
                Back to Homepage
              </Link>

              {/* Secondary */}
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold hover:border-blue-300 hover:text-blue-600 hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                <ArrowLeft size={18} />
                Go Back
              </button>
            </div>

            {/* Bottom Tags */}
            <div className="mt-12 flex flex-wrap gap-3">
              {[
                "Premium UI",
                "Modern Design",
                "Responsive Experience",
                "Full-Stack Portfolio",
              ].map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-600 shadow-sm hover:shadow-md hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative flex justify-center">
            {/* Main Glass Card */}
            <div className="relative w-full max-w-[500px] aspect-square rounded-[40px] bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_20px_80px_rgba(0,0,0,0.08)] overflow-hidden">
              {/* Floating Blur */}
              <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/50 rounded-full blur-3xl" />

              <div className="absolute bottom-10 right-10 w-32 h-32 bg-cyan-100/50 rounded-full blur-3xl" />

              {/* Floating 404 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="relative">
                  <h1 className="text-[140px] sm:text-[180px] font-black tracking-tight text-slate-900/10">
                    404
                  </h1>

                  {/* Floating Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-3xl bg-white border border-slate-200 shadow-2xl flex items-center justify-center animate-float">
                      <Ghost size={40} className="text-blue-600" />
                    </div>
                  </div>
                </div>

                {/* Small Text */}
                <div className="-mt-4 text-center">
                  <h3 className="text-3xl font-bold text-slate-900">
                    Lost in Space
                  </h3>

                  <p className="mt-3 text-slate-500 text-lg">
                    The route could not be found.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Small Cards */}
            <div className="hidden md:flex absolute -top-6 -left-8 px-5 py-3 rounded-2xl bg-white border border-slate-200 shadow-xl backdrop-blur-xl animate-floatSlow">
              <span className="text-sm font-semibold text-slate-700">
                /unknown-route
              </span>
            </div>

            <div className="hidden md:flex absolute -bottom-6 right-0 px-5 py-3 rounded-2xl bg-slate-900 text-white shadow-2xl animate-float">
              <span className="text-sm font-medium">Error • 404</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
