'use client';

import { Movie } from '@/app/services/movieService';
import Image from 'next/image';
import Link from 'next/link';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const getYear = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'N/A' : date.getFullYear().toString();
  };

  return (
    <Link
      href={`/home/${movie.id}`}
      className="block bg-muted rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
    >
      {movie.poster_path ? (
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="aspect-[2/3] w-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">No Image</span>
        </div>
      )}
      <div className="p-4">
        <h3 className="font-medium text-lg line-clamp-1">{movie.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {movie.overview || 'No description available'}
        </p>
        <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>{getYear(movie.release_date)}</span>
          <span>{movie.vote_average?.toFixed(1) || 'N/A'} ★</span>
        </div>
      </div>
    </Link>
  );
}
