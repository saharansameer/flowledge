import { ErrorConstructorParams, ResponseConstructorParams } from "@/types";

export class ApiError extends Error {
  public status: number
  public success: boolean;
  public errors: string[];
  public stack: string | undefined;
  public data: null;

  constructor({
    status,
    success = false,
    message,
    errors = [],
    stack = "",
  }: ErrorConstructorParams) {
    super(message);
    this.status = status
    this.success = success;
    this.errors = errors;
    this.stack = stack;
    this.data = null;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class ApiResponse {
  public success: boolean;
  public message: string;
  public data: object | undefined;

  constructor({ success, message, data }: ResponseConstructorParams) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
