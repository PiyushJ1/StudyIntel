import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  console.error("JWT_SECRET is not set in environment variables");
}
const secret = new TextEncoder().encode(jwtSecret!);

export async function middleware(req: NextRequest) {
  console.log("Middleware hit for URL:", req.url);
  console.log("All cookies:", req.cookies.getAll());
  console.log("JWT_SECRET available:", !!jwtSecret);
  
  const token = req.cookies.get("token")?.value;
  if (!token) {
    console.log("No token found in cookies");
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  console.log("Token found:", token.substring(0, 20) + "...");

  try {
    const payload = await jwtVerify(token, secret);
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

