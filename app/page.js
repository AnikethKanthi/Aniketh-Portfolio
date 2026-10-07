import Navigation from '@/components/shared/Navigation';
import Loader from '@/components/shared/Loader';
import ScrollProgress from '@/components/shared/ScrollProgress';
import CustomCursor from '@/components/shared/CustomCursor';
import Hero from '@/components/hero/Hero';
import SignatureTransition from '@/components/hero/SignatureTransition';
import ArchitectureSection from '@/components/architecture/ArchitectureSection';
import ProjectsSection from '@/components/projects/ProjectsSection';
import TechEcosystem from '@/components/skills/TechEcosystem';
import Timeline from '@/components/experience/Timeline';
import About from '@/components/about/About';
import ContactScene from '@/components/contact/ContactScene';

export default function HomePage() {
  return (
    <main id="top">
      <Loader />
      <ScrollProgress />
      <Navigation />
      <CustomCursor />
      <Hero />
      <SignatureTransition />
      <ArchitectureSection />
      <ProjectsSection />
      <section id="skills" className="skills-section" aria-labelledby="skills-title">
        <div className="skills-section__intro">
          <p className="eyebrow">05 / SKILLS</p>
          <h2 id="skills-title">An ecosystem, not a badge cloud.</h2>
          <p>Select a system layer to see the technologies and selected work it touches.</p>
        </div>
        <TechEcosystem />
      </section>
      <Timeline />
      <About />
      <ContactScene />
    </main>
  );
}
