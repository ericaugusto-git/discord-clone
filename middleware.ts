import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const ALLOWED_ORIGIN = 'https://kashi-os.pages.dev'

const isPublicRoute = createRouteMatcher([
  '/api/uploadthing(.*)',
  '/api/hello(.*)', 
  '/sign-in(.*)', 
  '/sign-up(.*)',
  '/api/livekit(.*)',
  '/_next(.*)',
  '/favicon.ico',
  '/api/socket(.*)'
])

export default clerkMiddleware((auth, req) => {
  // Check if request is from the allowed origin
  const origin = req.headers.get('origin')
  const referer = req.headers.get('referer')

  if (origin === ALLOWED_ORIGIN || referer?.startsWith(ALLOWED_ORIGIN)) {
    return // Allow the request to proceed
  }

  // Protect all non-public routes
  if (!isPublicRoute(req)) {
    auth().protect()
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}