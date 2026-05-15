import About from "../components/About";
import Skills from "../components/Skills";
import ContactCTA_Button from "../components/ContactCTA_Button";
import Experience from "../components/Experience";
import Services from "./Services";

import FeaturedProjects from "@/components/FeaturedProjects";
import FeatureYouTube from "@/components/FeatureYouTube";
import AppsShowcase from "@/components/AppsShowcase";
import Hero from "@/components/Hero";

import SectionNavigator from "@/components/SectionNavigator";

export default function Home() {
  return (
    <>
      {/* Floating Navigator */}
      <SectionNavigator />

      {/* Added mobile bottom padding */}
      <main className="pb-28 xl:pb-0">
        <section id="hero">
          <Hero />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="projects">
          <FeaturedProjects />
        </section>

        <section id="apps">
          <AppsShowcase />
        </section>

        <section id="youtube">
          <FeatureYouTube />
        </section>

        <section id="services">
          <Services />
        </section>

        <section id="experience">
          <Experience />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="contact">
          <ContactCTA_Button />
        </section>
      </main>
    </>
  );
}
