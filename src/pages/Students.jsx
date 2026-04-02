import { STUDENTS_DATA } from '../constants/data';

export default function Students() {
  const { recruitment, members } = STUDENTS_DATA;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-32">
      <div className="border-b border-white/20 pb-8 mb-16">
        <h1 className="font-serif text-5xl font-bold text-primary">Students & Alumni</h1>
      </div>

      <section className="mb-16 md:mb-32">
        <div className="border-l-2 border-accent pl-6 mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 leading-relaxed">
            {recruitment.title}
          </h2>
          <p className="text-secondary font-light leading-relaxed max-w-4xl">
            {recruitment.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
          {recruitment.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="font-serif text-2xl text-primary border-b border-white/10 pb-3">{section.title}</h3>
              {section.content && <p className="text-secondary font-light leading-relaxed">{section.content}</p>}
              {section.list && (
                <ul className="list-disc list-inside space-y-2 text-secondary font-light text-[0.95rem]">
                  {section.list.map((item, itemIdx) => <li key={itemIdx} className="leading-relaxed">{item}</li>)}
                </ul>
              )}
              {section.footer && <p className="text-secondary font-light leading-relaxed mt-4 italic text-sm text-white/60">{section.footer}</p>}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-3xl font-bold text-primary mb-12">Members</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
          {members.map((member, idx) => (
            <article key={idx} className="group">
              {/* aspect-[3/4] 와 object-cover 로 증명사진 사이즈를 완전히 통일 */}
              <div className="aspect-[3/4] w-full bg-white/5 overflow-hidden rounded-sm mb-5 relative">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-all duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<span class="absolute inset-0 flex items-center justify-center text-white/20 font-serif text-sm">No Image</span>`;
                  }}
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary mb-1">{member.name}</h3>
                <p className="text-accent text-xs font-medium tracking-wider uppercase mb-3">{member.group}</p>
                <div className="space-y-1 text-[0.85rem] text-secondary font-light">
                  <p><span className="text-primary font-medium block">Research Interest</span> {member.interests}</p>
                  {member.publications && (
                    <p className="leading-relaxed mt-2"><span className="text-primary font-medium block">Publications</span> {member.publications}</p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}