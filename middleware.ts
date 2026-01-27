/**
 * @file middleware.ts — Next.js Edge Middleware for authentication routing.
 *
 * @intent
 *   Controls route access based on authentication status. Redirects unauthenticated
 *   users to /login and authenticated users away from public auth pages.
 *
 * @idea
 *   Three route categories:
 *   1. Public paths (login, register, password reset, OTP) — accessible only when
 *      NOT authenticated; authenticated users are redirected to /home.
 *   2. Global paths (home, search, trending, cart, orders, rfq) — accessible to
 *      everyone regardless of auth status.
 *   3. Protected paths (everything else) — require authentication; unauthenticated
 *      users are redirected to /login.
 *
 * @usage
 *   Automatically invoked by Next.js on every matching request. The matcher
 *   excludes API routes, static files, images, and favicon.
 *
 * @dataflow
 *   Request -> check auth cookie (PUREMOON_TOKEN_KEY) -> route classification
 *   -> redirect or allow through (NextResponse.next() / NextResponse.redirect()).
 *
 * @depends
 *   - next/server (NextResponse, NextRequest)
 *   - PUREMOON_TOKEN_KEY from utils/constants — cookie name for the auth JWT token.
 *
 * @notes
 *   - Root path "/" always redirects to "/home".
 *   - The auth token is read from cookies (not headers).
 *   - The dynamicPathRegex for /trending|complete-order/:id allows dynamic routes.
 *   - The matcher excludes: /api/*, /_next/static/*, /_next/image/*, /favicon.ico.
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PUREMOON_TOKEN_KEY } from "./utils/constants";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get(PUREMOON_TOKEN_KEY)?.value;
  const publicPaths = [
    "/login",
    "/register",
    "/forget-password",
    "/reset-password",
    "/password-reset-verify",
    "/otp-verify",
  ];

  const globalPaths = [
    "/home",
    "/search",
    "/trending",
    "/trending/:id",
    "/cart",
    "/complete-order/:id",
    "/checkout-complete",
    "/orders",
    "/rfq",
  ];

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  const dynamicPathRegex = /^\/trending|complete-order\/\d+$/;

  if (publicPaths.includes(request.nextUrl.pathname)) {
    return authToken
      ? NextResponse.redirect(new URL("/home", request.url))
      : NextResponse.next();
  }

  if (authToken) {
    return publicPaths.includes(request.nextUrl.pathname)
      ? NextResponse.redirect(new URL("/home", request.url))
      : NextResponse.next();
  } else {
    return globalPaths.includes(request.nextUrl.pathname) ||
      dynamicPathRegex.test(request.nextUrl.pathname)
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
