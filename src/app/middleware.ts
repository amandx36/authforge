import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const config = {
  matcher: [
    "/",
    "/profile/:path*",
    "/admin/:path*",
    "/login",
    "/signup",
    "/verify-email",
  ],
};

const publicRoutes = [
  "/login",
  "/signup",
  "/verify-email",
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
      decoded_data = jwt.verify(
        token,
        process.env.TOKEN_SECRET!
      );
    }
  } catch (error) {
    decoded_data = null;
  }

  // if login user want to regin login 
  if (
    isPublicPath &&
    decoded_data?.role === "USER"
  ) {
    return NextResponse.redirect(
      new URL("/profile", request.url)
    );
  }

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

  // if no token and not a  public route 
  if (!isPublicPath && !token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // prevent user from admin access
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