import { inngest } from "@/inngest/client";
import { NonRetriableError } from "inngest";

import db from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

import { sendEmail } from "@/utils/email/resend";
import { userWelcomeEmailTemplate, expertWelcomeEmailTemplate } from "@/utils/email/templates";

export const onSignup = inngest.createFunction(
  { id: "on-signup", retries: 1 },
  { event: "user/signup" },
  async ({ event, step }) => {
    try {
      const { email } = event.data;

      // Step One - Find user's email
      const user = await step.run("get-user-email", async () => {
        const userDetails = await db.query.users.findFirst({
          where: eq(users.email, email),
          columns: { id: true, email: true, role: true },
        });

        if (!userDetails) {
          throw new NonRetriableError("User does not exist");
        }

        return userDetails;
      });

      // Step Two - send a welcome email to user
      await step.run("send-welcome-email", async () => {
        const subject = "Welcome to Flowledge";
        const { html, text } = user.role === "USER" ? userWelcomeEmailTemplate : expertWelcomeEmailTemplate;

        await sendEmail({ to: user.email, subject, html, text });
      });

      // Final Step
      return { success: true, message: `${event.name} success` };
    } catch (error: AnyError) {
      return {
        success: false,
        message: `${event.name} : ${error?.message || "An unknown error occurred"}`,
      };
    }
  }
);
