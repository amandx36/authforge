import { NextRequest } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/model/userModal";
import { connect } from "@/app/dbConfig/dbConfig";

connect();


export async function POST(request: NextRequest) {
    const bcrypt = require("bcryptjs");

    try {
        const { oldPassword, newPassword } = await request.json();
        
        console.log("oldPassword:", oldPassword);
console.log("newPassword:", newPassword);
     
        
        const decoded = getDataFromToken(request) as any;
        const user = await User.findById(decoded.id);
        if (!user) {
            throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(
            oldPassword,
            user.password
        );

        if (!isMatch) {
            throw new Error("Old password is incorrect");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(
            newPassword,
            salt
        );

        user.password = hashedPassword;

        await user.save();
        

        return Response.json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error: any) {
        console.log("Change password error",error)
        return Response.json(
            {
                success: false,
                message: error.message,
            },
            { status: 400 }
        );
    }
}