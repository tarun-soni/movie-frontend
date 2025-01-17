import { Movie as MovieType } from '@/__generated__/graphql';

export interface Movie extends MovieType {
  id?: number;
}

export async function getPopularMovies(page: number = 1) {
  const apiUrl =
    process.env.NEXT_PUBLIC_NODE_ENV === 'development'
      ? `http://localhost:3000/api/movies?page=${page}`
      : `/api/movies?page=${page}`;

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }

  return response.json();
}

export async function searchMovies(
  query: string,
  page: number = 1
): Promise<Movie[]> {
  if (!query) return [];

  const response = await fetch(
    `/api/movies/search?query=${encodeURIComponent(query)}&page=${page}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to search movies');
  }
  return response.json();
}

export async function getMovieDetails(movieId: number): Promise<Movie> {
  const response = await fetch(`/api/movies/${movieId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  return response.json();
}

export async function getMovieById(movieId: number): Promise<Movie> {
  if (!movieId) throw new Error('Movie ID is required');
  const response = await fetch(`/api/movies/${movieId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  return response.json();
}
