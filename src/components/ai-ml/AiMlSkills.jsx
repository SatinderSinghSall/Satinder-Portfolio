export default function AiSkills() {
  const skills = [
    "Python",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "OpenCV",
    "NLP",
    "Deep Learning",
    "Computer Vision",
  ];

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold mb-10">AI / ML Skills</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div
              key={skill}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-xl py-4 px-6 hover:border-purple-500 hover:scale-105 transition-all"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
