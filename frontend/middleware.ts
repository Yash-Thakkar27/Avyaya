import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { categoryPath } from '@/lib/catalog'

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // Old /shop?category=Rings links now have their own pages
  if (pathname === '/shop' && searchParams.has('category')) {
    return NextResponse.redirect(new URL(categoryPath(searchParams.get('category')), request.url), 308)
  }

  // Only guard /admin routes (except /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('token')?.value
    const role = request.cookies.get('adminRole')?.value

    if (!token || role !== 'ROLE_ADMIN') {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/shop'],
}
