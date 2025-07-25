import { z } from "zod/v4";

export const emailValidator = z.email({ error: "Invalid Email Address" });

export const passwordValidator = z
  .string()
  .min(8, { error: "Password must be at least 8 characters long" })
  .max(128, { error: "Password must not exceed 128 characters" });
