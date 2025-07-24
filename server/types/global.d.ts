import { UserRole } from "@/types/schema";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type AnyError = any;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      role: UserRole;
    };
  }
}

export {};
