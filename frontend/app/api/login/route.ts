import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const backendRes = await fetch(`${process.env.NEXT_API_PUBLIC_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    // This ensures cookies from backend are forwarded
    credentials: "include",
  });

  const backendSetCookie = backendRes.headers.get("set-cookie");

  const resBody = await backendRes.json();
  const response = NextResponse.json(resBody, { status: backendRes.status });

  if (backendSetCookie) {
    response.headers.set("set-cookie", backendSetCookie);
  }

  return response;
}
