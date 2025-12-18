
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onSyncClick: () => void;
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSyncClick, onSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 flex items-center justify-between px-4 md:px-12 pt-10 pb-4 md:py-4 ${isScrolled ? 'bg-black/95 backdrop-blur-md border-b border-white/5 shadow-2xl' : 'bg-gradient-to-b from-black/90 to-transparent'}`}>
      <div className="flex items-center gap-4 md:gap-8">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-red-600 rounded-lg md:rounded-xl flex items-center justify-center font-black text-white shadow-xl shadow-red-600/30 transform -rotate-3">Y</div>
          <div>
            <h1 className="text-white text-xl md:text-3xl font-black tracking-tighter uppercase italic leading-none">Yori<span className="text-red-600">Flix</span></h1>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="relative group hidden sm:block">
          <input 
            type="text" 
            placeholder="Buscar..."
            className="bg-zinc-900/80 border border-zinc-800 rounded-full pl-10 pr-4 py-2 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <button 
          onClick={onSyncClick}
          className="bg-white hover:bg-zinc-200 text-black px-4 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Sinc
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
