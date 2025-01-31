import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(email: string, username: string, verifyCode: string): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: "verification email from sachin",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "successfully send verification" }

  } catch (emailError) {
    console.error("email error:", emailError)
    return { success: false, message: "failed to send verification" }
  }
}