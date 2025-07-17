import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const publicRoutes = ["/login", "/"];

  // Handle Chrome DevTools request
  if (pathname === "/.well-known/appspecific/com.chrome.devtools.json") {
    console.log("Handling Chrome DevTools request");
    return new NextResponse(null, { status: 204 });
  }

  console.log("Middleware:", pathname, "Token:", token);

  // Redirect logic
  if (!token && !publicRoutes.includes(pathname)) {
    console.log("Redirecting to /login: No token for private route");
    return NextResponse.redirect(new URL("/login", origin));
  }

  if (token && pathname === "/") {
    console.log("Redirecting to /dashboard: Authenticated user on root");
    return NextResponse.redirect(new URL("/dashboard", origin));
  }

  // Token verification
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret");
      const { payload } = await jwtVerify(token, secret);
      console.log("Token verified, payload:", payload);
    } catch (error: any) {
      console.log("Token verification failed:", error.message);
      const response = NextResponse.redirect(new URL("/login", origin));
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|_static|_image).*)"],
};