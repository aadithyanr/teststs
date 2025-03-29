import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This middleware ensures the root path redirects to /blog
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // If we're at the root path, redirect to /blog
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/blog", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
}