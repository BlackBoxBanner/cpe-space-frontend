import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const session = cookieStore.get('cpe_space_session');
  const userId = cookieStore.get('user-id');

  if (request.nextUrl.pathname.includes('/auth/register'))
    return NextResponse.next();

  if (
    !request.nextUrl.pathname.startsWith('/auth') &&
    !request.nextUrl.pathname.includes('/change-password') &&
    (!session || !userId)
  )
    return NextResponse.rewrite(new URL('/auth', request.url));

  if (request.nextUrl.pathname.startsWith('/auth')) {
    if (session && userId)
      return NextResponse.redirect(new URL('/', request.url));
  }

  return;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
