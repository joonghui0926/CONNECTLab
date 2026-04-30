import { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Search, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { NAV_LINKS, RESEARCH_DATA, PUBLICATIONS_DATA } from '../constants/data';
import AdminPanel from './AdminPanel';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const membersRef = useRef(null);
  const mobileTabsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (membersRef.current && !membersRef.current.contains(e.target)) {
        setIsMembersOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!mobileTabsRef.current) return;
    const active = mobileTabsRef.current.querySelector('[data-active="true"]');
    if (active) active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [location.pathname]);

  useEffect(() => {
    if (searchQuery.length < 2) { setSearchResults([]); return; }
    const query = searchQuery.toLowerCase();
    const results = [];
    RESEARCH_DATA.forEach(item => {
      if (item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)) {
        results.push({ type: 'Research', title: item.title, path: '/research' });
      }
    });
    PUBLICATIONS_DATA.journals.forEach(pub => {
      const text = pub.text || pub;
      if (text.toLowerCase().includes(query)) {
        results.push({ type: 'Publication', title: text.substring(0, 80) + '...', path: '/publications' });
      }
    });
    if ("choi chang-sik".includes(query) || "professor".includes(query)) {
      results.push({ type: 'Professor', title: 'Prof. Chang-Sik Choi Profile', path: '/professor' });
    }
    setSearchResults(results.slice(0, 5));
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') setIsSearchOpen(false); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') !== 'light');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const isMemberActive = location.pathname === '/professor' || location.pathname === '/students';

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      <header className="fixed top-0 w-full z-40 bg-background/90 backdrop-blur-md border-b border-fg/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <Link to="/" className="font-serif font-bold text-base sm:text-lg md:text-xl tracking-wider text-primary shrink-0">
            CONNECT <span className="text-accent">Lab</span>
          </Link>

          <nav className="hidden md:flex gap-4 items-center">
            {NAV_LINKS.filter(link => link.path !== '/professor' && link.path !== '/students').map((link) => {
              if (link.path === '/research') {
                return (
                  <div key="members-dropdown" className="flex gap-4 items-center">
                    <div className="relative" ref={membersRef}>
                      <button
                        onClick={() => setIsMembersOpen(prev => !prev)}
                        className={`flex items-center gap-1 text-sm uppercase tracking-widest transition-colors ${
                          isMemberActive ? 'text-accent font-medium' : 'text-secondary hover:text-primary'
                        }`}
                      >
                        Members <ChevronDown size={14} className={`transition-transform ${isMembersOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isMembersOpen && (
                        <div className="absolute top-full left-0 mt-3 bg-background border border-fg/10 rounded-sm shadow-xl py-2 min-w-[140px] z-50">
                          <Link to="/professor" onClick={() => setIsMembersOpen(false)}
                            className={`block px-4 py-2 text-sm uppercase tracking-widest transition-colors hover:text-primary ${location.pathname === '/professor' ? 'text-accent' : 'text-secondary'}`}>
                            Professor
                          </Link>
                          <Link to="/students" onClick={() => setIsMembersOpen(false)}
                            className={`block px-4 py-2 text-sm uppercase tracking-widest transition-colors hover:text-primary ${location.pathname === '/students' ? 'text-accent' : 'text-secondary'}`}>
                            Students
                          </Link>
                        </div>
                      )}
                    </div>
                    <Link to={link.path}
                      className={`text-sm uppercase tracking-widest transition-colors ${location.pathname === link.path ? 'text-accent font-medium' : 'text-secondary hover:text-primary'}`}>
                      {link.label}
                    </Link>
                  </div>
                );
              }
              return (
                <Link key={link.path} to={link.path}
                  className={`text-sm uppercase tracking-widest transition-colors ${location.pathname === link.path ? 'text-accent font-medium' : 'text-secondary hover:text-primary'}`}>
                  {link.label}
                </Link>
              );
            })}
            <button onClick={() => { setIsSearchOpen(true); setSearchQuery(''); }}
              className="text-secondary hover:text-accent transition-colors ml-4 focus:outline-none">
              <Search size={20} />
            </button>
            <button onClick={toggleTheme}
              className="text-secondary hover:text-accent transition-colors focus:outline-none">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="h-5 w-px bg-fg/20 mx-1" />
            <a href="https://www.kaist.ac.kr" target="_blank" rel="noopener noreferrer">
              <img src="/assets/kaist_logo.png" alt="KAIST" className="h-20 w-auto object-contain" />
            </a>
          </nav>

          <div className="flex md:hidden items-center gap-1.5">
            <button onClick={() => { setIsSearchOpen(true); setSearchQuery(''); }}
              className="text-secondary hover:text-accent transition-colors focus:outline-none p-1.5">
              <Search size={20} />
            </button>
            <button onClick={toggleTheme}
              className="text-secondary hover:text-accent transition-colors focus:outline-none p-1.5">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a href="https://www.kaist.ac.kr" target="_blank" rel="noopener noreferrer" className="ml-1 shrink-0">
              <img src="/assets/kaist_logo.png" alt="KAIST" className="h-11 w-auto object-contain" />
            </a>
          </div>
        </div>

        <nav className="md:hidden border-t border-fg/5 overflow-x-auto" style={{ scrollbarWidth: 'none' }} ref={mobileTabsRef}>
          <style>{`nav::-webkit-scrollbar { display: none; }`}</style>
          <div className="flex items-center px-2 py-2 gap-1 whitespace-nowrap">
            {NAV_LINKS.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  data-active={isActive}
                  className={`px-3 py-1.5 text-xs uppercase tracking-widest rounded-sm transition-colors ${
                    isActive
                      ? 'text-accent bg-fg/[0.06] font-medium'
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 md:pt-32 bg-black/95 backdrop-blur-sm">
          <div className="w-full max-w-3xl px-6">
            <div className="relative border-b border-white/20 pb-4 flex items-center">
              <Search size={24} className="text-accent absolute left-0" />
              <input type="text" placeholder="Search publications, research topics, etc..."
                className="w-full bg-transparent text-xl md:text-3xl text-primary font-light pl-12 pr-12 outline-none placeholder:text-white/20"
                autoFocus value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <button onClick={() => setIsSearchOpen(false)} className="absolute right-0 text-secondary hover:text-white">
                <X size={28} />
              </button>
            </div>
            <div className="mt-8 space-y-4">
              {searchQuery.length > 1 && searchResults.length === 0 && (
                <p className="text-white/40 font-light text-lg">No results found for "{searchQuery}"</p>
              )}
              {searchResults.map((res, idx) => (
                <div key={idx} onClick={() => { navigate(res.path); setIsSearchOpen(false); }}
                  className="group flex flex-col p-4 border border-white/5 hover:border-accent hover:bg-white/5 rounded-sm cursor-pointer transition-all">
                  <span className="text-accent text-xs font-mono uppercase tracking-wider mb-1">{res.type}</span>
                  <span className="text-primary text-lg font-light group-hover:text-white">{res.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow pt-[7rem] md:pt-20">
        <Outlet />
      </main>

      <footer className="border-t border-fg/10 mt-16 md:mt-24 py-10 md:py-12 text-center text-sm text-secondary px-6">
        <p>© 2026 CONNECT Lab, KAIST. All Rights Reserved.</p>
        <p className="mt-2 text-fg/30">N1 715, KAIST, 291 Daehak-ro, Yuseong-gu, Daejeon 34141, Republic of Korea</p>
        <p className="mt-4 text-[11px] text-fg/25 tracking-wide">Webpage created by Joonghui Cho (KAIST EE)</p>
      </footer>

      <button
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-5 right-5 z-30 px-3 py-1.5 text-[11px] text-secondary/50 hover:text-secondary border border-fg/10 hover:border-fg/30 rounded-sm bg-background/80 backdrop-blur-sm transition-all focus:outline-none"
      >
        Admin
      </button>

      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
