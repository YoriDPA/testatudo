
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import MovieDetail from './components/MovieDetail';
import SyncModal from './components/SyncModal';
import { Movie, Category } from './types';

const INITIAL_MOVIES: Movie[] = [];

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(() => {
    const saved = localStorage.getItem('teleflix-movies');
    return saved ? JSON.parse(saved) : INITIAL_MOVIES;
  });
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('teleflix-movies', JSON.stringify(movies));
  }, [movies]);

  const featuredMovie = useMemo(() => {
    return movies.length > 0 ? movies[Math.floor(Math.random() * movies.length)] : null;
  }, [movies]);

  const categories = useMemo((): Category[] => {
    const filtered = movies.filter(m => 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const genres: string[] = Array.from(new Set(filtered.map(m => m.genre)));
    
    if (filtered.length === 0) return [];

    return [
      { id: 'all', title: 'Novidades no YoriDPA', movies: filtered },
      ...genres.map(genre => ({
        id: genre,
        title: genre,
        movies: filtered.filter(m => m.genre === genre)
      }))
    ];
  }, [movies, searchQuery]);

  const handleSync = (newMovies: Movie[]) => {
    setMovies(prev => {
      const titles = new Set(prev.map(m => m.title.toLowerCase()));
      const uniqueNew = newMovies.filter(m => !titles.has(m.title.toLowerCase()));
      return [...uniqueNew, ...prev];
    });
  };

  return (
    <div className="min-h-screen bg-black text-white relative selection:bg-red-600/30">
      <Navbar 
        onSyncClick={() => setIsSyncModalOpen(true)} 
        onSearch={setSearchQuery}
      />
      
      <main className="pb-20">
        {featuredMovie && !searchQuery ? (
          <Hero movie={featuredMovie} onPlay={() => setSelectedMovie(featuredMovie)} />
        ) : !searchQuery && movies.length === 0 ? (
          <div className="h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="relative z-10 animate-in fade-in zoom-in duration-1000">
               <div className="w-32 h-32 bg-red-600 rounded-[2rem] mx-auto mb-10 flex items-center justify-center text-6xl font-black shadow-2xl shadow-red-600/40 transform -rotate-6">Y</div>
               
               <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none max-w-4xl">
                 SEU CINEMA <br/> <span className="text-red-600">YoriDPA</span>
               </h2>
               
               <p className="text-zinc-400 max-w-xl mx-auto text-lg md:text-xl mb-12 leading-relaxed font-medium">
                 Vi que você já tem o <span className="text-white font-bold italic">result.json</span> aberto! Arraste-o para cá e transforme seu grupo do Telegram em um catálogo profissional.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <button 
                   onClick={() => setIsSyncModalOpen(true)}
                   className="bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-red-900/20 flex items-center justify-center gap-3"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                   IMPORTAR AGORA
                 </button>
                 <button className="bg-zinc-900 hover:bg-zinc-800 text-zinc-400 px-10 py-5 rounded-2xl font-bold text-xl transition-all">
                   COMO FUNCIONA?
                 </button>
               </div>
            </div>
          </div>
        ) : null}
        
        <div className={`space-y-16 ${featuredMovie && !searchQuery ? '-mt-32' : movies.length > 0 ? 'pt-28' : ''} relative z-10 px-4 md:px-12`}>
          {categories.map(category => (
            <MovieRow 
              key={category.id} 
              title={category.title} 
              movies={category.movies} 
              onMovieClick={setSelectedMovie}
            />
          ))}
        </div>
      </main>

      {selectedMovie && (
        <MovieDetail 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}

      {isSyncModalOpen && (
        <SyncModal 
          onClose={() => setIsSyncModalOpen(false)} 
          onSync={handleSync}
        />
      )}
    </div>
  );
};

export default App;
