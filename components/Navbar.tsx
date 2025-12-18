
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onSyncClick: () => void;
  onDeployClick: () => void;
  onSearch: (query: string) => void;
  showInstallButton?: boolean;
  onInstallClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSyncClick, onDeployClick, onSearch, showInstallButton, onInstallClick }) => {
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
        <div className="flex items-center gap-2 md:gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-red-600 rounded-lg md:rounded-xl flex items-center justify-center font-black text-white shadow-xl shadow-red-600/30 transform -rotate-3">Y</div>
          <div>
            <h1 className="text-white text-xl md:text-3xl font-black tracking-tighter uppercase italic leading-none">Yori<span className="text-red-600">Flix</span></h1>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="relative group hidden lg:block">
          <input 
            type="text" 
            placeholder="Buscar..."
            className="bg-zinc-900/80 border border-zinc-800 rounded-full pl-10 pr-4 py-2 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <button 
          onClick={onDeployClick}
          className="w-10 h-10 md:w-12 md:h-12 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-all border border-white/5 group relative"
          title="Como gerar link do Firebase"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:animate-bounce"><path d="M4.5 16.5c-1.5 1.26-2 3.38-2 3.38s2.25-.5 3.38-2c.75-.18 1.5-.3 2.25-.3.75 0 1.5.12 2.25.3 1.12 1.5 3.38 2 3.38 2s-.5-2.12-2-3.38c1.69-1.26 2-3.62 2-3.62s-.5 1.5-1.5 1.5-1.5-1.5-1.5-1.5-1.69 2.36-2 3.62c-.75-.18-1.5-.3-2.25-.3-.75 0-1.5.12-2.25.3Z"/><path d="M12 15l-3-3m3 3l3-3m-3 3V9"/><path d="M15 15l3-3m-3 3l-3-3m3 3V9"/></svg>
          <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold">Gerar Link</span>
        </button>

        {showInstallButton && (
          <button 
            onClick={onInstallClick}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-red-600/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Instalar
          </button>
        )}

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
