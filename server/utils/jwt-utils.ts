import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "@/env";
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "@/utils/constants";

import { ApiError } from "@/utils/api/api-response";
import { HTTP_STATUS } from "@/utils/constants";

import db from "@/db";
import { users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { UserRole } from "@/types";

interface TokenParams {
  id: string;
  role: UserRole;
}

export function generateAccessToken({ id, role }: TokenParams) {
  return jwt.sign({ id, role }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
}

export function generateRefreshToken({ id, role }: TokenParams) {
  return jwt.sign({ id, role }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
}

export async function generateTokens({ id, role }: TokenParams) {
  try {
    // Find and Validate User
    const user = await db.query.users.findFirst({
      columns: { id: true, role: true },
      where: and(eq(users.id, id), eq(users.role, role)),
    });

    if (!user) {
      throw new ApiError({
        status: HTTP_STATUS.NOT_FOUND,
        message: "User does not exist",
      });
    }

    // Genereate access and refresh tokens
    const accessToken = generateAccessToken({ id, role });
    const refreshToken = generateRefreshToken({ id, role });

    // Update refreshToken value in database
    await db
      .update(users)
      .set({ refreshToken: refreshToken })
      .where(eq(users.id, id));

    // Return
    return { accessToken, refreshToken };
  } catch (error: AnyError) {
    throw new ApiError({
      status: HTTP_STATUS.BAD_REQUEST,
      message:
        error?.message || "An unknown error occurred while generating tokens",
    });
  }
}
