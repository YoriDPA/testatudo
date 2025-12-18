
export interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string;
  rating: number;
  year: number;
  thumbnail: string;
  backdrop: string;
  telegramLink?: string;
  trailerUrl?: string; // Novo campo para o trailer
  duration?: string;
}

export interface Category {
  id: string;
  title: string;
  movies: Movie[];
}

export interface SyncResult {
  movies: Movie[];
}
