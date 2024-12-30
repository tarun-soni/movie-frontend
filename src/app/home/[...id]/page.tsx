'use client';

import { getMovieById, Movie } from '@/app/services/movieService';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import MovieCard from '@/components/MovieCard';
import ShowRating from '@/components/showRating';

const Page = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (id) {
        console.log('id', id);
        const movieData = await getMovieById(Number(id));
        console.log('movie', movieData);
        setMovie(movieData);
      }
    };

    fetchMovie();
  }, [id]);

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center mt-10">
      {movie ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center">
          <div className="flex flex-col items-center justify-center ">
            <MovieCard movie={movie} />
          </div>
          <div className="flex flex-col items-center justify-start align-top border-2 border-primary rounded-md p-2">
            Current Rating from TMDB- <ShowRating value={movie.vote_average} />
          </div>
        </div>
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </div>
  );
};

export default Page;
