import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Optionally handle custom middleware logic here
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => {console.log("token: ", token); return !!token }// Only allow authenticated users
    },
    pages: {
      signIn: "/sign-up",
    }
  }
)

// Protect all routes except public ones
export const config = {
  matcher: [
    "/directs/:path*",
    "/servers/:path*",
    "/setup",
    // Protect main app routes but not public assets
    "/((?!api/auth|sign-in|sign-up|_next|favicon.ico|public|images|icons|auth-layout).*$)",
  ]
}