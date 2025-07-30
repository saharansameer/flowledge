import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export const DATABASE_URL = process.env.DATABASE_URL!;

export const BASE_URL = process.env.BASE_URL!;
export const CLIENT_URL = process.env.CLIENT_URL!;
export const NODE_ENV = process.env.NODE_ENV!;
export const PORT = process.env.PORT!;

export const RESEND_API_KEY = process.env.RESEND_API_KEY!;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export const INNGEST_EVENT_KEY = process.env.INNGEST_EVENT_KEY!;
export const INNGEST_SIGNING_KEY = process.env.INNGEST_SIGNING_KEY!