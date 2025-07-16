import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname ===
    "/.well-known/appspecific/com.chrome.devtools.json"
  ) {
    console.log("Handling Chrome DevTools request");
    return new NextResponse(null, { status: 204 });
  }

  const token = request.cookies.get("token")?.value;
  const publicRoutes = ["/login", "/"];
  if (!token && !publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
console.log('Middleware:', request.url, 'Token:', token);
  if (token) {
    try {
      const secret = process.env.JWT_SECRET || "default_secret";
      jwt.verify(token, secret);
      if (request.nextUrl.pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch (error) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth/login|api/users).*)",
  ],
};
