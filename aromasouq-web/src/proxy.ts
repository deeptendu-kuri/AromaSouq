import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that require authentication
const protectedRoutes = ['/account', '/cart', '/checkout', '/orders', '/wishlist']
const vendorRoutes = ['/vendor']
const adminRoutes = ['/admin']

// Routes that should redirect to home if already authenticated
const authRoutes = ['/login', '/register']

// Public routes that don't require authentication
const publicRoutes = ['/become-vendor']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get the auth cookie (match backend cookie name)
  const authCookie = request.cookies.get('access_token')
  const isAuthenticated = !!authCookie

  // Check if route is public (always accessible)
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  // Skip auth checks for public routes
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Check if route requires authentication
  const requiresAuth = protectedRoutes.some(route => pathname.startsWith(route))
  const isVendorRoute = vendorRoutes.some(route => pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))

  // Redirect to login if trying to access protected routes without auth
  if ((requiresAuth || isVendorRoute || isAdminRoute) && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // NOTE: Removed redirect from login/register when authenticated
  // Let the login/register pages handle their own redirect logic client-side
  // This prevents issues with stale cookies blocking access to login page

  // Note: Role-based authorization (vendor/admin) should be handled
  // client-side or with proper JWT validation for production

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
  ],
}
