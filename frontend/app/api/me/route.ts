import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import redis from "../../../../backend/src/lib/redis";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function GET(_req: Request) {
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

    let cachedFirstName = await redis.get(`user:${userId}:firstname`);
    let cachedCourses = await redis.get(`user:${userId}:courses`);
    let cachedTimeStudied = await redis.get(`user:${userId}:totalStudyTimes`);

    // short circuit code to return cached fields (cache hit)
    if (cachedFirstName && cachedCourses && cachedTimeStudied) {
      return NextResponse.json({
        userId,
        firstname: cachedFirstName,
        timestudied: cachedTimeStudied,
        courses: cachedCourses,
      })
    }

    // cache miss (couldn't find cache for items)
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

    // manually set fields from response
    const data = await res.json();
    const firstName = data.user.firstname;
    const totalStudyTimes = data.totalStudyTimes;
    const courses = data.user.courses;

    // cache the fields if they haven't been already
    if (!cachedFirstName && firstName) {
      await redis.set(`user:${userId}:firstname`, firstName, { ex: 100000 });
      cachedFirstName = firstName;
    }
    if (!cachedTimeStudied && totalStudyTimes) {
      await redis.set(
        `user:${userId}:totalStudyTimes`,
        JSON.stringify(totalStudyTimes),
        { ex: 100000 }
      );
      cachedTimeStudied = totalStudyTimes;
    }
    if (!cachedCourses && courses) {
      await redis.set(`user:${userId}:courses`, courses, { ex: 10000 });
      cachedCourses = courses;
    }

    return NextResponse.json({
      userId,
      firstname: firstName,
      timestudied: totalStudyTimes,
      courses: courses,
    });
  } catch (err) {
    console.error("Err in fetching user info: ", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
