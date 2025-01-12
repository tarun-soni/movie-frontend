import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const page = searchParams.get('page') || '1';

    const apiUrl = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch from TMDB');
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching movies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    );
  }
}
