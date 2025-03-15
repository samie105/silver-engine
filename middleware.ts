import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Since we're using localStorage which is client-side only,
  // we can't check authentication in middleware (server-side)
  // Instead, we'll let all requests through and handle auth checks in the components

  // Get the path the user is trying to access
  const path = request.nextUrl.pathname

  // We'll only handle redirects for login/signup when a user is already authenticated
  // This will be handled client-side in the respective pages

  // For all cases, continue with the request
  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  // Match all request paths except for the ones starting with:
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  // - public folder
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
}

