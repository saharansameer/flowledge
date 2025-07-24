import { Controller } from "@/types";
import { inngest } from "@/inngest/client";
import jwt from "jsonwebtoken";
import { REFRESH_TOKEN_SECRET } from "@/env";

import db from "@/db";
import { users } from "@/db/schema";
import { and, eq } from "drizzle-orm";

import { ApiResponse, ApiError } from "@/utils/api/api-response";
import { HTTP_STATUS } from "@/utils/constants";
import { emailValidator, passwordValidator } from "@/utils/validators";
import { generatePasswordHash, comparePasswordHash } from "@/utils/bcrypt";
import { generateTokens } from "@/utils/jwt-utils";
import { cookieOptions } from "@/utils/constants";

/*
signup
signin
signout
renewToken
clearCookie
*/

export const signup: Controller = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate Email Address
    const emailResult = emailValidator.safeParse(email);
    if (!emailResult.success) {
      throw new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: emailResult.error.message,
      });
    }

    // Validate Password
    const passwordResult = passwordValidator.safeParse(password);
    if (!passwordResult.success) {
      throw new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: passwordResult.error.message,
      });
    }

    // Insert New User
    const [user] = await db
      .insert(users)
      .values({ email: email, password: generatePasswordHash(password) })
      .returning();

    // Fire Inngest Event
    await inngest.send({
      name: "user/signup",
      data: {
        email,
      },
    });

    // Generate Tokens
    await generateTokens({ id: user.id, role: user.role });

    // Final Response
    return res
      .status(HTTP_STATUS.CREATED)
      .json(new ApiResponse({ success: true, message: "User Signup Success" }));
  } catch (error: AnyError) {
    throw new ApiError({
      status: error?.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: error?.message || "An unknown error occurred while signup",
    });
  }
};

export const signin: Controller = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate Email Address
    const emailResult = emailValidator.safeParse(email);
    if (!emailResult.success) {
      throw new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: emailResult.error.message,
      });
    }

    // Find User
    const user = await db.query.users.findFirst({
      columns: { id: true, role: true, password: true },
      where: and(eq(users.email, email)),
    });

    if (!user) {
      throw new ApiError({
        status: HTTP_STATUS.NOT_FOUND,
        message: "User does not exist",
      });
    }

    // Validate Password
    const validate = await comparePasswordHash(password, user.password);

    if (!validate) {
      throw new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: "Incorrect Password",
      });
    }

    // Fire Inngest Event
    await inngest.send({
      name: "user/signin",
      data: {
        email,
      },
    });

    // Generate Tokens
    const { accessToken, refreshToken } = await generateTokens({
      id: user.id,
      role: user.role,
    });

    // Final Response
    return res
      .status(HTTP_STATUS.OK)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(new ApiResponse({ success: true, message: "Sign-in Success" }));
  } catch (error: AnyError) {
    throw new ApiError({
      status: error?.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: error?.message || "An unknown error occurred while sign-in",
    });
  }
};

export const signout: Controller = async (req, res) => {
  try {
    // Clear Refresh Token from Database
    await db
      .update(users)
      .set({ refreshToken: "" })
      .where(and(eq(users.id, req.user!.id)));

    // Modify Cookie Options
    const clearCookieOptions = cookieOptions;
    delete clearCookieOptions?.maxAge;

    // Final Response
    return res
      .status(HTTP_STATUS.OK)
      .clearCookie("accessToken", clearCookieOptions)
      .clearCookie("refreshToken", clearCookieOptions)
      .json(
        new ApiResponse({
          success: true,
          message: "Tokens Deleted from Cookies",
        })
      );
  } catch (error: AnyError) {
    throw new ApiError({
      status: error?.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: error?.message || "An unknown error occurred while sign-out",
    });
  }
};

export const renewTokens: Controller = async (req, res) => {
  // Get existing refresh token
  const existingRefreshToken = req.cookies?.refreshToken;

  if (!existingRefreshToken) {
    throw new ApiError({
      status: HTTP_STATUS.NOT_FOUND,
      message: "Access Token is missing from cookies",
    });
  }

  // Validate Token and Extract Payload
  const tokenPayload = jwt.verify(existingRefreshToken, REFRESH_TOKEN_SECRET);

  if (!tokenPayload) {
    throw new ApiError({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: "Session Expired",
    });
  }

  // Check User Authentication
  const user = await db.query.users.findFirst({
    columns: { id: true, role: true, refreshToken: true },
    where: and(
      eq(users.id, tokenPayload.id),
      eq(users.role, tokenPayload.role),
      eq(users.refreshToken, existingRefreshToken)
    ),
  });

  if (!user) {
    throw new ApiError({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: "User is not Authenticated",
    });
  }

  // Generate New Tokens
  const { accessToken, refreshToken } = await generateTokens({
    id: user.id,
    role: user.role,
  });

  // Final Response
  return res
    .status(HTTP_STATUS.OK)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse({
        success: true,
        message: "Tokens Renewed",
      })
    );
};

export const clearCookie: Controller = async (_req, res) => {
  const clearCookieOptions = cookieOptions;
  delete clearCookieOptions?.maxAge;

  return res
    .status(HTTP_STATUS.OK)
    .clearCookie("accessToken", clearCookieOptions)
    .clearCookie("refreshToken", clearCookieOptions)
    .json(
      new ApiResponse({
        success: true,
        message: "Tokens Deleted from Cookies",
      })
    );
};
