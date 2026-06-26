import { useData } from '../contexts/DataContext';

export default function Students() {
  const { data: { STUDENTS_DATA } } = useData();
  const { recruitment, members } = STUDENTS_DATA;
  const hongikMembers = members.filter(member => /hongik|홍익/i.test(member.group || ''));
  const kaistMembers = members.filter(member => /kaist|카이스트/i.test(member.group || ''));

  const renderMemberGrid = (items) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-10 md:gap-x-5 lg:gap-x-6">
      {items.map((member, idx) => (
        <article key={idx} className="group">
          <div className="aspect-[3/4] w-full bg-fg/5 overflow-hidden rounded-sm mb-3 relative">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover transition-all duration-500"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `<span class="absolute inset-0 flex items-center justify-center text-fg/20 font-serif text-sm">No Image</span>`;
              }}
            />
          </div>
          <div>
            <h3 className="text-base font-bold text-primary mb-1">{member.name}</h3>
            <p className="text-accent text-[0.7rem] font-medium tracking-wider uppercase mb-2 leading-snug">{member.group}</p>
            <div className="space-y-1 text-xs text-secondary font-light leading-relaxed">
              <p><span className="text-primary font-medium block">Research Interest</span> {member.interests}</p>
              {member.publications && (
                <p className="leading-relaxed mt-2"><span className="text-primary font-medium block">Publications</span> {member.publications}</p>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-32">
      <div className="border-b border-fg/20 pb-8 mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary">Students & Alumni</h1>
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
              <h3 className="font-serif text-2xl text-primary border-b border-fg/10 pb-3">{section.title}</h3>
              {section.content && <p className="text-secondary font-light leading-relaxed">{section.content}</p>}
              {section.list && (
                <ul className="list-disc list-inside space-y-2 text-secondary font-light text-[0.95rem]">
                  {section.list.map((item, itemIdx) => <li key={itemIdx} className="leading-relaxed">{item}</li>)}
                </ul>
              )}
              {section.footer && <p className="text-secondary font-light leading-relaxed mt-4 italic text-sm text-fg/60">{section.footer}</p>}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-3xl font-bold text-primary mb-12">Members</h2>

        <div className="space-y-16">
          <div>
            <h3 className="font-serif text-2xl font-bold text-primary mb-8 border-b border-fg/10 pb-3">홍익대학교</h3>
            {renderMemberGrid(hongikMembers)}
          </div>

          <div>
            <h3 className="font-serif text-2xl font-bold text-primary mb-8 border-b border-fg/10 pb-3">KAIST</h3>
            {kaistMembers.length > 0 && renderMemberGrid(kaistMembers)}
          </div>
        </div>
      </section>
    </div>
  );
}
