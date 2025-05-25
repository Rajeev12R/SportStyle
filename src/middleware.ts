import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

const adminPaths = ["/admin-dashboard", "/api/products", "/api/orders"]

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  // Only protect admin paths
  if (adminPaths.some((path) => pathname.startsWith(path))) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (!token || token.role !== "admin") {
      if (pathname.startsWith("/api/")) {
        return new NextResponse("Forbidden", { status: 403 })
      } else {
        const loginUrl = new URL("/login", req.url)
        return NextResponse.redirect(loginUrl)
      }
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/admin-dashboard/:path*",
    "/api/products/:path*",
    "/api/orders/:path*",
  ],
}
