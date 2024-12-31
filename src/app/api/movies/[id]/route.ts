import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.pathname.split('/').pop();

  console.log('params', params);
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${params}?api_key=${API_KEY}&language=en-US`
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
