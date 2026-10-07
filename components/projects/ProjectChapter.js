import ProjectDemo from '@/components/projects/ProjectDemo';

export default function ProjectChapter({ project, index }) {
  return (
    <article className={`project-chapter project-chapter--${index % 2 ? 'reverse' : 'forward'}`}>
      <div className="project-chapter__copy">
        <p className="eyebrow">{project.label}</p>
        <h3>{project.title}</h3>
        <p className="project-chapter__summary">{project.summary}</p>
        <dl className="project-facts">
          <div><dt>PROBLEM</dt><dd>{project.problem}</dd></div>
          <div><dt>SOLUTION</dt><dd>{project.solution}</dd></div>
          <div><dt>ROLE</dt><dd>{project.role}</dd></div>
          <div><dt>RESULT</dt><dd>{project.result}</dd></div>
        </dl>
        <p className="project-tech">{project.technologies.join(' · ')}</p>
      </div>
      <ProjectDemo slug={project.slug} />
    </article>
  );
}
