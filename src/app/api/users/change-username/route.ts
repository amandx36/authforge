import { NextRequest, NextResponse } from "next/server";
import User from "@/model/userModal";
import {connect} from "@/app/dbConfig/dbConfig";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const { username } = await request.json();

    if (!username) {
      return NextResponse.json(
        { message: "Username is required" },
        { status: 400 }
      );
    }

    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded: any = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    );

    const user = await User.findOne({
      email: decoded.email,
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    user.username = username;
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Username updated successfully",
        user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("CHANGE USERNAME ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}