import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Optionally handle custom middleware logic here
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token // Only allow authenticated users
    },
    pages: {
      signIn: "/sign-in",
    }
  }
)

// Protect all routes except public ones
export const config = {
  matcher: [
    // Protected routes
    "/directs/:path*",
    "/servers/:path*",
    "/setup",
    // Exclude public routes
    // "/((?!api/auth|sign-in|sign-up|_next/static|_next/image|favicon.ico).*)",
  ]
}