import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  console.log("Middleware hit for:", req.url);
  console.log("All cookies:", req.cookies.getAll());
  
  const token = req.cookies.get("token")?.value;
  if (!token) {
    console.log("No token found in middleware");
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  console.log("Token found in middleware:", token.substring(0, 20) + "...");

  try {
    await jwtVerify(token, secret);
    console.log("JWT verification successful");
    return NextResponse.next();
  } catch (error) {
    console.log("JWT verification failed:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
}

