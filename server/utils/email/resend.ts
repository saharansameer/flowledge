import { Resend } from "resend";
import { RESEND_API_KEY } from "@/env";

const resend = new Resend(RESEND_API_KEY);

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: SendEmailParams): Promise<{ success: boolean; message: string }> {
  try {
    await resend.emails.send({
      from: "Flowledge <flowledge@mail.sameersaharan.com>",
      to: [to],
      subject,
      html,
      text,
    });
    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error: AnyError) {
    return {
      success: false,
      message: error?.message || "Failed to send Email",
    };
  }
}
