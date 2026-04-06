import { useData } from '../contexts/DataContext';

export default function Professor() {
  const { data: { PROFESSOR_DATA } } = useData();
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-32">
      <div className="border-b border-fg/20 pb-8 mb-16">
        <h1 className="font-serif text-5xl font-bold text-primary">Professor</h1>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 md:gap-16">
        {/* Left Column: Image & Basic Info */}
        <div className="lg:col-span-4 space-y-8">
          <div className="aspect-[3/4] w-full max-w-xs mx-auto lg:max-w-none bg-fg/5 overflow-hidden rounded-sm relative">
            <img 
              src={PROFESSOR_DATA.image} 
              alt={PROFESSOR_DATA.name}
              className="w-full h-full object-cover transition-all duration-700"
              onError={(e) => {
                // 이미지가 렌더링되지 않을 경우의 Fallback
                e.target.style.display = 'none';
                e.target.parentElement.classList.add('flex', 'items-center', 'justify-center', 'border', 'border-fg/10');
                e.target.parentElement.innerHTML = '<span class="text-white/20 font-serif">Image not available</span>';
              }}
            />
          </div>
          <div>
            <h2 className="font-serif text-3xl font-bold text-primary mb-2">
              {PROFESSOR_DATA.name} <span className="text-lg text-secondary font-sans font-light">({PROFESSOR_DATA.koreanName})</span>
            </h2>
            <p className="text-accent font-medium tracking-wide">Assistant Professor, KAIST</p>
          </div>
        </div>

        {/* Right Column: Bio & Details */}
        <div className="lg:col-span-8 space-y-20">
          
          {/* Bio */}
          <section>
            <div className="space-y-6 text-secondary font-light leading-relaxed text-justify text-lg">
              {PROFESSOR_DATA.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Research Interests */}
          <section>
            <h3 className="font-serif text-2xl text-primary border-b border-fg/10 pb-4 mb-6">Research Interest</h3>
            <ul className="list-disc list-inside space-y-3 text-secondary font-light">
              {PROFESSOR_DATA.researchInterests.map((interest, idx) => (
                <li key={idx} className="leading-relaxed">{interest}</li>
              ))}
            </ul>
          </section>

          {/* Education & Experience Grid */}
          <div className="grid md:grid-cols-2 gap-16">
            <section>
              <h3 className="font-serif text-2xl text-primary border-b border-fg/10 pb-4 mb-6">Education</h3>
              <ul className="space-y-4">
                {PROFESSOR_DATA.education.map((edu, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <span className="text-accent font-mono text-sm w-12 pt-1">{edu.year}</span>
                    <div className="text-secondary font-light">
                      <span className="block text-primary font-medium mb-1">{edu.degree}</span>
                      <span className="block text-sm">{edu.major}</span>
                      <span className="block text-sm text-fg/50">{edu.institution}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="font-serif text-2xl text-primary border-b border-fg/10 pb-4 mb-6">Professional Experience</h3>
              <ul className="space-y-4">
                {PROFESSOR_DATA.experience.map((exp, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <span className="text-fg/40 font-mono text-sm w-20 shrink-0 pt-1">{exp.period}</span>
                    <div className="text-secondary font-light">
                      <span className="block text-primary font-medium mb-1">{exp.role}</span>
                      <span className="block text-sm">{exp.institution}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Selected Publications */}
          <section>
            <h3 className="font-serif text-2xl text-primary border-b border-fg/10 pb-4 mb-6">Selected Publications</h3>
            <ul className="space-y-5">
              {PROFESSOR_DATA.selectedPublications.map((pub, idx) => (
                <li key={idx} className="text-secondary font-light leading-relaxed pl-4 border-l-2 border-accent/30 hover:border-accent transition-colors">
                  {pub}
                </li>
              ))}
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}