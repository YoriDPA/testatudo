
import React from 'react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="relative flex-none w-[180px] md:w-[240px] aspect-[2/3] md:aspect-[16/9] rounded-sm overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-50 shadow-lg border border-transparent hover:border-zinc-500"
    >
      <img 
        src={window.innerWidth < 768 ? movie.thumbnail : movie.backdrop} 
        alt={movie.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
        <h4 className="font-bold text-sm md:text-base line-clamp-1">{movie.title}</h4>
        <div className="flex items-center gap-2 mt-1 text-[10px] md:text-xs">
          <span className="text-green-500 font-bold">{movie.rating} Estrelas</span>
          <span className="text-zinc-400">{movie.year}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
