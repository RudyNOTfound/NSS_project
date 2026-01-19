import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Check if the user is trying to access an Admin page
    if (req.nextUrl.pathname.startsWith("/admin")) {
      // If their role is NOT "admin", kick them out to the User Dashboard
      if (req.nextauth.token?.role !== "admin") {
        return NextResponse.redirect(new URL("/user/dashboard", req.url));
      }
    }
  },
  {
    callbacks: {
      // This ensures the middleware only runs if the user is logged in first
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  // Apply this rule to all /user and /admin pages
  matcher: ["/user/:path*", "/admin/:path*"],
};