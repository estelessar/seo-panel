import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value === "true";
  const isLoginPage = request.nextUrl.pathname === "/login";

  // Public routes that don't require authentication
  const publicRoutes = ["/login"];

  // Eğer giriş yapılmamışsa ve public route değilse, login sayfasına yönlendir
  if (!isLoggedIn && !publicRoutes.includes(request.nextUrl.pathname)) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Eğer giriş yapılmışsa ve login sayfasındaysa, ana sayfaya yönlendir
  if (isLoggedIn && isLoginPage) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
