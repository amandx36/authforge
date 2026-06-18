import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export const config = {
  matcher: [
    "/",
    "/profile/:path*",
    "/admin/:path*",
    "/login",
    "/signup",
    "/verify-email",
    "/forgot-password",
"/reset-password",
  ],
};

const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/verify-email",
  "/forgot-password",
  "/reset-password",
];

export async function middleware(
  request: NextRequest
) {

  const path = request.nextUrl.pathname;

  const isPublicPath =
    publicRoutes.includes(path);

  const token =
    request.cookies.get("token")?.value || "";

  let decoded_data: any = null;

  try {
    if (token) {
      const secret = new TextEncoder().encode(
        process.env.TOKEN_SECRET
      );

      const { payload } = await jwtVerify(
        token,
        secret
      );

      decoded_data = payload;

      console.log(
        "DECODED_DATA:",
        decoded_data
      );
    }
  } catch (error) {
    console.error(
      "JWT VERIFY ERROR:",
      error
    );

    decoded_data = null;
  }

  console.log("PATH:", path);
  console.log(
    "ROLE:",
    decoded_data?.role
  );

  // force logged in user do not  move to  login again
  if (
    isPublicPath &&
    decoded_data?.role === "USER"
  ) {
    return NextResponse.redirect(
      new URL("/profile", request.url)
    );
  }

  // force logged in admin not go to profile  and signed up 
  if (
    isPublicPath &&
    decoded_data?.role === "ADMIN"
  ) {
    return NextResponse.redirect(
      new URL(
        "/admin/dashboard",
        request.url
      )
    );
  }

  // No token
  if (!isPublicPath && !token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // prevent non admin go to admin route 
  if (
    path.startsWith("/admin") &&
    decoded_data?.role !== "ADMIN"
  ) {
    return NextResponse.redirect(
      new URL("/profile", request.url)
    );
  }

  return NextResponse.next();
}