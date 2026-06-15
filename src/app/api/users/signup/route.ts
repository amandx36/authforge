// connect with the database
import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/model/userModal";

import { sendVerificationEmail } from "@/helper/mailer";

// for request and response
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { MailTypes } from "@/helper/enums";
import { randomBytes } from "crypto";

connect();

// handling the post request
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    // get the data from request body
    const { username, email, password } = reqBody;

    // check is user exist or not
    const isExist = await User.findOne({ email });

    if (isExist) {
      return NextResponse.json(
        {
          message: "User already exist with this email",
        },
        { status: 400 }
      );
    }

    // hash the password with salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // generate verification token
    const verifyToken = randomBytes(32).toString("hex");

    // create the user in database
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verifyToken,
      verifyTokenExpire: new Date(Date.now() + 3600000), // 1 hour
    });

    await newUser.save();

    console.log("User created successfully", newUser);

    // send verification email
    const res = await sendVerificationEmail(
      newUser.email,
      verifyToken,
      MailTypes.VERIFICATION_EMAIL
    );

    console.log(res);

    return NextResponse.json({
      success: true,
      message: "User created successfully. Verification email sent.",
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