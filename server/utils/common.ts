export function getCurrentFullYear() {
  return new Date().getFullYear();
}

export function trimAndClean(val: string) {
  return val.trim().replace(/\s+/g, " ");
}

export function formatSkills(val: string) {
  return trimAndClean(val)
    .split(",")
    .map((val) => val.trim())
    .filter((val) => val !== "");
}

import { emailValidator, passwordValidator } from "./validators";

export function safeParseValue(
  validator: typeof emailValidator | typeof passwordValidator,
  value: string
) {
  const result = validator.safeParse(value);
  if (result.error) {
    const errors = JSON.parse(result.error.message);
    return { success: false, message: errors[0].message };
  }

  return { success: true, message: "Validation Success" };
}
