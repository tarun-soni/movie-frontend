'use client';

import MovieList from '@/components/MovieList';
import { getPopularMovies } from '@/app/services/movieService';
import LogoutButton from '@/components/LogoutButton';
import { useEffect, useState } from 'react';
import type { Movie } from '@/app/services/movieService';
import { GET_POPULAR_MOVIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import Pagination from '@/components/Pagination';

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [pagesToShow, setPagesToShow] = useState([1, 2, 3, 4, 5]);

  const { data, loading, refetch, error } = useQuery(GET_POPULAR_MOVIES, {
    variables: {
      pageNumber: currentPage,
    },
    onCompleted: (data) => {
      setTotalPages(data.getGraphqlPopularMovies.total_pages);
    },
  });

  useEffect(() => {
    refetch();
  }, [currentPage]);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Movie Search</h1>
          <LogoutButton />
        </div>
        {error ? (
          <div className="text-red-500 bg-red-50 p-4 rounded-lg">
            {error?.message || 'Failed to fetch popular movies'}
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="bg-muted animate-pulse rounded-lg h-[400px]"
              />
            ))}
          </div>
        ) : (
          <>
            <MovieList
              initialMovies={data?.getGraphqlPopularMovies.results}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
            <Pagination
              onPrevClick={() => setCurrentPage(currentPage - 1)}
              onNextClick={() => setCurrentPage(currentPage + 1)}
              totalPages={totalPages}
              currentPage={currentPage}
              onPageClick={(pageNumber) => {
                setCurrentPage(pageNumber);
              }}
              pagesToShow={pagesToShow}
              setPagesToShow={setPagesToShow}
            />
          </>
        )}
      </div>
    </div>
  );
}
