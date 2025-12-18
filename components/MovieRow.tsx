
import React, { useRef } from 'react';
import { Movie } from '../types';
import MovieCard from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies, onMovieClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (movies.length === 0) return null;

  return (
    <div className="relative group/row">
      <h3 className="text-xl md:text-2xl font-bold mb-4 px-1">{title}</h3>
      
      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-40 bg-black/60 w-12 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-black/80"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>

        <div 
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-4 px-1"
        >
          {movies.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onClick={() => onMovieClick(movie)} 
            />
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-40 bg-black/60 w-12 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-black/80"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
