import Searchbar from '@/components/searchbar';
import { getPopularMovies } from '../services/movieService';
import type { Movie } from '../services/movieService';

export default async function HomePage() {
  const movies = await getPopularMovies();

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Movie Search</h1>
          <button className="text-sm text-primary hover:underline">
            Logout
          </button>
        </div>
        <Searchbar />

        <h2 className="text-xl font-bold">Popular Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie: Movie) => (
            <div
              key={movie.id}
              className="bg-muted rounded-lg overflow-hidden shadow-md"
            >
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-bold text-foreground line-clamp-1">
                  {movie.title}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {movie.overview}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                  <span className="text-sm font-medium text-primary">
                    {movie.vote_average.toFixed(1)} ★
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
