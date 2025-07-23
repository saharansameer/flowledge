import { Controller, Middleware } from "@/types";
import type { Request, Response, NextFunction } from "express";

export const asyncHandler = (requestHandler: Controller | Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await requestHandler(req, res, next);
    } catch (error: AnyError) {
      next(error);
    }
  };
};
