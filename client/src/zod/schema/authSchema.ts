import { z } from "zod/v4";
import { emailValidator, passwordValidator } from "@/zod/validators";

export const authSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
});

export type AuthSchemaInputs = z.input<typeof authSchema>;

export const expertSchema = authSchema.extend({
  designation: z.string({error: "Designation is required"}),
  skills: z.string({error: "Skills are required"}),
});

export type ExpertSchemaInputs = z.input<typeof expertSchema>;
