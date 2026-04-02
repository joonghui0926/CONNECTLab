import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Hero3D from '../components/Hero3D';
import { HOME_DATA } from '../constants/data';

export default function Home() {
  const textRef = useRef(null);
  const decoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 3 });
    tl.to(decoRef.current, { opacity: 1, duration: 1 })
      .fromTo(textRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }, "-=0.5");
  }, []);

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#111]">
        <Hero3D />
        
        <div ref={textRef} className="relative z-10 text-center pointer-events-auto opacity-0 px-4 mt-[-10vh]">
          <h1 className="font-serif text-7xl md:text-[8.5rem] font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-[#e0e0e0]">
            CONNECT
          </h1>
          <div className="font-sans text-2xl md:text-3xl text-accent tracking-[0.5em] uppercase font-medium -mt-2 md:-mt-4">
            Lab
          </div>
          <p className="font-sans text-lg md:text-xl text-secondary max-w-3xl mx-auto mt-12 leading-relaxed font-light">
            Center for Communications and Networking for Connectivity.<br />
            Advancing next-generation theories and systems with mathematical precision<br className="hidden md:block"/> and engineering excellence.
          </p>
          <Link to="/research">
            <button className="mt-16 px-12 py-5 bg-fg text-background font-medium tracking-widest uppercase hover:bg-accent hover:-translate-y-1 hover:shadow-lg transition-all duration-300 rounded-sm">
              Explore Research
            </button>
          </Link>
        </div>

        {/* 하단 장식선 */}
        <div ref={decoRef} className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-px h-[120px] bg-gradient-to-b from-transparent via-fg/50 to-transparent opacity-0 z-10" />
      </section>

      {/* 2. Content Section (여백 기반 디자인) */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-32 grid lg:grid-cols-12 gap-10 md:gap-20">
        
        {/* Announcement */}
        <div className="lg:col-span-5">
          <div className="border-b border-fg/20 pb-6 mb-8">
            <h2 className="font-serif text-3xl font-bold text-primary">{HOME_DATA.announcement.title}</h2>
          </div>
          <div className="text-secondary font-light leading-relaxed">
            <span className="text-accent font-medium block mb-4">{HOME_DATA.announcement.subtitle}</span>
            <p className="mb-8">{HOME_DATA.announcement.content}</p>
            <Link to="/students" className="inline-flex items-center text-sm font-medium text-primary hover:text-accent transition-colors tracking-widest uppercase group border-b border-transparent hover:border-accent pb-1">
              For more information
              <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* News */}
        <div className="lg:col-span-7">
          <div className="border-b border-fg/20 pb-6 mb-8">
            <h2 className="font-serif text-3xl font-bold text-primary">News</h2>
          </div>
          <ul className="space-y-6">
            {HOME_DATA.news.map((item, index) => (
              <li key={index} className="flex flex-col sm:flex-row gap-2 sm:gap-8 group">
                <span className="text-fg/40 font-mono text-sm w-20 shrink-0 group-hover:text-accent transition-colors">
                  {item.date}
                </span>
                <span className="text-secondary font-light leading-relaxed group-hover:text-primary transition-colors">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}