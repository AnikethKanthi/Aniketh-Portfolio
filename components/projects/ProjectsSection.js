import ProjectChapter from '@/components/projects/ProjectChapter';
import { projects } from '@/data/projects';

export default function ProjectsSection() {
  return (
    <section id="work" className="projects-section" aria-labelledby="projects-title">
      <div className="projects-section__intro">
        <p className="eyebrow">04 / SELECTED WORK</p>
        <h2 id="projects-title">Three systems. Three different pressures.</h2>
        <p>From redirect volume to collaborative state to natural-language analytics, the work stays close to the system boundary.</p>
      </div>
      <div className="projects-section__chapters">
        {projects.map((project, index) => <ProjectChapter project={project} index={index} key={project.slug} />)}
      </div>
    </section>
  );
}
