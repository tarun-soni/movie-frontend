import { NextResponse } from 'next/server';
// import { BASE_URL, API_KEY } from '@/app/utils/constants';

export const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '';
export const BASE_URL = 'https://api.themoviedb.org/3';
export const API_URL = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${params.id}?api_key=${API_KEY}&language=en-US`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Movie not found' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movie details' },
      { status: 500 }
    );
  }
}
