import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedPatterns = [
  /^\/dashboard/,
  /^\/booking/,
  /^\/bookings/,
  /^\/wishlist/,
  /^\/rooms\/[^\/]+\/booking$/, // 🔥 match dynamic booking route
];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const isProtected = protectedPatterns.some((pattern) => pattern.test(pathname));

  if (isProtected && !token) {
    const loginUrl = new URL("/sign-in", req.url);
    return NextResponse.redirect(loginUrl);
  }

  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/booking/:path*",
    "/bookings/:path*",
    "/wishlist/:path*",
    "/rooms/:roomId/booking", // 👈 important!
  ],
};
