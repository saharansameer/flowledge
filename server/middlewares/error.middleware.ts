import { ErrorHandler, Middleware } from "@/types";
import { ApiError } from "@/utils/api/api-response";

export const errorHandler: ErrorHandler = (err, _req, res, _next) => {
  // Check if the error is a valid instance of the Error class
  if (!(err instanceof ApiError)) {
    return res.status(err?.status || 500).json({
      status: err?.status || 500,
      success: false,
      message: err?.message || "An unexpected error occurred",
    });
  }

  return res.status(err.status).json({
    status: err.status,
    success: err.success,
    message: err.message,
    errors: err.errors,
    stack: err.stack,
  });
};


// Handler for Undefined API Routes
export const undefinedRoutesHandler: Middleware = (_req, res, _next) => {
  res.status(404).json({
    success: false,
    message: "oops! API Route is not defined",
  });
};