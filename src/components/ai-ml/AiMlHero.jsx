import { Button } from "@/components/ui/button";

export default function AiHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-950 to-purple-950 text-white">
      {/* Glow Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.2),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.15),transparent_60%)]" />

      <div className="relative z-10 max-w-5xl text-center px-6">
        {/* Tag */}
        <p className="text-purple-400 text-sm tracking-widest uppercase mb-4">
          AI / ML Engineer
        </p>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Building Intelligent Systems with{" "}
          <span className="text-purple-400">AI & Machine Learning</span>
        </h1>

        {/* Description */}
        <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
          I design and develop AI-powered applications using deep learning,
          computer vision, and NLP to solve real-world problems.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-4 text-lg rounded-xl shadow-lg shadow-purple-500/30">
            View AI Projects
          </Button>

          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 px-6 py-4 text-lg rounded-xl"
          >
            Contact Me
          </Button>
        </div>
      </div>
    </section>
  );
}
