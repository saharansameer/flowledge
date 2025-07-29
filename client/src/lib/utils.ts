import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentFullYear() {
  return new Date().getFullYear();
}

export const getFormatDate = (date: Date, type: "date-only" | "date-time") => {
  return new Intl.DateTimeFormat(
    "en-US",
    type === "date-only"
      ? { year: "numeric", month: "short", day: "numeric" }
      : {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hourCycle: "h23",
          timeZone: "UTC",
        }
  ).format(new Date(date));
};

export const getErrorResponse = (err: AnyError) => {
  const response = err?.response;
  return {
    success: false,
    message: response?.message || "An unknown error occurred",
    data: null,
  };
};
