
import React from 'react';
import { Movie } from '../types';

interface HeroProps {
  movie: Movie;
  onPlay: () => void;
}

const Hero: React.FC<HeroProps> = ({ movie, onPlay }) => {
  return (
    <div className="relative h-[85vh] w-full flex items-center px-4 md:px-12 overflow-hidden">
      {/* Background with masks */}
      <div className="absolute inset-0 z-0">
        <img 
          src={movie.backdrop} 
          alt={movie.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 max-w-2xl mt-20">
        <h2 className="text-5xl md:text-7xl font-black mb-4 drop-shadow-2xl leading-tight">
          {movie.title}
        </h2>
        <div className="flex items-center gap-3 mb-6 text-sm font-semibold">
          <span className="text-green-500">{movie.rating * 10}% match</span>
          <span className="border border-zinc-500 px-1.5 py-0.5 text-[10px] rounded uppercase">{movie.genre}</span>
          <span className="text-zinc-300">{movie.year}</span>
          <span className="text-zinc-300">{movie.duration}</span>
        </div>
        <p className="text-zinc-300 text-lg mb-8 line-clamp-3 leading-relaxed drop-shadow">
          {movie.description}
        </p>
        <div className="flex items-center gap-4">
          <button 
            onClick={onPlay}
            className="bg-white text-black px-8 py-3 rounded-md font-bold text-lg flex items-center gap-2 hover:bg-white/90 transition-all active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Assistir
          </button>
          <button className="bg-zinc-500/50 text-white px-8 py-3 rounded-md font-bold text-lg flex items-center gap-2 hover:bg-zinc-500/30 transition-all backdrop-blur-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            Mais Informações
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
