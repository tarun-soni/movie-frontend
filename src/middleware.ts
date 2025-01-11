// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // For client-side auth, we'll handle most auth checks in the components
  // Only prevent access to auth pages when user is already authenticated
  if (pathname.startsWith('/auth')) {
    const token = request.cookies.get('token')?.value;
    if (token) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/:path*'],
};
