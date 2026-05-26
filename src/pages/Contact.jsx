import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Clock3,
  CheckCircle2,
  X,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL || "/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  const showSuccessToast = () => {
    toast.custom(
      (t) => (
        <div
          className={`
            ${
              t.visible
                ? "translate-y-0 opacity-100"
                : "translate-y-2 opacity-0"
            }
            pointer-events-auto
            w-[calc(100vw-32px)]
            sm:w-[420px]
            rounded-3xl
            border
            border-white/10
            bg-[#0B1120]/95
            p-5
            shadow-[0_10px_80px_rgba(59,130,246,0.25)]
            backdrop-blur-2xl
            transition-all
            duration-500
          `}
        >
          <div className="flex items-start gap-4">
            {/* ICON */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10">
              <CheckCircle2 size={24} className="text-emerald-400" />
            </div>

            {/* CONTENT */}
            <div className="flex-1">
              <h3 className="text-base font-semibold text-white">
                Message Sent Successfully
              </h3>

              <p className="mt-1 text-sm leading-relaxed text-white/55">
                Thanks for reaching out. I’ll get back to you within 24 hours.
              </p>

              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="
                    rounded-xl
                    bg-blue-600
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-white
                    transition-all
                    duration-300
                    hover:bg-blue-500
                    hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]
                  "
                >
                  Awesome
                </button>

                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    px-4
                    py-2
                    text-sm
                    text-white/70
                    transition-all
                    duration-300
                    hover:bg-white/[0.06]
                  "
                >
                  Close
                </button>
              </div>
            </div>

            {/* CLOSE */}
            <button
              onClick={() => toast.dismiss(t.id)}
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                text-white/40
                transition-all
                duration-300
                hover:bg-white/5
                hover:text-white
              "
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ),
      {
        duration: 10000,
        position: "top-right",
      },
    );
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

      showSuccessToast();

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch {
      toast.error("Unable to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* PREMIUM TOASTER */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "transparent",
            boxShadow: "none",
          },
        }}
      />

      <section className="relative min-h-screen overflow-hidden bg-[#030712] text-white">
        {/* BACKGROUND */}
        <div className="absolute inset-0 overflow-hidden">
          {/* GLOW ORBS */}
          <div className="absolute left-[10%] top-[10%] h-[420px] w-[420px] rounded-full bg-blue-500/20 blur-[120px]" />

          <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-violet-500/20 blur-[120px]" />

          <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[100px]" />

          {/* GRID */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:70px_70px]" />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* HERO TOP CENTER */}
        <div
          className="
          relative
          mx-auto
          mb-20
          mt-20
          max-w-7xl
          text-center
          lg:mb-28
          lg:mt-28
        "
        >
          {/* MASSIVE BACKGROUND GLOW */}
          <div
            className="
            absolute
            left-1/2
            top-1/2
            h-[420px]
            w-[900px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-cyan-500/12
            blur-[140px]
          "
          />

          {/* SECONDARY GLOW */}
          <div
            className="
            absolute
            left-1/2
            top-[30%]
            h-[250px]
            w-[600px]
            -translate-x-1/2
            rounded-full
            bg-violet-500/10
            blur-[120px]
          "
          />

          {/* TOP LABEL */}
          <div className="relative mb-8 flex items-center justify-center gap-5">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400/50 sm:w-28" />

            <span
              className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.55em]
              text-cyan-400
              sm:text-xs
            "
            >
              CONTACT EXPERIENCE
            </span>

            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400/50 sm:w-28" />
          </div>

          {/* MAIN HEADING */}
          <h1
            className="
            relative
            mx-auto
            max-w-6xl
            text-6xl
            font-black
            leading-[0.82]
            tracking-[-0.08em]
            text-white
            sm:text-7xl
            md:text-8xl
            lg:text-[120px]
            xl:text-[140px]
          "
          >
            Contact
            <span
              className="
              bg-gradient-to-r
              from-cyan-400
              via-blue-500
              to-violet-500
              bg-clip-text
              text-transparent
            "
            >
              {" "}
              Me.
            </span>
          </h1>

          {/* SUBTEXT */}
          <p
            className="
            relative
            mx-auto
            mt-10
            max-w-4xl
            px-4
            text-base
            leading-[1.9]
            text-white/55
            sm:text-lg
            md:text-xl
          "
          >
            Reach out to discuss product ideas, collaborations, development
            opportunities — or even just to have a conversation. Whether it’s
            tech, business, creativity, life, or random ideas, I’m always open
            to meaningful connections and interesting discussions.
          </p>

          {/* PREMIUM TAGS */}
          <div
            className="
            relative
            mt-10
            flex
            flex-wrap
            items-center
            justify-center
            gap-4
          "
          >
            {[
              "Tech & Startups",
              "Freelancing",
              "Collaborations",
              "Just Talk :)",
            ].map((item) => (
              <div
                key={item}
                className="
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-5
                  py-2.5
                  text-xs
                  font-medium
                  text-white/60
                  backdrop-blur-2xl
                  transition-all
                  duration-300
                  hover:border-cyan-400/20
                  hover:bg-white/[0.05]
                  hover:text-white
                "
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* CONTAINER */}
        <div
          className="
            relative
            mx-auto
            flex
            min-h-screen
            max-w-7xl
            items-center
            px-4
            py-16
            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              grid
              w-full
              grid-cols-1
              gap-12
              lg:grid-cols-2
              lg:gap-20
            "
          >
            {/* LEFT SIDE */}
            <div className="flex flex-col justify-center">
              {/* BADGE */}
              <div
                className="
                  mb-6
                  inline-flex
                  w-fit
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-4
                  py-2
                  backdrop-blur-xl
                "
              >
                <Sparkles size={16} className="text-blue-400" />

                <span className="text-sm text-white/70">
                  Premium Development Experience
                </span>
              </div>

              {/* TITLE */}
              <h1
                className="
                  max-w-xl
                  text-4xl
                  font-semibold
                  leading-[0.95]
                  tracking-[-0.05em]
                  text-white
                  sm:text-5xl
                  md:text-6xl
                  lg:text-7xl
                "
              >
                Let’s build
                <span className="block text-white/45">something iconic.</span>
              </h1>

              {/* DESCRIPTION */}
              <p
                className="
                  mt-6
                  max-w-xl
                  text-base
                  leading-relaxed
                  text-white/60
                  sm:text-lg
                "
              >
                Premium digital experiences engineered with performance,
                scalability, and world-class design.
              </p>

              {/* FEATURES */}
              <div className="mt-10 space-y-4">
                <div
                  className="
                    group
                    flex
                    items-start
                    gap-4
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-5
                    backdrop-blur-xl
                    transition-all
                    duration-500
                    hover:-translate-y-1
                    hover:border-white/20
                    hover:bg-white/[0.05]
                  "
                >
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      bg-blue-500/10
                    "
                  >
                    <Clock3 size={20} className="text-blue-400" />
                  </div>

                  <div>
                    <h3 className="font-medium text-white">
                      Fast Communication
                    </h3>

                    <p className="mt-1 text-sm text-white/50">
                      Quick replies, smooth workflow, zero confusion.
                    </p>
                  </div>
                </div>

                <div
                  className="
                    group
                    flex
                    items-start
                    gap-4
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-5
                    backdrop-blur-xl
                    transition-all
                    duration-500
                    hover:-translate-y-1
                    hover:border-white/20
                    hover:bg-white/[0.05]
                  "
                >
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      bg-violet-500/10
                    "
                  >
                    <ShieldCheck size={20} className="text-violet-400" />
                  </div>

                  <div>
                    <h3 className="font-medium text-white">Production Ready</h3>

                    <p className="mt-1 text-sm text-white/50">
                      Clean architecture with scalability and premium UX.
                    </p>
                  </div>
                </div>
              </div>

              {/* STATS */}
              <div className="mt-10 flex flex-wrap gap-8">
                <div>
                  <div className="text-3xl font-semibold text-white">24h</div>

                  <div className="mt-1 text-sm text-white/40">Avg response</div>
                </div>

                <div>
                  <div className="text-3xl font-semibold text-white">100%</div>

                  <div className="mt-1 text-sm text-white/40">
                    Client focused
                  </div>
                </div>

                <div>
                  <div className="text-3xl font-semibold text-white">
                    Premium
                  </div>

                  <div className="mt-1 text-sm text-white/40">UI standards</div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="relative flex items-center">
              {/* GLOW */}
              <div className="absolute -inset-[1px] rounded-[36px] bg-gradient-to-b from-white/20 via-white/5 to-transparent opacity-50 blur-xl" />

              {/* CARD */}
              <div
                className="
                  relative
                  w-full
                  rounded-[32px]
                  border
                  border-white/10
                  bg-white/[0.04]
                  p-5
                  shadow-[0_0_100px_rgba(255,255,255,0.05)]
                  backdrop-blur-2xl
                  sm:p-8
                  lg:p-10
                "
              >
                {/* TOP */}
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/40">
                      Start a conversation
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold text-white">
                      Contact Form
                    </h2>
                  </div>

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.04]
                    "
                  >
                    <ArrowUpRight size={20} className="text-white/70" />
                  </div>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* NAME */}
                  <div>
                    <label className="mb-2 block text-sm text-white/50">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="
                        h-14
                        w-full
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        px-5
                        text-white
                        placeholder:text-white/25
                        outline-none
                        transition-all
                        duration-300
                        focus:border-blue-400/40
                        focus:bg-white/[0.05]
                        focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]
                      "
                    />

                    {errors.name && (
                      <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                    )}
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="mb-2 block text-sm text-white/50">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@main.com"
                      className="
                        h-14
                        w-full
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        px-5
                        text-white
                        placeholder:text-white/25
                        outline-none
                        transition-all
                        duration-300
                        focus:border-blue-400/40
                        focus:bg-white/[0.05]
                        focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]
                      "
                    />

                    {errors.email && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* MESSAGE */}
                  <div>
                    <label className="mb-2 block text-sm text-white/50">
                      Message
                    </label>

                    <textarea
                      rows="6"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Write your message..."
                      className="
                        w-full
                        resize-none
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        px-5
                        py-4
                        text-white
                        placeholder:text-white/25
                        outline-none
                        transition-all
                        duration-300
                        focus:border-blue-400/40
                        focus:bg-white/[0.05]
                        focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]
                      "
                    />

                    {errors.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* BUTTON */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`
                      group
                      relative
                      flex
                      h-14
                      w-full
                      items-center
                      justify-center
                      gap-3
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/10
                      font-medium
                      text-white
                      transition-all
                      duration-500
                      ${
                        loading
                          ? "cursor-not-allowed bg-blue-500/40"
                          : `
                            bg-gradient-to-r
                            from-blue-600
                            via-blue-500
                            to-violet-500
                            hover:scale-[1.01]
                            hover:shadow-[0_0_60px_rgba(59,130,246,0.45)]
                          `
                      }
                    `}
                  >
                    {/* SHINE */}
                    {!loading && (
                      <div
                        className="
                          absolute
                          inset-0
                          -translate-x-full
                          bg-gradient-to-r
                          from-transparent
                          via-white/20
                          to-transparent
                          transition-transform
                          duration-1000
                          group-hover:translate-x-full
                        "
                      />
                    )}

                    {loading && (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    )}

                    <span className="relative z-10">
                      {loading ? "Sending..." : "Submit Request"}
                    </span>
                  </button>
                </form>

                {/* FOOTER */}
                <p className="mt-6 text-center text-xs text-white/35">
                  No spam. No unnecessary meetings. Just meaningful work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
