
import React, { useState, useEffect, useRef } from 'react';
import { Movie } from '../types';

interface MovieDetailProps {
  movie: Movie;
  onClose: () => void;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie, onClose }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'watch'>('info');
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === 'watch' && widgetRef.current) {
      widgetRef.current.innerHTML = '';
      const match = movie.telegramLink?.match(/t\.me\/(?:c\/)?([^\/]+)\/(\d+)/);
      if (match) {
        const script = document.createElement('script');
        script.src = "https://telegram.org/js/telegram-widget.js?22";
        script.async = true;
        script.setAttribute('data-telegram-post', `${match[1]}/${match[2]}`);
        script.setAttribute('data-width', '100%');
        script.setAttribute('data-userpic', 'false');
        script.setAttribute('data-color', 'E22929');
        script.setAttribute('data-dark', '1');
        widgetRef.current.appendChild(script);
      }
    }
  }, [activeTab, movie]);

  const handleOpenApp = () => {
    const match = movie.telegramLink?.match(/t\.me\/(?:c\/)?([^\/]+)\/(\d+)/);
    if (match) {
      // O link tg:// é o que faz a mágica de abrir o app instalado
      const appLink = `tg://resolve?domain=${match[1]}&post=${match[2]}`;
      window.location.href = appLink;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 bg-black/98 backdrop-blur-3xl overflow-hidden" onClick={onClose}>
      <div 
        className="relative bg-[#111] w-full max-w-6xl h-full md:h-auto md:max-h-[95vh] overflow-y-auto rounded-none md:rounded-[3rem] shadow-[0_0_80px_rgba(0,0,0,1)] border border-white/5 animate-in slide-in-from-bottom-20 duration-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header de Navegação Estilo Netflix */}
        <div className="sticky top-0 z-[130] flex items-center justify-between p-8 bg-gradient-to-b from-[#111] via-[#111]/90 to-transparent">
          <div className="flex gap-4">
             <button 
              onClick={() => setActiveTab('info')}
              className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'info' ? 'bg-white text-black scale-105 shadow-xl' : 'text-zinc-500 hover:text-white'}`}
            >
              Informações
            </button>
            <button 
              onClick={() => setActiveTab('watch')}
              className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'watch' ? 'bg-red-600 text-white scale-105 shadow-xl shadow-red-600/40' : 'text-zinc-500 hover:text-white'}`}
            >
              Assistir Agora
            </button>
          </div>
          <button 
            onClick={onClose}
            className="w-14 h-14 bg-white/5 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-all border border-white/10 hover:scale-110 active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {activeTab === 'info' ? (
          <div className="pb-20">
            <div className="relative aspect-video w-full -mt-24">
              {!showTrailer ? (
                <>
                  <img src={movie.backdrop} alt={movie.title} className="w-full h-full object-cover opacity-50 scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <h2 className="text-5xl md:text-9xl font-black mb-8 tracking-tighter text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">{movie.title}</h2>
                    <button 
                      onClick={() => setShowTrailer(true)}
                      className="group flex items-center gap-6 bg-white/10 hover:bg-white text-white hover:text-black px-12 py-5 rounded-3xl font-black transition-all backdrop-blur-xl border border-white/20 hover:scale-105"
                    >
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      </div>
                      ASSISTIR TRAILER
                    </button>
                  </div>
                </>
              ) : (
                <iframe src={`${movie.trailerUrl}?autoplay=1`} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen />
              )}
            </div>

            <div className="px-8 md:px-24 space-y-12">
              <div className="flex flex-wrap items-center gap-8 text-sm font-black text-zinc-400 uppercase tracking-widest">
                <span className="text-green-500 bg-green-500/10 px-4 py-1.5 rounded-full">{movie.rating * 10}% Relevante</span>
                <span className="text-white bg-zinc-800 px-4 py-1.5 rounded-full">{movie.year}</span>
                <span className="border border-zinc-700 px-4 py-1.5 rounded-full">{movie.genre}</span>
                <span className="bg-red-600/20 text-red-500 px-4 py-1.5 rounded-full">ULTRA HD 4K</span>
              </div>
              
              <p className="text-2xl md:text-3xl text-zinc-300 leading-relaxed font-medium max-w-5xl">
                {movie.description}
              </p>

              <div className="pt-8">
                <button 
                  onClick={() => setActiveTab('watch')}
                  className="bg-red-600 hover:bg-red-700 text-white px-16 py-6 rounded-[2rem] font-black text-3xl shadow-[0_20px_50px_rgba(220,38,38,0.3)] transition-all hover:scale-105 active:scale-95"
                >
                  DAR O PLAY
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-6 py-10 md:p-24 flex flex-col items-center min-h-[600px] animate-in fade-in zoom-in-95 duration-700">
            <div className="max-w-3xl w-full text-center space-y-12">
              <div className="space-y-4">
                <div className="w-20 h-20 bg-blue-500/10 rounded-3xl mx-auto flex items-center justify-center text-blue-500 mb-6">
                   <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 12L2.1 12.1"/><path d="M12 12v10"/><path d="M12 12l9.9-0.1"/></svg>
                </div>
                <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-white">Pronto para rodar?</h3>
                <p className="text-zinc-400 text-lg font-medium">Arquivos 4K de alta qualidade abrem instantaneamente no seu aplicativo.</p>
              </div>

              {/* Botão de Ação Primária - O "Play" de verdade */}
              <button 
                onClick={handleOpenApp}
                className="w-full bg-white text-black py-8 rounded-[2.5rem] font-black text-2xl md:text-3xl hover:bg-zinc-200 transition-all flex flex-col items-center justify-center gap-2 group shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-125 transition-transform"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  ABRIR NO TELEGRAM DESKTOP
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] opacity-50 font-black">Recomendado para evitar erro "Media too big"</span>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.5em] text-zinc-600">OU TENTE PELO NAVEGADOR</div>
              </div>

              {/* Widget como backup visual */}
              <div className="bg-black/40 rounded-[2.5rem] p-8 border border-white/5 min-h-[400px] flex items-center justify-center overflow-hidden">
                <div ref={widgetRef} className="w-full">
                  <div className="flex flex-col items-center gap-4 text-zinc-800">
                    <div className="w-12 h-12 border-4 border-zinc-900 border-t-zinc-600 rounded-full animate-spin"></div>
                    <p className="text-xs font-black uppercase tracking-widest">Sincronizando com @yorifilmes...</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-600/5 border border-red-600/20 p-6 rounded-3xl text-left">
                <p className="text-red-500 font-bold text-sm mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  Dica de Especialista:
                </p>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  Se o quadro acima mostrar <b>"Media is too big"</b>, é uma limitação do Chrome/Edge. Clique no botão branco <b>ABRIR NO TELEGRAM DESKTOP</b> acima. O filme começará a rodar no seu PC na hora, sem erro e com som 5.1 original!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
