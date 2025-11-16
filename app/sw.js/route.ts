import { NextResponse } from 'next/server';

// Return empty service worker to prevent 404 errors
export async function GET() {
  return new NextResponse(
    `// Empty service worker - no caching
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  self.clients.claim();
});`,
    {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    }
  );
}
