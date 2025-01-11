'use client';

import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { searchMovies } from '@/app/services/movieService';
import type { Movie } from '@/app/services/movieService';
import MovieCard from './MovieCard';
import Searchbar from './searchbar';
import Button from './button';
import Pagination from './Pagination';

interface MovieListProps {
  initialMovies: Movie[];
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}

export default function MovieList({ initialMovies }: MovieListProps) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentQuery, setCurrentQuery] = useState('');

  // useEffect(() => {
  //   setMovies(initialMovies);
  // }, [initialMovies]);

  const handleSearch = async (query: string) => {
    setCurrentQuery(query);

    if (!query.trim()) {
      setMovies(initialMovies);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const searchResults = await searchMovies(query);
      setMovies(searchResults);
    } catch (err) {
      console.error('Failed to search movies', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Searchbar onSearch={handleSearch} />

      {error && (
        <div className="text-red-500 bg-red-50 p-4 rounded-lg">{error}</div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {movies.length > 0
            ? currentQuery
              ? 'Search Results'
              : 'Popular Movies'
            : isLoading
            ? 'Loading...'
            : 'No movies found'}
        </h2>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-muted animate-pulse rounded-lg h-[400px]"
            />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="w-full flex flex-row justify-center ">
            {/* <Pagination
              onPrevClick={onPrevClick}
              onNextClick={onNextClick}
              totalPages={totalPages}
              currentPage={currentPage}
              onPageClick={onPageClick}
            /> */}
          </div>
        </>
      )}
    </div>
  );
}
