import User from "@/model/userModal";
import { randomBytes } from "crypto";
import { Resend } from "resend";

export async function sendVerificationEmail(_id: any, email: any) {
    const resendApiKey = process.env.RESEND_API_KEY || process.env.RESEND_API;
    if (!resendApiKey) {
        throw new Error("Missing Resend API key. Set RESEND_API_KEY or RESEND_API in your environment.");
    }

    const resend = new Resend(resendApiKey);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const verifyToken = randomBytes(32).toString("hex");
    const userDetail = await User.findById(_id);
    if (!userDetail) {
        throw new Error("User not found");
    }

    userDetail.verifyToken = verifyToken;
    userDetail.verifyTokenExpire = new Date(Date.now() + 3600000);
    await userDetail.save();

    const verifyUrl = `${appUrl}/verify-email?token=${encodeURIComponent(verifyToken)}`;
    const data = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        to: email,
        subject: "Verify Your Email",
        html: `
            <h2>Email Verification</h2>
            <p>Click the link below to verify your account:</p>
            <a href="${verifyUrl}">Verify Email</a>
        `,
        text: `Verify your email by visiting ${verifyUrl}`,
    });

    return data;
}
