import { Card, CardContent } from "@/components/ui/card";

export default function AiProjects() {
  const projects = [
    {
      title: "AI Chatbot",
      desc: "Conversational AI using NLP & transformers.",
    },
    {
      title: "Image Classifier",
      desc: "CNN-based deep learning model for image recognition.",
    },
  ];

  return (
    <section className="py-20 bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold mb-10">AI / ML Projects</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <Card
              key={i}
              className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-all"
            >
              <CardContent className="p-6 text-left">
                <h3 className="text-xl font-semibold text-purple-400 mb-2">
                  {p.title}
                </h3>
                <p className="text-gray-400">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
