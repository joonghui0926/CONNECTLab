import { useData } from '../contexts/DataContext';

export default function Research() {
  const { data: { RESEARCH_DATA } } = useData();

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-32">
      <div className="border-b border-fg/20 pb-8 mb-20">
        <h1 className="font-serif text-5xl font-bold text-primary">Research</h1>
      </div>

      <div className="space-y-16 md:space-y-32">
        {RESEARCH_DATA.map((topic, index) => (
          <article key={index} className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start group">
            {/* 이미지 박스: mix-blend-multiply를 위해 흰 배경 유지 */}
            <div className="lg:col-span-5 bg-white/95 rounded-sm overflow-hidden aspect-[4/3] relative flex items-center justify-center p-4">
              <img
                src={topic.image}
                alt={topic.title}
                className="w-full h-full object-contain mix-blend-multiply transition-all duration-700 ease-out"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `<span class="text-gray-400 font-serif text-sm">Figure not available</span>`;
                }}
              />
            </div>

            <div className="lg:col-span-7 pt-1">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-primary mb-4 leading-snug group-hover:text-accent transition-colors">
                {topic.title}
              </h2>
              <p className="text-secondary font-light text-[0.95rem] md:text-base leading-relaxed text-justify">
                {topic.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
