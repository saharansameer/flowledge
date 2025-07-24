import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "@/env";
import { Middleware } from "@/types";
import { ApiError } from "@/utils/api/api-response";
import { HTTP_STATUS } from "@/utils/constants";

export const checkAuth: Middleware = (req, _res, next) => {
  try {
    // Extract Access Token from request cookies
    const token = req.cookies?.accessToken;

    if (!token) {
      throw new ApiError({
        status: HTTP_STATUS.NOT_FOUND,
        message: "Access Token is missing from cookies",
      });
    }

    // Validate Token and Extract Payload
    const tokenPayload = jwt.verify(token, ACCESS_TOKEN_SECRET);

    if (!tokenPayload) {
      throw new ApiError({
        status: HTTP_STATUS.FORBIDDEN,
        message: "Access Token Expired",
      });
    }

    // Pass Token Payload
    req.user = tokenPayload;

  } catch (error: AnyError) {
    throw new ApiError({
      status: error?.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message:
        error?.message || "Encountered an unknown error at auth middleware",
    });
  }

  next();
};
