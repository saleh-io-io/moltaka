import { updateSession } from '@/utils/supabase/middleware'

const allowList = [
  /^\/q&a(\/.*)?$/, // Allow /q&a and all subpaths
];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // If the path matches the allowList, skip auth/session update
  if (allowList.some((regex) => regex.test(pathname))) {
    return; // Allow through without auth/session
  }

  // update user's auth session for all other paths
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}