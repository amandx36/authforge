import { NextRequest } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/model/userModal";

export async function POST(request: NextRequest) {
    const bcrypt = require("bcryptjs");

    try {
        const { NewPass, oldPass } = await request.json();

        const decoded = getDataFromToken(request) as any;
        const email = decoded.email;

        const user = await User.findById({email});

        if (!user) {
            throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(
            oldPass,
            user.password
        );

        if (!isMatch) {
            throw new Error("Old password is incorrect");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(
            NewPass,
            salt
        );

        user.password = hashedPassword;

        await user.save();

        return Response.json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error: any) {
        return Response.json(
            {
                success: false,
                message: error.message,
            },
            { status: 400 }
        );
    }
}