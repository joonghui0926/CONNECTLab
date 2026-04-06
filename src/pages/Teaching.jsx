import { useData } from '../contexts/DataContext';

export default function Teaching() {
  const { data: { TEACHING_DATA } } = useData();

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-32">
      <div className="border-b border-fg/20 pb-8 mb-12 md:mb-20">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary">Teaching</h1>
      </div>

      <div className="space-y-16 md:space-y-24">
        {TEACHING_DATA.map((school, index) => (
          <section key={index}>
            <div className="mb-8 border-l-2 border-accent pl-5">
              <h2 className="font-serif text-3xl font-bold text-primary leading-tight">
                {school.university}
              </h2>
              {school.period && (
                <p className="text-secondary font-mono text-sm mt-2 tracking-wide">{school.period}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
              {school.courses.map((course, idx) => (
                <article key={idx} className="flex flex-col group py-3 border-b border-fg/5 hover:border-fg/20 transition-colors">
                  <h3 className="text-lg text-primary font-medium group-hover:text-accent transition-colors">
                    {course.name}
                  </h3>
                  <div className="flex gap-3 mt-1 text-sm text-secondary font-light">
                    {course.term && <span>{course.term}</span>}
                    {course.term && course.level && <span className="text-fg/20">|</span>}
                    {course.level && <span className="italic">{course.level}</span>}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
