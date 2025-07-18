import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  console.error("JWT_SECRET is not set in environment variables");
}

export async function middleware(req: NextRequest) {
  console.log("Middleware hit for URL:", req.url);
  console.log("All cookies:", req.cookies.getAll());
  console.log("JWT_SECRET available:", !!jwtSecret);
  
  const token = req.cookies.get("token")?.value;
  
  if (!token) {
    console.log("No token found in cookies");
    
    // Check for token in Authorization header (for API requests with localStorage fallback)
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const bearerToken = authHeader.substring(7);
      console.log("Found token in Authorization header");
      
      try {
        const payload = jwt.verify(bearerToken, jwtSecret!);
        console.log("JWT verification successful:", payload);
        return NextResponse.next();
      } catch (error) {
        console.log("JWT verification failed:", error);
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
    
    // For page requests (not API requests), allow through but let client-side handle auth
    // This allows the DashboardWrapper to check localStorage and redirect if needed
    console.log("No cookie or auth header found, allowing through for client-side check");
    return NextResponse.next();
  }
  
  console.log("Token found in cookie:", token.substring(0, 20) + "...");

  try {
    const payload = jwt.verify(token, jwtSecret!);
    console.log("JWT verification successful:", payload);
    return NextResponse.next();
  } catch (error) {
    console.log("JWT verification failed:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
}

