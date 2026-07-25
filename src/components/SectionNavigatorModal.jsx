import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  X,
  Compass,
  Home,
  User,
  Smartphone,
  Briefcase,
  Award,
  Code2,
  Mail,
  Layers,
  FolderGit2,
  Cpu,
  BookOpen,
  Youtube,
  Lock,
  ArrowUpRight,
  Command,
  Sparkles,
} from "lucide-react";

export default function SectionNavigatorModal({ isOpen, onClose, onOpen }) {
  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Global Keyboard Listener: 'Ctrl + K' / 'Cmd + K' to toggle, 'ESC' to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else if (onOpen) {
          onOpen();
        }
      }

      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-5 md:p-8 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      {/* Backdrop (Click disabled intentionally) */}
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity duration-300" />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[92vh] sm:max-h-[88vh] flex flex-col bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] backdrop-blur-2xl overflow-hidden z-10 transition-all duration-300">
        {/* Subtle Gradient Glow Behind Header */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-2xl pointer-events-none" />

        {/* Header (Pinned) */}
        <div className="flex-none flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 border-b border-slate-200/60 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md relative z-10">
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div className="p-2 sm:p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shadow-sm shrink-0">
              <Compass className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
            </div>
            <div>
              <h2
                id="modal-headline"
                className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5 sm:gap-2"
              >
                Portfolio Navigator
                <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
                  Quick Access
                </span>
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 line-clamp-1 sm:line-clamp-none">
                Explore all pages, engineering projects, and media showcases
              </p>
            </div>
          </div>

          {/* Redish Styled Close Button */}
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2.5 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 bg-slate-100/60 dark:bg-slate-800/60 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-transparent hover:border-rose-200 dark:hover:border-rose-800/50 transition-all duration-200 cursor-pointer shadow-sm group shrink-0 ml-2"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:rotate-90" />
          </button>
        </div>

        {/* Scrollable Navigation Grid */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 md:p-8 space-y-5 sm:space-y-7 scroll-smooth scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {/* Section 1: Core Pages */}
          <div>
            <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2.5 sm:mb-3.5 px-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Core
              Overview
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
              {/* Home */}
              <Link
                to="/"
                onClick={onClose}
                className="group p-3.5 sm:p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 hover:border-indigo-500/40 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                    <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                      <Home className="w-4 h-4" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    Home Page
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-1 leading-relaxed line-clamp-2">
                    Brief intro, designation, full-stack stack overview.
                  </p>
                </div>
              </Link>

              {/* About Me */}
              <Link
                to="/about"
                onClick={onClose}
                className="group p-3.5 sm:p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 hover:border-indigo-500/40 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                    <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                      <User className="w-4 h-4" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    About Me
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-1 leading-relaxed line-clamp-2">
                    Detailed background, philosophy & engineering journey.
                  </p>
                </div>
              </Link>

              {/* Services */}
              <Link
                to="/services"
                onClick={onClose}
                className="group p-3.5 sm:p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 hover:border-indigo-500/40 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                    <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    My Services
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-1 leading-relaxed line-clamp-2">
                    Scalability, performance, UI/UX & full-stack quality.
                  </p>
                </div>
              </Link>

              {/* Contact */}
              <Link
                to="/contact"
                onClick={onClose}
                className="group p-3.5 sm:p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 hover:border-indigo-500/40 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                    <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    Contact Me
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-1 leading-relaxed line-clamp-2">
                    Product discussions, freelancing, or tech chats.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Section 2: Portfolio & Engineering Showcases */}
          <div>
            <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2.5 sm:mb-3.5 px-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Work &
              Applications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5">
              {/* Mobile Apps */}
              <Link
                to="/mobile-apps"
                onClick={onClose}
                className="group p-3.5 sm:p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 hover:border-blue-500/40 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                    <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Mobile Applications
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-1 leading-relaxed line-clamp-2">
                    Production-grade apps with scalable mobile architecture.
                  </p>
                </div>
              </Link>

              {/* Creative Projects */}
              <Link
                to="/projects"
                onClick={onClose}
                className="group p-3.5 sm:p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 hover:border-indigo-500/40 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                    <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                      <FolderGit2 className="w-4 h-4" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    Project Showcase
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-1 leading-relaxed line-clamp-2">
                    Finest portfolio collection blending design with
                    functionality.
                  </p>
                </div>
              </Link>

              {/* Freelance Work */}
              <Link
                to="/freelance-projects"
                onClick={onClose}
                className="group p-3.5 sm:p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 hover:border-emerald-500/40 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                    <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                      <Layers className="w-4 h-4" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Freelance Portfolio
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-1 leading-relaxed line-clamp-2">
                    Client deliverables & production systems for startups.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Section 3: Engineering & Tech Insights */}
          <div>
            <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2.5 sm:mb-3.5 px-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />{" "}
              Engineering Toolkit & Content
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
              {/* Experience */}
              <Link
                to="/experience"
                onClick={onClose}
                className="group p-3.5 sm:p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 hover:border-amber-500/40 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                    <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
                      <Award className="w-4 h-4" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Work Experience
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-1 leading-relaxed line-clamp-2">
                    Building production systems, APIs, cloud deployments.
                  </p>
                </div>
              </Link>

              {/* Skills */}
              <Link
                to="/skills"
                onClick={onClose}
                className="group p-3.5 sm:p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 hover:border-violet-500/40 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                    <div className="p-1.5 rounded-lg bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    Skills & Tech
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-1 leading-relaxed line-clamp-2">
                    Refined engineering toolkit & real-world capabilities.
                  </p>
                </div>
              </Link>

              {/* AI / ML Section */}
              <Link
                to="/ai-ml"
                onClick={onClose}
                className="group p-3.5 sm:p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 hover:border-cyan-500/40 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                    <div className="p-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    AI & ML Hub
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-1 leading-relaxed line-clamp-2">
                    Deep learning, NLP, computer vision intelligent systems.
                  </p>
                </div>
              </Link>

              {/* Blog */}
              <Link
                to="/blog"
                onClick={onClose}
                className="group p-3.5 sm:p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 hover:border-rose-500/40 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:shadow-rose-500/5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                    <div className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 dark:group-hover:text-rose-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    Articles & Insights
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-1 leading-relaxed line-clamp-2">
                    Insights on engineering, architecture & development.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Section 4: Media & Administration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 pt-1 sm:pt-2">
            {/* YouTube */}
            <Link
              to="/youtube"
              onClick={onClose}
              className="p-3.5 sm:p-4 rounded-xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 hover:bg-white dark:hover:bg-slate-800 hover:border-rose-400/80 transition-all duration-200 group flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-3 sm:gap-3.5">
                <div className="p-2 sm:p-2.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 shrink-0">
                  <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    YouTube Video Library
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 sm:line-clamp-none">
                    Tutorials, web dev, DSA & tech insights.
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 dark:group-hover:text-rose-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" />
            </Link>

            {/* Admin Access */}
            <Link
              to="/login"
              onClick={onClose}
              className="p-3.5 sm:p-4 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 group flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-3 sm:gap-3.5">
                <div className="p-2 sm:p-2.5 rounded-xl bg-slate-200/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 shrink-0">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    Administrator Access
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 sm:line-clamp-none">
                    Restricted environment for authorized personnel.
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" />
            </Link>
          </div>
        </div>

        {/* Footer (Pinned) */}
        <div className="flex-none px-4 sm:px-8 py-3 sm:py-3.5 border-t border-slate-200/60 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <p className="text-[10px] sm:text-xs text-center sm:text-left">
            Satinder Portfolio • Full-Stack Systems & Product Architecture
          </p>
          <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono text-slate-400 dark:text-slate-500">
            <div className="flex items-center gap-1.5">
              <span>Press</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-0.5 font-sans font-medium">
                <Command className="w-2.5 h-2.5 inline" /> Ctrl + K
              </kbd>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700 shadow-sm font-sans font-medium">
                ESC
              </kbd>
              <span>to close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
