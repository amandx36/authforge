import User from "@/model/userModal";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { token, password } = reqBody;

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired token",
        },
        {
          status: 404,
        }
      );
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    // Save password
    user.password = hashedPassword;

    // tkn clearing 
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpire = undefined;

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Password reset successfully",
      },
      {
        status: 200,
      }
    );

  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}