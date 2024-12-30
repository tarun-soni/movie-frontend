'use client';

import { getMovieById, Movie } from '@/app/services/movieService';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import MovieCard from '@/components/MovieCard';
import UsersRating from '@/components/UsersRating';
import InputRating from '@/components/InputRating';

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
        <div className="flex flex-col md:flex-row gap-8 items-start justify-center w-full">
          <div className="flex flex-col items-center justify-center w-full md:w-1/3">
            <MovieCard movie={movie} />
          </div>

          <div className="w-full">
            <InputRating movieId={movie.id} />
            <div className="mt-8">
              <UsersRating movieId={movie.id} />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-lg font-medium">Loading...</div>
      )}
    </div>
  );
};

export default Page;
