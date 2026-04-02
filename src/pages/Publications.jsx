import { PUBLICATIONS_DATA } from '../constants/data';

// 반복되는 리스트 렌더링을 위한 헬퍼 컴포넌트
const PublicationList = ({ title, items, isJournal = false }) => (
  <section className="mb-20">
    <h2 className="font-serif text-3xl font-bold text-primary border-b border-fg/20 pb-4 mb-8">
      {title} {isJournal && <span className="text-sm text-secondary font-sans font-light tracking-wide block sm:inline sm:ml-4 mt-2 sm:mt-0">(*corresponding author)</span>}
    </h2>
    <ul className="flex flex-col">
      {items.map((item, idx) => (
        <li key={idx} className="py-4 border-l-2 border-transparent hover:border-accent hover:bg-fg/[0.02] transition-colors pl-4 -ml-4 rounded-r-sm">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary font-light text-base md:text-lg leading-relaxed hover:text-primary transition-colors"
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  </section>
);

export default function Publications() {
  const { ieeeLink, preprints, journals, conferences } = PUBLICATIONS_DATA;

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-32">
      <div className="border-b border-fg/20 pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <h1 className="font-serif text-5xl font-bold text-primary">Publications</h1>
        <a 
          href={ieeeLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-accent text-sm font-medium uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2 group"
        >
          Link to IEEE Author Page
          <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

<PublicationList title="Submitted preprints (available upon request)" items={preprints} />
      <PublicationList title="Journal Papers" items={journals} isJournal={true} />
      <PublicationList title="Conference Papers and Presentation" items={conferences} />
    </div>
  );
}