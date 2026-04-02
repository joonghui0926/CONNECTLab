import { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Search, X, ChevronDown, Menu, Sun, Moon } from 'lucide-react';
import { NAV_LINKS, RESEARCH_DATA, PUBLICATIONS_DATA } from '../constants/data';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMembersOpen, setIsMobileMembersOpen] = useState(false);
  const membersRef = useRef(null);

  // 페이지 이동 시 모바일 메뉴 닫기
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileMembersOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (membersRef.current && !membersRef.current.contains(e.target)) {
        setIsMembersOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 모바일 메뉴 열릴 때 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

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
    const handleKeyDown = (e) => { if (e.key === 'Escape') { setIsSearchOpen(false); setIsMobileMenuOpen(false); } };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') !== 'light');

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
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <Link to="/" className="font-serif font-bold text-xl tracking-wider text-primary">
            CONNECT <span className="text-accent">Lab</span>
          </Link>

          {/* Desktop Nav */}
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
          </nav>

          {/* Mobile right buttons */}
          <div className="flex md:hidden items-center gap-3">
            <button onClick={() => { setIsSearchOpen(true); setSearchQuery(''); }}
              className="text-secondary hover:text-accent transition-colors focus:outline-none p-1">
              <Search size={20} />
            </button>
            <button onClick={toggleTheme}
              className="text-secondary hover:text-accent transition-colors focus:outline-none p-1">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsMobileMenuOpen(true)}
              className="text-secondary hover:text-primary transition-colors focus:outline-none p-1">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-72 bg-background border-l border-fg/10 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-fg/10">
              <span className="font-serif font-bold text-lg text-primary">
                CONNECT <span className="text-accent">Lab</span>
              </span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-secondary hover:text-white p-1">
                <X size={22} />
              </button>
            </div>
            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto py-4">
              <Link to="/"
                className={`flex items-center px-6 py-4 text-sm uppercase tracking-widest border-b border-white/5 transition-colors ${location.pathname === '/' ? 'text-accent' : 'text-secondary hover:text-primary'}`}>
                Home
              </Link>

              {/* Members expandable */}
              <button onClick={() => setIsMobileMembersOpen(prev => !prev)}
                className={`w-full flex items-center justify-between px-6 py-4 text-sm uppercase tracking-widest border-b border-white/5 transition-colors ${isMemberActive ? 'text-accent' : 'text-secondary hover:text-primary'}`}>
                Members
                <ChevronDown size={14} className={`transition-transform ${isMobileMembersOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMobileMembersOpen && (
                <div className="bg-fg/[0.03] border-b border-white/5">
                  <Link to="/professor"
                    className={`flex items-center px-10 py-3 text-sm uppercase tracking-widest transition-colors ${location.pathname === '/professor' ? 'text-accent' : 'text-secondary hover:text-primary'}`}>
                    Professor
                  </Link>
                  <Link to="/students"
                    className={`flex items-center px-10 py-3 text-sm uppercase tracking-widest transition-colors ${location.pathname === '/students' ? 'text-accent' : 'text-secondary hover:text-primary'}`}>
                    Students
                  </Link>
                </div>
              )}

              {NAV_LINKS.filter(l => l.path !== '/' && l.path !== '/professor' && l.path !== '/students').map(link => (
                <Link key={link.path} to={link.path}
                  className={`flex items-center px-6 py-4 text-sm uppercase tracking-widest border-b border-white/5 transition-colors ${location.pathname === link.path ? 'text-accent' : 'text-secondary hover:text-primary'}`}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Search Overlay */}
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

      <main className="flex-grow pt-16 md:pt-20">
        <Outlet />
      </main>

      <footer className="border-t border-fg/10 mt-16 md:mt-24 py-10 md:py-12 text-center text-sm text-secondary px-6">
        <p>© 2026 CONNECT Lab, KAIST. All Rights Reserved.</p>
        <p className="mt-2 text-white/50">N1 715, KAIST, 291 Daehak-ro, Yuseong-gu, Daejeon 34141, Republic of Korea</p>
      </footer>
    </div>
  );
}
