'use client';

import { Movie } from '@/app/services/movieService';
import { redirect } from 'next/navigation';

const MovieCard = ({ movie }: { movie: Movie }) => {
  console.log('movie', movie);
  const handleMovieClick = (movieId: number) => {
    redirect(`/home/${movieId}`);
  };

  return (
    <div
      key={movie.id}
      className="bg-muted rounded-lg overflow-hidden shadow-md"
      onClick={() => handleMovieClick(movie.id)}
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
  );
};

export default MovieCard;
