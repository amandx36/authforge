// connect with the database
import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/model/userModal";
import { sendVerificationEmail } from "@/helper/mailer";
import { MailTypes } from "@/helper/enums";

import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Sign up first",
        },
        { status: 404 }
      );
    }

    // Generate reset token
    const resetToken = randomBytes(32).toString("hex");

    // Save token in database
    user.forgotPasswordToken = resetToken;

    user.forgotPasswordTokenExpire = new Date(
      Date.now() + 60 * 60 * 1000
    );

    await user.save();

    // Send reset password email
    await sendVerificationEmail(
      user.email,
      resetToken,
      MailTypes.RESET_PASSWORD_EMAIL
    );

    return NextResponse.json({
      success: true,
      message: "Password reset email sent successfully.",
    });

  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}