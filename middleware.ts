import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_PATH = '/gerynsbanps';
const LOGIN_PATH = '/gerynsbanps/login';
const SESSION_COOKIE = 'admin_session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for API routes, static files, service workers, and non-admin routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/sw.js' ||
    pathname === '/service-worker.js' ||
    pathname.includes('.') ||
    !pathname.startsWith(ADMIN_PATH)
  ) {
    return NextResponse.next();
  }

  // Allow access to login page
  if (pathname === LOGIN_PATH) {
    return NextResponse.next();
  }

  // Check authentication
  const session = request.cookies.get(SESSION_COOKIE);
  const isAuthenticated = session?.value === 'authenticated';

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/gerynsbanps/:path*',
};
