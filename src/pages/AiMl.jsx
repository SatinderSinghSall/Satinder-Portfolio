import { Helmet } from "react-helmet-async";
import AiHero from "../components/ai-ml/AiMlHero";
import AiProjects from "../components/ai-ml/AiMlProjects";
import AiSkills from "../components/ai-ml/AiMlSkills";

export default function AiMl() {
  /* Structured Data (JSON-LD) for Search Engines */
  const aiMlSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "AI & Machine Learning Engineering Portfolio",
    description:
      "Artificial Intelligence and Machine Learning portfolio featuring Deep Learning, Computer Vision, Natural Language Processing (NLP), and Predictive Modeling projects.",
    mainEntity: {
      "@type": "Person",
      name: "AI/ML Engineer",
      jobTitle: "Artificial Intelligence & Machine Learning Specialist",
      knowsAbout: [
        "Artificial Intelligence",
        "Machine Learning",
        "Deep Learning",
        "Neural Networks",
        "Natural Language Processing",
        "Computer Vision",
        "Python",
        "PyTorch",
        "TensorFlow",
      ],
    },
  };

  return (
    <>
      {/* SEO META HEAD TAGS */}
      <Helmet>
        {/* Core Metadata */}
        <title>AI & Machine Learning Engineer | Projects & Skills | By - Satinder Singh Sall</title>
        <meta
          name="description"
          content="Explore my Artificial Intelligence and Machine Learning portfolio. Featuring expertise in Deep Learning, NLP, Computer Vision, MLOps, PyTorch, and TensorFlow."
        />
        <meta
          name="keywords"
          content="AI Engineer, Machine Learning Specialist, Deep Learning, NLP, Computer Vision, PyTorch, TensorFlow, MLOps, Data Science Portfolio, Artificial Intelligence Projects"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourwebsite.com/ai-ml" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="AI & Machine Learning Engineer | Portfolio & Solutions"
        />
        <meta
          property="og:description"
          content="Discover cutting-edge Artificial Intelligence models, Machine Learning applications, and intelligent systems engineered for performance and scalability."
        />
        <meta property="og:url" content="https://yourwebsite.com/ai-ml" />
        <meta
          property="og:image"
          content="https://yourwebsite.com/og-ai-ml.jpg"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="AI & Machine Learning Engineer | Portfolio & Solutions"
        />
        <meta
          name="twitter:description"
          content="Discover cutting-edge Artificial Intelligence models, Machine Learning applications, and intelligent systems engineered for performance and scalability."
        />
        <meta
          name="twitter:image"
          content="https://yourwebsite.com/og-ai-ml.jpg"
        />

        {/* Structured Data / JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(aiMlSchema)}</script>
      </Helmet>

      {/* PAGE COMPONENTS */}
      <AiHero />
      <AiSkills />
      <AiProjects />
    </>
  );
}
