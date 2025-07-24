import { inngest } from "@/inngest/client";
import { NonRetriableError } from "inngest";

import db from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

import { sendEmail } from "@/utils/email/resend";
import { welcomeEmailTemplate } from "@/utils/email/templates";

export const onSignup = inngest.createFunction(
  { id: "on-signup", retries: 1 },
  { event: "user/signup" },
  async ({ event, step }) => {
    try {
      const { email } = event.data;

      // First Step
      const user = await step.run("get-user-email", async () => {
        const userDetails = await db.query.users.findFirst({
          columns: { id: true, email: true },
          where: eq(users.email, email),
        });

        if (!userDetails) {
          throw new NonRetriableError("User does not exist");
        }

        return userDetails;
      });

      // Second Step
      await step.run("send-welcome-email", async () => {
        const subject = "Welcome to Flowledge";
        const { html, text } = welcomeEmailTemplate;

        await sendEmail({ to: user.email, subject, html, text });
      });

      // Final Step
      return { success: true };
    } catch (error: AnyError) {
      console.error(
        `${event.name} error: `,
        error?.message || "An unknown error occurred"
      );
      return { success: false };
    }
  }
);
