import MovieList from '@/components/MovieList';
import { getPopularMovies } from '@/app/services/movieService';
import LogoutButton from '@/components/LogoutButton';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const movies = await getPopularMovies();

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Movie Search</h1>
          <LogoutButton />
        </div>
        <MovieList initialMovies={movies} />
      </div>
    </div>
  );
}
