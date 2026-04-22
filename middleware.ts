import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public routes that don't need auth
  const publicRoutes = [
    '/',
    '/login',
    '/signup',
    '/about',
    '/contact',
    '/help',
    '/how-it-works',
    '/pricing',
    '/privacy',
    '/terms',
    '/cookies',
    '/careers',
    '/blog',
    '/status',
    '/events',
    '/creators',
    '/community',
  ]

  // API routes that don't need auth
  const publicApiRoutes = [
    '/api/auth',
    '/api/webhooks',
    '/api/events',
  ]

  // Check if the route is public
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`))
  const isPublicApiRoute = publicApiRoutes.some(route => pathname.startsWith(route))
  const isStaticAsset = pathname.startsWith('/_next') || pathname.startsWith('/favicon') || pathname.includes('.')

  if (isPublicRoute || isPublicApiRoute || isStaticAsset) {
    return NextResponse.next()
  }

  // Get the session token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Not authenticated — redirect to login
  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Admin routes — require ADMIN role
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    if (token.role !== 'ADMIN') {
      return pathname.startsWith('/api/')
        ? NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 })
        : NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Creator routes — require CREATOR or ADMIN role
  if (pathname.startsWith('/creator') || pathname.startsWith('/api/creator')) {
    if (token.role !== 'CREATOR' && token.role !== 'ADMIN') {
      return pathname.startsWith('/api/')
        ? NextResponse.json({ error: 'Forbidden: Creator access required' }, { status: 403 })
        : NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public files (images, manifest, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json|txt|xml|webmanifest)$).*)',
  ],
}
