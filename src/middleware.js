import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Get the user's role and the page they are trying to visit
    const role = req.nextauth.token?.role;
    const path = req.nextUrl.pathname;

    // 1. Protect ADMIN routes: If a regular User tries to go to /admin...
    if (path.startsWith("/admin") && role !== "admin") {
      // ...kick them back to User Dashboard
      return NextResponse.redirect(new URL("/user/dashboard", req.url));
    }

    // 2. Protect USER routes: If an Admin tries to go to /user...
    if (path.startsWith("/user") && role === "admin") {
      // ...kick them back to Admin Dashboard
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Ensure user is logged in
    },
  }
);

export const config = {
  matcher: ["/user/:path*", "/admin/:path*"],
};