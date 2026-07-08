import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';

const publicRoutes = [
  '/',
  '/sign-in',
  '/sign-up',
  '/courses',
  '/pricing',
  '/contactus',
];

function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(route =>
    pathname === route || pathname.startsWith(route + '/')
  );
}

// Auth API routes are always public
function isAuthApiRoute(pathname: string): boolean {
  return pathname.startsWith('/api/auth/');
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes and auth API
  if (isPublicRoute(pathname) || isAuthApiRoute(pathname)) {
    return NextResponse.next();
  }

  const user = await getSessionFromRequest(req);

  if (!user) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};