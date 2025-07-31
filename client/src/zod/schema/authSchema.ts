import { z } from "zod/v4";
import { emailValidator, passwordValidator } from "@/zod/validators";
import { designation, skills } from "@/zod/validators";

// User Signup and Login
export const authSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
});

export type AuthSchemaInputs = z.input<typeof authSchema>;

// Expert Signup
export const expertSchema = authSchema.extend({
  designation,
  skills,
});

export type ExpertSchemaInputs = z.input<typeof expertSchema>;

// Expert Account Update
export const accountSchema = z.object({ designation, skills });

export type AccountSchemaInputs = z.input<typeof accountSchema>;
