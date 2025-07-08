import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Define protected routes
const protectedRoutes = ["/dashboard", "/booking", "/bookings"];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/sign-in", req.url);
    return NextResponse.redirect(loginUrl);
  }

  const isAuth = !!token;
  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";

  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
