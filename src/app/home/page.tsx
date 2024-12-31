'use client';

import MovieList from '@/components/MovieList';
import { getPopularMovies } from '@/app/services/movieService';
import LogoutButton from '@/components/LogoutButton';
import { useEffect, useState } from 'react';
import type { Movie } from '@/app/services/movieService';

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await getPopularMovies();
        setMovies(data);
      } catch (err) {
        setError('Failed to load movies');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadMovies();
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Movie Search</h1>
          <LogoutButton />
        </div>
        {error ? (
          <div className="text-red-500 bg-red-50 p-4 rounded-lg">{error}</div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-muted animate-pulse rounded-lg h-[400px]"
              />
            ))}
          </div>
        ) : (
          <MovieList initialMovies={movies} />
        )}
      </div>
    </div>
  );
}
