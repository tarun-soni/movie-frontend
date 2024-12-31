import { getPopularMovies } from '../services/movieService';
import MovieList from '@/components/MovieList';
import LogoutButton from '@/components/LogoutButton';

export default async function HomePage() {
  const initialMovies = await getPopularMovies();

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Movie Search</h1>
          <LogoutButton />
        </div>
        <MovieList initialMovies={initialMovies} />
      </div>
    </div>
  );
}
