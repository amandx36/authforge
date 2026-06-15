import { Resend } from "resend";
import { MailTypes } from "./enums";

export async function sendVerificationEmail(
  email: string,
  token: string,
  emailType: MailTypes
) {
  const resendApiKey =
    process.env.RESEND_API_KEY || process.env.RESEND_API;

  if (!resendApiKey) {
    throw new Error("Missing Resend API key");
  }

  const resend = new Resend(resendApiKey);

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000";

  const url =
    emailType === MailTypes.VERIFICATION_EMAIL
      ? `${appUrl}/verify-email?token=${encodeURIComponent(token)}`
      : `${appUrl}/reset-password?token=${encodeURIComponent(token)}`;

  const subject =
    emailType === MailTypes.VERIFICATION_EMAIL
      ? "Verify Your Email"
      : "Reset Your Password";

  const html =
    emailType === MailTypes.VERIFICATION_EMAIL
      ? `
        <h2>Email Verification</h2>
        <p>Click the link below to verify your account:</p>
        <a href="${url}">Verify Email</a>
      `
      : `
        <h2>Reset Password</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${url}">Reset Password</a>
      `;

  const data = await resend.emails.send({
    from:
      process.env.RESEND_FROM_EMAIL ||
      "onboarding@resend.dev",
    to: email,
    subject,
    html,
    text:
      emailType === MailTypes.VERIFICATION_EMAIL
        ? `Verify your email by visiting ${url}`
        : `Reset your password by visiting ${url}`,
  });

  return data;
}