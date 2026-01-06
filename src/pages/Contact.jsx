import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL || "/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(false);
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email address";
    if (!form.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message sent");
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setErrors({ general: "Unable to send message. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="
        min-h-screen
        bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617]
        px-4 sm:px-6 lg:px-10
        py-16 sm:py-20 lg:py-24
        flex items-center justify-center
      "
    >
      <div
        className="
          w-full max-w-6xl
          grid grid-cols-1 lg:grid-cols-2
          gap-6 sm:gap-8 lg:gap-10
        "
      >
        {/* LEFT PANEL */}
        <div
          className="
            rounded-3xl border border-white/10 bg-white/5
            p-6 sm:p-8 lg:p-10
            text-white
          "
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
            Let’s build something together
          </h1>

          <p className="mt-4 text-gray-400 leading-relaxed">
            Reach out to discuss product ideas, collaborations, or development
            opportunities. I typically respond within 24 hours.
          </p>

          <div className="mt-8 sm:mt-10 space-y-3 sm:space-y-4 text-sm text-gray-300">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Fast response & clear communication.
            </div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              Scalable, production-ready solutions.
            </div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-purple-400" />
              Long-term collaboration mindset.
            </div>
          </div>

          <div className="mt-10 sm:mt-12 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-xs text-gray-400">
            No spam. No sales pitch. Just meaningful conversations.
          </div>
        </div>

        {/* RIGHT PANEL – FORM */}
        <div
          className="
            rounded-3xl border border-white/10 bg-[#020617]/80 backdrop-blur-xl
            p-6 sm:p-8 lg:p-10
          "
        >
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">
            Contact Form
          </h2>

          {sent && (
            <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-400 text-sm">
              Thanks for reaching out. I’ll be in touch shortly.
            </div>
          )}

          {errors.general && (
            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400 text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="text-xs text-gray-400">Full name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
                placeholder="John Doe"
                className="
                  mt-2 w-full rounded-xl
                  bg-white/5 border border-white/10
                  px-4 py-3 text-white placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-xs text-gray-400">Email address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                placeholder="you@company.com"
                className="
                  mt-2 w-full rounded-xl
                  bg-white/5 border border-white/10
                  px-4 py-3 text-white placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="text-xs text-gray-400">Message</label>
              <textarea
                rows="5"
                name="message"
                value={form.message}
                onChange={handleChange}
                aria-invalid={!!errors.message}
                placeholder="Briefly describe your idea or request..."
                className="
                  mt-2 w-full rounded-xl
                  bg-white/5 border border-white/10
                  px-4 py-3 text-white placeholder-gray-500
                  resize-none
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-400">{errors.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`
                h-[52px] w-full rounded-xl
                font-medium text-white
                transition-all flex items-center justify-center gap-3
                ${
                  loading
                    ? "bg-blue-500/50 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500"
                }
              `}
            >
              {loading && (
                <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
              )}
              {loading ? "Sending…" : "Submit request"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
