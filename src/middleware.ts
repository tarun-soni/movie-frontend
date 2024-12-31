import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Root path redirect
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // Protected routes check
  if (
    (pathname.startsWith('/home') || pathname.startsWith('/movie')) &&
    !token
  ) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Prevent authenticated users from accessing auth pages
  if (pathname.startsWith('/auth') && token) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/home/:path*', '/movie/:path*', '/auth/:path*'],
};
