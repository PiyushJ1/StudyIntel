import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  console.log("hit");
  const token = req.cookies.get("token")?.value;
  if (!token) {
      console.log("no token");
    return NextResponse.redirect(new URL("/login", req.url));
  }
    console.log("valid token");

  try {
    await jwtVerify(token, secret);
      console.log("success");
    return NextResponse.next();
  } catch (error) {
      console.log("err:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
}

