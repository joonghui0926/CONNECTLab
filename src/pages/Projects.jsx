import { PROJECTS_DATA } from '../constants/data';

const ProjectList = ({ title, projects, isHighlight = false }) => (
  <section className="mb-24">
    <h2 className={`font-serif text-3xl font-bold mb-10 pb-4 border-b ${isHighlight ? 'text-accent border-accent/30' : 'text-primary border-fg/20'}`}>
      {title}
    </h2>
    <div className="flex flex-col space-y-8">
      {projects.map((project, idx) => (
        <article key={idx} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8 group">
          <div className="text-fg/40 font-mono text-sm shrink-0 md:w-40 pt-1 group-hover:text-accent transition-colors">
            {project.period}
          </div>
          <div className="flex-grow">
            <h3 className="text-lg text-primary font-medium leading-relaxed group-hover:text-primary transition-colors mb-1">
              {project.title}
            </h3>
            {project.role && (
              <p className="text-sm text-secondary font-light tracking-wide uppercase">
                {project.role}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default function Projects() {
  const { current, past } = PROJECTS_DATA;

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-32">
      <div className="border-b border-fg/20 pb-8 mb-12 md:mb-20">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary">Research Projects</h1>
      </div>

      <ProjectList title="Current Projects" projects={current} isHighlight={true} />
      <ProjectList title="Past Projects" projects={past} />
    </div>
  );
}