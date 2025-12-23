import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function GET() {
  // retrieve cookie token from html
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Not authenticated. Token is invalid or doesn't exist." },
      { status: 401 },
    );
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.userId;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // failed response
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch user info " },
        { status: res.status },
      );
    }

    const data = await res.json();

    return NextResponse.json({
      userId,
      firstname: data.user.firstname,
      lastname: data.user.lastname,
      email: data.user.email,
      courses: data.user.courses,
      createdAt: data.user.createdAt,
      stats: data.stats,
    });
  } catch (err) {
    console.error("Err in fetching user info: ", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
