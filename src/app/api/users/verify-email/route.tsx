import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/model/userModal";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const { token } = reqBody;
        console.log("token found")

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpire: { $gt: new Date() },
        });
        
        if (!user) {
            return NextResponse.json(
                {
                    error: "Invalid token or token expired",
                },
                {
                    status: 400,
                }
            );
        }
        console.log("User found")
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpire = undefined;

        await user.save();

        return NextResponse.json({
            success: true,
            message: "Email verified successfully",
        });

    } catch (error: any) {

        return NextResponse.json(
            {
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}