import { RESEARCH_DATA } from '../constants/data';

export default function Research() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-32">
      {/* 최상단 Research 제목은 그대로 유지 */}
      <div className="border-b border-white/20 pb-8 mb-20">
        <h1 className="font-serif text-5xl font-bold text-primary">Research</h1>
      </div>
      
      <div className="space-y-16 md:space-y-32">
        {RESEARCH_DATA.map((topic, index) => (
          <article key={index} className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start group">
            
            {/* Image Box: aspect-[4/3] 으로 모든 가로/세로 크기를 통일하고, 
                object-contain을 통해 MATLAB 그래프가 잘리지 않도록 함 */}
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

            {/* Content Box: 폰트 사이즈 1~2pt 축소 (text-2xl -> text-xl, text-lg -> text-base) */}
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