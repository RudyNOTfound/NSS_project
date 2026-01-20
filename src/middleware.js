import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    
    const role = req.nextauth.token?.role;
    const path = req.nextUrl.pathname;

   
    if (path.startsWith("/admin") && role !== "admin") {
      
      return NextResponse.redirect(new URL("/user/dashboard", req.url));
    }

    
    if (path.startsWith("/user") && role === "admin") {
      
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, 
    },
  }
);

export const config = {
  matcher: ["/user/:path*", "/admin/:path*"],
};