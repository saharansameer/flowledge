import { z } from "zod/v4";
import { emailValidator, passwordValidator } from "@/zod/validators";

export const authSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
});

export type AuthSchemaInputs = z.input<typeof authSchema>;
