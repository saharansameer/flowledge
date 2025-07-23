import type { Request, Response, NextFunction } from "express";

export type Controller = (req: Request, res: Response) => Promise<Response>;

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

export type ErrorHandler = (
  err: AnyError,
  req: Request,
  res: Response,
  next: NextFunction
) => void;
