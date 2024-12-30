import Searchbar from '@/components/searchbar';
import { getPopularMovies } from '../services/movieService';
import type { Movie } from '../services/movieService';
import { redirect } from 'next/navigation';
import MovieCard from '@/components/MovieCard';
import LogoutButton from '@/components/LogoutButton';

export default async function HomePage() {
  const movies = await getPopularMovies();

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Movie Search</h1>
          <LogoutButton />
        </div>
        <Searchbar />

        <h2 className="text-xl font-bold">Popular Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
