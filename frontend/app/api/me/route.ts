import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function GET(_req: Request) {
  // retrieve cookie token from html
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    return NextResponse.json({ email: payload.email, firstName: payload.firstName });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}