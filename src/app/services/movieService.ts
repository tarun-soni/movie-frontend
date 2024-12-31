export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export async function getPopularMovies(page: number = 1): Promise<Movie[]> {
  const response = await fetch(`http://localhost:3000/api/movies`, {
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
