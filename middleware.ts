import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/api/uploadthing(.*)','/api/hello(.*)', '/sign-in(.*)', '/sign-up(.*)'])


export default clerkMiddleware((auth, req) => {
  // Otherwise, apply normal authentication rules
  if(!isPublicRoute(req)){
    auth().protect();
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}