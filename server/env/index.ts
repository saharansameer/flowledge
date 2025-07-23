import dotenv from "dotenv";

dotenv.config();

export const DATABASE_URL = process.env.DATABASE_URL!;

export const BASE_URL =  process.env.BASE_URL!;
export const CLIENT_URL = process.env.CLIENT_URL!;
export const NODE_ENV = process.env.NODE_ENV!;

export const RESEND_API_KEY = process.env.RESEND_API_KEY!;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
