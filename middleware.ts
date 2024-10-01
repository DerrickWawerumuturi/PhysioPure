import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";
import { API_AUTH_PREFIX, AUTH_ROUTES, PROTECTED_ROUTES } from "./route";
import { NextResponse } from "next/server";

export const { auth } = NextAuth(authConfig);
export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const isAuth = req.auth;

  const isAccessingApiRoute = pathname.startsWith(API_AUTH_PREFIX);
  const isAccessingSignInRoute = pathname === "/sign-in";
  const isAccessingSignUpRoute = pathname === "/sign-up";

  if (pathname === "/" || isAccessingSignInRoute) {
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
    if (isAuth) {
      console.log(`Redirecting authenticated user from ${pathname} to /`);
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      if (isAccessingSignUpRoute) {
        console.log(`Redirecting user /sign-up`);
        return NextResponse.next();
      } else {
        console.log(`Redirecting unauthenticated user to /sign-in`);
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }
    }
  }

  if (!isAuth && isAccessingProtectedRoute) {
    console.log(
      `Redirecting unauthenticated user from protected route ${pathname} to /sign-in`
    );
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
