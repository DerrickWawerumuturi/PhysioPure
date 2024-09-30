import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";
import { API_AUTH_PREFIX, AUTH_ROUTES, PROTECTED_ROUTES } from "./route";
import { NextResponse } from "next/server";

export const { auth } = NextAuth(authConfig);
export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const isAuth = req.auth;

  const isAccessingApiRoute = pathname.startsWith(API_AUTH_PREFIX);

  if (pathname === "/") {
    return NextResponse.next();
  }

  const isAccessingAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isAccessingProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isAccessingApiRoute) {
    return NextResponse.next();
  }

  if (isAccessingAuthRoute) {
    if (!isAuth) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    return NextResponse.next();
  }

  if (!isAuth && isAccessingProtectedRoute) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
