import { UserRole } from "@/types";
import { emailValidator, passwordValidator } from "./validators";
import { ApiError } from "./api/api-response";
import { HTTP_STATUS } from "./constants";

export function getCurrentFullYear() {
  return new Date().getFullYear();
}

export function trimAndClean(val: string) {
  return val.trim().replace(/\s+/g, " ");
}

export function formatSkills(val: string) {
  return trimAndClean(val)
    .split(",")
    .map((val) => val.trim().toLowerCase())
    .filter((val) => val !== "");
}

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

export function checkRole(role: UserRole, allowedRoles: UserRole[]) {
  if (!allowedRoles.includes(role)) {
    throw new ApiError({
      status: HTTP_STATUS.FORBIDDEN,
      message: "Access Denied",
    });
  }
}

export function getDateNow() {
  return new Date(Date.now())
}