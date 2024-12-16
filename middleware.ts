// app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from './lib/session';  // Ensure this is the correct path to your session retrieval function

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const session = await getSession();

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/register'];

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.includes(url.pathname);

  // If no session exists at all
  if (!session) {
    // If trying to access a protected route, redirect to login
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL('/login', url));
    }
    return NextResponse.next();
  }

  // Destructure session details
  const { userId, userName, orgId } = session;

  // Scenario 1: Partial session (userId and userName exist, but no orgId)
  if (userId && userName && !orgId) {
    // If not already on select-org page, redirect to select organization
    if (url.pathname !== '/select-org') {
      return NextResponse.redirect(new URL('/select-org', url));
    }
  }

  // Scenario 2: No userId or userName (incomplete session)
  if (!userId || !userName) {
    // Redirect to login for any route except public routes
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL('/login', url));
    }
  }

  // Scenario 3: Complete session with all details
  if (userId && userName && orgId) {
    // Redirect from root to organization page if on home route
    if (url.pathname === '/') {
      return NextResponse.redirect(new URL(`/organization/${orgId}`, url));
    }
  }

  // For all other cases, continue with the request
  return NextResponse.next();
}

// Define which routes this middleware should run on
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)', // Apply to all routes except these
  ],
};
