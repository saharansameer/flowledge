import { NODE_ENV } from "@/env";

export const cookieOptions =
  String(NODE_ENV) === "production"
    ? {
        httpOnly: true,
        secure: true,
        sameSite: "none" as const,
        domain: ".flowledge.sameersaharan.com",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      }
    : {
        httpOnly: true,
        secure: false,
        sameSite: "lax" as const,
      };

export const SIZE_LIMIT = "1mb";

export const ACCESS_TOKEN_EXPIRY = "15m";
export const REFRESH_TOKEN_EXPIRY = "7d";

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  GONE: 410,
  RATE_LIMIT_EXCEEDED: 429,
  INTERNAL_SERVER_ERROR: 500,
};
